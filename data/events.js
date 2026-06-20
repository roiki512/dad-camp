// One-off dated events the planner builds AROUND and the app shows on the day.
// Add birthdays, holidays, trips, appointments, visitors, etc.
//   date: "YYYY-MM-DD" (required)
//   title: short label (required)
//   type: "holiday" | "birthday" | "trip" | "appointment" | "event"
//   time: "HH:MM-HH:MM" (optional) — omit for an all-day event (shows as a banner)
//   note: optional one line
window.DADCAMP_EVENTS = [
  { date: "2026-07-03", title: "July 4th weekend", type: "holiday", note: "fireworks & family — lighter camp day" },

  // ── Examples — edit the dates/titles or delete; add your real ones above. ──
  // { date: "2026-07-15", title: "Yuval's birthday", type: "birthday", note: "make it special!" },
  // { date: "2026-07-20", title: "Beach trip", type: "trip", note: "pack swimsuits + sunscreen" },
  // { date: "2026-06-24", time: "10:30-11:15", title: "Dentist — Ariel", type: "appointment" }
];
