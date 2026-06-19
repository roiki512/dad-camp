# Dad Camp 2026 🏕️

Your chief-of-staff system for school break. A small, no-build web app that shows
the week's plan on your phone, plus an activity library and two automation routines
that keep it filled and email you a heads-up.

## What's here

| File | What it is |
|---|---|
| `index.html`, `app.js`, `styles.css` | The web app (mobile-first weekly view) |
| `data/profile.js` | The family, fixed slots, resources, constraints — **set your city here** |
| `data/library.js` | ~50 activities (materials + steps / YouTube) the generator picks from |
| `data/week.js` | The current week — **regenerated every Saturday** |
| `camp.ics` | Calendar file — open it to add the week to Google/Apple Calendar |
| `automation/weekly-routine.md` | Prompt for the Saturday "build next week" routine |
| `automation/daily-brief.md` | Prompt for the 6:30am weekday "today" routine |

## How it works

- **The 5 open slots** (Learning, Main, Quiet, Afternoon, Outdoor) + Free/Family are
  filled from `data/library.js` following the rules in `data/profile.js`.
- **Flexibility:** the slot grid is a default, not a cage. Any day can become a
  `full-day-outing`, `half-day-outing`, or `low-key` day (see Thursday's hike for an example).
- **Anti-screen:** every slot has a real non-screen plan. Movies/TV are the one
  capped Free-Choice treat (Friday movie night), never a default filler.

## Look at it on your phone

Once deployed (see Setup), open the site URL and **Add to Home Screen**. Until then,
run it locally:

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

## Setup (to finish — see the plan)

1. **Set your city** in `data/profile.js` (for the weather check).
2. **Host it:** push this folder to GitHub and enable **GitHub Pages** → you get a public URL.
3. **Deploy credential:** a token so the Saturday routine can push updates.
4. **Email:** connect Gmail so the routines can email you the weekly plan + morning brief.
5. **Schedule the two routines** (`automation/*.md`): Saturday ~08:00 and weekdays 06:30.

## Adding your own activities

Copy any entry in `data/library.js` and edit it. Keep the same shape (`id`, `slot`,
`materials.have` / `materials.buy`, and either `steps` or `youtube`). The generator
will start using it automatically.
