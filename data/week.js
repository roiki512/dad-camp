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
      blocks: [
        { time: "09:00-09:15", slot: "get-ready", title: "Get Ready", note: "dress, teeth, make beds", fixed: true },
        { time: "09:15-09:45", slot: "breakfast", title: "Breakfast", fixed: true },
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", note: "collect smooth rocks for Wednesday's rock painting!", fixed: true },
        { time: "10:15-11:00", slot: "learning", title: "Read-Aloud + Story Talk", activityId: "learn-readaloud" },
        { time: "11:00-12:30", slot: "main", title: "Salt-Dough Charms & Beads", activityId: "main-saltdough" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Cozy Solo Reading", activityId: "quiet-soloreading" },
        { time: "14:00-16:00", slot: "afternoon", title: "Library Trip (refresh books)", activityId: "aft-library", note: "kick off the week with a fresh stack of books" },
        { time: "16:00-17:30", slot: "outdoor", title: "Playground", activityId: "out-playground" },
        { time: "17:30-18:30", slot: "free", title: "Family Board Game", activityId: "free-boardgame" },
        { time: "19:00", slot: "dinner", title: "Dinner", fixed: true },
        { time: "20:00", slot: "bedtime", title: "Bedtime", fixed: true }
      ]
    },

    /* ───── TUESDAY — gym day · math + bracelets ───── */
    {
      date: "2026-06-23", weekday: "Tuesday", dayType: "gym-day", dayTypeLabel: "🤸 Gymnastics Day",
      blocks: [
        { time: "09:00-09:15", slot: "get-ready", title: "Get Ready", note: "dress, teeth, make beds", fixed: true },
        { time: "09:15-09:45", slot: "breakfast", title: "Breakfast", fixed: true },
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
        { time: "10:15-11:00", slot: "learning", title: "Math War (card game)", activityId: "learn-mathwar" },
        { time: "11:00-12:30", slot: "main", title: "Friendship Bracelets", activityId: "main-friendshipbracelets" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Audiobook + Draw", activityId: "quiet-audiobook" },
        { time: "14:00-16:00", slot: "gym", title: "Gymnastics", note: "Yuval 14:00–16:00 · Ariel 15:30–16:25",
          custom: { materials: { have: ["Leotards", "Grip socks", "Water bottles", "Hair tied back"], buy: [] },
                    steps: ["Pack water + snack for after.", "Drop Yuval at 14:00; bring Ariel for 15:30.", "Both done by 16:25 — easy evening after."] } },
        { time: "16:00-17:30", slot: "outdoor", title: "Giant Bubbles", activityId: "out-bubbles", note: "low-key after gym" },
        { time: "17:30-18:30", slot: "free", title: "Build a Blanket Fort", activityId: "free-fort" },
        { time: "19:00", slot: "dinner", title: "Dinner", fixed: true },
        { time: "20:00", slot: "bedtime", title: "Bedtime", fixed: true }
      ]
    },

    /* ───── WEDNESDAY — standard · Hebrew + rock painting + pottery outing + pool ───── */
    {
      date: "2026-06-24", weekday: "Wednesday", dayType: "standard",
      blocks: [
        { time: "09:00-09:15", slot: "get-ready", title: "Get Ready", note: "dress, teeth, make beds", fixed: true },
        { time: "09:15-09:45", slot: "breakfast", title: "Breakfast", fixed: true },
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
        { time: "10:15-11:00", slot: "learning", title: "Hebrew Copywork + Word Hunt", activityId: "learn-hebrew-copywork" },
        { time: "11:00-12:30", slot: "main", title: "Painted Story Rocks", activityId: "main-rockpainting", note: "use the rocks from Monday's walk" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Jigsaw Puzzle", activityId: "quiet-puzzle" },
        { time: "14:00-16:00", slot: "afternoon", title: "Pottery-Painting Studio Outing", activityId: "aft-pottery-studio" },
        { time: "16:00-17:30", slot: "outdoor", title: "Neighborhood Pool", activityId: "out-pool", weatherNote: "if weather permits" },
        { time: "17:30-18:30", slot: "free", title: "Dance Party / Music", activityId: "free-danceparty" },
        { time: "19:00", slot: "dinner", title: "Dinner", fixed: true },
        { time: "20:00", slot: "bedtime", title: "Bedtime", fixed: true }
      ]
    },

    /* ───── THURSDAY — FULL-DAY OUTING · nature hike + picnic (grid replaced) ───── */
    {
      date: "2026-06-25", weekday: "Thursday", dayType: "full-day-outing", dayTypeLabel: "🌄 Full-Day Outing — Nature Hike & Picnic",
      blocks: [
        { time: "09:00-09:15", slot: "get-ready", title: "Get Ready", note: "dress for the trail, hats, sunscreen", fixed: true },
        { time: "09:15-09:45", slot: "breakfast", title: "Breakfast", note: "good fuel + pack the picnic together", fixed: true },
        { time: "10:00-15:00", slot: "afternoon", big: true, title: "Nature Hike + Picnic",
          weatherNote: "If rain: swap to the children's museum / science center instead",
          custom: {
            materials: {
              have: ["Backpack", "Water bottles", "Hats + sunscreen", "First-aid basics", "Bag for nature treasures", "Magnifying glass"],
              buy: ["Picnic food — sandwiches, fruit, snacks"]
            },
            steps: [
              "Pick an easy, kid-friendly trail or nature reserve (15–45 min drive).",
              "Hike at their pace; do a mini scavenger hunt (feather, smooth rock, Y-stick, something red).",
              "Stop for the picnic at a nice spot; rest.",
              "Collect a few treasures for a craft later in the week.",
              "Head home by ~15:00 for a calm rest."
            ],
            youtube: "https://www.youtube.com/results?search_query=hiking+with+kids+nature+scavenger+hunt+ideas"
          }
        },
        { time: "16:00-17:00", slot: "quiet", title: "Rest + Audiobook", activityId: "quiet-audiobook", note: "wind down after the big day" },
        { time: "17:30-18:30", slot: "free", title: "Kids Help Make Dinner", activityId: "free-cookdinner" },
        { time: "19:00", slot: "dinner", title: "Dinner", fixed: true },
        { time: "20:00", slot: "bedtime", title: "Bedtime", note: "earlier wind-down — they'll be tired!", fixed: true }
      ]
    },

    /* ───── FRIDAY — gym (Yuval) + Dad & Ariel 1-on-1 · science + origami + movie night ───── */
    {
      date: "2026-06-26", weekday: "Friday", dayType: "gym-day", dayTypeLabel: "🤸 Yuval Gym · 👧 Dad + Ariel Time",
      blocks: [
        { time: "09:00-09:15", slot: "get-ready", title: "Get Ready", note: "dress, teeth, make beds", fixed: true },
        { time: "09:15-09:45", slot: "breakfast", title: "Breakfast", fixed: true },
        { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
        { time: "10:15-11:00", slot: "learning", title: "Baking-Soda Volcano (science)", activityId: "learn-science-volcano" },
        { time: "11:00-12:30", slot: "main", title: "Origami Animals", activityId: "main-origami" },
        { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
        { time: "13:15-14:00", slot: "quiet", title: "Sticker / Activity Books", activityId: "quiet-stickerbook" },
        { time: "14:00-16:00", slot: "gym", title: "Gymnastics — Yuval", kid: "Yuval",
          custom: { materials: { have: ["Leotard", "Grip socks", "Water bottle"], buy: [] },
                    steps: ["Drop Yuval at 14:00, pick up at 16:00."] } },
        { time: "14:00-16:00", slot: "free", title: "Dad + Ariel 1-on-1", kid: "Ariel",
          custom: { materials: { have: ["Let Ariel choose!"], buy: [] },
                    steps: ["Special solo time while Yuval is at gym.", "Ariel picks: ice-cream + park, her own craft, a bike ride, or baking together.", "Little tradition to look forward to every Friday."] } },
        { time: "16:00-17:30", slot: "outdoor", title: "Backyard Water Play", activityId: "out-waterplay", weatherNote: "if weather permits" },
        { time: "17:30-18:30", slot: "free", title: "Family Movie Night (weekly screen treat)", activityId: "free-movie", note: "the one capped screen slot of the week" },
        { time: "19:00", slot: "dinner", title: "Dinner", fixed: true },
        { time: "20:00", slot: "bedtime", title: "Bedtime", fixed: true }
      ]
    }
  ],

  shoppingList: {
    buy: [
      "Embroidery floss or yarn (Tue — friendship bracelets)",
      "Pony / letter beads — optional (Tue — bracelets)",
      "Paint pens — optional (Wed — rock painting)",
      "Food coloring (Fri — baking-soda volcano)",
      "Water balloons — optional (Fri — water play)",
      "Picnic food: sandwiches, fruit, snacks (Thu — hike)",
      "Pottery studio fee — cash/card (Wed — pottery outing)"
    ],
    have: [
      "Flour + salt (Mon — salt dough)",
      "Paint + brushes (Mon/Wed crafts)",
      "Deck of cards (Tue — math war)",
      "Library cards + books to return (Mon — library)",
      "Swimsuits, towels, sunscreen, goggles (Wed pool / Fri water play)",
      "Square/origami paper (Fri — origami)",
      "Baking soda, vinegar, dish soap (Fri — volcano)",
      "Board games + blankets (fort, family time)",
      "Backpack, hats, first-aid, water bottles (Thu — hike)"
    ]
  }
};
