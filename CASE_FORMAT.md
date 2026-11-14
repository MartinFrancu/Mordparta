# Case format

A case is one JS file in `cases/` that sets `window.CASE = {...}`. Pure content – the engine (`src/engine.js`) has no case knowledge.
To play a different case, change the `<script src="cases/...">` line in `index.html`.

## Top level
| key | meaning |
|---|---|
| `title`, `intro`, `introEffects` | opening briefing and what is known at start |
| `start` | game clock start, `'YYYY-MM-DD HH:MM'` (all times use this format) |
| `dayLimit` | days until game over; `timeUp` = game-over text |
| `operatives` | names of your team |
| `places` | `{id: {name, travel: {otherId: minutes}}}` – travel is symmetric, default 60 min, 0 = same area |
| `people`, `objects` | `{id: {name, role}}` / `{id: {name, desc}}` – hidden until an effect reveals them |
| `theories` | `[{id, title, by, text, slots: {Name: value}, requires/requiresAny}]` |
| `leads` | see below |
| `events` | scripted interrupts: `{id, title, who, text, effects, at}` or `{..., requires, delay}` (hours after condition) |
| `trial` | `strengthFlags` (counted) + `verdicts: [{min, text}]` (first with `strength >= min` wins) |

## Leads
`{id, on, by, title, offer, requires, requiresAny, hiddenBy, levels: [{hours, report, effects, offer?}]}`
- `on`: where the action is shown – `'person:id'`, `'place:id'` or `'object:id'`, or a list (first revealed one wins, e.g. `['object:phoneK', 'person:klara']`).
  The lead stays hidden until that target is revealed. Without `on` it goes to a "General leads" card.
- Visible when all `requires` flags are set, at least one of `requiresAny` (if given), none of `hiddenBy`.
- Each assignment plays the next level. After the last level the lead disappears.

## Effects
| `t` | fields | does |
|---|---|---|
| `flag` | `id` | sets a flag (unlocks leads/theories/events) |
| `person` | `id` | reveals a person |
| `info` | `id, key, text` | adds a line to a person |
| `object` | `id, text?` | reveals an object / adds a note |
| `place` | `id, text?` | reveals a place / adds a note (a `tl` entry also reveals its place silently) |
| `tl` | `who, where, from, to?, status: confirmed\|claimed, text, id?` | timeline entry |
| `tnote` | `id, effect: support\|weaken\|ruleout, text` | note on a theory |
| `slot` | `id, slot, value` | fills a theory slot |
| `check` | `id, text` | ticks trial checklist item: `suspect custody motive body link method` |

## Automatic alibi check
A `claimed` entry is marked impossible when a `confirmed` entry of the same person, at a place with travel time > 0,
overlaps it or is closer in time than the travel time. The engine then sets flags `contra:<person>` and `contra:<entry id>`.
