# Dad Camp 2026 🏕️

Your chief-of-staff system for school break. A small, no-build web app that shows
the week's plan on your phone, plus an activity library and two automation routines
that keep it filled and email you a heads-up.

## What's here

| File | What it is |
|---|---|
| `index.html`, `app.js`, `styles.css` | The web app (mobile-first; installable PWA, works offline) |
| `data/profile.js` | The family, fixed slots, resources, constraints (incl. city for weather) |
| `data/library.js` | ~50 activities (materials + steps / YouTube) the generator picks from |
| `data/preferences.js` | What the girls love / dislike — the planner weights toward loved |
| `data/week.js` | The current week — **regenerated every Saturday** |
| `weeks/*.js`, `data/weeks-index.js` | Past weeks (archive) + the in-app week picker |
| `validate.js` | Guardrail "lint" the planner runs and self-corrects against |
| `camp.ics` | Calendar file — open it to add the week to Google/Apple Calendar |
| `manifest.webmanifest`, `sw.js`, `icon.svg` | PWA install + offline support |
| `automation/weekly-routine.md` | Prompt for the Saturday "build next week" routine |
| `automation/daily-brief.md` | Prompt for the 6:30am weekday "today" routine |

## App features

- **Weekly view** — stacked day cards on phone, Mon–Fri columns on desktop.
- **Per-kid filter** (Both / Yuval / Ariel), **weather chip** per day (tap → hourly), **"now" highlight** + auto-scroll to today.
- **Tap any activity** for materials, steps/YouTube, rain backup; **❤️/👎 rate** it (loved activities show a ❤️ and steer planning).
- **🛒 checkable shopping list**, **🖨️ print/PDF** view, **📅 .ics** download, **week picker** (once history builds up).
- **Add to Home Screen** → installs like an app and works with no signal.

## How it works

- **The 5 open slots** (Learning, Main, Quiet, Afternoon, Outdoor) + Free/Family are
  filled from `data/library.js` following the rules in `data/profile.js`.
- **Flexibility:** the slot grid is a default, not a cage. Any day can become a
  `full-day-outing`, `half-day-outing`, or `low-key` day (see Thursday's hike for an example).
- **Anti-screen:** every slot has a real non-screen plan. Movies/TV are the one
  capped Free-Choice treat (Friday movie night), never a default filler.

## Look at it on your phone

**Live at → https://roiki512.github.io/dad-camp/** — open it on your phone and
**Add to Home Screen** so it feels like an app.

To run locally instead:

```
python -m http.server 5517 --directory .
# then open http://localhost:5517
```

Tap any activity block for materials (have vs buy), step-by-step or a YouTube how-to,
and a rain backup. Tap **🛒 Shopping list** for the week's buy-ahead list.

## Asking for changes (on demand)

Just tell Claude in chat, e.g.:
- "Make Wednesday a beach day."
- "Swap Tuesday's craft — they did bracelets last week."
- "Plan next week."
- "Add a pool day and a baking afternoon."

Claude edits `data/week.js` + `camp.ics`, and (once deployed) pushes so the site updates.

## Setup status

- [x] **Hosted** on GitHub Pages → https://roiki512.github.io/dad-camp/ (repo: roiki512/dad-camp)
- [x] **City set** — Cedar Park, TX (America/Chicago) for the weather check
- [x] **Scheduled tasks created** — `dadcamp-weekly-plan` (Sat 08:00) + `dadcamp-morning-brief` (weekdays 06:30). They run while the Claude app is open (or on next launch). Manage them in the app's **Scheduled** sidebar.
- [ ] **Email (Gmail):** not linked yet. Add the Gmail connector in the Claude app (Settings → Connectors). The tasks already email automatically once an email tool is available; until then delivery = the task's completion notification + the auto-updated site.

> **Note:** scheduled tasks only fire while the Claude app is running. If it's closed at 6:30am, the morning brief runs the next time you open the app.

## Adding your own activities

Copy any entry in `data/library.js` and edit it. Keep the same shape (`id`, `slot`,
`materials.have` / `materials.buy`, and either `steps` or `youtube`). The generator
will start using it automatically.
