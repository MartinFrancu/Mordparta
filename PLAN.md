# Mordparta – start plan

Handover doc. A fresh agent should be able to build the demo from this alone.

## Working rules

- Many small commits, each doing ONE thing. Message prefix:
  - `D` development – new behavior
  - `B` bug fix – fixing behavior that doesn't match intent
  - `R` refactor – same behavior, better code
  - `C` chore – README, icons, docs, config
- Develop on branch `claude/true-crime-game-demo-t173qo`, push there.
- Prototype quality: quick and dirty beats good. Goal = playable ASAP, then the user plays it.
- User prefs: be brief, no flattery, explain jargon in an appendix, report missing input instead of guessing.

## Vision

True-crime game inspired by the Czech podcast *Kriminálka* (Mirek Vaňura, Český rozhlas Dvojka):
cases told by the detectives themselves – what they did, in which order, why, what they thought. No melodrama.

Player = head of the homicide squad ("mordparta"). Doesn't go into the field; assigns operatives to leads,
reads their short written reports, decides what to follow next. Fantasy: watching a real case unfold and solving it.

## Demo scope

Web page, plain HTML + JS, no build step. Text-heavy, mouse driven. One case.

### Core loop
1. Intro briefing text.
2. Operatives (3, identical, no skills) offer **leads**: "Novák: I could question the neighbours."
   Each lead is tied to a person / place / object (or is a generic procedure).
3. Player assigns free operatives to leads, presses **Continue**.
4. Clock jumps to the next event: an operative finishes, or a scripted interrupt (phone call, walk-in).
5. Report popup: short written report + "what changed" list (new people, objects, timeline entries, leads, theory changes, checklist ticks).
6. Repeat. Limit: **100 days**.

### Lead depth
Repeating a lead goes deeper. Costs escalate: 0.5h → 2h → 4h → 8h → … Each level has authored content;
some levels are deliberately worthless (the coin in a worker's pocket). Context should tell the player when to stop.
Generic procedures (door-to-door canvassing, records check, phone records) – always available, long, steady payoff.

### Views (5 tabs) + time bar
1. **People** – background, spouse/partner, work, hobby, relationships, grudges, motives. Filled as discovered.
2. **Objects** – physical items AND findings (CCTV footage, phone records, lab results). Can be sent to lab (= a longer lead).
3. **Timeline** – rows = people (or places), columns = time around the crime. Confirmed vs claimed sightings.
   **Impossible alibis are detected automatically** – travel feasibility is authored in the case data, not judged by the player.
4. **Working theories** – proposed by operatives, not built freely. Have slots (suspect, motive, weapon…).
   Facts support or rule them out.
5. **Trial checklist** – suspect identified, in custody, motive, body, link suspect↔body/scene, weapon/method.
   Ticks automatically from facts. All ticked → "Go to trial" → verdict + score (days used).

Top bar: game time progress (day X / 100) and operatives (free / busy until).

### Cut from demo (later)
Operative skills, reliability of information (cheap later: "unconfirmed" tag + "verify" lead), player-attached evidence,
multiple simultaneous cases, deadline pressure beyond 100 days, graph visualizations.

### Architecture
- **Content is separate from structure.** The engine defines a blank slate: entity types (people, places, objects,
  timeline entries, leads, theories, checklist, scripted events) and how they behave. A case file only fills that slate
  with story. A different case must run on the same engine with only a different case file – no engine edits.
- `index.html` + `src/engine.js` (engine, UI) + `cases/<case>.js` (pure content, no logic).
- Case data: people, places (+ travel times), objects, facts, leads (with depth levels → reveals), scripted events (time/condition triggers), theories, checklist conditions.
- Most effort/risk = writing the case so that reading between the lines pays off.

## The case (twin approach)

User reads the twin case; agent builds the other, so the user plays it blind. Pair B chosen:
- **B2 (user reads):** Česká Lípa region 2021 – 76-year-old woman killed her partner, dismembered and burned the body over days; revealed when she confided in a neighbour.
- **B1 (we build):** Pardubice region, March 2014 – hunter killed his partner (29), pretended to search for her for weeks.

### B1 known facts (from search snippets only – full articles were unreachable, network blocks the news sites)
- Victim: 29-year-old woman, partner of a local hunter. Disappeared March 2014. Police launched a missing-person search.
- Perpetrator: her partner, a hunter. Played the devastated partner, helped with the search.
- Method (per indictment): stabbed 8× with a kitchen knife, struck 5× on the back of the head with a meat mallet, shot twice in the temple with a rifle. (Sources disagree on details.)
- Buried the body in a forest within his own hunting ground (revír). Searchers combed ponds and woods he knew well.
- Misdirection: had her ID card sent to her family so it looked like she lost it somewhere. Headline also claims he tried to mislead police with someone else's DNA (unconfirmed).
- Body found only after he himself led investigators to it (i.e. confessed).
- Trial: Regional Court Hradec Králové, Oct 2014 – 17 years + 5M CZK to the bereaved. Confirmed on appeal. Later he tried to sell the house where the murder happened while in custody.

### Adaptation rules
- Change all names. Invent missing details freely (investigation steps, side characters, red herrings, timeline, travel times).
- Needs: several plausible suspects/theories (e.g. she left voluntarily, ex-boyfriend, random attacker, partner),
  worthless deep leads, a scripted interrupt or two, the ID-card misdirection as a key clue, the partner's alibi/timeline cracking,
  hunting-ground knowledge pointing to the burial site.

## Sources
- https://cnn.iprima.cz/myslivec-z-pardubic-osmkrat-bodl-partnerku-dorazil-ji-vystrelem-pak-se-ucastnil-patrani-515669
- https://www.blesk.cz/clanek/zpravy-krimi/753445/podcast-myslivec-k-vrazde-pritelkyne-pouzil-nuz-palicku-i-pusku-policii-chtel-zmast-cizim-dna.html
- https://www.blesk.cz/clanek/zpravy-krimi/724745/polcar-zavrazdil-pritelkyni-a-predstiral-ze-ji-hleda-z-vazby-pak-prodaval-dum-kde-divku-zabil.html
- https://pardubicky.denik.cz/zlociny-a-soudy/za-vrazdu-kateriny-kolarove-si-muz-odsedi-17-let-a-zaplati-pet-milionu-20141023.html
- B2: https://cnn.iprima.cz/vrazda-otrasla-ceskem-vrazedkyne-rozrezala-muze-kuchynskym-nozem-474717

## Open
- Game text language: English assumed unless the user says Czech.
- Network: news sites blocked; allowing cnn.iprima.cz, blesk.cz, denik.cz would allow reading full articles.
- Český rozhlas is reachable (RSS: api.mujrozhlas.cz/rss/podcast/a55b623e-80ba-3b9c-9b6d-fd2a5e245276.rss), but has no
  transcripts – only ~5-sentence blurbs + MP3. Transcribing (Whisper) would need croaod.cz + huggingface.co allowed.
- Episode "Achillova pata vraždy" (Brno mordparta, partner reports missing woman) is a close match to B1 – possible
  future source if transcribed.
