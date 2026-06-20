// Dad Camp profile — the single source of truth about the family, fixed slots,
// resources and constraints. The generator (Claude) reads this when building a week.
// Edit freely; the web app and routines both consume window.DADCAMP_PROFILE.
window.DADCAMP_PROFILE = {
  campName: "Dad Camp 2026",
  // Used by the daily routine to fetch weather.
  city: "Cedar Park, TX (Austin area)",
  timezone: "America/Chicago",
  kids: [
    {
      name: "Yuval",
      age: 7,
      grade: "rising 2nd grade",
      gymnastics: ["Tue 14:00-16:00", "Fri 14:00-16:00"]
    },
    {
      name: "Ariel",
      age: 7,
      grade: "rising 2nd grade",
      gymnastics: ["Tue 15:30-16:25"]
    }
  ],
  // Plan these days only. Leave Sat/Sun alone unless asked.
  weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],

  // The default daily grid (a smart default, NOT a cage — a day can be replaced
  // by a full-day outing, half-day outing, or low-key day).
  dailyTemplate: [
    { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
    { time: "10:15-10:35", slot: "learning", title: "Workbook Time", note: "daily — activity workbooks", fillable: true },
    { time: "10:35-11:00", slot: "learning", title: "Learning Block", fillable: true },
    { time: "11:00-12:30", slot: "main", title: "Main Activity", fillable: true },
    { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
    { time: "13:15-14:00", slot: "quiet", title: "Quiet Time", fillable: true },
    { time: "14:00-16:00", slot: "afternoon", title: "Afternoon Activity", fillable: true },
    { time: "16:00-17:30", slot: "outdoor", title: "Outdoor Time", fillable: true },
    { time: "17:30-18:30", slot: "free", title: "Free Choice / Family", fillable: true }
  ],

  // Recurring fixed commitments the generator must always honor.
  fixedEvents: [
    { day: "Tue", time: "14:00-16:00", title: "Gymnastics — Yuval", kid: "Yuval" },
    { day: "Tue", time: "15:30-16:25", title: "Gymnastics — Ariel", kid: "Ariel" },
    { day: "Fri", time: "14:00-16:00", title: "Gymnastics — Yuval", kid: "Yuval",
      note: "Ariel is free — natural Dad + Ariel 1-on-1 time." },
    { day: "Wed", time: "16:45-17:30", title: "Piano Lesson — Ariel", kid: "Ariel",
      note: "Build Wednesday around this; Yuval gets parallel quiet free time." }
  ],

  resources: {
    pool: { label: "Neighborhood outdoor pool", walkMinutes: 3, weatherDependent: true },
    urbanAir: { label: "Urban Air (season pass)", cap: "once per 1–2 weeks" },
    trampoline: { label: "Backyard trampoline", note: "short bursts; weather/energy dependent" },
    library: { label: "Public library", refresh: "~every 2 weeks to swap books" }
  },

  // Things the girls genuinely enjoy — seed planning around these.
  favorites: [
    "Books + library (refresh every ~2 weeks)",
    "Arts & crafts at home (heaviest weighting)",
    "Water — pool / splash pad",
    "Playgrounds",
    "Nature / hikes",
    "Bike riding",
    "Paint & draw",
    "Pottery painting",
    "Movies & TV (CAPPED — Free-Choice only, never a default slot-filler)",
    "Board games — Sorry, Monopoly, etc."
  ],

  constraints: {
    minimizeScreens: true,
    screenPolicy: "Screens only as an explicit, capped Free-Choice option. Every fillable slot must have a concrete non-screen plan.",
    urbanAirMaxPer: "1–2 weeks",
    libraryRefreshEvery: "2 weeks",
    noRepeatCraftWithinWeek: true,
    everyOutdoorSlotNeedsRainBackup: true,
    dailyWorkbook: "Include 'learn-workbooks' (Workbook Time) EVERY day — a short 20-min block at the start of the Learning Block. On full-day-outing days, add it as an optional short evening block instead.",
    thursdayNoCar: "Most Thursdays there is NO CAR. Plan Thursdays car-free: only walkable/at-home options (the 3-min-walk pool, backyard, neighborhood park/playground/walks, indoor crafts/baking). NO drive-required activities on Thursday (no Urban Air, pottery studio, museums, trail hikes, library if not walkable). Mark Thursday dayType 'no-car'.",
    pianoWednesday: "Ariel has a fixed Piano Lesson every Wednesday 16:45–17:30. Build Wednesday around it: don't schedule a pool/outing/anything that collides with 16:45–17:30; keep 16:00–16:45 light (snack/wind-down). Give Yuval a parallel quiet free-choice block during the lesson. Don't overload Wednesday (avoid a big 2-hr drive-outing AND piano the same afternoon).",
    secondWaterDayChoice: "If a week has more than one pool/water day, make the SECOND one a CHOICE block — set block.options (e.g. ['out-pool','out-trampoline','out-waterplay']) and no activityId, so the girls pick — never force pool twice.",
    commonSenseDiversity: "Use common sense and variety — kid-centric and practical. WITHIN A DAY never stack two activities of the same kind: not two water (pool + splash/backyard water), not two cooking/baking, not two painting, not two board games, etc. ACROSS THE WEEK vary the activity TYPES (craft, build, cook, paint, music, drama, active/sport, water, nature) and don't lean on one favorite repeatedly. Respect logical order & prerequisites (e.g., a reading activity needs books first; salt dough is painted only after it dries). If something doesn't make sense for a 7-year-old's real day, fix it.",
    soloReadingAfterLibrary: "Schedule 'quiet-soloreading' (Cozy Solo Reading) ONLY on the 1–2 days AFTER a library visit, when the girls have fresh books. Never before or the same morning as the library trip. If there's no library visit that week, skip solo reading (use audiobook/puzzle/board game/etc. for Quiet Time instead).",
    weatherAware: "Each week, fetch the Cedar Park forecast and store per-day weather in week.js as weather:{icon,label,high,low,pop,hourly:[{t,temp,pop,ic}]} (daytime hours ~08:00–20:00). PLAN around it: don't schedule hikes or outdoor-heavy outings on rainy/stormy days; on hot dry days favor water (pool/splash/backyard water) and keep the hottest afternoon hours indoor/shaded; every outdoor block still needs a rain backup. Weather forecasts shift — the daily 6:30 brief makes the final call.",
    learningRotation: { Mon: "reading", Tue: "math", Wed: "Hebrew", Thu: "writing", Fri: "science" }
  }
};
