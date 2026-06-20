# Weekly routine — "Build next week" (run Saturday ~08:00)

You are Roi's Dad Camp chief of staff. Build the schedule for the **upcoming Mon–Fri**.

## Steps
1. Read `data/profile.js` (family, fixed slots, constraints), `data/library.js` (activities),
   and `data/preferences.js` (loved/disliked — **weight toward loved, avoid disliked**).
   Read the current `data/week.js` and the most recent files in `weeks/` to **avoid repeating**
   recent crafts/outings.
2. Compute next week's Monday date. **Fetch the Cedar Park forecast** for Mon–Fri:
   `https://api.open-meteo.com/v1/forecast?latitude=30.5052&longitude=-97.8203&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,precipitation_probability,weather_code&temperature_unit=fahrenheit&timezone=America/Chicago&start_date=<Mon>&end_date=<Fri>`
   Store each day's weather in `week.js` as `weather:{icon,label,high,low,pop,hourly:[{t,temp,pop,ic}]}`
   (daytime 08:00–20:00, every 2h). WMO→emoji: 0☀️ 1🌤️ 2⛅ 3☁️ 45/48🌫️ 51-55🌦️ 61-65🌧️ 80/81🌦️ 82/95/96/99⛈️.
3. Build 5 day objects (Mon–Fri), **weather-aware** and following ALL rules below. Most days
   `standard`; include variety (aim for ~1 outing day; Thursday stays `no-car`).
4. **Archive the outgoing week first:** copy the current `data/week.js` to `weeks/<its-weekOf>.js`
   wrapped as `window.DADCAMP_SET_ARCHIVE && window.DADCAMP_SET_ARCHIVE({ …week… });`, and in
   `data/weeks-index.js` mark it `current:false` + add the new week as `current:true`.
5. Write `data/week.js` (overwrite, match the structure exactly) and regenerate `camp.ics`.
   Build the `shoppingList` (deduped; split buy vs have-at-home).
6. **Validate & self-correct:** run `node validate.js`. Fix every ERROR and re-run until it
   exits clean (0). Address warnings where sensible.
7. Commit and push (site auto-deploys via GitHub Pages).
8. **Email Roi** (roikirshenboim@gmail.com): subject "Dad Camp — week of <date> is ready",
   body = a short day-by-day summary + the shopping list + the site link.

## Rules (hard)
- **Fixed:** Tue 14:00–16:00 Yuval gym + 15:30–16:25 Ariel gym; Fri 14:00–16:00 Yuval gym
  → make Friday 14:00–16:00 a **Dad + Ariel 1-on-1** block.
- **Thursdays = NO CAR** (most weeks): car-free only — walkable pool (3 min), backyard,
  neighborhood park/playground/walks, indoor crafts/baking. NO drive-required activities
  Thursday (no Urban Air, pottery studio, museum, trail hike). Set Thursday `dayType: "no-car"`.
- **Wednesday piano (Ariel) 16:45–17:30, FIXED** — add a `slot: "piano"` block for Ariel +
  a parallel quiet free block for Yuval; keep 16:00–16:45 light; don't collide or overload Wednesday.
- **2nd water/pool day = a CHOICE:** if water appears more than once in a week, make the second
  one a choice block (`options: ["out-pool","out-trampoline","out-waterplay"]`, no `activityId`).
- **Weather-aware** (see step 2): plan outings on good-weather days; every outdoor block
  keeps a rain backup.
- **Daily workbooks:** include `learn-workbooks` (Workbook Time, ~20 min) at the start of
  the Learning Block **every day**. On full-day-outing days, add it as a short optional
  evening block instead.
- **Learning rotation:** Mon reading · Tue math · Wed Hebrew · Thu writing · Fri science
  (this is the activity AFTER workbook time; skip the rotation on full-day-outing days).
- **No repeated craft/main-activity** within the week or vs. last week.
- **Common sense + diversity:** never stack two same-kind activities in ONE day (no two water,
  two cooking, two painting, two board games). Vary activity TYPES across the week (craft, build,
  cook, paint, music, drama, active, water, nature). Respect prerequisites/logical order. Keep it
  kid-centric and practical — if it wouldn't make sense in a real 7-year-old's day, change it.
- **Urban Air** at most once per 1–2 weeks; **library trip** ~every 2 weeks.
- **Cozy Solo Reading** (`quiet-soloreading`): only on the **1–2 days AFTER a library visit** (fresh books) — never before/same-day as the trip. No library that week → skip it.
- **Every outdoor slot** must have a rain backup (library entries already include one).
- **Anti-screen:** screens only as the capped Friday Free-Choice movie; never fill a slot with screens.
- **Energy balance:** active outdoor after sedentary learning; calm/screen-free Quiet Time after lunch.
- Every week is a **suggestion** — keep swaps easy and note alternatives where useful.

## Output shape
Match the existing `data/week.js` structure exactly (see the current file): `days[]` with
`date`, `weekday`, `dayType`, optional `dayTypeLabel`, and `blocks[]` referencing
`activityId` from the library or carrying inline `custom` details; plus a `shoppingList`.
A block may instead carry `options: [activityId, …]` (no `activityId`) to offer the girls a choice.
