// IHO GK mock test platform: home, instructions, timed exam, result and solutions.
// Progress and results are kept in this browser's localStorage, so a refresh never loses a running test.
(() => {
  "use strict";

  const FIVE_MIN = 5 * 60 * 1000;
  const ONE_MIN = 60 * 1000;
  const CANDIDATE = "Arnavi Maurya";
  const FIRST_NAME = "Arnavi";
  const PHOTO = "assets/arnavi.jpg?v=2"; // bump v after replacing the photo so browsers skip the cached copy
  const KEYS = { session: "ihogk.session.v1", attempts: "ihogk.attempts.v1" };
  const LETTERS = ["A", "B", "C", "D"];
  const STATUS_ORDER = ["not-visited", "not-answered", "answered", "marked", "answered-marked"];
  const STATUS_LABEL = {
    "not-visited": "Not Visited",
    "not-answered": "Not Answered",
    "answered": "Answered",
    "marked": "Marked for Review",
    "answered-marked": "Answered & Marked for Review"
  };

  const CHAPTERS = window.IHO_DATA.chapters;
  const CHAPTER_KEYS = Object.keys(CHAPTERS);
  const STUDY = window.IHO_STUDY || {};
  const PICS = window.IHO_PICS || {};
  const TESTS = window.IHO_DATA.tests.map(buildTest);
  const app = document.getElementById("app");

  // ---------- storage (best effort: the app keeps working in memory if storage is blocked) ----------
  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function save(key, value) {
    try {
      if (value == null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* storage unavailable */ }
  }

  const store = {
    attempts: load(KEYS.attempts, []),
    session: load(KEYS.session, null)
  };
  if (!Array.isArray(store.attempts)) store.attempts = [];

  const ui = { view: "home", testId: null, attemptId: null, filter: "all", paletteOpen: false, studyChapter: CHAPTER_KEYS[0], studyQuiz: false };
  let ticker = null;
  let warned = {};

  // ---------- test building ----------
  function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(list, rand) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function firstNumber(s) {
    const m = String(s).match(/\d+/);
    return m ? Number(m[0]) : NaN;
  }

  function buildTest(raw) {
    const rand = mulberry32(raw.id * 7919 + 17);
    const items = raw.sectionA.map(q => ({ ...q, section: 0 }))
      .concat((raw.sectionB || []).map(q => ({ ...q, section: 1 })));
    // Options given in a fixed order (`o`, e.g. with "All of the above" last) and numeric options stay put;
    // the other questions fill A–D so that each letter is the correct answer about equally often.
    // The same test always shows the same order.
    const sorted = items.map(item => {
      if (item.o) return item.o.slice();
      const all = [item.a, ...item.w];
      if (!all.every(s => !Number.isNaN(firstNumber(s)))) return null;
      return all.sort((x, y) => firstNumber(x) - firstNumber(y));
    });
    const used = [0, 0, 0, 0];
    sorted.forEach((opts, i) => { if (opts) used[opts.indexOf(items[i].a)]++; });
    const slots = [];
    while (slots.length < sorted.filter(o => !o).length) {
      const p = used.indexOf(Math.min(...used));
      used[p]++;
      slots.push(p);
    }
    const freeSlots = shuffle(slots, rand);
    const questions = items.map((item, i) => {
      let options = sorted[i];
      if (!options) {
        options = shuffle(item.w, rand);
        options.splice(freeSlots.pop(), 0, item.a);
      }
      return {
        n: i + 1,
        section: item.section,
        group: raw.topics ? item.t : item.c,
        text: item.q,
        img: item.img || null,
        options,
        answer: options.indexOf(item.a),
        explanation: item.e
      };
    });
    const countA = raw.sectionA.length;
    const sections = [{ name: raw.sectionName || "Section A", start: 0, end: countA - 1 }];
    if (questions.length > countA) sections.push({ name: "Section B", start: countA, end: questions.length - 1 });
    return {
      id: raw.id,
      kind: raw.kind || "mock",
      subject: raw.subject || "General Knowledge",
      number: raw.number,
      chapter: raw.chapter,
      code: raw.code,
      title: raw.title,
      note: raw.note || "",
      minutes: raw.minutes || 40,
      // Results break a GK mock test down by chapter; chapter and maths tests by topic.
      groups: raw.topics || CHAPTERS,
      questions,
      sections
    };
  }

  // ---------- helpers ----------
  const getTest = id => TESTS.find(t => t.id === id);
  const findAttempt = id => store.attempts.find(a => a.id === id);
  const sizeOf = s => s.end - s.start + 1;
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, k) => a + k);
  const pad = n => String(n).padStart(2, "0");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function clock(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    return pad(Math.floor(s / 60)) + ":" + pad(s % 60);
  }
  function spent(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(s / 60);
    return m ? `${m} min ${pad(s % 60)} s` : `${s} s`;
  }
  function when(ts) {
    return new Date(ts).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
  }
  function avatar(extraClass = "") {
    return `<span class="avatar${extraClass}" aria-hidden="true"><img src="${PHOTO}" alt=""></span>`;
  }
  // Results are shown from the attempt's own copy of the questions when it has one
  // (attempts saved before that copy existed fall back to the current test).
  function testOf(at) {
    const t = getTest(at.testId);
    return at.questions ? { ...t, questions: at.questions } : t;
  }
  // Pictures: a question's `img`, or an option written as "pic:key" (see pictures.js).
  const isPic = o => typeof o === "string" && o.startsWith("pic:");
  function picHTML(key, cls = "") {
    const p = PICS[key];
    return p ? `<span class="pic ${cls}" role="img" aria-label="${esc(p.alt)}">${p.svg}</span>` : "";
  }
  const optText = o => (isPic(o) ? (PICS[o.slice(4)] || { alt: "Picture" }).alt : o);
  const optHTML = (o, cls) => (isPic(o) ? picHTML(o.slice(4), cls) : esc(o));
  const figure = (q, cls = "q-fig") => (q.img ? `<figure class="${cls}">${picHTML(q.img)}</figure>` : "");
  const picGrid = q => (q.options.every(isPic) ? " pic-grid" : "");
  // Maths tests live under the Maths tab; everything else under GK Tests.
  const navFor = t => (t.kind === "maths" ? "maths" : "tests");
  const backAction = t => (t.kind === "maths" ? "maths" : "home");
  function fullTitle(t) {
    return t.kind === "chapter" ? `${t.title}: ${CHAPTERS[t.chapter]}` : t.title;
  }

  function grade(test, answers) {
    const res = {
      correct: 0, wrong: 0, skipped: 0, total: test.questions.length,
      sections: test.sections.map(s => ({ name: s.name, total: sizeOf(s), correct: 0, wrong: 0, skipped: 0 })),
      groups: {}
    };
    test.questions.forEach((q, i) => {
      const a = answers[i];
      const sec = res.sections[q.section];
      const g = res.groups[q.group] || (res.groups[q.group] = { total: 0, correct: 0, wrong: 0, skipped: 0, misses: [] });
      g.total++;
      if (a == null) { res.skipped++; sec.skipped++; g.skipped++; g.misses.push(i); }
      else if (a === q.answer) { res.correct++; sec.correct++; g.correct++; }
      else { res.wrong++; sec.wrong++; g.wrong++; g.misses.push(i); }
    });
    res.score = res.correct;
    return res;
  }

  // ---------- session ----------
  function persistSession() { save(KEYS.session, store.session); }

  function statusOf(i) {
    const s = store.session;
    const answered = s.answers[i] != null;
    const marked = !!s.marked[i];
    if (answered && marked) return "answered-marked";
    if (marked) return "marked";
    if (answered) return "answered";
    return s.visited[i] ? "not-answered" : "not-visited";
  }
  function countStatus(from, to) {
    const counts = {};
    STATUS_ORDER.forEach(k => { counts[k] = 0; });
    for (let i = from; i <= to; i++) counts[statusOf(i)]++;
    return counts;
  }

  function startTest(testId) {
    const now = Date.now();
    store.session = { testId, startedAt: now, endsAt: now + getTest(testId).minutes * 60 * 1000, current: 0, answers: {}, marked: {}, visited: { 0: true } };
    warned = {};
    persistSession();
    ui.view = "exam";
    ui.testId = testId;
    ui.paletteOpen = false;
    render();
  }

  function submitTest(auto) {
    const s = store.session;
    if (!s) return;
    stopTicker();
    const t = getTest(s.testId);
    const answers = t.questions.map((_, i) => (s.answers[i] == null ? null : s.answers[i]));
    const end = Math.min(Date.now(), s.endsAt);
    const attempt = {
      id: Date.now(),
      testId: t.id,
      name: CANDIDATE,
      startedAt: s.startedAt,
      submittedAt: end,
      timeTaken: end - s.startedAt,
      answers,
      score: grade(t, answers).score,
      total: t.questions.length,
      questions: t.questions, // the questions exactly as she saw them, so later edits never change this result
      auto: !!auto
    };
    store.attempts.push(attempt);
    save(KEYS.attempts, store.attempts);
    store.session = null;
    persistSession();
    closeModal();
    ui.view = "result";
    ui.attemptId = attempt.id;
    ui.testId = t.id;
    render();
    if (auto) {
      showModal({
        title: "Time is up!",
        body: `<p>Your ${t.minutes} minutes are over, so your answers were submitted automatically.</p>`,
        actions: [{ label: "See my result", action: "closeModal", kind: "primary" }]
      });
    }
  }

  // ---------- timer ----------
  function startTicker() {
    stopTicker();
    tick();
    ticker = setInterval(tick, 500);
  }
  function stopTicker() {
    if (ticker) clearInterval(ticker);
    ticker = null;
  }
  function tick() {
    const s = store.session;
    if (!s) return stopTicker();
    const left = s.endsAt - Date.now();
    const value = document.getElementById("timerValue");
    const box = document.getElementById("timer");
    if (value) value.textContent = clock(left);
    if (box) {
      box.classList.toggle("is-low", left <= FIVE_MIN && left > ONE_MIN);
      box.classList.toggle("is-critical", left <= ONE_MIN);
    }
    if (left <= FIVE_MIN && left > ONE_MIN && !warned.five) {
      warned.five = true;
      toast("5 minutes left. Check the questions you have not answered.");
    }
    if (left <= ONE_MIN && left > 0 && !warned.one) {
      warned.one = true;
      toast("Last 1 minute!");
    }
    if (left <= 0) submitTest(true);
  }

  // ---------- shared pieces ----------
  function topbar(active = "tests") {
    const link = (key, label, action) => `<button class="navlink${active === key ? " is-active" : ""}" data-action="${action}"${active === key ? ' aria-current="page"' : ""}>${label}</button>`;
    return `<header class="topbar"><div class="topbar-inner">
      <div class="brand"><span class="seal" aria-hidden="true">G3</span>
        <div><strong>IHO Olympiad Practice</strong><span>Grade III · GK &amp; Maths</span></div></div>
      <nav class="mainnav" aria-label="Main">${link("tests", "GK Tests", "home")}${link("study", "Study", "study")}${link("maths", "Maths", "maths")}</nav>
      <div class="cand-chip">${avatar()}<span>${CANDIDATE}</span></div>
    </div></header>`;
  }

  function legendItems(counts) {
    return STATUS_ORDER.map(s => `<li><span class="pq st-${s}" aria-hidden="true">${counts ? counts[s] : ""}</span><span>${STATUS_LABEL[s]}</span></li>`).join("");
  }

  // ---------- home ----------
  function testCard(t) {
    const mine = store.attempts.filter(a => a.testId === t.id);
    const best = mine.reduce((m, a) => Math.max(m, a.score), 0);
    const last = mine[mine.length - 1];
    const live = store.session && store.session.testId === t.id;
    const total = t.questions.length;
    let status = `<span class="pill">Not attempted</span>`;
    if (live) status = `<span class="pill pill-live">In progress · ${clock(store.session.endsAt - Date.now())} left</span>`;
    else if (mine.length) status = `<span class="pill pill-done">Best ${best}/${total} · ${mine.length} attempt${mine.length > 1 ? "s" : ""}</span>`;
    const actions = `<div class="test-actions">
        ${live
        ? `<button class="btn primary" data-action="resume">Resume test</button>`
        : `<button class="btn primary" data-action="instructions" data-test="${t.id}">${mine.length ? "Retake test" : "Start test"}</button>`}
        ${last ? `<button class="btn ghost" data-action="result" data-attempt="${last.id}">Last result</button>` : ""}
      </div>`;
    if (t.kind === "chapter") {
      return `<article class="test-card chapter-card">
        <span class="test-code">${t.code}</span>
        <div><p class="chapter-no">Chapter ${t.number}</p><h3>${CHAPTERS[t.chapter]}</h3></div>
        ${status}
        <p class="test-split">${total} questions · ${t.minutes} min · ${t.sections.map(s => `${s.name.replace("Section ", "")}: ${sizeOf(s)}`).join(" · ")}</p>
        ${actions}
      </article>`;
    }
    return `<article class="test-card">
      <div class="test-card-top"><span class="test-code">${t.code}</span>${status}</div>
      <h3>${t.title}</h3>
      ${t.note ? `<p class="test-note">${t.note}</p>` : ""}
      <dl class="test-facts">
        <div><dt>Questions</dt><dd>${total}</dd></div>
        <div><dt>Marks</dt><dd>${total}</dd></div>
        <div><dt>Time</dt><dd>${t.minutes} min</dd></div>
      </dl>
      <p class="test-split">${t.sections.length > 1 ? t.sections.map(s => `${s.name}: ${sizeOf(s)}`).join(" · ") : `${total} questions in one section`}</p>
      ${actions}
    </article>`;
  }

  // Recent attempts for one subject (maths or GK), newest first.
  function historyTable(maths) {
    const recent = store.attempts.filter(a => {
      const t = getTest(a.testId);
      return t && (t.kind === "maths") === maths;
    }).reverse().slice(0, 8);
    if (!recent.length) return `<p class="empty">Your scores will appear here after you finish a test.</p>`;
    return `<div class="table-wrap"><table class="data">
      <thead><tr><th>Date</th><th>Test</th><th>Score</th><th>Time taken</th><th><span class="sr-only">Result</span></th></tr></thead>
      <tbody>${recent.map(a => `<tr><td>${when(a.submittedAt)}</td><td>${fullTitle(getTest(a.testId))}</td>
          <td class="num"><strong>${a.score}</strong>/${a.total}</td><td class="num">${spent(a.timeTaken)}</td>
          <td class="row-action"><button class="link" data-action="result" data-attempt="${a.id}">View</button></td></tr>`).join("")}</tbody>
    </table></div>`;
  }

  function welcome(eyebrow, heading) {
    return `<section class="welcome">
        <div>
          <p class="eyebrow">${eyebrow}</p>
          <h1>${heading}</h1>
        </div>
        <div class="cand-card">
          ${avatar(" avatar-lg")}
          <div>
            <span class="k">Candidate</span>
            <strong>${CANDIDATE}</strong>
            <span class="s">Grade III · ${store.attempts.length} test${store.attempts.length === 1 ? "" : "s"} taken</span>
          </div>
        </div>
      </section>`;
  }

  // ---------- moving results to another site ----------
  // Results live in each website's own browser storage, so a new link starts empty.
  // "Save my results" writes every attempt to a file; "Load results" on the new site adds them back.
  // Loading only ever adds attempts (matched by id); it never removes or changes one that is already here.
  const BACKUP_APP = "iho-gk-results";
  // Inside a claude.ai artifact, files are saved through the viewer's "downloads" capability.
  const downloadsReady = window.claude && typeof window.claude.use === "function"
    ? Promise.resolve(window.claude.use("downloads")).catch(() => null)
    : Promise.resolve(null);

  function backupBlock() {
    const n = store.attempts.length;
    return `<section class="block backup" aria-labelledby="backupTitle">
        <div class="backup-text">
          <h2 id="backupTitle">Move or back up results</h2>
          <p>Results are kept in this browser, for this website only. Moving to a new link or another computer? Save them to a file here, then load that file on the new site. Loading only adds results; it never removes any.</p>
        </div>
        <div class="backup-actions">
          <button class="btn ghost" data-action="saveResults"${n ? "" : " disabled"}>Save my results (${n})</button>
          <button class="btn ghost" data-action="loadResults">Load results from a file</button>
        </div>
      </section>`;
  }

  async function saveResults() {
    const n = store.attempts.length;
    if (!n) return;
    const data = JSON.stringify({ app: BACKUP_APP, version: 1, candidate: CANDIDATE, savedAt: Date.now(), attempts: store.attempts });
    const d = new Date();
    const filename = `arnavi-results-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.json`;
    const done = `Saved ${n} result${n === 1 ? "" : "s"} to ${filename}. On the new site, choose "Load results from a file".`;
    if (window.claude) {
      const downloads = await downloadsReady;
      if (!downloads) { showCode(data); return; }
      try {
        await downloads.save({ filename, data });
        toast(done);
      } catch (err) {
        const code = err && err.code;
        if (code === "declined") toast("Not saved.");
        else if (code === "rate_limited") toast("Please try again in a moment.");
        else showCode(data);
      }
      return;
    }
    const url = URL.createObjectURL(new Blob([data], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast(done);
  }

  // Fallback when this view cannot save files: show the same data as text to copy and paste.
  function showCode(data) {
    showModal({
      title: "Copy your results",
      body: `<p>Files can't be saved here, so copy this code instead. On the new site, choose <strong>Load results from a file</strong>, open <strong>Have a code instead?</strong> and paste it.</p>
        <textarea class="code-box" id="resultsOut" rows="6" readonly aria-label="Results code">${esc(data)}</textarea>`,
      actions: [{ label: "Copy code", action: "copyResults", kind: "primary" }, { label: "Close", action: "closeModal", kind: "ghost" }]
    });
  }
  function copyResults() {
    const box = document.getElementById("resultsOut");
    if (!box) return;
    box.focus();
    box.select();
    const copied = () => toast("Code copied. Paste it on the new site.");
    const byCommand = () => {
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { /* not supported */ }
      if (ok) copied(); else toast("The code is selected: press Ctrl+C to copy it.");
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(box.value).then(copied, byCommand);
    else byCommand();
  }

  function openLoad() {
    showModal({
      title: "Load saved results",
      body: `<p>Choose the file you saved on the old link (its name starts with <strong>arnavi-results</strong>). Results already on this site are kept.</p>
        <div><button class="btn primary" data-action="pickResults">Choose file</button>
        <input type="file" id="resultsFile" accept=".json,application/json" hidden></div>
        <details class="load-alt"><summary>Have a code instead?</summary>
          <textarea class="code-box" id="resultsIn" rows="5" aria-label="Paste the results code"></textarea>
          <button class="btn ghost" data-action="pasteResults">Add these results</button>
        </details>`,
      actions: [{ label: "Close", action: "closeModal", kind: "ghost" }]
    });
  }

  const isNum = v => typeof v === "number" && Number.isFinite(v);
  const isStr = v => typeof v === "string";
  const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

  // A copied attempt keeps its own questions only if they have the same shape as this site's test;
  // otherwise its result is shown from the current test, as for attempts saved before copies existed.
  function cleanQuestions(list, t) {
    if (!Array.isArray(list) || list.length !== t.questions.length) return null;
    const out = [];
    for (let i = 0; i < list.length; i++) {
      const q = list[i];
      if (!q || !isStr(q.text) || !isStr(q.explanation)) return null;
      if (!Array.isArray(q.options) || q.options.length !== 4 || !q.options.every(isStr)) return null;
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) return null;
      if (!Number.isInteger(q.section) || !t.sections[q.section]) return null;
      if (!isStr(q.group) || !has(t.groups, q.group)) return null;
      if (q.img != null && !(isStr(q.img) && has(PICS, q.img))) return null;
      out.push({ n: i + 1, section: q.section, group: q.group, text: q.text, img: q.img || null, options: q.options.slice(), answer: q.answer, explanation: q.explanation });
    }
    return out;
  }
  function cleanAttempt(raw) {
    if (!raw || typeof raw !== "object") return null;
    const t = getTest(raw.testId);
    if (!t || !isNum(raw.id) || !isNum(raw.submittedAt) || !Array.isArray(raw.answers)) return null;
    const questions = cleanQuestions(raw.questions, t);
    const qs = questions || t.questions;
    if (raw.answers.length !== qs.length) return null;
    const answers = raw.answers.map(a => (Number.isInteger(a) && a >= 0 && a < 4 ? a : null));
    const timeTaken = isNum(raw.timeTaken) ? raw.timeTaken : (isNum(raw.startedAt) ? raw.submittedAt - raw.startedAt : 0);
    const score = Number.isInteger(raw.score) && raw.score >= 0 && raw.score <= qs.length
      ? raw.score : grade({ ...t, questions: qs }, answers).score;
    const at = {
      id: raw.id,
      testId: t.id,
      name: CANDIDATE,
      startedAt: isNum(raw.startedAt) ? raw.startedAt : raw.submittedAt - timeTaken,
      submittedAt: raw.submittedAt,
      timeTaken,
      answers,
      score,
      total: qs.length
    };
    if (questions) at.questions = questions;
    at.auto = !!raw.auto;
    return at;
  }

  function importResults(text) {
    let data = null;
    try { data = JSON.parse(String(text).trim()); } catch (e) { /* not JSON */ }
    if (!data || data.app !== BACKUP_APP || !Array.isArray(data.attempts)) {
      showModal({
        title: "That didn't work",
        body: `<p>Please choose the file made by <strong>Save my results</strong> (its name starts with arnavi-results), or paste its whole code.</p>`,
        actions: [{ label: "Try again", action: "loadResults", kind: "primary" }, { label: "Close", action: "closeModal", kind: "ghost" }]
      });
      return;
    }
    const before = store.attempts.slice();
    const seen = new Set(before.map(a => a.id));
    let added = 0, already = 0, unreadable = 0;
    data.attempts.forEach(raw => {
      const at = cleanAttempt(raw);
      if (!at) { unreadable++; return; }
      if (seen.has(at.id)) { already++; return; }
      seen.add(at.id);
      store.attempts.push(at);
      added++;
    });
    if (added) {
      store.attempts.sort((a, b) => a.submittedAt - b.submittedAt || a.id - b.id);
      save(KEYS.attempts, store.attempts);
      const kept = load(KEYS.attempts, null);
      if (!Array.isArray(kept) || kept.length !== store.attempts.length) {
        // Could not be stored (storage full or blocked): put everything back as it was.
        store.attempts = before;
        save(KEYS.attempts, before);
        showModal({
          title: "Couldn't save here",
          body: `<p>This browser would not store the results, so nothing was changed. Try a normal (not private) window.</p>`,
          actions: [{ label: "OK", action: "closeModal", kind: "primary" }]
        });
        return;
      }
    }
    render();
    const plural = k => `${k} result${k === 1 ? "" : "s"}`;
    const notes = [];
    if (already) notes.push(`${plural(already)} ${already === 1 ? "was" : "were"} already here, so ${already === 1 ? "it was" : "they were"} skipped.`);
    if (unreadable) notes.push(`${plural(unreadable)} could not be read.`);
    showModal({
      title: added ? `Added ${plural(added)}` : "Nothing new to add",
      body: `<p>${added ? `${FIRST_NAME}'s past scores, answers and solutions are now on this site, under Recent attempts.` : "Every result in this file is already on this site."}</p>${notes.map(x => `<p>${x}</p>`).join("")}`,
      actions: [{ label: "OK", action: "closeModal", kind: "primary" }]
    });
  }

  function renderMaths() {
    const cards = TESTS.filter(t => t.kind === "maths").map(testCard).join("");
    return topbar("maths") + `<main class="page home">
      ${welcome("Grade III · Mathematics", `Maths practice, ${FIRST_NAME}`)}

      <section class="pattern" aria-label="Exam pattern">
        <div><span class="k">Questions</span><span class="v">40</span><span class="s">One section, numbered 1–40</span></div>
        <div><span class="k">Marks</span><span class="v">40</span><span class="s">1 mark per question</span></div>
        <div><span class="k">Time</span><span class="v">1 hour</span><span class="s">Like the real paper · submits itself at 00:00</span></div>
        <div><span class="k">Options</span><span class="v">4</span><span class="s">(A) to (D), only one is correct</span></div>
      </section>

      <section class="block">
        <div class="block-head">
          <h2>Maths tests</h2>
          <p>Made like the school's IHO Grade 3 maths sample paper: numbers, + − × ÷, length, weight and capacity, money, time and calendar, and word puzzles. Keep rough paper and a pencil ready.</p>
        </div>
        <div class="tests">${cards}</div>
      </section>

      <section class="block">
        <h2>Recent maths attempts</h2>
        ${historyTable(true)}
      </section>

      ${backupBlock()}

      <p class="footnote">Unofficial practice tests in the style of the school's sample paper. Scores are saved only in this browser.</p>
    </main>`;
  }

  function renderHome() {
    const mockCards = TESTS.filter(t => t.kind === "mock").map(testCard).join("");
    const chapterCards = TESTS.filter(t => t.kind === "chapter").map(testCard).join("");
    const history = historyTable(false);

    return topbar() + `<main class="page home">
      ${welcome("Grade III · General Knowledge", `Ready for practice, ${FIRST_NAME}?`)}

      <section class="pattern" aria-label="Exam pattern">
        <div><span class="k">Questions</span><span class="v">40</span><span class="s">Section A 30 · Section B 10</span></div>
        <div><span class="k">Marks</span><span class="v">40</span><span class="s">1 mark per question</span></div>
        <div><span class="k">Time</span><span class="v">40:00</span><span class="s">Submits itself at 00:00</span></div>
        <div><span class="k">Options</span><span class="v">4</span><span class="s">Only one is correct</span></div>
      </section>

      <section class="block">
        <div class="block-head">
          <h2>Mock tests</h2>
          <p>Mock Tests 1–3 follow the notes (Section A: Chapters 1–4 · Section B: Chapter 5). Mock Tests 4–5 follow the school's sample paper, with picture questions, general awareness and reasoning.</p>
        </div>
        <div class="tests tests-five">${mockCards}</div>
      </section>

      <section class="block">
        <div class="block-head">
          <h2>Chapter-wise tests</h2>
          <p>All 40 questions from one chapter. Same timer and rules; Section B has the trickier questions.</p>
        </div>
        <div class="tests tests-five">${chapterCards}</div>
      </section>

      <section class="block">
        <h2>Recent attempts</h2>
        ${history}
      </section>

      ${backupBlock()}

      <p class="footnote">Unofficial practice tests made from the Grade III IHO General Knowledge study notes. Scores are saved only in this browser.</p>
    </main>`;
  }

  // ---------- instructions ----------
  function renderInstructions() {
    const t = getTest(ui.testId);
    const [secA, secB] = t.sections;
    const maths = t.kind === "maths";
    const subject = t.kind === "chapter" ? `Chapter ${t.number}: ${CHAPTERS[t.chapter]}` : `${t.subject} · Grade III`;
    return topbar(navFor(t)) + `<main class="page instructions">
      <div><button class="link" data-action="${backAction(t)}">← All tests</button></div>
      <section class="admit" aria-label="Admit card">
        <div class="admit-head"><span>Admit card</span><span class="test-code">${t.code}</span></div>
        <dl class="admit-grid">
          <div><dt>Candidate</dt><dd>${CANDIDATE}</dd></div>
          <div><dt>Test</dt><dd>${t.title}</dd></div>
          <div><dt>Subject</dt><dd>${subject}</dd></div>
          <div><dt>Duration</dt><dd>${t.minutes} minutes</dd></div>
          <div><dt>Questions</dt><dd>${t.questions.length}${secB ? ` (A: ${sizeOf(secA)}, B: ${sizeOf(secB)})` : ""}</dd></div>
          <div><dt>Maximum marks</dt><dd>${t.questions.length}</dd></div>
        </dl>
      </section>

      <div class="instr-grid">
        <section class="card">
          <h2>General instructions</h2>
          <ol class="rules">
            <li>The test has ${t.questions.length} questions.${secB ? ` <strong>Section A</strong> has ${sizeOf(secA)} questions and <strong>Section B</strong> has ${sizeOf(secB)} questions.` : ""}${t.kind === "chapter" ? ` All of them come from <strong>Chapter ${t.number}: ${CHAPTERS[t.chapter]}</strong>, and Section B has the trickier ones.` : ""}${maths ? " Keep rough paper and a pencil ready to work out the answers." : ""}</li>
            <li>Each question carries <strong>1 mark</strong>. There is no negative marking in this practice test.</li>
            <li>Every question has four options (A, B, C, D). Only one option is correct.</li>
            <li>You have <strong>${t.minutes} minutes</strong>. The timer at the top right shows the time left. When it reaches 00:00, the test is submitted automatically.</li>
            <li>Move between questions with <strong>Previous</strong> and <strong>Save &amp; Next</strong>${secB ? ", the section tabs," : ""} or by clicking a number in the question palette.</li>
            <li>Your answer is saved as soon as you click an option. Click <strong>Clear Response</strong> to remove it.</li>
            <li>Click <strong>Mark for Review &amp; Next</strong> to come back to a question later. Marked questions that have an answer are still counted. <strong>Save &amp; Next</strong> removes the review mark.</li>
            <li>Click <strong>Submit Test</strong> when you finish. You will see your score straight away, with the correct answer and an explanation for every question.</li>
          </ol>
        </section>
        <section class="card">
          <h2>Question palette</h2>
          <p class="muted">The palette shows the status of every question:</p>
          <ul class="legend legend-lg">${legendItems(null)}</ul>
          <h2>Keyboard shortcuts</h2>
          <ul class="keys">
            <li><kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> <kbd>D</kbd> choose an option</li>
            <li><kbd>→</kbd> Save &amp; Next</li>
            <li><kbd>←</kbd> Previous question</li>
          </ul>
        </section>
      </div>

      <label class="agree" for="agree"><input type="checkbox" id="agree"> I have read the instructions. I will not look at my notes or books during the test.</label>
      <div class="actions">
        <button class="btn ghost" data-action="${backAction(t)}">Back</button>
        <button class="btn primary btn-lg" id="beginBtn" data-action="begin" disabled>I am ready to begin</button>
      </div>
    </main>`;
  }

  // ---------- exam ----------
  function renderExam() {
    const t = getTest(store.session.testId);
    app.innerHTML = `<div class="exam">
      <header class="exam-bar">
        <div class="brand"><span class="seal" aria-hidden="true">${t.kind === "maths" ? "MA" : "GK"}</span>
          <div><strong>${t.title}</strong><span>${t.code} · ${t.kind === "chapter" ? CHAPTERS[t.chapter] : t.subject}</span></div></div>
        <div class="timer" id="timer" role="timer"><span class="timer-label">Time left</span><span class="timer-value" id="timerValue">${clock(store.session.endsAt - Date.now())}</span></div>
      </header>
      <nav class="section-bar" aria-label="Sections">
        <div class="section-tabs" id="sectionTabs"></div>
        <button class="btn ghost palette-toggle" id="paletteToggle" data-action="togglePalette" aria-controls="palette" aria-expanded="false">Palette</button>
      </nav>
      <div class="exam-body">
        <main class="question-pane" id="questionPane"></main>
        <div class="palette-scrim" id="paletteScrim" data-action="togglePalette" hidden></div>
        <aside class="palette" id="palette" aria-label="Question palette"></aside>
      </div>
      <footer class="exam-actions">
        <div class="group">
          <button class="btn review" data-action="markNext">Mark for Review &amp; Next</button>
          <button class="btn ghost" data-action="clear">Clear Response</button>
        </div>
        <div class="group">
          <button class="btn ghost" id="prevBtn" data-action="prev">← Previous</button>
          <button class="btn primary" id="nextBtn" data-action="next">Save &amp; Next →</button>
        </div>
      </footer>
    </div>`;
    paintExam();
    startTicker();
  }

  function paintExam() {
    paintTabs();
    paintQuestion();
    paintPalette();
  }

  function paintTabs() {
    const s = store.session;
    const t = getTest(s.testId);
    const current = t.questions[s.current].section;
    document.getElementById("sectionTabs").innerHTML = t.sections.map((sec, k) => {
      let done = 0;
      for (let i = sec.start; i <= sec.end; i++) if (s.answers[i] != null) done++;
      return `<button class="tab${k === current ? " is-active" : ""}" data-action="section" data-section="${k}"${k === current ? ' aria-current="true"' : ""}>
        ${sec.name}<span class="tab-count">${done}/${sizeOf(sec)}</span></button>`;
    }).join("");
  }

  function paintQuestion() {
    const s = store.session;
    const t = getTest(s.testId);
    const i = s.current;
    const q = t.questions[i];
    const sec = t.sections[q.section];
    const chosen = s.answers[i];
    const pane = document.getElementById("questionPane");
    pane.innerHTML = `<div class="q-wrap">
      <div class="q-head">
        <h2 class="q-num">Question ${q.n}</h2>
        <span class="q-sec">${sec.name} · ${i - sec.start + 1} of ${sizeOf(sec)}</span>
        <span class="q-marks">+1 mark</span>
      </div>
      <p class="q-text" id="qText">${esc(q.text)}</p>
      ${figure(q)}
      <fieldset class="options${picGrid(q)}" aria-labelledby="qText">
        ${q.options.map((o, k) => `<label class="option${chosen === k ? " is-selected" : ""}">
          <input type="radio" name="opt" value="${k}"${chosen === k ? " checked" : ""}>
          <span class="opt-letter">${LETTERS[k]}</span><span class="opt-text">${optHTML(o, "opt-pic")}</span>
        </label>`).join("")}
      </fieldset>
      ${s.marked[i] ? `<p class="q-flag">Marked for review</p>` : ""}
    </div>`;
    pane.scrollTop = 0;
    document.getElementById("prevBtn").disabled = i === 0;
    document.getElementById("nextBtn").textContent = i === t.questions.length - 1 ? "Save & Submit" : "Save & Next →";
  }

  function paintPalette() {
    const s = store.session;
    const t = getTest(s.testId);
    const counts = countStatus(0, t.questions.length - 1);
    const name = CANDIDATE;
    document.getElementById("palette").innerHTML = `
      <div class="palette-cand">
        ${avatar()}
        <div><strong>${esc(name)}</strong><span>${t.code}</span></div>
        <button class="icon-btn palette-close" data-action="togglePalette" aria-label="Close question palette">×</button>
      </div>
      <ul class="legend">${legendItems(counts)}</ul>
      ${t.sections.map(sec => `<section class="pgroup">
        <h3>${sec.name}</h3>
        <div class="pgrid">${range(sec.start, sec.end).map(i => {
      const st = statusOf(i);
      const cur = i === s.current;
      return `<button class="pq st-${st}${cur ? " is-current" : ""}" data-action="goto" data-q="${i}" aria-label="Question ${i + 1}: ${STATUS_LABEL[st]}"${cur ? ' aria-current="true"' : ""}>${i + 1}</button>`;
    }).join("")}</div>
      </section>`).join("")}
      <button class="btn submit" data-action="openSubmit">Submit Test</button>`;
    const toggle = document.getElementById("paletteToggle");
    if (toggle) toggle.textContent = `Palette · ${counts.answered + counts["answered-marked"]}/${t.questions.length}`;
  }

  function setPalette(open) {
    ui.paletteOpen = open;
    const exam = document.querySelector(".exam");
    if (!exam) return;
    exam.classList.toggle("palette-open", open);
    document.getElementById("paletteScrim").hidden = !open;
    document.getElementById("paletteToggle").setAttribute("aria-expanded", String(open));
  }

  function goTo(i) {
    const s = store.session;
    const t = getTest(s.testId);
    if (i < 0 || i >= t.questions.length) return;
    s.current = i;
    s.visited[i] = true;
    persistSession();
    setPalette(false);
    paintExam();
  }

  function choose(k) {
    const s = store.session;
    s.answers[s.current] = k;
    persistSession();
    document.querySelectorAll("#questionPane .option").forEach((el, idx) => {
      el.classList.toggle("is-selected", idx === k);
      el.querySelector("input").checked = idx === k;
    });
    paintTabs();
    paintPalette();
  }

  function clearResponse() {
    delete store.session.answers[store.session.current];
    persistSession();
    paintExam();
  }

  function saveNext() {
    const s = store.session;
    const t = getTest(s.testId);
    delete s.marked[s.current]; // as in real CBT exams, Save & Next confirms the answer and drops the review mark
    persistSession();
    if (s.current === t.questions.length - 1) {
      paintExam();
      openSubmit();
    } else {
      goTo(s.current + 1);
    }
  }

  function markNext() {
    const s = store.session;
    const t = getTest(s.testId);
    s.marked[s.current] = true;
    persistSession();
    if (s.current === t.questions.length - 1) {
      paintExam();
      toast("Marked for review. Use the palette to go back, or submit when you are ready.");
    } else {
      goTo(s.current + 1);
    }
  }

  function openSubmit() {
    const s = store.session;
    const t = getTest(s.testId);
    const rows = t.sections.map(sec => {
      const c = countStatus(sec.start, sec.end);
      return `<tr><th scope="row">${sec.name}</th><td>${sizeOf(sec)}</td><td>${c.answered + c["answered-marked"]}</td>
        <td>${c["not-answered"]}</td><td>${c.marked + c["answered-marked"]}</td><td>${c["not-visited"]}</td></tr>`;
    }).join("");
    const unanswered = t.questions.filter((_, i) => s.answers[i] == null).length;
    showModal({
      title: "Submit your test?",
      body: `<p>You still have <strong>${clock(s.endsAt - Date.now())}</strong> left${unanswered ? ` and <strong>${unanswered}</strong> question${unanswered > 1 ? "s" : ""} without an answer` : ""}. After you submit, you cannot change your answers.</p>
        <div class="table-wrap"><table class="data summary">
          <thead><tr><th>Section</th><th>Questions</th><th>Answered</th><th>Not answered</th><th>Marked for review</th><th>Not visited</th></tr></thead>
          <tbody>${rows}</tbody></table></div>`,
      actions: [
        { label: "Back to test", action: "closeModal", kind: "ghost" },
        { label: "Yes, submit", action: "submit", kind: "primary" }
      ]
    });
  }

  // ---------- result ----------
  function remarkFor(score, total, name) {
    const p = score / total;
    const who = name ? `, ${esc(name)}` : "";
    if (p >= 0.9) return `Outstanding${who}! You are exam-ready.`;
    if (p >= 0.75) return `Great work${who}! Revise the few you missed.`;
    if (p >= 0.5) return `Good effort${who}. Read the solutions, then try again.`;
    return `Keep practising${who}. Go through every solution carefully, then retake the test.`;
  }

  function renderResult() {
    const at = findAttempt(ui.attemptId);
    if (!at) { ui.view = "home"; return renderHome(); }
    const t = testOf(at);
    const r = grade(t, at.answers);
    const pct = Math.round((r.score / r.total) * 100);
    const attempted = r.correct + r.wrong;
    const accuracy = attempted ? Math.round((r.correct / attempted) * 100) : 0;
    const C = 2 * Math.PI * 52;
    const band = pct >= 75 ? "high" : pct >= 50 ? "mid" : "low";

    // Rank chapters (topics, in a chapter test) from weakest to strongest.
    const per = t.kind === "mock" ? "chapter" : "topic";
    const LEVEL = { weak: "Needs work", mid: "Getting there", strong: "Strong" };
    const rows = Object.keys(t.groups).filter(k => r.groups[k]).map(k => {
      const g = r.groups[k];
      const p = Math.round((g.correct / g.total) * 100);
      return { key: k, label: t.groups[k], ...g, p, level: p >= 80 ? "strong" : p >= 50 ? "mid" : "weak" };
    }).sort((a, b) => a.p - b.p || b.total - a.total);
    const focus = rows.filter(x => x.level !== "strong").slice(0, 2);
    let headline;
    if (focus.length) headline = `Work on <strong>${focus[0].label}</strong> first${focus[1] ? `, then <strong>${focus[1].label}</strong>` : ""}.`;
    else if (rows.every(x => x.p === 100)) headline = `Full marks in every ${per}. Brilliant!`;
    else headline = `You are strong in every ${per}. Keep revising to stay sharp.`;

    const reviewRow = x => {
      const practice = t.kind === "mock" && x.level !== "strong"
        ? TESTS.find(c => c.kind === "chapter" && c.chapter === x.key) : null;
      const misses = x.misses.map(i => {
        const q = t.questions[i];
        const mine = at.answers[i];
        return `<li><span class="miss-q">Q${q.n}. ${esc(q.text)}</span>
          <span class="miss-a">${mine == null ? "Not attempted" : `Your answer: ${esc(optText(q.options[mine]))}`} · <strong>Correct: ${esc(optText(q.options[q.answer]))}</strong></span></li>`;
      }).join("");
      return `<li class="review-row">
        <div class="review-main">
          <div class="review-title"><span class="review-name">${x.label}</span><span class="level-chip lv-${x.level}">${LEVEL[x.level]}</span></div>
          <div class="bar"><span class="lv-${x.level}" style="width:${x.p}%"></span></div>
          <p class="review-stats">${x.correct} of ${x.total} correct · ${x.wrong} wrong · ${x.skipped} not attempted</p>
        </div>
        <div class="review-side">
          <span class="review-pct">${x.p}%</span>
          ${practice ? `<button class="btn ghost btn-sm" data-action="instructions" data-test="${practice.id}">Practise Chapter ${practice.number} test</button>` : ""}
          ${x.level === "strong" || t.kind === "maths" ? "" : t.kind === "chapter"
            ? `<button class="btn ghost btn-sm" data-action="study" data-chapter="${t.chapter}" data-topic="${x.key}">Study this topic</button>`
            : `<button class="btn ghost btn-sm" data-action="study" data-chapter="${x.key}">Study Chapter ${CHAPTER_KEYS.indexOf(x.key) + 1}</button>`}
        </div>
        ${x.misses.length ? `<details class="review-misses"><summary>Show the ${x.misses.length} question${x.misses.length > 1 ? "s" : ""} to revise</summary><ul>${misses}</ul></details>` : ""}
      </li>`;
    };

    return topbar(navFor(t)) + `<main class="page result">
      <section class="scorecard">
        <svg class="ring band-${band}" viewBox="0 0 120 120" role="img" aria-label="Score ${r.score} out of ${r.total}">
          <circle cx="60" cy="60" r="52" fill="none" class="ring-track"></circle>
          <circle cx="60" cy="60" r="52" fill="none" class="ring-fill" stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${(C * (1 - pct / 100)).toFixed(2)}" transform="rotate(-90 60 60)"></circle>
          <text x="60" y="62" text-anchor="middle" class="ring-num">${pct}%</text>
          <text x="60" y="80" text-anchor="middle" class="ring-sub">SCORE</text>
        </svg>
        <div class="score-info">
          <p class="eyebrow">${fullTitle(t)} · Result</p>
          <p class="score-big">${r.score}<span>/${r.total}</span></p>
          <p class="remark">${remarkFor(r.score, r.total, FIRST_NAME)}</p>
          ${focus.length ? `<p class="focus-line">Weakest ${per}: <strong>${focus[0].label}</strong> (${focus[0].p}%). See the ${per} review below.</p>` : ""}
          <p class="meta">Submitted ${when(at.submittedAt)} · Accuracy ${accuracy}% of attempted questions</p>
          ${at.auto ? `<span class="auto-note">Submitted automatically when time ran out</span>` : ""}
        </div>
      </section>

      <section class="tiles" aria-label="Summary">
        <div class="tile tile-ok"><span class="k">Correct</span><span class="v">${r.correct}</span></div>
        <div class="tile tile-bad"><span class="k">Wrong</span><span class="v">${r.wrong}</span></div>
        <div class="tile tile-idle"><span class="k">Not attempted</span><span class="v">${r.skipped}</span></div>
        <div class="tile"><span class="k">Time taken</span><span class="v v-sm">${spent(at.timeTaken)}</span></div>
      </section>

      <div class="actions actions-start">
        <button class="btn primary btn-lg" data-action="solutions">View solutions</button>
        <button class="btn ghost btn-lg" data-action="instructions" data-test="${t.id}">Retake test</button>
        <button class="btn ghost btn-lg" data-action="${backAction(t)}">All tests</button>
      </div>

      <div class="breakdown">
        <section class="card review">
          <div class="block-head">
            <h2>${per === "topic" ? "Topic" : "Chapter"} review</h2>
            <p>From weakest to strongest</p>
          </div>
          <p class="review-headline">${headline}</p>
          <ol class="review-list">${rows.map(reviewRow).join("")}</ol>
        </section>
        <section class="card">
          <h2>Section-wise score</h2>
          <div class="table-wrap flat"><table class="data">
            <thead><tr><th>Section</th><th>Correct</th><th>Wrong</th><th>Skipped</th><th>Score</th></tr></thead>
            <tbody>${r.sections.map(s => `<tr><th scope="row">${s.name}</th><td class="num">${s.correct}</td><td class="num">${s.wrong}</td><td class="num">${s.skipped}</td><td class="num"><strong>${s.correct}</strong>/${s.total}</td></tr>`).join("")}
              <tr class="total"><th scope="row">Total</th><td class="num">${r.correct}</td><td class="num">${r.wrong}</td><td class="num">${r.skipped}</td><td class="num"><strong>${r.score}</strong>/${r.total}</td></tr>
            </tbody></table></div>
        </section>
      </div>
    </main>`;
  }

  // ---------- solutions ----------
  function answerState(t, at, i) {
    if (at.answers[i] == null) return "skipped";
    return at.answers[i] === t.questions[i].answer ? "correct" : "wrong";
  }

  function solutionCard(t, at, i) {
    const q = t.questions[i];
    const mine = at.answers[i];
    const st = answerState(t, at, i);
    const badge = { correct: ["ok", "Correct · +1"], wrong: ["bad", "Wrong · 0"], skipped: ["idle", "Not attempted · 0"] }[st];
    const opts = q.options.map((o, k) => {
      const isAnswer = k === q.answer;
      const isMine = k === mine;
      let cls = "";
      let tag = "";
      if (isAnswer && isMine) { cls = "is-correct"; tag = "✓ Your answer"; }
      else if (isAnswer) { cls = "is-correct"; tag = "✓ Correct answer"; }
      else if (isMine) { cls = "is-wrong"; tag = "✗ Your answer"; }
      return `<li class="${cls}"><span class="opt-letter">${LETTERS[k]}</span><span class="opt-text">${optHTML(o, "sol-pic")}</span>${tag ? `<span class="opt-tag">${tag}</span>` : ""}</li>`;
    }).join("");
    return `<li class="sol-card" id="sol-${i}">
      <div class="sol-top">
        <span class="sol-num">Q${q.n}</span>
        <span class="badge badge-${badge[0]}">${badge[1]}</span>
        <span class="sol-ch">${t.sections[q.section].name} · ${t.groups[q.group]}</span>
      </div>
      <p class="q-text">${esc(q.text)}</p>
      ${figure(q)}
      <ul class="sol-options${picGrid(q)}">${opts}</ul>
      <div class="explain"><strong>Explanation</strong><p>${esc(q.explanation)}</p></div>
    </li>`;
  }

  function renderSolutions() {
    const at = findAttempt(ui.attemptId);
    if (!at) { ui.view = "home"; return renderHome(); }
    const t = testOf(at);
    const r = grade(t, at.answers);
    const filters = [["all", "All", r.total], ["wrong", "Wrong", r.wrong], ["skipped", "Not attempted", r.skipped], ["correct", "Correct", r.correct]];
    const shown = t.questions.map((_, i) => i).filter(i => ui.filter === "all" || answerState(t, at, i) === ui.filter);

    return topbar(navFor(t)) + `<main class="page solutions">
      <div class="sol-head">
        <div>
          <p class="eyebrow">${fullTitle(t)} · Solutions</p>
          <h1>You scored ${r.score} out of ${r.total}</h1>
        </div>
        <button class="btn ghost" data-action="result" data-attempt="${at.id}">← Back to result</button>
      </div>

      <section class="card sol-tools">
        <div class="filters" role="group" aria-label="Show questions">
          ${filters.map(([key, label, n]) => `<button class="filter" data-action="filter" data-filter="${key}" aria-pressed="${ui.filter === key}">${label}<span class="n">${n}</span></button>`).join("")}
        </div>
        <div class="jump" aria-label="Jump to a question">
          ${t.questions.map((_, i) => `<button class="jq st-${answerState(t, at, i)}" data-action="jump" data-q="${i}" aria-label="Question ${i + 1}: ${answerState(t, at, i) === "skipped" ? "not attempted" : answerState(t, at, i)}">${i + 1}</button>`).join("")}
        </div>
        <p class="jump-key"><span><span class="dot st-correct"></span>Correct</span><span><span class="dot st-wrong"></span>Wrong</span><span><span class="dot st-skipped"></span>Not attempted</span></p>
      </section>

      ${shown.length
        ? `<ol class="sol-list">${shown.map(i => solutionCard(t, at, i)).join("")}</ol>`
        : `<p class="empty">No questions in this group${ui.filter === "wrong" ? " – you got none wrong!" : "."}</p>`}

      <div class="actions actions-start">
        <button class="btn primary" data-action="instructions" data-test="${t.id}">Retake test</button>
        <button class="btn ghost" data-action="${backAction(t)}">All tests</button>
      </div>
    </main>`;
  }

  // ---------- study ----------
  // Every question on the site for one chapter, grouped by topic: the chapter test first, then the mock tests.
  function studyQuestions(chapter) {
    const byTopic = {};
    TESTS.forEach((t, ti) => {
      const raw = window.IHO_DATA.tests[ti];
      const items = raw.sectionA.concat(raw.sectionB);
      t.questions.forEach((q, i) => {
        if ((items[i].c || raw.chapter) !== chapter) return;
        (byTopic[items[i].t] || (byTopic[items[i].t] = [])).push({ q, source: `${t.title} · Q${q.n}`, fromChapterTest: t.kind === "chapter" });
      });
    });
    Object.values(byTopic).forEach(list => list.sort((a, b) => b.fromChapterTest - a.fromChapterTest));
    return byTopic;
  }

  const sectionId = s => "study-" + (s.topic || "intro");

  function qaItem({ q, source }) {
    return `<li class="qa">
      <div class="qa-top"><p class="qa-q">${esc(q.text)}</p><span class="qa-src">${source}</span></div>
      ${figure(q, "q-fig qa-fig")}
      <ul class="qa-opts">${q.options.map((o, k) => `<li${k === q.answer ? ' class="is-answer"' : ""}><b>${LETTERS[k]}</b>${optHTML(o, "qa-pic")}</li>`).join("")}</ul>
      <p class="qa-a"><strong>Answer: ${LETTERS[q.answer]}. ${esc(optText(q.options[q.answer]))}</strong> – ${esc(q.explanation)}</p>
      <button class="btn ghost btn-sm qa-reveal" data-action="reveal">Show answer</button>
    </li>`;
  }

  function studySection(s, list) {
    return `<section class="study-section" id="${sectionId(s)}">
      <h2>${s.title}</h2>
      <div class="notes">${s.html}</div>
      ${list.length ? `<div class="qa-block">
        <h3>Questions &amp; answers <span class="qa-count">${list.length}</span></h3>
        <ol class="qa-list">${list.map(qaItem).join("")}</ol>
      </div>` : ""}
    </section>`;
  }

  function renderStudy() {
    const key = CHAPTERS[ui.studyChapter] ? ui.studyChapter : CHAPTER_KEYS[0];
    const n = CHAPTER_KEYS.indexOf(key) + 1;
    const notes = STUDY[key] || { intro: "", sections: [] };
    const qa = studyQuestions(key);
    const total = Object.values(qa).reduce((sum, list) => sum + list.length, 0);
    const test = TESTS.find(t => t.kind === "chapter" && t.chapter === key);
    return topbar("study") + `<main class="page study${ui.studyQuiz ? " quiz" : ""}">
      <div class="study-layout">
        <nav class="study-nav" aria-label="Chapters">
          ${CHAPTER_KEYS.map((k, i) => `<button class="study-link${k === key ? " is-active" : ""}" data-action="study" data-chapter="${k}"${k === key ? ' aria-current="page"' : ""}>
            <span class="chapter-no">Chapter ${i + 1}</span>${CHAPTERS[k]}</button>`).join("")}
        </nav>
        <div class="study-main">
          <header class="study-head">
            <div>
              <p class="eyebrow">Study · Chapter ${n}</p>
              <h1>${CHAPTERS[key]}</h1>
              <p class="lead">${notes.intro}</p>
            </div>
            ${test ? `<button class="btn primary" data-action="instructions" data-test="${test.id}">Take Chapter ${n} test</button>` : ""}
          </header>
          <section class="card study-tools" aria-label="In this chapter">
            <div class="topic-chips">${notes.sections.map(s => `<button class="topic-chip" data-action="studyJump" data-target="${sectionId(s)}">${s.title}</button>`).join("")}</div>
            <div class="quiz-toggle" role="group" aria-label="Answers">
              <span>Answers</span>
              <button class="filter" data-action="studyQuiz" data-quiz="0" aria-pressed="${!ui.studyQuiz}">Show</button>
              <button class="filter" data-action="studyQuiz" data-quiz="1" aria-pressed="${ui.studyQuiz}">Hide – quiz me</button>
            </div>
            <p class="muted">Full notes for every topic, then all ${total} questions from the Chapter ${n} test and the mock tests, with answers.</p>
          </section>
          ${notes.sections.map(s => studySection(s, qa[s.topic] || [])).join("")}
        </div>
      </div>
    </main>`;
  }

  // ---------- modal and toast ----------
  function showModal({ title, body, actions }) {
    closeModal();
    const wrap = document.createElement("div");
    wrap.className = "modal-backdrop";
    wrap.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <h2 id="modalTitle">${title}</h2>
      <div class="modal-body">${body}</div>
      <div class="modal-actions">${actions.map(a => `<button class="btn ${a.kind}" data-action="${a.action}">${a.label}</button>`).join("")}</div>
    </div>`;
    document.body.appendChild(wrap);
    const first = wrap.querySelector("button");
    if (first) first.focus();
  }
  function closeModal() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.remove());
  }

  function toast(message) {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-on");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("is-on"), 4500);
  }

  // ---------- rendering ----------
  function render() {
    closeModal();
    if (ui.view === "exam" && !store.session) ui.view = "home";
    document.body.classList.toggle("in-exam", ui.view === "exam");
    if (ui.view === "exam") {
      renderExam();
      return;
    }
    stopTicker();
    if (ui.view === "instructions") app.innerHTML = renderInstructions();
    else if (ui.view === "result") app.innerHTML = renderResult();
    else if (ui.view === "solutions") app.innerHTML = renderSolutions();
    else if (ui.view === "study") app.innerHTML = renderStudy();
    else if (ui.view === "maths") app.innerHTML = renderMaths();
    else app.innerHTML = renderHome();
    window.scrollTo(0, 0);
  }

  // ---------- events ----------
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-action]");
    if (!el || el.disabled) return;
    const s = store.session;
    switch (el.dataset.action) {
      case "home":
        ui.view = "home"; render(); break;
      case "maths":
        ui.view = "maths"; render(); break;
      case "instructions":
        if (s) { ui.view = "exam"; render(); break; } // only one running test at a time
        ui.testId = Number(el.dataset.test); ui.view = "instructions"; render(); break;
      case "begin":
        startTest(ui.testId); break;
      case "resume":
        ui.view = "exam"; render(); break;
      case "goto":
        goTo(Number(el.dataset.q)); break;
      case "section":
        goTo(getTest(s.testId).sections[Number(el.dataset.section)].start); break;
      case "next":
        saveNext(); break;
      case "prev":
        goTo(s.current - 1); break;
      case "markNext":
        markNext(); break;
      case "clear":
        clearResponse(); break;
      case "togglePalette":
        setPalette(!ui.paletteOpen); break;
      case "openSubmit":
        setPalette(false); openSubmit(); break;
      case "submit":
        submitTest(false); break;
      case "closeModal":
        closeModal(); break;
      case "result":
        ui.attemptId = Number(el.dataset.attempt); ui.view = "result"; render(); break;
      case "solutions":
        ui.filter = "all"; ui.view = "solutions"; render(); break;
      case "filter":
        ui.filter = el.dataset.filter; render(); break;
      case "study": {
        ui.view = "study";
        if (el.dataset.chapter) ui.studyChapter = el.dataset.chapter;
        render();
        const target = el.dataset.topic && document.getElementById("study-" + el.dataset.topic);
        if (target) target.scrollIntoView({ block: "start" });
        break;
      }
      case "studyJump": {
        const target = document.getElementById(el.dataset.target);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
      case "studyQuiz": {
        ui.studyQuiz = el.dataset.quiz === "1";
        const page = document.querySelector(".study");
        page.classList.toggle("quiz", ui.studyQuiz);
        page.querySelectorAll(".qa.revealed").forEach(item => item.classList.remove("revealed"));
        page.querySelectorAll("[data-action=studyQuiz]").forEach(b => b.setAttribute("aria-pressed", String((b.dataset.quiz === "1") === ui.studyQuiz)));
        break;
      }
      case "reveal":
        el.closest(".qa").classList.add("revealed"); break;
      case "saveResults":
        saveResults(); break;
      case "copyResults":
        copyResults(); break;
      case "loadResults":
        openLoad(); break;
      case "pickResults": {
        const input = document.getElementById("resultsFile");
        if (input) input.click();
        break;
      }
      case "pasteResults": {
        const box = document.getElementById("resultsIn");
        if (box && box.value.trim()) importResults(box.value);
        else if (box) box.focus();
        break;
      }
      case "jump": {
        const i = Number(el.dataset.q);
        if (!document.getElementById("sol-" + i)) { ui.filter = "all"; render(); }
        const card = document.getElementById("sol-" + i);
        if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
    }
  });

  document.addEventListener("change", e => {
    if (e.target.name === "opt" && store.session) choose(Number(e.target.value));
    if (e.target.id === "agree") document.getElementById("beginBtn").disabled = !e.target.checked;
    if (e.target.id === "resultsFile" && e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => importResults(reader.result);
      reader.onerror = () => toast("That file could not be opened.");
      reader.readAsText(e.target.files[0]);
    }
  });

  document.addEventListener("keydown", e => {
    if (document.querySelector(".modal-backdrop")) {
      if (e.key === "Escape") closeModal();
      return;
    }
    if (ui.view !== "exam" || !store.session || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Escape" && ui.paletteOpen) { setPalette(false); return; }
    if (e.target.type === "radio" && e.key.startsWith("Arrow")) return; // let arrow keys move inside the option group
    const idx = ["a", "b", "c", "d"].indexOf(e.key.toLowerCase());
    if (idx >= 0) { e.preventDefault(); choose(idx); }
    else if (e.key === "ArrowRight") { e.preventDefault(); saveNext(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(store.session.current - 1); }
  });

  window.addEventListener("beforeunload", e => {
    if (ui.view === "exam" && store.session) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // ---------- boot ----------
  if (store.session && !getTest(store.session.testId)) store.session = null;
  if (store.session) {
    ui.testId = store.session.testId;
    if (Date.now() >= store.session.endsAt) {
      submitTest(true); // time ran out while the page was closed
    } else {
      ui.view = "exam";
      render();
      toast("Welcome back! Your test has resumed. The timer kept running.");
    }
  } else {
    render();
  }
})();
