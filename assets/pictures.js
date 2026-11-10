// Pictures used in questions (drawn as SVG so they work offline and inside the shared page).
// A question shows one with `img: "key"`; an option shows one when its text is "pic:key".
// `alt` is the plain-text name, used for screen readers and in "Your answer" lines.

(() => {
  const svg = (viewBox, inner) => `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
  const border = (w, h) => `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="#9aa4b6" stroke-width="1"/>`;

  function star(cx, cy, r, fill, points = 5, inner = 0.4) {
    const pts = [];
    for (let i = 0; i < points * 2; i++) {
      const rr = i % 2 ? r * inner : r;
      const a = (-90 + i * (180 / points)) * Math.PI / 180;
      pts.push((cx + rr * Math.cos(a)).toFixed(1) + "," + (cy + rr * Math.sin(a)).toFixed(1));
    }
    return `<polygon points="${pts.join(" ")}" fill="${fill}"/>`;
  }

  // ---------- flags ----------
  const chakraSpokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15) * Math.PI / 180;
    return `<line x1="75" y1="50" x2="${(75 + 11 * Math.cos(a)).toFixed(1)}" y2="${(50 + 11 * Math.sin(a)).toFixed(1)}" stroke="#000080" stroke-width="0.8"/>`;
  }).join("");
  const india = svg("0 0 150 100",
    `<rect width="150" height="33.4" fill="#FF9933"/><rect y="33.3" width="150" height="33.4" fill="#FFFFFF"/><rect y="66.6" width="150" height="33.4" fill="#138808"/>
     <circle cx="75" cy="50" r="11" fill="none" stroke="#000080" stroke-width="1.6"/>${chakraSpokes}<circle cx="75" cy="50" r="2" fill="#000080"/>${border(150, 100)}`);

  const france = svg("0 0 150 100",
    `<rect width="50" height="100" fill="#0055A4"/><rect x="50" width="50" height="100" fill="#FFFFFF"/><rect x="100" width="50" height="100" fill="#EF4135"/>${border(150, 100)}`);

  const japan = svg("0 0 150 100", `<rect width="150" height="100" fill="#FFFFFF"/><circle cx="75" cy="50" r="28" fill="#BC002D"/>${border(150, 100)}`);

  const china = svg("0 0 150 100",
    `<rect width="150" height="100" fill="#DE2910"/>${star(25, 25, 15, "#FFDE00")}${star(50, 10, 5, "#FFDE00")}${star(60, 20, 5, "#FFDE00")}${star(60, 35, 5, "#FFDE00")}${star(50, 45, 5, "#FFDE00")}`);

  const brazilDots = [[68, 55], [75, 60], [82, 56], [72, 66], [80, 66], [76, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#FFFFFF"/>`).join("");
  const brazil = svg("0 0 150 100",
    `<rect width="150" height="100" fill="#009C3B"/><polygon points="75,9 141,50 75,91 9,50" fill="#FFDF00"/>
     <circle cx="75" cy="50" r="22" fill="#002776"/><path d="M54 45 Q75 37 96 52" stroke="#FFFFFF" stroke-width="3" fill="none"/>${brazilDots}`);

  let usaStripes = "";
  for (let i = 0; i < 13; i++) usaStripes += `<rect y="${(i * 100 / 13).toFixed(2)}" width="150" height="${(100 / 13 + 0.1).toFixed(2)}" fill="${i % 2 ? "#FFFFFF" : "#B22234"}"/>`;
  let usaStars = "";
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) usaStars += `<circle cx="${6 + c * 9.6}" cy="${6 + r * 10.3}" r="1.7" fill="#FFFFFF"/>`;
  const usa = svg("0 0 150 100", `${usaStripes}<rect width="60" height="53.85" fill="#3C3B6E"/>${usaStars}${border(150, 100)}`);

  const nepal = svg("0 0 100 125",
    `<path d="M6 6 L92 58 L40 58 L92 118 L6 118 Z" fill="#DC143C" stroke="#003893" stroke-width="5" stroke-linejoin="miter"/>
     <circle cx="27" cy="42" r="9" fill="#FFFFFF"/><circle cx="27" cy="37" r="9" fill="#DC143C"/>
     ${star(27, 93, 10, "#FFFFFF", 12, 0.6)}`);

  // ---------- fruits ----------
  const appleInner = `<path d="M50 30 C35 18 12 26 14 52 C16 78 34 92 50 84 C66 92 84 78 86 52 C88 26 65 18 50 30 Z" fill="#E53935"/>
    <path d="M50 30 C50 22 52 16 56 12" stroke="#6D4C41" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M54 20 C62 8 76 10 78 14 C70 22 60 24 54 20 Z" fill="#43A047"/>
    <ellipse cx="33" cy="47" rx="6" ry="10" fill="#FFFFFF" opacity="0.35"/>`;
  const bananaInner = `<path d="M16 28 C18 62 48 86 86 72 C88 70 88 65 84 65 C52 70 34 52 28 26 Z" fill="#FDD835" stroke="#C9A400" stroke-width="2"/>
    <path d="M14 30 L17 20 L28 27 Z" fill="#6D4C41"/><circle cx="86" cy="68" r="3" fill="#6D4C41"/>`;
  const grapeDots = [[34, 34], [50, 34], [66, 34], [42, 48], [58, 48], [34, 62], [50, 62], [66, 62], [42, 76], [58, 76], [50, 89]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8.5" fill="#7B1FA2" stroke="#4A148C" stroke-width="1"/>`).join("");
  const grapesInner = `<path d="M50 26 L52 10" stroke="#6D4C41" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M52 16 C60 6 74 8 76 12 C68 20 58 22 52 16 Z" fill="#43A047"/>${grapeDots}`;
  const orangeInner = `<circle cx="50" cy="55" r="32" fill="#FB8C00"/><circle cx="40" cy="45" r="1.6" fill="#E65100"/><circle cx="60" cy="62" r="1.6" fill="#E65100"/><circle cx="48" cy="70" r="1.6" fill="#E65100"/>
    <path d="M50 24 L50 16" stroke="#6D4C41" stroke-width="3" stroke-linecap="round"/>
    <path d="M51 20 C58 10 72 12 74 16 C66 24 57 25 51 20 Z" fill="#43A047"/>`;
  const fruit = inner => svg("0 0 100 100", `<rect width="100" height="100" fill="#FFFFFF"/>${inner}`);
  const label = (x, text) => `<text x="${x}" y="128" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#1B2333">${text}</text>`;
  const fruitsThree = svg("0 0 330 136",
    `<rect width="330" height="136" fill="#FFFFFF"/>
     <g transform="translate(5,4)">${appleInner}</g><g transform="translate(115,4)">${bananaInner}</g><g transform="translate(225,4)">${grapesInner}</g>
     ${label(55, "Apple")}${label(165, "Banana")}${label(275, "Grapes")}`);

  // ---------- sports ----------
  const shuttlecock = svg("0 0 100 120",
    `<rect width="100" height="120" fill="#FFFFFF"/>
     <polygon points="18,8 82,8 62,78 38,78" fill="#FAFAFA" stroke="#9E9E9E" stroke-width="1.5"/>
     <path d="M30 8 L43 78 M41 8 L47 78 M50 8 L50 78 M59 8 L53 78 M70 8 L57 78" stroke="#BDBDBD" stroke-width="1.2" fill="none"/>
     <rect x="37" y="71" width="26" height="8" fill="#1E88E5"/>
     <path d="M36 79 L64 79 C64 102 36 102 36 79 Z" fill="#FFF3E0" stroke="#BCAAA4" stroke-width="1.5"/>`);

  const cricketKit = svg("0 0 150 120",
    `<rect width="150" height="120" fill="#FFFFFF"/>
     <g transform="rotate(-28 66 62)">
       <rect x="62" y="4" width="10" height="30" rx="3" fill="#455A64"/>
       <path d="M62 10 H72 M62 16 H72 M62 22 H72 M62 28 H72" stroke="#263238" stroke-width="1"/>
       <rect x="55" y="32" width="24" height="80" rx="7" fill="#E0C48A" stroke="#A1887F" stroke-width="1.5"/>
       <line x1="67" y1="40" x2="67" y2="104" stroke="#C8A86B" stroke-width="2"/>
     </g>
     <circle cx="118" cy="96" r="13" fill="#C62828"/>
     <path d="M108 88 Q118 96 128 104 M106 92 Q116 100 124 108" stroke="#FFCDD2" stroke-width="1.2" fill="none"/>`);

  // ---------- wonders ----------
  const minaret = (x, top) => `<rect x="${x}" y="${top}" width="6" height="${108 - top}" fill="#FAFAFA" stroke="#9E9E9E" stroke-width="1"/>
    <path d="M${x - 1} ${top} C${x - 1} ${top - 6} ${x + 3} ${top - 9} ${x + 3} ${top - 11} C${x + 3} ${top - 9} ${x + 7} ${top - 6} ${x + 7} ${top} Z" fill="#FAFAFA" stroke="#9E9E9E" stroke-width="1"/>`;
  const smallDome = cx => `<path d="M${cx - 8} 70 C${cx - 8} 62 ${cx - 2} 58 ${cx} 54 C${cx + 2} 58 ${cx + 8} 62 ${cx + 8} 70 Z" fill="#FAFAFA" stroke="#9E9E9E" stroke-width="1"/>`;
  const tajMahal = svg("0 0 200 140",
    `<rect width="200" height="140" fill="#E3F2FD"/><rect y="120" width="200" height="20" fill="#A5D6A7"/><rect x="88" y="120" width="24" height="20" fill="#90CAF9"/>
     ${minaret(46, 60)}${minaret(148, 60)}
     <rect x="58" y="70" width="84" height="38" fill="#FAFAFA" stroke="#9E9E9E" stroke-width="1"/>
     <path d="M90 108 L90 86 Q100 72 110 86 L110 108 Z" fill="#CFD8DC" stroke="#9E9E9E" stroke-width="1"/>
     <path d="M66 100 L66 88 Q72 80 78 88 L78 100 Z M122 100 L122 88 Q128 80 134 88 L134 100 Z" fill="#CFD8DC" stroke="#9E9E9E" stroke-width="1"/>
     ${smallDome(68)}${smallDome(132)}
     <rect x="80" y="62" width="40" height="8" fill="#FAFAFA" stroke="#9E9E9E" stroke-width="1"/>
     <path d="M74 62 C74 44 86 34 100 26 C114 34 126 44 126 62 Z" fill="#FAFAFA" stroke="#9E9E9E" stroke-width="1.2"/>
     <line x1="100" y1="26" x2="100" y2="14" stroke="#9E9E9E" stroke-width="1.5"/><circle cx="100" cy="13" r="2" fill="#BDBDBD"/>
     ${minaret(24, 50)}${minaret(170, 50)}
     <rect x="16" y="108" width="168" height="12" fill="#EEEEEE" stroke="#9E9E9E" stroke-width="1"/>`);

  let tiers = "";
  [[170, 110], [142, 96], [114, 82], [86, 68], [60, 54]].forEach(([w, y]) => {
    tiers += `<rect x="${100 - w / 2}" y="${y}" width="${w}" height="14" fill="#C8B28A" stroke="#8D7B5A" stroke-width="1"/>`;
  });
  const elCastillo = svg("0 0 200 140",
    `<rect width="200" height="140" fill="#E3F2FD"/><rect y="124" width="200" height="16" fill="#A5D6A7"/>${tiers}
     <rect x="89" y="44" width="22" height="80" fill="#A1886A"/>
     <path d="M89 54 H111 M89 64 H111 M89 74 H111 M89 84 H111 M89 94 H111 M89 104 H111 M89 114 H111" stroke="#8D7B5A" stroke-width="1"/>
     <rect x="80" y="28" width="40" height="20" fill="#BFA57A" stroke="#8D7B5A" stroke-width="1"/>
     <rect x="94" y="34" width="12" height="14" fill="#5D4037"/>`);

  // ---------- space ----------
  const spaceDots = [[14, 14], [140, 20], [30, 92], [150, 96], [122, 10], [60, 12], [96, 100], [8, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#FFFFFF"/>`).join("");
  const saturn = svg("0 0 160 110",
    `<rect width="160" height="110" rx="8" fill="#0D1B3D"/>${spaceDots}
     <path d="M18 58 A62 17 0 0 1 142 58" stroke="#CDB98F" stroke-width="7" fill="none"/>
     <circle cx="80" cy="55" r="30" fill="#E0B872"/>
     <path d="M52 46 Q80 42 108 46 M51 60 Q80 56 109 60" stroke="#C99A4E" stroke-width="3" fill="none"/>
     <path d="M18 58 A62 17 0 0 0 142 58" stroke="#EADBB0" stroke-width="7" fill="none"/>`);

  // ---------- shapes ----------
  const shapeIcon = {
    circle: (x, y, s) => `<circle cx="${x + s / 2}" cy="${y + s / 2}" r="${s / 2 - 4}" fill="#1E88E5"/>`,
    square: (x, y, s) => `<rect x="${x + 5}" y="${y + 5}" width="${s - 10}" height="${s - 10}" fill="#FB8C00"/>`,
    triangle: (x, y, s) => `<polygon points="${x + s / 2},${y + 4} ${x + s - 4},${y + s - 5} ${x + 4},${y + s - 5}" fill="#43A047"/>`,
    star: (x, y, s) => star(x + s / 2, y + s / 2 + 2, s / 2 - 3, "#8E24AA")
  };
  const shapeOption = name => svg("0 0 60 60", `<rect width="60" height="60" fill="#FFFFFF"/>${shapeIcon[name](0, 0, 60)}`);
  const sequence = ["circle", "square", "triangle", "circle", "square"];
  const shapePattern = svg("0 0 384 72",
    `<rect width="384" height="72" fill="#FFFFFF"/>
     ${sequence.map((name, i) => shapeIcon[name](6 + i * 63, 8, 56)).join("")}
     <rect x="${6 + 5 * 63 + 3}" y="11" width="50" height="50" rx="6" fill="#FFFFFF" stroke="#5A6477" stroke-width="2" stroke-dasharray="5 4"/>
     <text x="${6 + 5 * 63 + 28}" y="45" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" fill="#1B2333">?</text>`);

  // ---------- number puzzles ----------
  // A ring of five coloured boxes; the red box (top-left) is the missing number.
  function wheel(numbers) {
    const colors = ["#C62828", "#EF6C00", "#558B2F", "#00838F", "#6A1B9A"];
    const labels = ["?"].concat(numbers);
    const pt = (r, deg) => {
      const a = deg * Math.PI / 180;
      return [(100 + r * Math.cos(a)).toFixed(1), (100 + r * Math.sin(a)).toFixed(1)];
    };
    let out = `<rect width="200" height="200" fill="#FFFFFF"/>`;
    for (let i = 0; i < 5; i++) {
      const start = -162 + i * 72 + 2, end = start + 68, mid = (start + end) / 2;
      const [x1, y1] = pt(88, start), [x2, y2] = pt(88, end), [x3, y3] = pt(38, end), [x4, y4] = pt(38, start), [tx, ty] = pt(63, mid);
      out += `<path d="M${x1} ${y1} A88 88 0 0 1 ${x2} ${y2} L${x3} ${y3} A38 38 0 0 0 ${x4} ${y4} Z" fill="${colors[i]}"/>`;
      out += `<text x="${tx}" y="${(+ty + 8).toFixed(1)}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">${labels[i]}</text>`;
    }
    return svg("0 0 200 200", out);
  }

  // Three circles, each split into three parts. In each circle: left number = right number + bottom number.
  function circles(sets) {
    let out = `<rect width="390" height="130" fill="#FFFFFF"/>`;
    sets.forEach(([left, right, bottom], i) => {
      const cx = 65 + i * 130, cy = 65, r = 56, d = (r * 0.707).toFixed(1);
      const t = (x, y, v) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="21" font-weight="700" fill="#1B2333">${v}</text>`;
      out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFFFFF" stroke="#1B2333" stroke-width="2"/>
        <path d="M${cx} ${cy - r} L${cx} ${cy} L${(cx - d).toFixed(1)} ${(cy + +d).toFixed(1)} M${cx} ${cy} L${(cx + +d).toFixed(1)} ${(cy + +d).toFixed(1)}" stroke="#1B2333" stroke-width="2" fill="none"/>
        ${t(cx - 24, cy - 6, left)}${t(cx + 24, cy - 6, right)}${t(cx, cy + 40, bottom)}`;
    });
    return svg("0 0 390 130", out);
  }

  // An analogue clock face showing h:m.
  function clock(h, m) {
    let out = `<rect width="200" height="200" fill="#FFFFFF"/><circle cx="100" cy="100" r="90" fill="#FFFFFF" stroke="#1B2333" stroke-width="5"/>`;
    for (let i = 0; i < 60; i++) {
      const a = (i * 6 - 90) * Math.PI / 180, inner = i % 5 ? 82 : 76;
      out += `<line x1="${(100 + inner * Math.cos(a)).toFixed(1)}" y1="${(100 + inner * Math.sin(a)).toFixed(1)}" x2="${(100 + 86 * Math.cos(a)).toFixed(1)}" y2="${(100 + 86 * Math.sin(a)).toFixed(1)}" stroke="#1B2333" stroke-width="${i % 5 ? 1 : 2.5}"/>`;
    }
    for (let n = 1; n <= 12; n++) {
      const a = (n * 30 - 90) * Math.PI / 180;
      out += `<text x="${(100 + 63 * Math.cos(a)).toFixed(1)}" y="${(100 + 63 * Math.sin(a) + 7).toFixed(1)}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="700" fill="#1B2333">${n}</text>`;
    }
    const hand = (deg, len, width, color) => {
      const a = (deg - 90) * Math.PI / 180;
      return `<line x1="100" y1="100" x2="${(100 + len * Math.cos(a)).toFixed(1)}" y2="${(100 + len * Math.sin(a)).toFixed(1)}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
    };
    out += hand(((h % 12) + m / 60) * 30, 44, 7, "#1B2333") + hand(m * 6, 70, 4, "#C62828") + `<circle cx="100" cy="100" r="6" fill="#1B2333"/>`;
    return svg("0 0 200 200", out);
  }

  window.IHO_PICS = {
    "clock-m1": { alt: "An analogue clock", svg: clock(3, 45) },
    "clock-m2": { alt: "An analogue clock", svg: clock(7, 20) },
    "clock-m3": { alt: "An analogue clock", svg: clock(10, 50) },
    "flag-india": { alt: "Flag of India", svg: india },
    "flag-france": { alt: "Flag of France", svg: france },
    "flag-japan": { alt: "Flag of Japan", svg: japan },
    "flag-china": { alt: "Flag of China", svg: china },
    "flag-brazil": { alt: "Flag of Brazil", svg: brazil },
    "flag-usa": { alt: "Flag of the USA", svg: usa },
    "flag-nepal": { alt: "Flag of Nepal", svg: nepal },
    "fruit-apple": { alt: "Apple", svg: fruit(appleInner) },
    "fruit-banana": { alt: "Banana", svg: fruit(bananaInner) },
    "fruit-grapes": { alt: "Grapes", svg: fruit(grapesInner) },
    "fruit-orange": { alt: "Orange", svg: fruit(orangeInner) },
    "fruits-three": { alt: "An apple, a banana and a bunch of grapes", svg: fruitsThree },
    "shuttlecock": { alt: "A shuttlecock", svg: shuttlecock },
    "cricket-kit": { alt: "A bat and a red ball", svg: cricketKit },
    "taj-mahal": { alt: "A white marble monument with a big dome and four tall towers", svg: tajMahal },
    "el-castillo": { alt: "A stepped stone pyramid with a staircase and a small temple on top", svg: elCastillo },
    "saturn": { alt: "A planet with wide rings around it", svg: saturn },
    "shape-pattern": { alt: "Circle, square, triangle, circle, square, then a question mark", svg: shapePattern },
    "shape-triangle": { alt: "Triangle", svg: shapeOption("triangle") },
    "shape-circle": { alt: "Circle", svg: shapeOption("circle") },
    "shape-square": { alt: "Square", svg: shapeOption("square") },
    "shape-star": { alt: "Star", svg: shapeOption("star") },
    "wheel-m4": { alt: "A ring of boxes with the numbers 15, 20, 25, 30 and a missing number in the red box", svg: wheel([15, 20, 25, 30]) },
    "wheel-m5": { alt: "A ring of boxes with the numbers 8, 16, 24, 32 and a missing number in the red box", svg: wheel([8, 16, 24, 32]) },
    "circles-m4": { alt: "Three circles: 12, 5, 7 – 15, 9, 6 – ?, 8, 6", svg: circles([[12, 5, 7], [15, 9, 6], ["?", 8, 6]]) },
    "circles-m5": { alt: "Three circles: 20, 12, 8 – 30, 18, 12 – ?, 25, 15", svg: circles([[20, 12, 8], [30, 18, 12], ["?", 25, 15]]) }
  };
})();
