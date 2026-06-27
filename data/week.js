// Current week plan. The generator rewrites THIS file every Saturday.
// blocks reference activities by activityId (looked up in library.js) or carry
// inline `custom` details. Fixed blocks (meals/walk) just have a title.
window.DADCAMP_WEEK = {
  weekOf: "2026-06-29",
  label: "Week of June 29, 2026",
  generatedOn: "2026-06-27",
  days: [

    /* ───── MONDAY — standard · reading + cookies + pottery studio + pool ───── */
    {
      date: "2026-06-29", weekday: "Monday", dayType: "standard",
      weather: { icon: "☀️", label: "Sunny & very hot", high: 99, low: 76, pop: 0, hourly: [
        { t: "08:00", temp: 78, pop: 0, ic: "🌤️" }, { t: "10:00", temp: 85, pop: 0, ic: "☀️" },
        { t: "12:00", temp: 93, pop: 0, ic: "☀️" }, { t: "14:00", temp: 98, pop: 0, ic: "☀️" },
        { t: "16:00", temp: 99, pop: 0, ic: "☀️" }, { t: "18:00", temp: 97, pop: 0, ic: "☀️" },
        { t: "20:00", temp: 90, pop: 0, ic: "☀️" } ] },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true,
          note: "collect smooth rocks along the way for Tuesday's rock painting" },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Read-Aloud + Story Talk", activityId: "learn-readaloud",
          note: "reading rotation — use existing books from home shelf" },
        { time: "11:00-12:30", slot: "main", title: "Bake & Decorate Cookies", activityId: "main-bakecookies",
          note: "a favourite — great way to kick off the week ❤️" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Audiobook + Draw", activityId: "quiet-audiobook" },
        { time: "14:00-16:00", slot: "afternoon", title: "Pottery-Painting Studio Outing", activityId: "aft-pottery-studio",
          note: "drive to paint-your-own pottery — each picks a piece; it fires and becomes a keepsake ❤️" },
        { time: "16:00-17:30", slot: "outdoor", title: "Neighborhood Pool", activityId: "out-pool",
          weatherNote: "99°F and clear — pool is the move (3-min walk) ❤️" },
        { time: "17:30-18:30", slot: "free", title: "Family Board Game", activityId: "free-boardgame" },
      ]
    },

    /* ───── TUESDAY — gym day · math + rock painting + bikes ───── */
    {
      date: "2026-06-30", weekday: "Tuesday", dayType: "gym-day", dayTypeLabel: "🤸 Gymnastics Day",
      weather: { icon: "⛈️", label: "Very hot; evening storm possible", high: 100, low: 74, pop: 0, hourly: [
        { t: "08:00", temp: 77, pop: 0, ic: "☁️" }, { t: "10:00", temp: 83, pop: 0, ic: "☀️" },
        { t: "12:00", temp: 91, pop: 0, ic: "☀️" }, { t: "14:00", temp: 97, pop: 0, ic: "☀️" },
        { t: "16:00", temp: 99, pop: 0, ic: "☀️" }, { t: "18:00", temp: 95, pop: 0, ic: "⛈️" },
        { t: "20:00", temp: 91, pop: 0, ic: "☀️" } ] },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true,
          note: "pick up any remaining smooth rocks for rock painting" },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Play Store (money math)", activityId: "learn-storewithcoins",
          note: "math rotation — set up a little shop with toys and sticky-note price tags" },
        { time: "11:00-12:30", slot: "main", title: "Painted Story Rocks", activityId: "main-rockpainting",
          note: "use rocks from this morning's walk; hide them in the yard after for each other to find" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Jigsaw Puzzle", activityId: "quiet-puzzle" },
        { time: "14:00-16:00", slot: "gym", title: "Gymnastics", note: "Yuval 14:00–16:00 · Ariel 15:30–16:25",
          custom: { materials: { have: ["Leotards", "Grip socks", "Water bottles", "Hair tied back"], buy: [] },
                    steps: ["Pack water + snack for after.", "Drop Yuval at 14:00; bring Ariel for 15:30.", "Both done by 16:25 — head home before the evening storm window."] } },
        { time: "16:00-17:30", slot: "outdoor", title: "Bike / Scooter Ride", activityId: "out-bikes",
          weatherNote: "clear until ~18:00 — bikes are great right after gym; head in before evening",
          note: "❤️ a favourite — helmets on, pick a fun loop in the neighborhood" },
        { time: "17:30-18:30", slot: "free", title: "Dance Party / Music", activityId: "free-danceparty" },
      ]
    },

    /* ───── WEDNESDAY — standard · Hebrew + handprint art + big craft + piano ───── */
    {
      date: "2026-07-01", weekday: "Wednesday", dayType: "standard",
      weather: { icon: "🌦️", label: "Mostly sunny, late drizzle possible", high: 100, low: 75, pop: 1, hourly: [
        { t: "08:00", temp: 77, pop: 0, ic: "⛅" }, { t: "10:00", temp: 84, pop: 0, ic: "☀️" },
        { t: "12:00", temp: 91, pop: 0, ic: "☀️" }, { t: "14:00", temp: 96, pop: 1, ic: "⛅" },
        { t: "16:00", temp: 100, pop: 1, ic: "☀️" }, { t: "18:00", temp: 88, pop: 1, ic: "🌦️" },
        { t: "20:00", temp: 89, pop: 1, ic: "☁️" } ] },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Hebrew Copywork + Word Hunt", activityId: "learn-hebrew-copywork",
          note: "Hebrew rotation — find 5 fun words in a book, copy + illustrate each" },
        { time: "11:00-12:30", slot: "main", title: "Handprint Animal Art", activityId: "main-handprintart",
          note: "paint palms and press onto paper — turn prints into peacocks, fish, or trees; make a little gallery" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Sticker / Activity Books", activityId: "quiet-stickerbook" },
        { time: "14:00-16:00", slot: "afternoon", title: "Big Craft Project (2-hr build)", activityId: "aft-bigcraft",
          note: "choose an ambitious build: cardboard dollhouse, fairy garden, or diorama — work in stages with a snack break; keep it at home before piano" },
        { time: "16:00-16:45", slot: "free", title: "Snack + Wind-Down", fixed: true,
          note: "light snack and free play — no rushing; piano is 16:45" },
        { time: "16:45-17:30", slot: "piano", title: "Piano Lesson — Ariel", kid: "Ariel",
          custom: { materials: { have: ["Piano books/binder", "Water"], buy: [] },
                    steps: ["Ariel's weekly piano lesson, 16:45–17:30.", "Yuval has quiet free choice meanwhile."] } },
        { time: "16:45-17:30", slot: "free", title: "Yuval — quiet free choice", kid: "Yuval",
          custom: { materials: { have: ["Book, LEGO, or drawing supplies"], buy: [] },
                    steps: ["While Ariel has piano, Yuval picks a calm solo activity — read, build LEGO, or draw."] } },
        { time: "17:30-18:30", slot: "free", title: "Kids Help Make Dinner", activityId: "free-cookdinner" },
      ]
    },

    /* ───── THURSDAY — NO-CAR DAY · writing + paper planes + baking + water choice ───── */
    {
      date: "2026-07-02", weekday: "Thursday", dayType: "no-car", dayTypeLabel: "🚗 No-Car Day — at-home & walkable only",
      weather: { icon: "☁️", label: "Overcast & hot", high: 99, low: 74, pop: 1, hourly: [
        { t: "08:00", temp: 76, pop: 0, ic: "☁️" }, { t: "10:00", temp: 84, pop: 0, ic: "☁️" },
        { t: "12:00", temp: 91, pop: 0, ic: "☁️" }, { t: "14:00", temp: 96, pop: 1, ic: "☁️" },
        { t: "16:00", temp: 99, pop: 1, ic: "☁️" }, { t: "18:00", temp: 92, pop: 1, ic: "☁️" },
        { t: "20:00", temp: 87, pop: 0, ic: "☁️" } ] },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true,
          note: "neighborhood stroll — no car today" },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Comic-Strip Journal (writing)", activityId: "learn-journal-comic",
          note: "writing rotation — fold paper into 4 panels, draw + write a 4-panel comic, share aloud" },
        { time: "11:00-12:30", slot: "main", title: "Paper Airplane Lab", activityId: "main-paperplanes",
          note: "fold 2–3 designs each, decorate, test which flies farthest — great STEM activity on a no-car day" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Quiet Board Game (Sorry / Memory)", activityId: "quiet-boardgame-quiet" },
        { time: "14:00-16:00", slot: "afternoon", title: "Big Baking Project", activityId: "aft-bigbake",
          note: "indoor — pick banana bread, cupcakes, or another recipe; beats the afternoon heat and no car needed" },
        { time: "16:00-17:30", slot: "outdoor", title: "Outdoor — the girls' pick",
          options: ["out-pool", "out-trampoline", "out-waterplay"],
          weatherNote: "overcast but very hot (99°F) — water or trampoline are all walkable/backyard (no car needed). 2nd water day this week → girls' choice!" },
        { time: "17:30-18:30", slot: "free", title: "Build a Blanket Fort", activityId: "free-fort" },
      ]
    },

    /* ───── FRIDAY — July 4th weekend (lighter day) · gym (Yuval) + Dad & Ariel 1-on-1 ───── */
    {
      date: "2026-07-03", weekday: "Friday", dayType: "gym-day", dayTypeLabel: "🤸 Yuval Gym · 👧 Dad + Ariel Time · 🎆 July 4th Eve",
      weather: { icon: "🌦️", label: "Warm morning, drizzle possible later (low chance)", high: 95, low: 73, pop: 3, hourly: [
        { t: "08:00", temp: 78, pop: 1, ic: "🌤️" }, { t: "10:00", temp: 84, pop: 1, ic: "🌦️" },
        { t: "12:00", temp: 93, pop: 1, ic: "🌦️" }, { t: "14:00", temp: 94, pop: 3, ic: "🌦️" },
        { t: "16:00", temp: 86, pop: 3, ic: "🌦️" }, { t: "18:00", temp: 79, pop: 3, ic: "🌦️" },
        { t: "20:00", temp: 75, pop: 3, ic: "🌦️" } ] },
      specialEvent: { title: "July 4th weekend", note: "fireworks & family — lighter camp day; keep the afternoon easy" },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true,
          note: "enjoy the morning cool before the heat peaks" },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Walking Water Rainbow", activityId: "learn-science-walkingwater",
          note: "science rotation — set it up and watch colours walk across paper-towel bridges over the next hour" },
        { time: "11:00-12:30", slot: "main", title: "Paint-Your-Own Pottery (at home)", activityId: "main-pottery-paint",
          note: "calm, creative, low-prep — each girl picks a plain mug or plaster piece to paint ❤️; good July 4 eve vibe" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Calm Sensory Bin", activityId: "quiet-sensorybin" },
        { time: "14:00-16:00", slot: "gym", title: "Gymnastics — Yuval", kid: "Yuval",
          custom: { materials: { have: ["Leotard", "Grip socks", "Water bottle"], buy: [] },
                    steps: ["Drop Yuval at 14:00, pick up at 16:00."] } },
        { time: "14:00-16:00", slot: "free", title: "Dad + Ariel 1-on-1", kid: "Ariel",
          custom: { materials: { have: ["Let Ariel choose!"], buy: [] },
                    steps: ["Special solo time while Yuval is at gym.", "Ariel picks: ice-cream + park, her own craft, a board game — whatever she wants.", "Little Friday tradition ❤️"] } },
        { time: "16:00-17:30", slot: "outdoor", title: "Sidewalk Chalk + Games", activityId: "out-chalk",
          weatherNote: "POP only 3% — chalk games are on; rain backup: painters-tape hopscotch inside",
          note: "draw hopscotch + a big mural; easy, low-energy July 4 eve" },
        { time: "17:30-18:30", slot: "free", title: "Family Movie Night (weekly screen treat)", activityId: "free-movie",
          note: "the one capped screen slot of the week — pick something festive for July 4th eve 🎆" },
      ]
    }
  ],

  shoppingList: {
    buy: [
      "Decorating icing / icing sugar (Mon — cookie decorating)",
      "Sprinkles (Mon — cookie decorating)",
      "Pottery studio fee — cash/card (Mon — studio outing)",
      "Big bake special ingredient — banana bread, cupcakes, etc. (Thu)",
      "Sidewalk chalk if running low (Fri)"
    ],
    have: [
      "Flour, butter, sugar, egg, cookie cutters (Mon — cookie dough)",
      "Existing books for read-aloud (Mon — reading time)",
      "Smooth rocks — collect on Mon/Tue morning walk (Tue — rock painting)",
      "Acrylic/poster paint + brushes (Tue — rocks; Fri — pottery paint at home)",
      "Coins / play money, sticky-note price tags, small toys (Tue — play store math)",
      "Paper + pencils + markers (Wed — Hebrew copywork, handprint art, journal, planes)",
      "Cardboard boxes, tape, scissors (Wed — big craft project)",
      "Plain ceramic mug/plate or plaster piece (Fri — pottery paint at home)",
      "6 clear cups, paper towels, food coloring (Fri — walking water rainbow)",
      "Board games / card games (Thu quiet — Sorry / Memory)",
      "Blankets, chairs, clips/pegs (Thu free — blanket fort)",
      "Recipe ingredients for chosen bake (Thu — mostly pantry staples)",
      "Apron + mixing bowls (Thu — baking project)",
      "Swimsuits, towels, sunscreen, goggles (Mon pool + Thu choice)",
      "Helmets, bikes/scooters (Tue — bike ride)",
      "Blanket + popcorn (Fri — movie night)",
      "Leotards, grip socks, water bottles (Tue + Fri — gymnastics)",
      "Piano books/binder — Ariel (Wed — piano lesson)"
    ]
  }
};
