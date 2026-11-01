// Study notes for every chapter of "G3 IHO GENERAL KNOWLEDGE CONTENT.pdf", written up as tables and points.
// Names use the spellings in the notes; the real spelling is given in brackets where the notes differ.
// Each section's `topic` matches the chapter test topics, so the study page can list that topic's questions under it.

window.IHO_STUDY = {
  // ------------------------------------------------------------------ CHAPTER 1
  india: {
    intro: "India is a large and colourful country in Asia, known all over the world as “Incredible India”. This chapter covers the states and their capitals, amazing places and facts, famous Indians and our neighbouring countries.",
    sections: [
      { topic: null, title: "Introduction: Incredible India", html: `
        <ul>
          <li>India is in the continent of <b>Asia</b>. It is large and diverse – full of bright colours, tasty food like curry and sweet mangoes, and festivals like <b>Diwali, the festival of lights</b>.</li>
          <li>Famous animals: the <b>Bengal tiger</b> and the gentle <b>Asian elephant</b>.</li>
          <li>India has everything from the snowy <b>Himalayan mountains</b> to sunny beaches, and many languages are spoken here.</li>
          <li>India is like a giant puzzle of <b>28 states</b> and <b>8 Union Territories</b>.</li>
          <li><b>Why capitals?</b> Every state has a main city called its <b>capital</b> – its control centre. The capital of the whole country is <b>New Delhi</b>, where our important leaders live and make decisions for the nation.</li>
          <li><b>Big Cat Kingdom:</b> India is the only country in the world where wild <b>lions and tigers</b> both live in its forests.</li>
          <li>India is the <b>largest democracy</b> in the world. Its rich culture comes from the many traditions of its states.</li>
        </ul>` },

      { topic: "cap", title: "States & capitals", html: `
        <p>All 28 states, their capitals and the special fact to remember about each one.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>State</th><th>Capital</th><th>Remember</th></tr></thead>
          <tbody>
            <tr><td>Andhra Pradesh</td><td><b>Amaravati</b></td><td>New modern capital on the banks of the Krishna River; named after an ancient city that was a centre of Buddhism.</td></tr>
            <tr><td>Arunachal Pradesh</td><td><b>Itanagar</b></td><td>Hills and forests. The state is the <b>“Land of the Rising Sun”</b> – the first Indian state to get sunlight.</td></tr>
            <tr><td>Assam</td><td><b>Dispur</b></td><td>Dispur is inside the city of <b>Guwahati</b>, one of the biggest cities of Northeast India. Assam grows some of the finest <b>tea</b> in the world.</td></tr>
            <tr><td>Bihar</td><td><b>Patna</b></td><td>One of the oldest cities in the world that people have always lived in. Once called <b>Pataliputra</b>, capital of the <b>Mauryan Empire</b>.</td></tr>
            <tr><td>Chhattisgarh</td><td><b>Raipur</b></td><td>Rich in minerals. The state is the <b>“Rice Bowl of India”</b>.</td></tr>
            <tr><td>Goa</td><td><b>Panaji</b></td><td>Colourful buildings and riverside views. Goa is India's <b>smallest state</b> by area and a popular tourist place.</td></tr>
            <tr><td>Gujarat</td><td><b>Gandhinagar</b></td><td>Named after <b>Mahatma Gandhi</b>, the Father of the Nation. A well-planned city.</td></tr>
            <tr><td>Haryana</td><td><b>Chandigarh</b></td><td>India's <b>first planned city</b> after independence. Capital of both Haryana and Punjab.</td></tr>
            <tr><td>Himachal Pradesh</td><td><b>Shimla</b></td><td>A beautiful hill station; the <b>summer capital of British India</b>.</td></tr>
            <tr><td>Jharkhand</td><td><b>Ranchi</b></td><td><b>“City of Waterfalls”</b>.</td></tr>
            <tr><td>Karnataka</td><td><b>Bengaluru</b></td><td><b>“Silicon Valley of India”</b> – a big centre for technology.</td></tr>
            <tr><td>Kerala</td><td><b>Thiruvananthapuram</b></td><td>The name means <b>“City of Lord Ananta”</b>. Kerala is <b>“God's Own Country”</b>.</td></tr>
            <tr><td>Madhya Pradesh</td><td><b>Bhopal</b></td><td><b>“City of Lakes”</b>. The state is the <b>“Heart of India”</b> because it is in the centre.</td></tr>
            <tr><td>Maharashtra</td><td><b>Mumbai</b></td><td><b>Financial capital</b> of India and home of <b>Bollywood</b>, India's biggest film industry.</td></tr>
            <tr><td>Manipur</td><td><b>Imphal</b></td><td>Surrounded by green hills. Manipur has <b>Loka Lake</b> <span class="spell">(real name: Loktak Lake)</span>, the largest freshwater lake in Northeast India.</td></tr>
            <tr><td>Meghalaya</td><td><b>Shillong</b></td><td><b>“Scotland of the East”</b>. Meghalaya means <b>“Abode of Clouds”</b>.</td></tr>
            <tr><td>Mizoram</td><td><b>Aizawl</b></td><td>Built on steep hills. Mizoram has one of the <b>highest literacy rates</b> in India.</td></tr>
            <tr><td>Nagaland</td><td><b>Kohima</b></td><td>Famous for the <b>Hornbill Festival</b>. Nagaland is the <b>“Land of Festivals”</b>.</td></tr>
            <tr><td>Odisha</td><td><b>Bhubaneswar</b></td><td><b>“Temple City of India”</b> – many ancient temples.</td></tr>
            <tr><td>Punjab</td><td><b>Chandigarh</b></td><td>Shared capital with Haryana. Punjab is the <b>“Granary of India”</b> (grows lots of wheat).</td></tr>
            <tr><td>Rajasthan</td><td><b>Jaipur</b></td><td><b>“Pink City”</b>. Rajasthan is the <b>largest state</b> by area.</td></tr>
            <tr><td>Sikkim</td><td><b>Gangtok</b></td><td>Views of <b>Mount Kanchenjunga</b>. Sikkim is the <b>second-smallest</b> state.</td></tr>
            <tr><td>Tamil Nadu</td><td><b>Chennai</b></td><td><b>Marina Beach</b>, one of the longest city beaches in the world.</td></tr>
            <tr><td>Telangana</td><td><b>Hyderabad</b></td><td>The <b>Charminar</b> and biryani; the <b>“City of Pearls”</b>.</td></tr>
            <tr><td>Tripura</td><td><b>Agartala</b></td><td>Palaces and gardens. Tripura is one of the <b>smallest states</b>.</td></tr>
            <tr><td>Uttar Pradesh</td><td><b>Lucknow</b></td><td>Culture, food and <b>Chinkara embroidery</b> <span class="spell">(real name: Chikankari)</span>. UP has the <b>most people</b> of any state.</td></tr>
            <tr><td>Uttarakhand</td><td><b>Dehradun</b></td><td>Pleasant weather and scenery. The state is the <b>“Land of the Gods” (Dev Bhoomi)</b>.</td></tr>
            <tr><td>West Bengal</td><td><b>Kolkata</b></td><td><b>“City of Joy”</b>; capital of British India <b>until 1911</b>.</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><strong>Memory tips</strong>Chandigarh is the <b>only</b> capital shared by two states (Punjab and Haryana). Thiruvananthapuram has one of the longest capital names in India.</div>` },

      { topic: "fact", title: "State facts & wonders", html: `
        <h3>State trivia</h3>
        <ul>
          <li>Rajasthan is so big that several countries in the world are smaller than it.</li>
          <li><b>Sikkim</b> became part of India in <b>1975</b>.</li>
          <li><b>Goa</b> was a <b>Portuguese</b> colony until <b>1961</b>.</li>
          <li>Arunachal Pradesh is the “Land of the Rising Sun”.</li>
          <li>Different states have different <b>languages, foods, clothes, festivals and traditions</b> – India is unique and diverse: <b>unity in diversity</b>.</li>
          <li>Languages spoken: Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi and Gujarati.</li>
          <li>From the snowy mountains of Himachal Pradesh to the sandy deserts of Rajasthan and the sunny beaches of Goa, every state is special.</li>
        </ul>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Famous dish</th><th>State</th></tr></thead>
          <tbody>
            <tr><td>Dosa and Idli</td><td>Tamil Nadu</td></tr>
            <tr><td>Dhokla</td><td>Gujarat</td></tr>
            <tr><td>Makki di Roti and Sarson da Saag</td><td>Punjab</td></tr>
            <tr><td>Rasgulla</td><td>West Bengal</td></tr>
            <tr><td>Vada Pav</td><td>Maharashtra</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li>Famous places: the <b>Taj Mahal</b>, <b>India Gate</b>, <b>Hawa Mahal</b> and the <b>backwaters of Kerala</b>.</li>
          <li>Festivals: Diwali, Holi, Pongal, Baisakhi, Onam, Durga Puja and Ganesh Chaturthi.</li>
        </ul>

        <h3>Geographical wonders</h3>
        <ul>
          <li><b>Meteor Impact Lake – Loner Lake, Maharashtra</b> <span class="spell">(real name: Lonar Lake)</span>: a salty (saline and alkaline) lake made when a meteorite crashed into the Earth about <b>52,000 years ago</b>. It is one of the few impact craters in basalt rock on Earth, and in <b>2020</b> it turned completely <b>pink</b> because of tiny living organisms.</li>
          <li><b>Floating National Park – Kabul Lamai National Park, Manipur</b> <span class="spell">(real name: Keibul Lamjao)</span>: on Loka Lake; the <b>world's only floating national park</b>. It is made of floating mats of plants, soil and organic matter (called “phasmids” in your notes; real name: phumdis). It is the last natural home of the endangered <b>Sangai</b> (brow-antlered deer).</li>
          <li><b>River Island District – Majuli, Assam</b>: in the <b>Brahmaputra</b> River; the <b>first island in India made into a district</b> and the <b>world's largest river island</b>. It is shrinking because the river washes its land away every year.</li>
        </ul>

        <h3>Cultural and historic firsts</h3>
        <ul>
          <li><b>Sanskrit-speaking villages</b>: <b>Matur</b> (Karnataka) and <b>Jheri</b> (Madhya Pradesh) use Sanskrit for everyday talking.</li>
          <li><b>Cleanest village in Asia – Maligning, Meghalaya</b> <span class="spell">(real name: Mawlynnong)</span>: every house uses <b>bamboo dustbins</b>, smoking in public and plastic are <b>banned</b>, and waste is turned into manure.</li>
          <li><b>Living root bridges, Meghalaya</b>: the <b>Khasi and Jaintia</b> tribes train the roots of <b>rubber trees (Ficus elastica)</b> across rivers for many years to make strong bridges that get stronger with time.</li>
        </ul>

        <h3>Quirky and unique trivia</h3>
        <ul>
          <li><b>Lockless village – Shani Singapura, Maharashtra</b> <span class="spell">(real name: Shani Shingnapur)</span>: homes, shops and even post offices have <b>no doors or locks</b>. People believe <b>Lord Shani</b> protects the village; even the bank has a glass door with no normal lock.</li>
          <li><b>Most bordered state – Uttar Pradesh</b>: touches <b>8 states</b> (Uttarakhand, Himachal Pradesh, Haryana, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, Bihar), <b>1 Union Territory (Delhi)</b> and the country <b>Nepal</b>.</li>
          <li><b>Purple Revolution – Bhaderwah, Jammu & Kashmir</b>: under the government's <b>Aroma Mission</b>, farmers switched to growing <b>lavender</b> on a large scale.</li>
          <li><b>Sikkim</b> became India's <b>first 100% organic state</b> by banning chemical fertilisers and pesticides. It took more than ten years of strict rules.</li>
        </ul>` },

      { topic: "ppl", title: "Famous personalities", html: `
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Person</th><th>Known as / for</th><th>Remember</th></tr></thead>
          <tbody>
            <tr><td><b>Mahatma Gandhi</b></td><td>Father of the Nation; peaceful methods</td><td>Full name <b>Mohandas Karamchand Gandhi</b>. Born <b>2nd October 1869</b> in <b>Porbandar, Gujarat</b>. Inspired the world with peace. Birthday = <b>Gandhi Jayanti</b>.</td></tr>
            <tr><td><b>Dr. A. P. J. Abdul Kalam</b></td><td>“Missile Man of India”</td><td>Scientist who helped build India's missile technology. Became the <b>11th President of India</b>. Loved talking with students.</td></tr>
            <tr><td><b>Rani Lakshmi Bai</b></td><td>Rani of Jhansi</td><td>A leading figure of the <b>Indian Rebellion of 1857</b>. One of India's bravest queens; fought against British rule.</td></tr>
            <tr><td><b>Swami Vivekananda</b></td><td>Spiritual leader and thinker</td><td>Introduced Indian culture and philosophy to the world. <b>National Youth Day</b> is on his birthday, <b>12th January</b>.</td></tr>
            <tr><td><b>Sachin Tendulkar</b></td><td>“God of Cricket”</td><td>Scored <b>100 international centuries</b>. Played for India for over <b>24 years</b>.</td></tr>
            <tr><td><b>P. V. Sindhu</b></td><td>Badminton</td><td>One of India's top badminton players; won medals at the <b>Olympics</b> and <b>World Championships</b>.</td></tr>
            <tr><td><b>Rabindranath Tagore</b></td><td>Poet, writer, philosopher</td><td><b>First Indian to win the Nobel Prize in Literature</b>. Wrote the National Anthem, <b>“Jana Gana Mana”</b>.</td></tr>
            <tr><td><b>Subhas Chandra Bose</b></td><td>“Netaji”</td><td>Strongly believed in India's independence. Gave the slogan <b>“Jai Hind”</b>.</td></tr>
            <tr><td><b>Mother Teresa</b></td><td>Kindness and compassion</td><td>Spent her life helping poor and sick people. Founded the <b>Missionaries of Charity</b>.</td></tr>
            <tr><td><b>Lata Mangeshkar</b></td><td>Playback singer</td><td>India's most loved playback singer; honoured as the <b>“Nightingale of India”</b> and <b>“Swar Kokila”</b>.</td></tr>
          </tbody>
        </table></div>` },

      { topic: "nbr", title: "Neighbouring countries", html: `
        <p>Neighbouring countries share a land or sea border with India. We learn about their culture, festivals, food and traditions, and work together for friendship, trade and peace.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Country</th><th>Direction from India</th><th>Capital</th><th>Famous for</th></tr></thead>
          <tbody>
            <tr><td><b>Pakistan</b></td><td>West</td><td><b>Islamabad</b></td><td>Mountains, rivers, historical places; colourful festivals, music and food.</td></tr>
            <tr><td><b>China</b></td><td>North</td><td><b>Beijing</b></td><td>One of the largest countries in the world; the <b>Great Wall of China</b>, noodles, festivals.</td></tr>
            <tr><td><b>Nepal</b></td><td>North</td><td><b>Kathmandu</b></td><td><b>Mount Everest</b>, the highest mountain in the world; beautiful temples.</td></tr>
            <tr><td><b>Bhutan</b></td><td>In the Himalayas</td><td><b>Thimphu</b></td><td>Green forests, clean environment, happy people; the <b>“Land of the Thunder Dragon”</b>.</td></tr>
            <tr><td><b>Bangladesh</b></td><td>East</td><td><b>Dhaka</b></td><td>Many rivers and green fields; handwoven clothes and warm hospitality.</td></tr>
            <tr><td><b>Myanmar</b></td><td>East</td><td><b>Naypyidaw</b></td><td>Golden pagodas and temples; the <b>“Golden Land”</b>.</td></tr>
            <tr><td><b>Sri Lanka</b></td><td>South (island)</td><td><b>Sri Jayawardenepura Kotte</b> (largest city: Colombo)</td><td>Beaches, tea gardens, elephants; surrounded by the Indian Ocean.</td></tr>
            <tr><td><b>Afghanistan</b></td><td>North-west</td><td><b>Kabul</b></td><td>Mountains and a long history; <b>dry fruits</b> – almonds, pistachios, raisins.</td></tr>
          </tbody>
        </table></div>
        <h3>Why are neighbours important?</h3>
        <ul>
          <li>We learn about each other's culture and traditions.</li>
          <li>They help us build friendship and peace.</li>
          <li>We trade goods and services with each other.</li>
          <li>People visit them for travel, education and business.</li>
        </ul>
        <div class="callout"><strong>Did you know?</strong>India has <b>7 neighbours by land</b>; Sri Lanka is our closest <b>island</b> neighbour, separated by the <b>Palk Strait</b>. China is our <b>largest</b> neighbour. Bangladesh is almost surrounded by India. Bhutan is famous for happiness and a clean environment.</div>` }
    ]
  },

  // ------------------------------------------------------------------ CHAPTER 2
  world: {
    intro: "This chapter takes you around the world: continents and countries, flags, the Seven Wonders of the World and important dates we celebrate every year.",
    sections: [
      { topic: "cont", title: "Continents & countries", html: `
        <ul>
          <li>A <b>continent</b> is a very large piece of land made up of many countries, separated from other continents by oceans.</li>
          <li>A <b>country</b> is a place where people live under one government, with their own laws, <b>flag and capital city</b>.</li>
          <li>Each continent has different countries, cultures, languages, animals and landmarks. Example: India is a country in the continent of Asia.</li>
          <li>The Earth has <b>7 continents</b>: Asia, Africa, Europe, North America, South America, Australia (Oceania) and Antarctica.</li>
          <li>There are about <b>195 countries</b> in the world.</li>
        </ul>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Continent</th><th>Remember</th><th>Example countries</th></tr></thead>
          <tbody>
            <tr><td><b>Asia</b></td><td>The <b>largest</b> continent; home to India</td><td>India, China, Japan, Nepal, Sri Lanka</td></tr>
            <tr><td><b>Africa</b></td><td>Famous for its <b>wildlife</b></td><td>Egypt, Kenya, Nigeria, South Africa</td></tr>
            <tr><td><b>Europe</b></td><td>Known for its rich <b>history</b></td><td>France, Germany, Italy, Spain</td></tr>
            <tr><td><b>North America</b></td><td>–</td><td>United States, Canada, Mexico</td></tr>
            <tr><td><b>South America</b></td><td>–</td><td>Brazil, Argentina, Chile</td></tr>
            <tr><td><b>Australia (Oceania)</b></td><td>Many island countries</td><td>Australia, New Zealand</td></tr>
            <tr><td><b>Antarctica</b></td><td>The <b>coldest</b> continent; no permanent countries or people</td><td>–</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><strong>Remember</strong>India is called the <b>“Land of Diversity”</b> because people speak many languages and celebrate many festivals. Learning about continents helps us understand and appreciate the world.</div>` },

      { topic: "flag", title: "Flags", html: `
        <p>A flag is a special symbol of a country. It shows the country's history, values, culture and people, helps us identify countries and shows national pride and unity.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Country</th><th>What the flag looks like</th></tr></thead>
          <tbody>
            <tr><td><b>India</b></td><td>Three <b>horizontal</b> bands – <b>saffron</b>, <b>white</b> and <b>green</b>. A <b>blue Ashoka Chakra with 24 spokes</b> in the centre of the white band.</td></tr>
            <tr><td><b>USA</b></td><td><b>13</b> red and white stripes and <b>50</b> white stars on a blue background. The stars stand for the <b>50 states</b>.</td></tr>
            <tr><td><b>Australia</b></td><td>The <b>Union Jack</b>, one large white star and <b>five stars</b> showing the <b>Southern Cross</b> constellation.</td></tr>
            <tr><td><b>Brazil</b></td><td><b>Green</b> background, a <b>yellow diamond</b> and a <b>blue globe</b> with stars in the centre. The stars stand for Brazil's states.</td></tr>
            <tr><td><b>France</b></td><td>Three <b>vertical</b> stripes – <b>blue, white and red</b> – for <b>liberty, equality and fraternity</b>.</td></tr>
            <tr><td><b>China</b></td><td><b>Red</b> background with <b>five yellow stars</b> in the top-left corner. Red = the revolution; stars = <b>unity</b>.</td></tr>
          </tbody>
        </table></div>
        <h3>Interesting facts</h3>
        <ul>
          <li><b>Nepal</b>'s flag is the <b>only</b> national flag that is <b>not rectangular</b>.</li>
          <li>The <b>Union Jack</b> is one of the most recognised flags in the world.</li>
          <li>The <b>maple leaf</b> on <b>Canada</b>'s flag is a symbol known worldwide.</li>
          <li>Flag colours often stand for values like peace, courage, freedom and unity.</li>
        </ul>
        <h3>Flag etiquette (how to respect a flag)</h3>
        <ul>
          <li>Always handle a flag with respect.</li>
          <li>Do not write or draw on a national flag.</li>
          <li>Keep it clean and never let it touch the ground.</li>
          <li>Stand respectfully when the national flag is hoisted or lowered.</li>
        </ul>` },

      { topic: "won", title: "Seven Wonders of the World", html: `
        <p>Seven amazing places chosen for their beauty, history and brilliant building work. They were built by people of different countries and millions of tourists visit them every year.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Wonder</th><th>Country</th><th>Remember</th></tr></thead>
          <tbody>
            <tr><td><b>Taj Mahal</b></td><td>India</td><td>White marble monument built by Emperor <b>Shah Jahan</b> in memory of his wife <b>Mumtaz Mahal</b>; a symbol of love.</td></tr>
            <tr><td><b>Great Wall of China</b></td><td>China</td><td>The <b>longest wall</b> in the world, thousands of kilometres long; built to protect China from invasions.</td></tr>
            <tr><td><b>Petra</b></td><td>Jordan</td><td>Ancient city carved into pink rock – the <b>“Rose City”</b>.</td></tr>
            <tr><td><b>Christ the Redeemer</b></td><td>Brazil</td><td>Giant statue of Jesus Christ on a mountain above <b>Rio de Janeiro</b>; about <b>30 metres</b> tall without its base; one of the most recognised landmarks in the world.</td></tr>
            <tr><td><b>Colosseum</b></td><td>Italy</td><td>Huge ancient <b>amphitheatre</b> built by the <b>Romans</b> for games, shows and public events.</td></tr>
            <tr><td><b>Machu Picchu</b></td><td>Peru</td><td>Ancient <b>Incan</b> city high in the <b>Andes Mountains</b>; beautiful stone buildings.</td></tr>
            <tr><td><b>Chichen Itza</b></td><td>Mexico</td><td>Famous <b>Mayan</b> site with a large pyramid called <b>El Castillo</b>.</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><strong>Quick facts</strong>The New Seven Wonders were chosen by a <b>worldwide vote in 2007</b>. The Taj Mahal is the <b>only</b> wonder in India. The Great Wall is one of the longest man-made structures on Earth.</div>` },

      { topic: "date", title: "Important dates", html: `
        <p>Important days help us remember national events, achievements, great leaders and causes like health, peace and nature. Knowing them helps us become aware, responsible and informed global citizens. Here they are in calendar order.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Date</th><th>Day</th><th>Why we celebrate it</th></tr></thead>
          <tbody>
            <tr><td><b>1st January</b></td><td>New Year's Day</td><td>Start of a new calendar year – fireworks, parties, music, family time.</td></tr>
            <tr><td><b>26th January</b></td><td>Republic Day (India)</td><td>The <b>Constitution of India</b> came into effect in <b>1950</b>. Grand parade in New Delhi showing military strength, culture and science.</td></tr>
            <tr><td><b>3rd March</b></td><td>World Wildlife Day</td><td>Protecting animals and plants, e.g. tigers, pandas, rhinos and sea turtles.</td></tr>
            <tr><td><b>8th March</b></td><td>International Women's Day</td><td>Celebrates women's achievements; promotes equality and respect.</td></tr>
            <tr><td><b>22nd March</b></td><td>World Water Day</td><td>Saving water – needed for drinking, farming, industries and life.</td></tr>
            <tr><td><b>7th April</b></td><td>World Health Day</td><td>Awareness about health, diseases and hygiene.</td></tr>
            <tr><td><b>22nd April</b></td><td>Earth Day</td><td>Protecting forests, rivers, wildlife and natural resources; eco-friendly activities.</td></tr>
            <tr><td><b>1st May</b></td><td>Labour Day (International Workers' Day)</td><td>Honours workers; reminds us of workers' rights and fair working conditions.</td></tr>
            <tr><td><b>5th June</b></td><td>World Environment Day</td><td>Protecting nature and reducing pollution – planting trees, cleaning public places.</td></tr>
            <tr><td><b>21st June</b></td><td>International Yoga Day</td><td>Yoga improves flexibility, concentration, health and peace of mind.</td></tr>
            <tr><td><b>15th August</b></td><td>Independence Day (India)</td><td>India became free from British rule in <b>1947</b>. The Prime Minister hoists the flag at the <b>Red Fort</b>, New Delhi. Patriotic songs, parades and cultural programmes take place across the country.</td></tr>
            <tr><td><b>5th September</b></td><td>Teachers' Day</td><td>Honours <b>Sarvepalli Radhakrishnan</b>, a great teacher and philosopher.</td></tr>
            <tr><td><b>8th September</b></td><td>World Literacy Day</td><td>Promotes education and reading skills.</td></tr>
            <tr><td><b>27th September</b></td><td>World Tourism Day</td><td>Encourages tourism, cultural understanding and friendship between countries.</td></tr>
            <tr><td><b>2nd October</b></td><td>Gandhi Jayanti</td><td>Remembers Mahatma Gandhi (non-violence and truth). The UN observes it as the <b>International Day of Non-Violence</b>.</td></tr>
            <tr><td><b>24th October</b></td><td>United Nations Day</td><td>The UN was formed in <b>1945</b> after World War II to keep peace and cooperation.</td></tr>
            <tr><td><b>14th November</b></td><td>Children's Day (India)</td><td>Honours <b>Jawaharlal Nehru</b> (“Chacha Nehru”); games and shows in schools.</td></tr>
            <tr><td><b>25th December</b></td><td>Christmas</td><td>Birth of Jesus Christ – Christmas trees, gifts, church services.</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><strong>Don't mix up</strong>Earth Day (22nd April) and World Water Day (22nd March) · Teachers' Day (5th Sept) and World Literacy Day (8th Sept) · World Environment Day (5th June) and Yoga Day (21st June).</div>` }
    ]
  },

  // ------------------------------------------------------------------ CHAPTER 3
  sports: {
    intro: "Sports are activities and games that involve physical movement, skill and competition. This chapter covers popular games and their rules, national sports of different countries, famous sportspersons and sports awards.",
    sections: [
      { topic: "game", title: "Games & rules", html: `
        <h3>Why are sports important?</h3>
        <ul>
          <li>Keep our body strong and healthy; improve fitness and stamina.</li>
          <li>Teach teamwork and cooperation, help us make friends.</li>
          <li>Build confidence and discipline, and teach us to follow rules.</li>
        </ul>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Outdoor sports</th><th>Indoor sports</th></tr></thead>
          <tbody><tr>
            <td>Cricket, Football (Soccer), Hockey, Baseball, Athletics (running, jumping, throwing)</td>
            <td>Chess, Table Tennis, Badminton, Carrom, Gymnastics</td>
          </tr></tbody>
        </table></div>
        <h3>Popular sports and their basics</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Sport</th><th>How it is played</th><th>Important terms / equipment</th></tr></thead>
          <tbody>
            <tr><td><b>Cricket</b></td><td>Very popular in India. Two teams of <b>11 players</b>. The team with more <b>runs</b> wins.</td><td>Bat, ball, wicket, run, boundary</td></tr>
            <tr><td><b>Football</b></td><td>The <b>most popular sport in the world</b>. Two teams of <b>11 players</b> kick the ball into the other team's goal. More <b>goals</b> wins.</td><td>Goal, goalkeeper, pass, referee</td></tr>
            <tr><td><b>Hockey</b></td><td>The national game of some countries and very popular. Two teams use hockey sticks to move a ball and score goals.</td><td>Hockey stick, ball</td></tr>
            <tr><td><b>Basketball</b></td><td>Two teams throw a large ball into the basket. Points when it goes through the <b>hoop</b>.</td><td>Basketball, hoop</td></tr>
            <tr><td><b>Tennis</b></td><td>Players hit a ball over a net. <b>Singles</b> = 2 players, <b>doubles</b> = 4 players.</td><td>Racket, tennis ball</td></tr>
            <tr><td><b>Badminton</b></td><td>A popular <b>indoor</b> sport; hit the shuttlecock over a net. Singles or doubles.</td><td>Racket, <b>shuttlecock</b></td></tr>
            <tr><td><b>Athletics</b></td><td>Events: running races, long jump, high jump, relay race, shot put. Athletes train for speed and strength.</td><td>–</td></tr>
          </tbody>
        </table></div>
        <h3>Sportsmanship</h3>
        <ul>
          <li>Being honest and respecting opponents.</li>
          <li>Following rules and helping teammates.</li>
          <li>Accepting victory and defeat politely. Good sportsmanship is as important as winning!</li>
        </ul>
        <h3>Benefits of playing sports</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Physical</th><th>Mental</th><th>Social</th></tr></thead>
          <tbody><tr>
            <td>Strong muscles and bones, better fitness, more energy</td>
            <td>Better concentration, less stress, more confidence</td>
            <td>Teamwork, new friends, better communication</td>
          </tr></tbody>
        </table></div>
        <div class="callout"><strong>Sports facts</strong>Football is the world's most popular sport · Cricket is very popular in India · The <b>Olympic Games</b> bring athletes from many countries together and are the world's largest sporting event · <b>Chess</b> is a strategy game · <b>Swimming</b> is both a sport and a life skill.</div>` },

      { topic: "nat", title: "National sports", html: `
        <p>A national sport is officially chosen by a country, or is widely seen as an important part of its culture and history.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Country</th><th>National sport</th><th>Remember</th></tr></thead>
          <tbody>
            <tr><td><b>India</b></td><td>No official national sport (traditionally <b>Hockey</b>)</td><td>Hockey is linked with India because of its history and many Olympic medals.</td></tr>
            <tr><td><b>Canada</b></td><td><b>Ice Hockey</b></td><td>Official <b>winter</b> national sport; played on ice with skates, sticks and a <b>puck</b>.</td></tr>
            <tr><td><b>Pakistan</b></td><td><b>Field Hockey</b></td><td>Played on a field with sticks and a ball; Pakistan has won several championships.</td></tr>
            <tr><td><b>Bangladesh</b></td><td><b>Kabaddi</b></td><td>Team game of strength, speed and strategy – touch opponents and get back safely. Kabaddi started in <b>South Asia</b>.</td></tr>
            <tr><td><b>Sri Lanka</b></td><td><b>Volleyball</b></td><td>Two teams hit a ball over a net to make it land on the other side.</td></tr>
            <tr><td><b>Japan</b></td><td><b>Sumo Wrestling</b></td><td>Push the opponent out of a <b>circular ring</b>; one of Japan's oldest traditions with special ceremonies.</td></tr>
            <tr><td><b>Brazil</b></td><td><b>Football</b></td><td>Most popular sport in Brazil; Brazil has won many <b>FIFA World Cups</b> (FIFA = International Association Football Federation). Famous players: <b>Pelé</b> and <b>Ronaldo</b>.</td></tr>
            <tr><td><b>Nepal</b></td><td><b>Volleyball</b></td><td>Played indoors or outdoors by people of all ages.</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><strong>Remember</strong>Sports teach teamwork, discipline, fitness and respect. Different countries celebrate different sports as part of their culture.</div>` },

      { topic: "star", title: "Sports personalities", html: `
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Player</th><th>Sport</th><th>Remember</th></tr></thead>
          <tbody>
            <tr><td><b>Sachin Tendulkar</b></td><td>Cricket</td><td>Born <b>24 April 1973</b>, <b>Mumbai</b>. “<b>Master Blaster</b>” and “God of Cricket”. Played for India for 20+ years; <b>100 international centuries</b> (world record); won the <b>2011 World Cup</b>; received the <b>Bharat Ratna</b>.</td></tr>
            <tr><td><b>Virat Kohli</b></td><td>Cricket</td><td>Born <b>5 November 1988</b>, <b>Delhi</b>. One of the world's best batsmen; former captain of India; known for fitness and dedication; helped India win many important matches and inspires young players.</td></tr>
            <tr><td><b>P. V. Sindhu</b></td><td>Badminton</td><td>Born <b>5 July 1995</b>, <b>Hyderabad</b>. <b>Silver</b> at the <b>2016</b> Olympics, <b>bronze</b> at the <b>2020</b> Olympics; World Champion; a role model for girls.</td></tr>
            <tr><td><b>Neeraj Chopra</b></td><td>Athletics</td><td>Born <b>24 December 1997</b>, <b>Haryana</b>. <b>Javelin throw</b>; <b>gold</b> at the <b>2020</b> Olympics – India's <b>first Olympic gold in athletics</b>. Known for determination and hard work; inspires many children to play sports.</td></tr>
            <tr><td><b>Lionel Messi</b></td><td>Football</td><td>Born <b>24 June 1987</b>, <b>Argentina</b>. One of the greatest footballers ever; great dribbling and goal scoring; captained Argentina to win the <b>2022 FIFA World Cup</b>; won many international awards and is loved by fans worldwide.</td></tr>
            <tr><td><b>Cristiano Ronaldo</b></td><td>Football</td><td>One of the most famous footballers in the world, along with Messi.</td></tr>
            <tr><td><b>Usain Bolt</b></td><td>Running (Jamaica)</td><td>The <b>fastest man in the world</b>; won <b>8 Olympic gold medals</b>; nicknamed “<b>Lightning Bolt</b>”. Loved cricket and football as a child.</td></tr>
            <tr><td><b>Michael Jordan</b></td><td>Basketball (USA)</td><td>Nicknamed “<b>Air Jordan</b>” because he seemed to fly when he jumped.</td></tr>
            <tr><td><b>Muhammad Ali</b></td><td>Boxing (USA)</td><td>One of the greatest boxers ever. Born in <b>Louisville</b>, started boxing at <b>12</b>; world heavyweight champion <b>three times</b>; known for speed, skill and powerful punches.</td></tr>
            <tr><td><b>Serena Williams</b></td><td>Tennis (USA)</td><td>Famous tennis champion.</td></tr>
            <tr><td><b>Roger Federer</b></td><td>Tennis (Switzerland)</td><td>Famous tennis champion.</td></tr>
          </tbody>
        </table></div>` },

      { topic: "award", title: "Sports awards", html: `
        <p>Sports awards are given to players, coaches and teams for excellent performance. They encourage athletes and bring pride to the country.</p>
        <h3>Awards in India</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Award</th><th>Given to</th><th>Remember</th></tr></thead>
          <tbody>
            <tr><td><b>Major Dhyan Chand Khel Ratna Award</b></td><td>Sportspersons, for outstanding performance</td><td>India's <b>highest</b> sports award; named after hockey legend <b>Major Dhyan Chand</b>; medal, certificate and prize money; honours excellence at national and international level.</td></tr>
            <tr><td><b>Arjuna Award</b></td><td><b>Athletes</b>, for outstanding achievements</td><td>One of India's most prestigious sports awards; named after <b>Arjuna</b>, the warrior from the <b>Mahabharata</b>; trophy, certificate and prize money; encourages players to do even better.</td></tr>
            <tr><td><b>Dronacharya Award</b></td><td><b>Coaches</b></td><td>Named after <b>Dronacharya</b>, teacher of the <b>Pandavas and Kauravas</b>; honours coaches who train athletes well and shows how important good coaching is.</td></tr>
            <tr><td><b>Dhyan Chand Award</b></td><td><b>Lifetime achievement</b></td><td>For athletes who keep helping sports even after retiring; honours long-term dedication. Also named after Major Dhyan Chand.</td></tr>
            <tr><td><b>Rashtriya Khel Protsahan Puruskar</b></td><td><b>Organisations and institutions</b></td><td>For schools, companies and groups that promote sports; helps more people take part and builds a healthy sporting culture.</td></tr>
          </tbody>
        </table></div>
        <h3>International awards</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Award</th><th>Remember</th></tr></thead>
          <tbody>
            <tr><td><b>Laureus World Sports Awards</b></td><td>One of the most famous sports awards; honours the best athletes from all sports every year, with categories for men, women, teams and breakthrough athletes. Called the “<b>Oscars of Sports</b>”.</td></tr>
            <tr><td><b>Ballon d'Or</b></td><td>One of the highest honours in football; given every year to the world's best <b>football</b> player and recognised by fans worldwide.</td></tr>
            <tr><td><b>Golden Bat Award</b></td><td>Given in big <b>cricket</b> tournaments to the player who scores the <b>most runs</b> – a prize for excellent batting.</td></tr>
          </tbody>
        </table></div>` }
    ]
  },

  // ------------------------------------------------------------------ CHAPTER 4
  science: {
    intro: "This chapter covers our body's organs, plants and animals (flora and fauna), space and the solar system, and famous inventions and discoveries.",
    sections: [
      { topic: "body", title: "Human body", html: `
        <p>Our body is made of many parts called <b>organs</b>. They help us breathe, eat, move and think. There are two types: <b>external</b> organs (we can see them) and <b>internal</b> organs (inside the body).</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>External organ</th><th>What it does</th></tr></thead>
          <tbody>
            <tr><td><b>Eyes</b></td><td>See colours, shapes and objects; read and watch.</td></tr>
            <tr><td><b>Ears</b></td><td>Hear sounds, music and voices; also help us keep our <b>balance</b>.</td></tr>
            <tr><td><b>Nose</b></td><td>Smell things; also helps us <b>breathe</b>.</td></tr>
            <tr><td><b>Tongue</b></td><td>Taste <b>sweet, sour, salty and bitter</b>; helps us speak clearly.</td></tr>
            <tr><td><b>Skin</b></td><td>Covers and <b>protects the whole body</b>; feels hot, cold, rough and smooth.</td></tr>
          </tbody>
        </table></div>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Internal organ</th><th>What it does</th></tr></thead>
          <tbody>
            <tr><td><b>Brain</b></td><td>The <b>control centre</b> of the body – thinking, learning, remembering, deciding and controlling movement.</td></tr>
            <tr><td><b>Heart</b></td><td>A muscular organ that <b>pumps blood</b> to all parts of the body, day and night.</td></tr>
            <tr><td><b>Lungs</b> (we have <b>two</b>)</td><td>Help us breathe – take in <b>oxygen</b>, remove <b>carbon dioxide</b>.</td></tr>
            <tr><td><b>Stomach</b></td><td>Part of the digestive system; <b>breaks down food</b> into a form the body can use.</td></tr>
            <tr><td><b>Small intestine</b></td><td>A long, coiled tube; <b>absorbs nutrients</b> from food and sends them into the blood.</td></tr>
            <tr><td><b>Large intestine</b></td><td>Absorbs <b>water</b> from leftover food; helps form and remove waste.</td></tr>
            <tr><td><b>Liver</b></td><td>The <b>largest internal organ</b>; helps digestion and removes harmful substances.</td></tr>
            <tr><td><b>Kidneys</b> (we have <b>two</b>)</td><td><b>Filter waste</b> from the blood and help make <b>urine</b>.</td></tr>
            <tr><td><b>Bones and muscles</b></td><td>Bones give <b>shape and support</b>; muscles help us <b>move</b>.</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><strong>Remember</strong>Internal organs help us breathe, digest food, pump blood, remove waste, grow and stay healthy. All organs work together to keep us alive and healthy.</div>` },

      { topic: "life", title: "Flora & fauna", html: `
        <ul>
          <li><b>Flora</b> = all the <b>plants</b> of a region (trees, shrubs, flowers, grasses, even tiny algae and fungi).</li>
          <li><b>Fauna</b> = all the <b>animals</b> of a region (mammals, birds, reptiles, fish, insects).</li>
          <li>Together they make up the living things of an area and keep nature in balance.</li>
          <li>They depend on each other: animals need plants for <b>food and shelter</b>; plants need animals for <b>reproduction and enriching the soil</b>.</li>
        </ul>
        <div class="table-wrap"><table class="data">
          <thead><tr><th></th><th>Plants (flora)</th><th>Animals (fauna)</th></tr></thead>
          <tbody>
            <tr><td><b>Food</b></td><td><b>Autotrophic</b> – make their own food by <b>photosynthesis</b> using sunlight</td><td><b>Heterotrophic</b> – cannot make food; depend on plants or other animals</td></tr>
            <tr><td><b>Role in nature</b></td><td>Base of the food web; give <b>oxygen</b>, shelter and energy</td><td>Keep balance through <b>pollination</b>, <b>seed dispersal</b> and <b>pest control</b></td></tr>
          </tbody>
        </table></div>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Type of plant</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td><b>Trees</b></td><td>Mango, Banyan, Neem</td></tr>
            <tr><td><b>Shrubs</b></td><td>Rose, Hibiscus</td></tr>
            <tr><td><b>Herbs</b></td><td>Mint, Coriander</td></tr>
            <tr><td><b>Climbers</b> (climb up with support)</td><td>Grapevine, Money plant</td></tr>
            <tr><td><b>Creepers</b> (spread on the ground)</td><td>Pumpkin, Watermelon</td></tr>
          </tbody>
        </table></div>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Type of animal</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td><b>Mammals</b></td><td>Tiger, Elephant, Cow</td></tr>
            <tr><td><b>Birds</b></td><td>Peacock, Sparrow, Parrot</td></tr>
            <tr><td><b>Reptiles</b></td><td>Snake, Crocodile, Lizard</td></tr>
            <tr><td><b>Amphibians</b></td><td>Frog, Toad</td></tr>
            <tr><td><b>Fish</b></td><td>Goldfish, Shark</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><strong>Did you know?</strong>The <b>banyan tree</b> can live for hundreds of years · The <b>peacock</b> is India's national bird · <b>Tigers</b> are excellent swimmers · <b>Bees</b> help plants reproduce through pollination · India has a great variety of plants and animals.</div>` },

      { topic: "space", title: "Space & solar system", html: `
        <ul>
          <li><b>Space</b> is the huge, dark area beyond Earth's atmosphere. It contains <b>stars, planets, moons, comets, asteroids and galaxies</b>. Scientists study space to learn how the universe works.</li>
          <li>Space has three dimensions (length, width, height). Modern scientists think of space and time together as <b>space-time</b>.</li>
          <li>Space is an almost perfect <b>vacuum</b> – nearly empty, with very low pressure. Bits of gas and dust float around, and crowded areas have planets, stars and galaxies.</li>
          <li><b>There is no sound in space</b> – there is no air (the molecules are too far apart) to carry sound.</li>
        </ul>
        <h3>The eight planets, in order from the Sun</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>No.</th><th>Planet</th><th>Remember</th></tr></thead>
          <tbody>
            <tr><td>1</td><td><b>Mercury</b></td><td>The <b>smallest</b> and <b>closest</b> to the Sun. A day on Mercury is longer than its year!</td></tr>
            <tr><td>2</td><td><b>Venus</b></td><td>The <b>hottest</b> planet.</td></tr>
            <tr><td>3</td><td><b>Earth</b></td><td>The only known planet with <b>life</b>.</td></tr>
            <tr><td>4</td><td><b>Mars</b></td><td>The <b>Red Planet</b>.</td></tr>
            <tr><td>5</td><td><b>Jupiter</b></td><td>The <b>largest</b> planet – more than <b>1,300 Earths</b> could fit inside it.</td></tr>
            <tr><td>6</td><td><b>Saturn</b></td><td>Famous for its beautiful <b>rings</b>.</td></tr>
            <tr><td>7</td><td><b>Uranus</b></td><td>Rotates <b>on its side</b>.</td></tr>
            <tr><td>8</td><td><b>Neptune</b></td><td>The <b>farthest</b> from the Sun.</td></tr>
          </tbody>
        </table></div>
        <div class="table-wrap"><table class="data">
          <thead><tr><th></th><th>Remember</th></tr></thead>
          <tbody>
            <tr><td><b>The Sun</b></td><td>A <b>star</b>; gives us light and heat; at the <b>centre</b> of our Solar System.</td></tr>
            <tr><td><b>The Moon</b></td><td>Earth's <b>natural satellite</b>; has no light of its own – it <b>reflects sunlight</b>; takes about <b>27 days</b> to go around the Earth.</td></tr>
            <tr><td><b>Stars</b></td><td>Huge balls of <b>hot gases</b>. The Sun is the closest star to Earth. Stars seem to <b>twinkle</b> because of Earth's <b>atmosphere</b>.</td></tr>
            <tr><td><b>Galaxies</b></td><td>Huge collections of stars, planets, gas and dust. Ours is the <b>Milky Way</b>, with billions of stars.</td></tr>
          </tbody>
        </table></div>
        <div class="callout"><strong>Interesting space facts</strong>Space is silent – no air to carry sound · More than 1,300 Earths could fit inside Jupiter · Venus is the hottest planet · A day on Mercury is longer than its year · Footprints on the Moon can stay for millions of years.</div>` },

      { topic: "inv", title: "Inventions & discoveries", html: `
        <div class="table-wrap"><table class="data">
          <thead><tr><th></th><th>Discovery</th><th>Invention</th></tr></thead>
          <tbody>
            <tr><td><b>Meaning</b></td><td>Finding something that <b>already exists in nature</b> but was unknown</td><td>Making something <b>completely new and man-made</b> that never existed before</td></tr>
            <tr><td><b>How</b></td><td>Can happen by accident or on purpose; adds to our understanding of the universe</td><td>Always done on purpose with human effort; very original and can often be <b>patented</b></td></tr>
            <tr><td><b>Examples</b></td><td>Gravity, the continent of America, the structure of DNA</td><td>The telephone, the printing press, the aeroplane</td></tr>
          </tbody>
        </table></div>
        <p>Both discoveries and inventions are important for human progress.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Famous discovery</th><th>Discoverer</th></tr></thead>
          <tbody>
            <tr><td>Gravity</td><td><b>Isaac Newton</b></td></tr>
            <tr><td>Penicillin</td><td><b>Alexander Fleming</b></td></tr>
            <tr><td>America</td><td><b>Christopher Columbus</b></td></tr>
            <tr><td>Radioactivity</td><td><b>Marie Curie</b></td></tr>
            <tr><td>Sea route to India</td><td><b>Vasco da Gama</b></td></tr>
          </tbody>
        </table></div>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Famous invention</th><th>Inventor</th></tr></thead>
          <tbody>
            <tr><td>Telephone</td><td><b>Alexander Graham Bell</b></td></tr>
            <tr><td>Electric bulb</td><td><b>Thomas Edison</b></td></tr>
            <tr><td>Aeroplane</td><td><b>Orville Wright and Wilbur Wright</b></td></tr>
            <tr><td>Television</td><td><b>John Logie Baird</b></td></tr>
            <tr><td>Computer</td><td><b>Charles Babbage</b></td></tr>
          </tbody>
        </table></div>
        <h3>How inventions help us</h3>
        <ul>
          <li>Make life easier and more comfortable.</li>
          <li>Improve communication and transport.</li>
          <li>Help doctors treat diseases.</li>
          <li>Support learning and education.</li>
        </ul>
        <div class="callout"><strong>Interesting facts</strong>The first telephone could only send sound over short distances · Aeroplanes fly because of the shape of their wings · Penicillin was the world's first widely used <b>antibiotic</b> · Today's computers are millions of times faster than early ones · Many inventions start with a simple idea and lots of hard work.</div>` }
    ]
  },

  // ------------------------------------------------------------------ CHAPTER 5
  iqea: {
    intro: "This chapter covers what to do in an emergency, healthy habits, mental maths tricks and brain teasers.",
    sections: [
      { topic: "safe", title: "Emergency numbers & safety", html: `
        <p>An <b>emergency</b> is a sudden situation that needs immediate help – for example a fire in a building, a road accident, a medical emergency, theft or danger, or a natural disaster like a flood or earthquake. Stay calm and call the correct emergency service.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Service</th><th>Number</th><th>When to call</th></tr></thead>
          <tbody>
            <tr><td>Police</td><td><b>100</b></td><td>Theft, crime or danger</td></tr>
            <tr><td>Fire Brigade</td><td><b>101</b></td><td>Fire accidents</td></tr>
            <tr><td>Ambulance</td><td><b>102 / 108</b></td><td>Medical emergencies</td></tr>
            <tr><td>National Emergency Number</td><td><b>112</b></td><td>Any emergency</td></tr>
            <tr><td>Women Helpline</td><td><b>1091</b></td><td>Women's safety</td></tr>
            <tr><td>Child Helpline</td><td><b>1098</b></td><td>Children who need help</td></tr>
            <tr><td>Disaster Management</td><td><b>1078</b></td><td>Natural disasters</td></tr>
          </tbody>
        </table></div>
        <p>Different countries have different emergency numbers.</p>
        <h3>Safety rules during an emergency</h3>
        <ol>
          <li>Stay calm.</li>
          <li>Call the correct emergency number.</li>
          <li>Speak clearly and give correct information.</li>
          <li>Tell your name and location.</li>
          <li>Follow the instructions given by emergency workers.</li>
          <li>Never make fake or prank calls.</li>
        </ol>` },

      { topic: "health", title: "Healthy habits", html: `
        <p>Healthy habits are good things we do every day to stay fit, strong, clean and happy. They keep us active, protect us from diseases, build strong bones and muscles, improve concentration and make us feel energetic.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Habit</th><th>What to do</th></tr></thead>
          <tbody>
            <tr><td><b>Eat healthy food</b></td><td>Eat more fresh fruits, green vegetables, milk and dairy, whole grains, nuts and pulses. Avoid too much junk food, sugary drinks, chocolates and candies.</td></tr>
            <tr><td><b>Drink plenty of water</b></td><td><b>6–8 glasses</b> of clean water a day. Keeps the body hydrated, helps digestion and keeps skin healthy.</td></tr>
            <tr><td><b>Exercise regularly</b></td><td>Gives strong muscles, a healthy heart, better fitness and more energy.</td></tr>
            <tr><td><b>Get enough sleep</b></td><td>Children need about <b>9–11 hours</b> every night. Sleep helps us rest and grow, improves memory and concentration, and gives energy.</td></tr>
            <tr><td><b>Personal hygiene</b></td><td>Keep yourself clean: bathe daily, wear clean clothes, trim nails, comb hair, wash hands.</td></tr>
            <tr><td><b>Brush teeth twice a day</b></td><td>Every <b>morning and before bedtime</b>. Prevents cavities and bad breath. Visit a dentist regularly.</td></tr>
            <tr><td><b>Wash hands properly</b></td><td>Before eating, after the toilet, after playing outside, after touching pets, after coughing or sneezing.</td></tr>
            <tr><td><b>Keep surroundings clean</b></td><td>Throw garbage in dustbins, keep your room tidy, don't litter, help keep school and neighbourhood clean.</td></tr>
            <tr><td><b>Limit screen time</b></td><td>Too much phone, tablet or TV is unhealthy. Take breaks; read, play and go outdoors more.</td></tr>
            <tr><td><b>Be happy and positive</b></td><td><b>Mental health is as important as physical health.</b> Be kind, respect parents and teachers, share, smile and think positively.</td></tr>
          </tbody>
        </table></div>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Healthy habit</th><th>Benefit</th></tr></thead>
          <tbody>
            <tr><td>Eating healthy food</td><td>Strong body and growth</td></tr>
            <tr><td>Drinking water</td><td>Keeps body hydrated</td></tr>
            <tr><td>Exercising</td><td>Keeps body fit</td></tr>
            <tr><td>Sleeping well</td><td>Helps growth and learning</td></tr>
            <tr><td>Brushing teeth</td><td>Healthy teeth</td></tr>
            <tr><td>Washing hands</td><td>Prevents diseases</td></tr>
            <tr><td>Keeping surroundings clean</td><td>Healthy environment</td></tr>
            <tr><td>Positive thinking</td><td>Happy mind</td></tr>
          </tbody>
        </table></div>` },

      { topic: "math", title: "Mental maths", html: `
        <ul>
          <li><b>Mental math</b> means solving maths <b>in your head</b> – without paper, a pencil or a calculator – using what you know about numbers.</li>
          <li>It is useful every day, for example to add up prices when shopping or to estimate travel time.</li>
          <li>Example: 25 + 15 → think 25 + 10 = 35, then + 5 = <b>40</b>.</li>
        </ul>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Trick</th><th>How it works</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td><b>1. Adding by making tens</b></td><td>Make a 10 first, then add what is left.</td><td>8 + 7 → 8 + 2 = 10, then + 5 = <b>15</b></td></tr>
            <tr><td><b>2. Doubling numbers</b></td><td>Add the number to itself.</td><td>Double 6 = <b>12</b> · Double 15 = <b>30</b> · Double 25 = <b>50</b></td></tr>
            <tr><td><b>3. Multiplying by 10</b></td><td>Add a zero to the end.</td><td>5 × 10 = <b>50</b> · 12 × 10 = <b>120</b></td></tr>
            <tr><td><b>4. Multiplying by 5</b></td><td>Multiply by 10, then divide by 2 (halve it).</td><td>8 × 5 = <b>40</b> · 14 × 5 = <b>70</b></td></tr>
            <tr><td><b>5. Subtracting easily</b></td><td>Take away a round number, then fix the difference.</td><td>50 − 19 → 50 − 20 = 30, then + 1 = <b>31</b></td></tr>
          </tbody>
        </table></div>` },

      { topic: "brain", title: "Brain teasers & reasoning", html: `
        <p><b>Brain teasers</b> are puzzles that make you think in new ways. They improve problem-solving, memory, concentration and critical thinking, and are even used in job interviews to test creativity.</p>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Type</th><th>What it is</th></tr></thead>
          <tbody>
            <tr><td><b>Riddles</b></td><td>Short puzzles with wordplay or a clever twist.</td></tr>
            <tr><td><b>Logic puzzles</b></td><td>Need step-by-step reasoning, like <b>Sudoku</b> or grid puzzles.</td></tr>
            <tr><td><b>Math puzzles</b></td><td>Calculations or number patterns.</td></tr>
            <tr><td><b>Visual puzzles</b></td><td>Use pictures, shapes or patterns.</td></tr>
            <tr><td><b>Word puzzles</b></td><td>Anagrams, palindromes or word links.</td></tr>
            <tr><td><b>Lateral thinking puzzles</b></td><td>Need “outside-the-box” ideas; the answer is often surprisingly simple.</td></tr>
            <tr><td><b>Mystery / pattern puzzles</b></td><td>Solve a story or find the pattern in numbers or shapes.</td></tr>
          </tbody>
        </table></div>
        <h3>Examples from your notes</h3>
        <div class="table-wrap"><table class="data">
          <thead><tr><th>Puzzle</th><th>Answer</th></tr></thead>
          <tbody>
            <tr><td>What has a lot of teeth but can't bite?</td><td><b>A comb</b></td></tr>
            <tr><td>What five-letter word becomes shorter when you add two letters?</td><td><b>Short</b> (short + er = shorter)</td></tr>
            <tr><td>A man pushes his car to a hotel and says he's bankrupt. Why?</td><td>He is playing <b>Monopoly</b></td></tr>
            <tr><td>Which side of a chicken has more feathers?</td><td><b>The outside</b></td></tr>
            <tr><td>I hiked 3 miles south, 3 miles east, then 3 miles north and was back at my camp, where I saw a bear. What colour was it?</td><td><b>White</b> – a polar bear (this only works at the North Pole)</td></tr>
            <tr><td>What has keys but cannot open locks?</td><td><b>A piano</b></td></tr>
            <tr><td>5 houses in a row: Red, Blue, Green, Yellow, White. Which is in the middle?</td><td><b>Green</b> (the 3rd of 5)</td></tr>
            <tr><td>Find the odd one out (animals and a carrot).</td><td><b>Carrot</b> – the others are animals</td></tr>
            <tr><td>Which one is different? (four triangles)</td><td>The <b>4th triangle</b> – see the picture in your notes</td></tr>
            <tr><td>Find the missing shape (picture pattern)</td><td>See the picture in your notes – look for the shape that continues the pattern</td></tr>
            <tr><td>A farmer has chickens and cows: 5 animals, 14 legs. How many of each?</td><td><b>3 chickens and 2 cows</b> (6 + 8 = 14 legs)</td></tr>
            <tr><td>A box has 4 red and 4 blue balls. How many must you pick, without looking, to be sure of two of the same colour?</td><td><b>3 balls</b></td></tr>
            <tr><td>I am a number between 20 and 30. I am even. My digits add up to 6. What am I?</td><td><b>24</b></td></tr>
          </tbody>
        </table></div>
        <div class="callout"><strong>Check this one with your teacher</strong>Your notes ask: Aarav, Riya and Kabir stand in a line; Aarav is not first and Kabir is behind Riya – who is in the middle? The notes say <b>Riya</b>. But Riya has to be first (Aarav can't be first, and Kabir is behind Riya), so the middle is really Kabir or Aarav.</div>` }
    ]
  }
};
