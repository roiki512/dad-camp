// Dad Camp profile — the single source of truth about the family, fixed slots,
// resources and constraints. The generator (Claude) reads this when building a week.
// Edit freely; the web app and routines both consume window.DADCAMP_PROFILE.
window.DADCAMP_PROFILE = {
  campName: "Dad Camp 2026",
  // Used by the daily routine to fetch weather. UPDATE THIS to your city.
  city: "TBD — set your city/area here",
  timezone: "Asia/Jerusalem",
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
    { time: "09:00-09:15", slot: "get-ready", title: "Get Ready", note: "dress, teeth, make beds", fixed: true },
    { time: "09:15-09:45", slot: "breakfast", title: "Breakfast", fixed: true },
    { time: "09:45-10:15", slot: "morning-walk", title: "Morning Walk", fixed: true },
    { time: "10:15-10:35", slot: "learning", title: "Workbook Time", note: "daily — activity workbooks", fillable: true },
    { time: "10:35-11:00", slot: "learning", title: "Learning Block", fillable: true },
    { time: "11:00-12:30", slot: "main", title: "Main Activity", fillable: true },
    { time: "12:30-13:15", slot: "lunch", title: "Lunch", fixed: true },
    { time: "13:15-14:00", slot: "quiet", title: "Quiet Time", fillable: true },
    { time: "14:00-16:00", slot: "afternoon", title: "Afternoon Activity", fillable: true },
    { time: "16:00-17:30", slot: "outdoor", title: "Outdoor Time", fillable: true },
    { time: "17:30-18:30", slot: "free", title: "Free Choice / Family", fillable: true },
    { time: "19:00", slot: "dinner", title: "Dinner", fixed: true },
    { time: "20:00", slot: "bedtime", title: "Bedtime", fixed: true }
  ],

  // Recurring fixed commitments the generator must always honor.
  fixedEvents: [
    { day: "Tue", time: "14:00-16:00", title: "Gymnastics — Yuval", kid: "Yuval" },
    { day: "Tue", time: "15:30-16:25", title: "Gymnastics — Ariel", kid: "Ariel" },
    { day: "Fri", time: "14:00-16:00", title: "Gymnastics — Yuval", kid: "Yuval",
      note: "Ariel is free — natural Dad + Ariel 1-on-1 time." }
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
    learningRotation: { Mon: "reading", Tue: "math", Wed: "Hebrew", Thu: "writing", Fri: "science" }
  }
};
