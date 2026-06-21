// Current week plan. The generator rewrites THIS file every Saturday.
// blocks reference activities by activityId (looked up in library.js) or carry
// inline `custom` details. Fixed blocks (meals/walk) just have a title.
window.DADCAMP_WEEK = {
  weekOf: "2026-06-22",
  label: "Week of June 22, 2026",
  generatedOn: "2026-06-19",
  days: [

    /* ───── MONDAY — standard · reading + salt dough + library ───── */
    {
      date: "2026-06-22", weekday: "Monday", dayType: "standard",
      weather: { icon: "⛅", label: "Partly cloudy", high: 96, low: 75, pop: 1, hourly: [
        { t: "08:00", temp: 77, pop: 0, ic: "🌤️" }, { t: "10:00", temp: 84, pop: 0, ic: "☀️" },
        { t: "12:00", temp: 90, pop: 0, ic: "☀️" }, { t: "14:00", temp: 95, pop: 0, ic: "☀️" },
        { t: "16:00", temp: 96, pop: 0, ic: "☀️" }, { t: "18:00", temp: 95, pop: 0, ic: "☀️" },
        { t: "20:00", temp: 88, pop: 1, ic: "☀️" } ] },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Math War (card game)", activityId: "learn-mathwar" },
        { time: "11:00-12:30", slot: "main", title: "Salt-Dough Charms & Beads", activityId: "main-saltdough" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Audiobook + Draw", activityId: "quiet-audiobook", note: "library books come this afternoon — solo reading starts tomorrow" },
        { time: "14:00-16:00", slot: "afternoon", title: "Library Trip (refresh books)", activityId: "aft-library", note: "kick off the week with a fresh stack of books" },
        { time: "16:00-17:30", slot: "outdoor", title: "Playground", activityId: "out-playground" },
        { time: "17:30-18:30", slot: "free", title: "Family Board Game", activityId: "free-boardgame" },
      ]
    },

    /* ───── TUESDAY — gym day · math + bracelets ───── */
    {
      date: "2026-06-23", weekday: "Tuesday", dayType: "gym-day", dayTypeLabel: "🤸 Gymnastics Day",
      weather: { icon: "🌤️", label: "Sunny (storms clear overnight)", high: 96, low: 75, pop: 1, hourly: [
        { t: "08:00", temp: 79, pop: 0, ic: "☁️" }, { t: "10:00", temp: 84, pop: 0, ic: "☁️" },
        { t: "12:00", temp: 90, pop: 0, ic: "☀️" }, { t: "14:00", temp: 94, pop: 0, ic: "☀️" },
        { t: "16:00", temp: 96, pop: 0, ic: "☀️" }, { t: "18:00", temp: 95, pop: 0, ic: "☀️" },
        { t: "20:00", temp: 90, pop: 1, ic: "🌤️" } ] },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Read-Aloud + Story Talk (fresh library books)", activityId: "learn-readaloud", note: "new books from Monday's library trip" },
        { time: "11:00-12:30", slot: "main", title: "Friendship Bracelets", activityId: "main-friendshipbracelets" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Jigsaw Puzzle", activityId: "quiet-puzzle" },
        { time: "14:00-16:00", slot: "gym", title: "Gymnastics", note: "Yuval 14:00–16:00 · Ariel 15:30–16:25",
          custom: { materials: { have: ["Leotards", "Grip socks", "Water bottles", "Hair tied back"], buy: [] },
                    steps: ["Pack water + snack for after.", "Drop Yuval at 14:00; bring Ariel for 15:30.", "Both done by 16:25 — easy evening after."] } },
        { time: "16:00-17:30", slot: "outdoor", title: "Giant Bubbles", activityId: "out-bubbles", note: "low-key after gym" },
        { time: "17:30-18:30", slot: "free", title: "Build a Blanket Fort", activityId: "free-fort" },
      ]
    },

    /* ───── WEDNESDAY — standard · Hebrew + rock painting + pottery outing + pool ───── */
    {
      date: "2026-06-24", weekday: "Wednesday", dayType: "standard",
      weather: { icon: "☁️", label: "Overcast", high: 96, low: 74, pop: 4, hourly: [
        { t: "08:00", temp: 77, pop: 1, ic: "☁️" }, { t: "10:00", temp: 84, pop: 1, ic: "☁️" },
        { t: "12:00", temp: 90, pop: 1, ic: "⛅" }, { t: "14:00", temp: 94, pop: 3, ic: "🌤️" },
        { t: "16:00", temp: 96, pop: 3, ic: "☀️" }, { t: "18:00", temp: 95, pop: 3, ic: "☀️" },
        { t: "20:00", temp: 90, pop: 4, ic: "☀️" } ] },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Hebrew Copywork + Word Hunt", activityId: "learn-hebrew-copywork" },
        { time: "11:00-12:30", slot: "main", title: "Puppet Show (make + perform)", activityId: "main-paperbagpuppets" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Cozy Solo Reading", activityId: "quiet-soloreading", note: "fresh books from Monday's library trip" },
        { time: "14:00-16:00", slot: "afternoon", title: "Playdate (host at home)", activityId: "aft-playdate", note: "keep it local & easy — Ariel has piano at 16:45" },
        { time: "16:00-16:45", slot: "free", title: "Snack + Free Play", note: "wind-down, then head to piano", fixed: true },
        { time: "16:45-17:30", slot: "piano", title: "Piano Lesson — Ariel", kid: "Ariel",
          custom: { materials: { have: ["Piano books/binder", "Water"], buy: [] },
                    steps: ["Ariel's weekly piano lesson, 16:45–17:30.", "Yuval has quiet free time meanwhile (see his block)."] } },
        { time: "16:45-17:30", slot: "free", title: "Yuval — quiet free choice", kid: "Yuval",
          custom: { materials: { have: ["Book, LEGO, or drawing"], buy: [] },
                    steps: ["While Ariel has piano, Yuval picks a calm activity: read, build LEGO, or draw — or come along for the ride."] } },
        { time: "17:30-18:30", slot: "free", title: "Kids Help Make Dinner", activityId: "free-cookdinner" },
      ]
    },

    /* ───── THURSDAY — NO-CAR DAY · writing + tie-dye + baking + walkable water ───── */
    {
      date: "2026-06-25", weekday: "Thursday", dayType: "no-car", dayTypeLabel: "🚗 No-Car Day — staying local (walkable + at-home)",
      weather: { icon: "☁️", label: "Overcast", high: 96, low: 72, pop: 4, hourly: [
        { t: "08:00", temp: 75, pop: 1, ic: "⛅" }, { t: "10:00", temp: 82, pop: 1, ic: "☁️" },
        { t: "12:00", temp: 88, pop: 1, ic: "☁️" }, { t: "14:00", temp: 93, pop: 2, ic: "☁️" },
        { t: "16:00", temp: 96, pop: 2, ic: "⛅" }, { t: "18:00", temp: 96, pop: 2, ic: "🌤️" },
        { t: "20:00", temp: 91, pop: 2, ic: "🌤️" } ] },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Comic-Strip Journal (writing)", activityId: "learn-journal-comic" },
        { time: "11:00-12:30", slot: "main", title: "Tie-Dye T-Shirts", activityId: "main-tiedye", note: "out in the backyard — dry day, no car needed" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Calm Sensory Bin", activityId: "quiet-sensorybin" },
        { time: "14:00-16:00", slot: "afternoon", title: "Big Baking Project", activityId: "aft-bigbake", note: "indoor — beats the afternoon heat (no car needed)" },
        { time: "16:00-17:30", slot: "outdoor", title: "Outdoor — the girls' pick", options: ["out-pool", "out-trampoline", "out-waterplay"], weatherNote: "hot day — water is a great call; all three are walkable / in the backyard (no car needed)" },
        { time: "17:30-18:30", slot: "free", title: "Dance Party / Music", activityId: "free-danceparty" },
      ]
    },

    /* ───── FRIDAY — gym (Yuval) + Dad & Ariel 1-on-1 · science + origami + movie night ───── */
    {
      date: "2026-06-26", weekday: "Friday", dayType: "gym-day", dayTypeLabel: "🤸 Yuval Gym · 👧 Dad + Ariel Time",
      weather: { icon: "⛅", label: "Partly cloudy", high: 98, low: 73, pop: 3, hourly: [
        { t: "08:00", temp: 76, pop: 1, ic: "🌤️" }, { t: "10:00", temp: 82, pop: 1, ic: "⛅" },
        { t: "12:00", temp: 90, pop: 1, ic: "⛅" }, { t: "14:00", temp: 95, pop: 3, ic: "🌤️" },
        { t: "16:00", temp: 98, pop: 3, ic: "🌤️" }, { t: "18:00", temp: 96, pop: 3, ic: "🌤️" },
        { t: "20:00", temp: 91, pop: 2, ic: "🌤️" } ] },
      blocks: [
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
        { time: "10:15-10:35", slot: "learning", title: "Workbook Time", activityId: "learn-workbooks" },
        { time: "10:35-11:00", slot: "learning", title: "Baking-Soda Volcano (science)", activityId: "learn-science-volcano" },
        { time: "11:00-12:30", slot: "main", title: "Origami Animals", activityId: "main-origami" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Sticker / Activity Books", activityId: "quiet-stickerbook" },
        { time: "14:00-16:00", slot: "gym", title: "Gymnastics — Yuval", kid: "Yuval",
          custom: { materials: { have: ["Leotard", "Grip socks", "Water bottle"], buy: [] },
                    steps: ["Drop Yuval at 14:00, pick up at 16:00."] } },
        { time: "14:00-16:00", slot: "free", title: "Dad + Ariel 1-on-1", kid: "Ariel",
          custom: { materials: { have: ["Let Ariel choose!"], buy: [] },
                    steps: ["Special solo time while Yuval is at gym.", "Ariel picks: ice-cream + park, her own craft, a bike ride, or baking together.", "Little tradition to look forward to every Friday."] } },
        { time: "16:00-17:30", slot: "outdoor", title: "Neighborhood Pool", activityId: "out-pool", weatherNote: "98° and dry — pool is the move (3-min walk)" },
        { time: "17:30-18:30", slot: "free", title: "Family Movie Night (weekly screen treat)", activityId: "free-movie", note: "the one capped screen slot of the week" },
      ]
    }
  ],

  shoppingList: {
    buy: [
      "Embroidery floss or yarn (Tue — friendship bracelets)",
      "Pony / letter beads — optional (Tue — bracelets)",
      "Googly eyes — optional (Wed — puppet show)",
      "Tie-dye kit + a few white shirts/socks (Thu — tie-dye)",
      "Baking project ingredients — pick a recipe (Thu — big bake)",
      "Food coloring (Fri — baking-soda volcano)",
      "Pottery studio fee — cash/card (Wed — pottery outing)"
    ],
    have: [
      "Flour + salt + paint + brushes (Mon — salt dough)",
      "Paper bags or socks + markers, glue (Wed — puppet show)",
      "Deck of cards (Tue — math war)",
      "Library cards + books to return (Mon — library)",
      "Swimsuits, towels, sunscreen, goggles (Wed + Fri pool)",
      "Rubber bands + gloves (Thu — tie-dye)",
      "Big container + rice/beans (Thu — sensory bin)",
      "Square/origami paper (Fri — origami)",
      "Baking soda, vinegar, dish soap (Fri — volcano)",
      "Board games + blankets (fort, family time)"
    ]
  }
};
