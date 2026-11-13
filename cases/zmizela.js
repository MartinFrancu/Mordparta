// CASE CONTENT ONLY – no logic. Format: see CASE_FORMAT.md.
// Loosely based on a real 2014 case from the Pardubice region. Names, places and most details are invented.
const BODY_FOUND = [
  { t: 'object', id: 'body', text: 'Buried 60 cm deep in a tarp, 200 m from Pavel\'s feeder in Bor.' },
  { t: 'check', id: 'body', text: 'Found in Bor forest near Pavel\'s feeder.' },
  { t: 'slot', id: 'partner', slot: 'Body', value: 'Bor forest, near his feeder' },
  { t: 'tnote', id: 'voluntary', effect: 'ruleout', text: 'She is dead.' },
  { t: 'tnote', id: 'accident', effect: 'ruleout', text: 'Buried in a forest – not an accident.' },
  { t: 'tnote', id: 'partner', effect: 'support', text: 'Buried in his own hunting ground.' },
  { t: 'flag', id: 'body' },
];

window.CASE = {
  title: 'The Vanished Pharmacist',
  start: '2014-03-13 08:00',
  dayLimit: 100,
  operatives: ['Novák', 'Horáková', 'Sedláček'],

  intro:
    'Thursday morning, 13 March 2014. The file lands on my desk from the local police department.\n\n' +
    'Klára Vávrová, 29, pharmacy assistant in Pardubice. Lives with her partner in a family house in Dolní Lhota, a village fifteen minutes out of town. ' +
    'The partner reported her missing yesterday evening: on Tuesday morning she left for the bus to work and never arrived. Her phone is dead.\n\n' +
    'The local boys did the basics and found nothing. A woman with a steady job, no debts, who never misses a shift, does not just vanish. ' +
    'So now it is ours.\n\n' +
    'I have three people free: Novák, Horáková and Sedláček. They are already throwing ideas at me. I have to pick.',

  introEffects: [
    { t: 'person', id: 'klara' },
    { t: 'info', id: 'klara', key: 'Background', text: '29, pharmacy assistant in Pardubice. Lives with partner in Dolní Lhota.' },
    { t: 'person', id: 'pavel' },
    { t: 'info', id: 'pavel', key: 'Status', text: 'Reported Klára missing on Wednesday 12 March, 18:10.' },
    { t: 'tl', who: 'klara', where: 'busstop', from: '2014-03-11 06:40', to: '2014-03-11 06:52', status: 'claimed', text: 'Walked to the 06:52 bus to Pardubice (per partner Pavel).' },
  ],

  timeUp: 'A hundred days. The prosecutor has stopped returning my calls and the file goes on the shelf, to the cold-case people. Somewhere out there, Klára\'s mother still waits for a phone call.',

  places: {
    house: { name: 'Kostka house, Dolní Lhota', travel: { busstop: 3, lhota: 0, bor: 10, pce: 25, sawmill: 15, hk: 40, brno: 150 } },
    lhota: { name: 'Dolní Lhota (village)', travel: { busstop: 0, bor: 10, pce: 25, sawmill: 15, hk: 40, brno: 150 } },
    busstop: { name: 'Bus stop, Dolní Lhota', travel: { bor: 10, pce: 25, sawmill: 15, hk: 40, brno: 150 } },
    bor: { name: 'Bor forest (hunting ground)', travel: { pce: 30, sawmill: 20, hk: 45, brno: 150 } },
    pce: { name: 'Pardubice (town centre)', travel: { sawmill: 20, hk: 35, brno: 130 } },
    sawmill: { name: 'Sawmill, Holice', travel: { hk: 40, brno: 150 } },
    hk: { name: 'Hradec Králové', travel: { brno: 140 } },
    brno: { name: 'Brno', travel: {} },
  },

  people: {
    klara: { name: 'Klára Vávrová', role: 'missing woman' },
    pavel: { name: 'Pavel Kostka', role: 'Klára\'s partner' },
    jana: { name: 'Jana Vávrová', role: 'Klára\'s mother' },
    lucie: { name: 'Lucie Dvořáková', role: 'Klára\'s colleague and best friend' },
    tomas: { name: 'Tomáš Řezníček', role: 'Klára\'s ex-boyfriend' },
    hajkova: { name: 'Marie Hájková', role: 'neighbour across the road' },
    maly: { name: 'Jiří Malý', role: 'chairman of the local hunting association' },
    martin: { name: 'Martin Šebek', role: 'man from Brno who texted Klára' },
    bures: { name: 'Karel Bureš', role: 'foreman at the Holice sawmill' },
    ondra: { name: 'Ondřej Lukáš', role: 'apprentice at the sawmill' },
  },

  objects: {
    bathroom: { name: 'Klára\'s glasses, lens case and charger', desc: 'Left at the house.' },
    knifeblock: { name: 'Kitchen knife block', desc: 'In the Kostka kitchen.' },
    phoneK: { name: 'Klára\'s phone records', desc: 'From the operator.' },
    bank: { name: 'Klára\'s bank statements', desc: '' },
    phoneP: { name: 'Pavel\'s phone location data', desc: 'From the operator.' },
    idcard: { name: 'Envelope with Klára\'s ID card', desc: 'Posted to her mother. No sender, no note.' },
    cctv: { name: 'Post office CCTV, Pardubice 1', desc: 'Friday 14 March.' },
    receipts: { name: 'Klára\'s receipts for the house works', desc: 'Kept by her lawyer.' },
    rifles: { name: 'Pavel\'s registered guns', desc: 'Per the hunting association and police register.' },
    body: { name: 'Body of Klára Vávrová', desc: 'Found in the Bor forest.' },
    autopsy: { name: 'Autopsy report', desc: '' },
    blood: { name: 'Blood traces in the kitchen', desc: 'Found with luminol.' },
  },

  theories: [
    { id: 'voluntary', title: 'She left on her own', by: 'Novák', text: 'Adults do disappear on purpose. A new man, a breakdown, a fresh start.', slots: { Where: '?', Why: '?' } },
    { id: 'accident', title: 'Something happened on the way to the bus', by: 'Horáková', text: 'A fall, a car, a stranger. Dark March morning, a country road.', slots: { What: '?', Where: '?' } },
    { id: 'ex', title: 'The ex-boyfriend', by: 'Sedláček', requires: ['ex_known'], text: 'Exes who could not let go are a classic.', slots: { Suspect: 'Tomáš Řezníček', Motive: 'jealousy?' } },
    { id: 'partner', title: 'The partner', by: 'Horáková', requiresAny: ['contra:pavel', 'leaving', 'shots_heard', 'idcard_pavel'], text: 'In most of these, it is the one who reports them missing.', slots: { Suspect: 'Pavel Kostka', Motive: '?', Method: '?', Body: '?' } },
  ],

  events: [
    {
      id: 'idcard_arrives', at: '2014-03-15 11:00', title: 'Phone call: Klára\'s mother', who: 'Jana Vávrová',
      text: 'Mrs. Vávrová, in tears. Saturday post: an envelope addressed to her in block capitals. No sender. Inside, Klára\'s ID card. Nothing else, not a word.\n\nPostmark: Pardubice 1, Friday 14 March.\n\nPavel Kostka has already called her: "You see? She is alive. She wants us to leave her alone."',
      effects: [
        { t: 'person', id: 'jana' },
        { t: 'object', id: 'idcard', text: 'Arrived Saturday 15 March. Postmark Pardubice 1, Friday 14 March.' },
        { t: 'tnote', id: 'voluntary', effect: 'support', text: 'Someone posted her ID card – maybe her?' },
        { t: 'flag', id: 'idcard' },
      ],
    },
    {
      id: 'malý_calls', requires: ['body'], delay: 2, title: 'Phone call: hunting association', who: 'Jiří Malý',
      text: 'Malý, the hunting chairman, calls me directly. He heard about the find in Bor. "I should have said something earlier. Pavel was the one who organised the search of Bor. Alone. Told everyone else to go to the ponds." He sounds ashamed.',
      effects: [{ t: 'person', id: 'maly' }, { t: 'info', id: 'maly', key: 'Said', text: 'Pavel insisted on searching Bor alone and sent volunteers to the ponds.' }, { t: 'flag', id: 'steered_search' }],
    },
  ],

  leads: [
    // ---------------- start leads ----------------
    {
      id: 'pavel', by: 'Novák', title: 'Interview the partner, Pavel Kostka', offer: 'I could go and talk to the partner. He reported it, he will want to talk.',
      levels: [
        {
          hours: 1,
          report: 'Kostka was waiting for us at the gate. 38, works at the sawmill in Holice, drives a dark green Škoda Octavia estate.\n\nHis story: Monday evening they watched TV, went to bed around ten. He slept through the night. Tuesday 06:40 Klára left on foot for the 06:52 bus, as every working day. He left for the sawmill at seven. She did not come home Tuesday – he thought she stayed at her mother\'s. Wednesday he got worried and called us.\n\nCalm. Cooperative. A lot of precise times for a man to whom nothing happened.',
          effects: [
            { t: 'info', id: 'pavel', key: 'Background', text: '38, works at the sawmill in Holice. Drives a dark green Škoda Octavia estate.' },
            { t: 'info', id: 'pavel', key: 'Relationship', text: 'With Klára 4 years. The house is his.' },
            { t: 'tl', id: 'pavel_night', who: 'pavel', where: 'house', from: '2014-03-10 22:00', to: '2014-03-11 06:40', status: 'claimed', text: 'Says he slept at home all night.' },
            { t: 'tl', who: 'pavel', where: 'sawmill', from: '2014-03-11 07:15', to: '2014-03-11 15:00', status: 'claimed', text: 'Says he was at work.' },
            { t: 'tl', who: 'klara', where: 'house', from: '2014-03-10 22:00', to: '2014-03-11 06:40', status: 'claimed', text: 'At home, asleep (per Pavel).' },
            { t: 'flag', id: 'met_pavel' },
          ],
        },
        {
          hours: 2,
          report: 'Second, longer talk at his kitchen table. He brings up himself that Klára has an ex, a Tomáš Řezníček, who "used to harass her". He also keeps coming back to the fish ponds behind the village: "She liked walking there. Maybe she slipped."\n\nHe is a hunter, member of the local association, his ground is the Bor forest. "I have already walked all of Bor myself. She is not there."',
          effects: [
            { t: 'person', id: 'tomas' },
            { t: 'info', id: 'pavel', key: 'Hobby', text: 'Hunter. Member of the local association, his ground is the Bor forest. Says he searched Bor himself.' },
            { t: 'flag', id: 'ex_known' }, { t: 'flag', id: 'ponds_suggested' }, { t: 'flag', id: 'hunter_known' },
          ],
        },
        {
          hours: 4,
          report: 'We went through the week again, hour by hour. His story does not move by a minute. Not one "I am not sure". He asked twice whether the divers have been to the ponds yet.',
          effects: [{ t: 'info', id: 'pavel', key: 'Impression', text: 'Story word-perfect on every retelling. Pushes the ponds.' }],
        },
        {
          hours: 8,
          report: 'He has had enough. He says he is the victim here, and anything more goes through his lawyer. We got nothing new.',
          effects: [],
        },
      ],
    },
    {
      id: 'house', by: 'Horáková', title: 'Look around the house', offer: 'Kostka will let us look around the house. No warrant, just looking.',
      levels: [
        {
          hours: 2,
          report: 'Small family house, very tidy. Freshly mopped floors, bleach smell in the kitchen – Kostka says he cleans when he is nervous.\n\nHer handbag and phone are gone, which fits leaving for work. But her glasses and contact lens case are on the bathroom shelf, and her phone charger is still in the socket.\n\nOne small thing: the knife block on the counter has one empty slot. The big one.',
          effects: [
            { t: 'object', id: 'bathroom', text: 'Glasses and lens case on the bathroom shelf; charger still plugged in.' },
            { t: 'object', id: 'knifeblock', text: 'One slot empty – the largest knife is missing.' },
            { t: 'tnote', id: 'voluntary', effect: 'weaken', text: 'She left her glasses, lenses and charger.' },
            { t: 'flag', id: 'house_seen' },
          ],
        },
        {
          hours: 4,
          report: 'Without a warrant we can only look. Wardrobe full of her clothes, her suitcase on top of it, dusty. Nothing packed.',
          effects: [{ t: 'tnote', id: 'voluntary', effect: 'weaken', text: 'Nothing packed, suitcase untouched.' }],
        },
        { hours: 8, report: 'There is nothing more to see without a warrant.', effects: [] },
      ],
    },
    {
      id: 'mother', by: 'Sedláček', title: 'Talk to Klára\'s mother', offer: 'I could visit the mother. Mothers know things.',
      levels: [
        {
          hours: 1,
          report: 'Jana Vávrová, Pardubice. Klára called her every evening. On Monday at 18:30 she sounded tired but normal. On Tuesday she did not call. Klára has been with Pavel four years, moved into his house two years ago.\n\nBest friend: Lucie Dvořáková, they work together at the pharmacy.',
          effects: [
            { t: 'person', id: 'jana' }, { t: 'person', id: 'lucie' },
            { t: 'info', id: 'klara', key: 'Habits', text: 'Called her mother every evening. Last call Monday 18:30. No call on Tuesday.' },
            { t: 'flag', id: 'lucie_known' },
          ],
        },
        {
          hours: 2,
          report: 'She never liked Pavel. "Tight with money, and with her." Klára put her grandmother\'s inheritance, about 400 thousand, into his house – the roof and the kitchen. Nothing on paper, as far as the mother knows.',
          effects: [{ t: 'info', id: 'klara', key: 'Money', text: 'Put ~400 000 CZK inheritance into Pavel\'s house (roof, kitchen).' }, { t: 'info', id: 'jana', key: 'Opinion', text: 'Dislikes Pavel: "tight with money, and with her".' }, { t: 'flag', id: 'money_hint' }],
        },
        { hours: 4, report: 'Mostly grief. She asks us to find her daughter. Nothing new for the case.', effects: [] },
      ],
    },
    {
      id: 'canvass', by: 'Novák', title: 'Door-to-door in Dolní Lhota', offer: 'Standard procedure: knock on every door in the village.',
      levels: [
        {
          hours: 4,
          report: 'Twenty-two houses. Nobody remembers Klára on Tuesday morning. The bus stop is visible from three windows.\n\nThe old lady across the road from the Kostka house, a Mrs. Hájková, says she will only talk to "someone serious".',
          effects: [{ t: 'person', id: 'hajkova' }, { t: 'flag', id: 'hajkova_known' }],
        },
        {
          hours: 8,
          report: 'Second round in the evenings, to catch people back from work. The driver of the 06:52 bus lives here. Klára was a regular; he does not remember her on Tuesday – but he would not swear to it.',
          effects: [{ t: 'tnote', id: 'accident', effect: 'weaken', text: 'Bus driver does not remember her on Tuesday.' }],
        },
        {
          hours: 16,
          report: 'The whole village knows we are here. Mostly gossip. One man says Kostka "has a temper when he drinks". Second-hand.',
          effects: [{ t: 'info', id: 'pavel', key: 'Gossip', text: '"Has a temper when he drinks" (second-hand).' }],
        },
        { hours: 24, report: 'Nothing new. People start to avoid us.', effects: [] },
      ],
    },
    {
      id: 'phoneK', by: 'Horáková', title: 'Request Klára\'s phone records', offer: 'I can file a request with the operator for her phone. Takes a couple of days.',
      levels: [
        {
          hours: 48,
          report: 'The operator answered. Klára\'s phone last connected to the network on Monday 10 March at 22:14, through the cell covering Dolní Lhota. Then it went silent – switched off or destroyed – and never came back.\n\nOn Tuesday morning at the bus stop, she did not have a working phone.',
          effects: [
            { t: 'object', id: 'phoneK', text: 'Last signal Monday 10 March 22:14, Dolní Lhota cell. Never back on.' },
            { t: 'tl', who: 'klara', where: 'lhota', from: '2014-03-10 22:14', status: 'confirmed', text: 'Last signal from her phone.' },
            { t: 'tnote', id: 'voluntary', effect: 'weaken', text: 'Phone dead since Monday night, before she supposedly left.' },
            { t: 'tnote', id: 'accident', effect: 'weaken', text: 'Phone died Monday night, not on the way to the bus.' },
            { t: 'flag', id: 'phoneK' },
          ],
        },
        {
          hours: 8,
          report: 'Three months of calls: mother, Lucie, the pharmacy, Pavel. And one Brno number with dozens of texts in February. Registered to a Martin Šebek.',
          effects: [{ t: 'person', id: 'martin' }, { t: 'flag', id: 'martin_known' }],
        },
        { hours: 16, report: 'I went through every number again. Nothing else stands out.', effects: [] },
      ],
    },
    {
      id: 'bank', by: 'Sedláček', title: 'Check Klára\'s bank account', offer: 'I can ask the bank for her account. People on the run need money.',
      levels: [
        {
          hours: 24,
          report: 'Last payment: Monday 10 March, 17:48, supermarket in Pardubice, 312 CZK. Nothing since. 41 000 CZK sitting on the account, untouched. People who run away take money.',
          effects: [
            { t: 'object', id: 'bank', text: 'Last payment Monday 17:48 in Pardubice. 41 000 CZK untouched since.' },
            { t: 'tl', who: 'klara', where: 'pce', from: '2014-03-10 17:48', status: 'confirmed', text: 'Card payment at a supermarket.' },
            { t: 'tnote', id: 'voluntary', effect: 'weaken', text: 'Money untouched.' },
          ],
        },
        {
          hours: 8,
          report: 'Her savings account: 412 000 CZK withdrawn in three parts in 2012, then empty. Matches the inheritance going into the house.',
          effects: [{ t: 'object', id: 'bank', text: 'Savings of 412 000 CZK withdrawn in 2012.' }, { t: 'flag', id: 'money_confirmed' }],
        },
        { hours: 16, report: 'Nothing else in the accounts.', effects: [] },
      ],
    },
    {
      id: 'hospitals', by: 'Sedláček', title: 'Check hospitals, morgues and accident reports', offer: 'Routine: hospitals, morgues, traffic accidents.',
      levels: [
        { hours: 2, report: 'No unidentified women in hospitals or morgues in the region. No accidents involving a pedestrian on Tuesday.', effects: [{ t: 'tnote', id: 'accident', effect: 'weaken', text: 'No hospital, morgue or accident record.' }] },
        { hours: 4, report: 'Neighbouring regions too. Nothing.', effects: [] },
        { hours: 8, report: 'The whole republic. Nothing.', effects: [] },
      ],
    },

    // ---------------- unlocked leads ----------------
    {
      id: 'hajkova', by: 'Novák', requires: ['hajkova_known'], title: 'Talk to Mrs. Hájková', offer: 'Shall I go back to the old lady across the road? She wants someone serious.',
      levels: [
        {
          hours: 1,
          report: 'Eighty-one, insomnia, lives at her window. Monday night, around 22:20, she heard "two bangs, like shots" from the direction of the Kostka house. She did not think much of it – hunters around here shoot all the time.\n\nAround 23:30 Pavel\'s car drove off. It came back "after two, maybe half past".\n\nTuesday from six she was at the window, she always watches the bus. "Klárka was not there. She always waves at me."',
          effects: [
            { t: 'info', id: 'hajkova', key: 'Statement', text: 'Two bangs ~22:20 Monday; Pavel\'s car left ~23:30, back after 02:00; Klára not at the bus stop Tuesday.' },
            { t: 'tl', who: 'pavel', where: 'lhota', from: '2014-03-10 23:30', status: 'claimed', text: 'His car drives off (per Mrs. Hájková).' },
            { t: 'tnote', id: 'accident', effect: 'weaken', text: 'Neighbour says she never reached the bus stop.' },
            { t: 'flag', id: 'shots_heard' },
          ],
        },
        {
          hours: 2,
          report: 'She tells it again, the same way. Adds that the kitchen light in the Kostka house was on all night. Nothing else.',
          effects: [{ t: 'info', id: 'hajkova', key: 'Added', text: 'Kitchen light at the Kostka house on all night.' }],
        },
        { hours: 4, report: 'She made us a cake. Nothing new.', effects: [] },
      ],
    },
    {
      id: 'lucie', by: 'Horáková', requires: ['lucie_known'], title: 'Talk to Lucie Dvořáková', offer: 'Let me talk to the best friend from the pharmacy.',
      levels: [
        {
          hours: 1,
          report: 'Lucie says Klára was not happy. Pavel controlled the money, didn\'t like her going out. Last time she saw her: Monday, end of shift, 17:30.',
          effects: [{ t: 'info', id: 'klara', key: 'Relationship', text: 'Unhappy. Pavel controlled money and her free time (per Lucie).' }],
        },
        {
          hours: 2,
          report: 'She was going to leave him. She had a flat lined up in Pardubice from April. She told Pavel on Sunday, 9 March.',
          effects: [{ t: 'info', id: 'klara', key: 'Plans', text: 'Planned to move out in April. Told Pavel on Sunday 9 March.' }, { t: 'slot', id: 'partner', slot: 'Motive', value: 'she was leaving him?' }, { t: 'flag', id: 'leaving' }],
        },
        {
          hours: 4,
          report: 'It was about the money. Klára wanted her 400 thousand back. Pavel told her she would "never see a crown". She had an appointment with a lawyer, JUDr. Kalinová, on Wednesday 12 March. She never made it.',
          effects: [{ t: 'info', id: 'klara', key: 'Money', text: 'Wanted her 400 000 back. Lawyer appointment Wednesday 12 March.' }, { t: 'slot', id: 'partner', slot: 'Motive', value: 'money – she wanted her 400 000 back' }, { t: 'flag', id: 'lawyer_known' }],
        },
        { hours: 8, report: 'She cried a lot. Nothing new.', effects: [] },
      ],
    },
    {
      id: 'lawyer', by: 'Sedláček', requires: ['lawyer_known'], title: 'Contact the lawyer, JUDr. Kalinová', offer: 'I could check the lawyer Lucie mentioned.',
      levels: [
        {
          hours: 2,
          report: 'Confirmed. Appointment Wednesday 12 March, 10:00, about reclaiming her investment into her partner\'s house – about 400 000 CZK. Klára brought receipts in January. On 5 March the lawyer sent Pavel Kostka a formal letter. He knew.',
          effects: [
            { t: 'object', id: 'receipts', text: 'Receipts for ~400 000 CZK of works on Pavel\'s house. Lawyer\'s letter to Pavel sent 5 March.' },
            { t: 'tnote', id: 'partner', effect: 'support', text: 'Pavel got a lawyer\'s letter about the money five days before she vanished.' },
            { t: 'check', id: 'motive', text: 'Klára was suing Pavel for 400 000 CZK and leaving him.' },
            { t: 'flag', id: 'motive' },
          ],
        },
        { hours: 4, report: 'Nothing more the lawyer can tell us.', effects: [] },
      ],
    },
    {
      id: 'tomas', by: 'Sedláček', requires: ['ex_known'], title: 'Find and interview the ex, Tomáš Řezníček', offer: 'I could find the ex-boyfriend Kostka mentioned.',
      levels: [
        {
          hours: 4,
          report: 'Hradec Králové, night shifts at a plastics factory. Split with Klára in 2019; there was a complaint back then, he kept calling her. Now he seems genuinely shocked. Says he worked the night shift Monday 22:00 to Tuesday 06:00.',
          effects: [
            { t: 'info', id: 'tomas', key: 'Background', text: 'Hradec Králové, factory night shifts. Harassment complaint in 2019.' },
            { t: 'tl', who: 'tomas', where: 'hk', from: '2014-03-10 22:00', to: '2014-03-11 06:00', status: 'claimed', text: 'Says he was on night shift.' },
          ],
        },
        {
          hours: 8,
          report: 'Factory turnstile: in at 21:52 Monday, out at 06:04 Tuesday. Two colleagues on the same line confirm. He did not leave.',
          effects: [
            { t: 'tl', who: 'tomas', where: 'hk', from: '2014-03-10 21:52', to: '2014-03-11 06:04', status: 'confirmed', text: 'Factory turnstile + two colleagues.' },
            { t: 'tnote', id: 'ex', effect: 'ruleout', text: 'Solid alibi for the whole night.' },
          ],
        },
        { hours: 8, report: 'Nothing new. He offered to help with the search.', effects: [] },
      ],
    },
    {
      id: 'martin', by: 'Novák', requires: ['martin_known'], title: 'Trace the Brno number (Martin Šebek)', offer: 'The Brno number. Could be a lover she ran to.',
      levels: [
        {
          hours: 8,
          report: 'Martin Šebek, 34, Brno, also a pharmacist. They met on an online forum and chatted. He is married and very embarrassed. Says they never met in person.',
          effects: [{ t: 'info', id: 'martin', key: 'Background', text: 'Pharmacist, married. Chatted with Klára online, never met (he says).' }],
        },
        {
          hours: 8,
          report: 'Brno colleagues checked him: at home with his wife Monday night, at work Tuesday. His phone never left Brno.',
          effects: [
            { t: 'tl', who: 'martin', where: 'brno', from: '2014-03-10 18:00', to: '2014-03-11 18:00', status: 'confirmed', text: 'Phone and wife: in Brno the whole time.' },
            { t: 'tnote', id: 'voluntary', effect: 'weaken', text: 'The Brno man is not hiding her.' },
          ],
        },
        { hours: 8, report: 'Nothing more there.', effects: [] },
      ],
    },
    {
      id: 'ponds', by: 'Horáková', requires: ['ponds_suggested'], title: 'Search the fish ponds with divers', offer: 'Kostka keeps saying the ponds. I can get fire brigade divers.',
      levels: [
        { hours: 8, report: 'Three ponds, cold water, zero visibility. Nothing.', effects: [] },
        { hours: 16, report: 'All seven ponds. Nothing. Kostka came to watch and brought coffee for the divers.', effects: [{ t: 'info', id: 'pavel', key: 'Behaviour', text: 'Came to watch the pond search, brought coffee for divers.' }] },
        { hours: 24, report: 'Drained the smallest one. Nothing but carp.', effects: [] },
      ],
    },
    {
      id: 'phoneP', by: 'Horáková', requires: ['met_pavel'], title: 'Request Pavel\'s phone location data', offer: 'I could request Kostka\'s phone location data. Just to tick the box.',
      levels: [
        {
          hours: 48,
          report: 'Pavel\'s phone, Monday night: from 23:41 to 02:07 it was connected to the tower at Bor – a tower that covers mostly forest. His hunting ground. At 02:30 it is back on the Dolní Lhota cell.',
          effects: [
            { t: 'object', id: 'phoneP', text: 'Monday 23:41–02:07 on the Bor forest tower.' },
            { t: 'tl', who: 'pavel', where: 'bor', from: '2014-03-10 23:41', to: '2014-03-11 02:07', status: 'confirmed', text: 'Phone on the Bor forest tower.' },
            { t: 'flag', id: 'phoneP' },
          ],
        },
        {
          hours: 8,
          report: 'Rest of the week. Friday 14 March, 09:50 to 10:40, his phone is in Pardubice town centre. The sawmill is in Holice.',
          effects: [{ t: 'tl', who: 'pavel', where: 'pce', from: '2014-03-14 09:50', to: '2014-03-14 10:40', status: 'confirmed', text: 'Phone in Pardubice centre.' }, { t: 'flag', id: 'pavel_pce_friday' }],
        },
        { hours: 16, report: 'Nothing else unusual in his data.', effects: [] },
      ],
    },
    {
      id: 'sawmill', by: 'Sedláček', requires: ['met_pavel'], title: 'Check Pavel at the sawmill', offer: 'I could check with his employer at the sawmill.',
      levels: [
        {
          hours: 2,
          report: 'Foreman Karel Bureš: Pavel came in Tuesday at 07:15, worked normally till three. Friday 14 March he took the day off – "doctor in Pardubice".',
          effects: [
            { t: 'person', id: 'bures' },
            { t: 'tl', who: 'pavel', where: 'sawmill', from: '2014-03-11 07:15', to: '2014-03-11 15:00', status: 'confirmed', text: 'At work (foreman, time sheet).' },
            { t: 'info', id: 'pavel', key: 'Work', text: 'Day off Friday 14 March – "doctor in Pardubice".' },
          ],
        },
        {
          hours: 4,
          report: 'Bureš remembers one odd thing. Thursday, Pavel asked the apprentice, young Ondra, to lick the stamp and seal an envelope for him – "I have a cold". Ondra did it. Bureš thought nothing of it.',
          effects: [{ t: 'person', id: 'ondra' }, { t: 'info', id: 'bures', key: 'Said', text: 'Thursday 13 March Pavel had apprentice Ondra seal an envelope for him.' }, { t: 'flag', id: 'stamp_trick' }],
        },
        { hours: 4, report: 'A good worker, quiet, they say. Nothing else.', effects: [] },
      ],
    },
    {
      id: 'envelope', by: 'Novák', requires: ['idcard'], title: 'Send the envelope and ID card to the lab', offer: 'The envelope should go to the lab. Prints, DNA.',
      levels: [
        { hours: 24, report: 'No fingerprints on the ID card – wiped. None usable on the envelope. Address in block capitals.', effects: [{ t: 'object', id: 'idcard', text: 'ID card wiped clean. No usable prints.' }] },
        {
          hours: 48,
          report: 'DNA from the flap and the stamp: a male profile. Not in the database.',
          effects: [{ t: 'object', id: 'idcard', text: 'Male DNA on flap and stamp. Unknown.' }, { t: 'flag', id: 'envelope_dna' }],
        },
        { hours: 48, report: 'Nothing more to extract.', effects: [] },
      ],
    },
    {
      id: 'swabPavel', by: 'Novák', requires: ['envelope_dna', 'met_pavel'], title: 'Ask Pavel for a DNA swab', offer: 'Shall I ask Kostka for a voluntary swab to compare with the envelope?',
      levels: [
        {
          hours: 24,
          report: 'He gave it willingly. Almost eagerly. Result: no match. The DNA on the envelope is not his.',
          effects: [{ t: 'object', id: 'idcard', text: 'Envelope DNA is NOT Pavel\'s.' }, { t: 'tnote', id: 'partner', effect: 'weaken', text: 'His DNA is not on the envelope.' }],
        },
      ],
    },
    {
      id: 'swabOndra', by: 'Novák', requires: ['envelope_dna', 'stamp_trick'], title: 'Swab the apprentice, Ondřej Lukáš', offer: 'The apprentice who licked an envelope for Kostka. Let me swab him.',
      levels: [
        {
          hours: 24,
          report: 'Match. The envelope with Klára\'s ID card was sealed by the apprentice at the sawmill on Thursday, on Pavel Kostka\'s request – the day before it was posted in Pardubice.',
          effects: [
            { t: 'object', id: 'idcard', text: 'DNA = apprentice Ondřej, who sealed it for Pavel on Thursday.' },
            { t: 'tnote', id: 'voluntary', effect: 'ruleout', text: 'The ID card was sent by Pavel, not by her.' },
            { t: 'tnote', id: 'partner', effect: 'support', text: 'Pavel faked a sign of life.' },
            { t: 'flag', id: 'idcard_pavel' },
          ],
        },
      ],
    },
    {
      id: 'post', by: 'Sedláček', requires: ['idcard'], title: 'Get the post office CCTV', offer: 'Pardubice 1 has cameras. I could sit through Friday\'s footage.',
      levels: [
        { hours: 8, report: 'Friday morning, hundreds of people. Nothing yet. I need more hours with it.', effects: [] },
        {
          hours: 16,
          report: '10:12, counter hall: a man in a green hunting-style jacket and cap drops one envelope in the box. Face hidden under the cap. About 180 cm.',
          effects: [{ t: 'object', id: 'cctv', text: '10:12 – man in green hunting jacket and cap posts one envelope.' }, { t: 'flag', id: 'cctv_man' }],
        },
        {
          hours: 16,
          report: 'Car park camera, 10:05: a dark green Škoda Octavia estate parks; 10:16 leaves. Plate unreadable.',
          effects: [{ t: 'object', id: 'cctv', text: '10:05–10:16 dark green Škoda Octavia estate in the car park.' }, { t: 'tnote', id: 'partner', effect: 'support', text: 'A car like Pavel\'s at the post office.' }],
        },
        { hours: 16, report: 'Nothing more on the tapes.', effects: [] },
      ],
    },
    {
      id: 'hunters', by: 'Novák', requires: ['hunter_known'], title: 'Talk to the hunting association', offer: 'Kostka is a hunter. The association will know him and his forest.',
      levels: [
        {
          hours: 2,
          report: 'Chairman Jiří Malý. Pavel has been a member 12 years. Registered guns: a 7×64 rifle and a shotgun. His section of Bor is the eastern part, around the big feeder.',
          effects: [
            { t: 'person', id: 'maly' },
            { t: 'object', id: 'rifles', text: '7×64 hunting rifle and a shotgun, registered to Pavel.' },
            { t: 'info', id: 'pavel', key: 'Guns', text: '7×64 rifle, shotgun.' },
          ],
        },
        {
          hours: 4,
          report: 'When the village organised a search, Pavel insisted on doing Bor alone – "I know every tree". He sent the volunteers to the ponds.',
          effects: [{ t: 'info', id: 'maly', key: 'Said', text: 'Pavel searched Bor alone, sent volunteers to the ponds.' }, { t: 'flag', id: 'steered_search' }],
        },
        {
          hours: 8,
          report: 'Malý went to his own stand in Bor on Sunday. Near Pavel\'s feeder he noticed freshly dug ground covered with spruce branches. He thought Pavel was making a salt lick.',
          effects: [{ t: 'info', id: 'maly', key: 'Saw', text: 'Freshly dug ground under spruce branches near Pavel\'s feeder.' }, { t: 'flag', id: 'dug_spot' }],
        },
        { hours: 8, report: 'Hunting gossip. Nothing new.', effects: [] },
      ],
    },
    {
      id: 'searchBor', by: 'Horáková', requires: ['hunter_known'], hiddenBy: ['body'], title: 'Search the Bor forest with cadaver dogs', offer: 'Bor is huge, but with dogs and a line of cadets we can comb it.',
      levels: [
        { hours: 16, report: '900 hectares. We covered the western third. Nothing.', effects: [] },
        { hours: 24, report: 'The middle part. Nothing. Cadets are exhausted.', effects: [] },
        { hours: 32, report: 'Eastern part. Near the big feeder the dog sits down at a patch of disturbed ground under spruce branches. We dig.\n\nIt is her. Wrapped in a tarp, two hundred metres from Pavel Kostka\'s feeder.', effects: BODY_FOUND },
      ],
    },
    {
      id: 'dig', by: 'Horáková', requires: ['dug_spot'], hiddenBy: ['body'], title: 'Dig at the spot near Pavel\'s feeder', offer: 'The spot Malý saw near Kostka\'s feeder. Let me take a dog and a spade.',
      levels: [
        {
          hours: 6,
          report: 'Under the spruce branches, sixty centimetres down, wrapped in a tarp: Klára Vávrová.\n\nTwo hundred metres from Pavel Kostka\'s feeder. In the part of the forest he "searched himself".',
          effects: BODY_FOUND,
        },
      ],
    },
    {
      id: 'autopsy', by: 'Sedláček', requires: ['body'], title: 'Autopsy', offer: 'I will attend the autopsy.',
      levels: [
        {
          hours: 24,
          report: 'Eight stab wounds to the chest and back, a single-edged blade about 20 cm – a big kitchen knife. Five blows to the back of the head with a blunt object with a patterned surface – like a meat tenderiser. Two gunshot wounds to the left temple, rifle. Death: Monday night. Stomach: dinner.',
          effects: [
            { t: 'object', id: 'autopsy', text: '8 stab wounds (large kitchen knife), 5 blows (meat tenderiser?), 2 rifle shots to the temple. Died Monday night.' },
            { t: 'check', id: 'method', text: 'Knife, meat tenderiser, rifle.' },
            { t: 'slot', id: 'partner', slot: 'Method', value: 'knife, tenderiser, rifle' },
            { t: 'tl', who: 'klara', where: 'house', from: '2014-03-10 22:00', status: 'confirmed', text: 'Died Monday night, after dinner (autopsy).' },
            { t: 'flag', id: 'autopsy' },
          ],
        },
        {
          hours: 24,
          report: 'Bullet fragments recovered from the skull: calibre 7×64, a hunting cartridge.',
          effects: [{ t: 'object', id: 'autopsy', text: 'Bullet fragments: 7×64.' }, { t: 'flag', id: 'bullet' }],
        },
        { hours: 24, report: 'Toxicology clean. Nothing else.', effects: [] },
      ],
    },
    {
      id: 'warrant', by: 'Novák', requiresAny: ['contra:pavel', 'idcard_pavel', 'body'], title: 'Ask the prosecutor for a search warrant for the house', offer: 'We have enough for a proper search of Kostka\'s house. I can get the warrant.',
      levels: [{ hours: 4, report: 'The prosecutor signed it.', effects: [{ t: 'flag', id: 'warrant' }] }],
    },
    {
      id: 'searchHouse', by: 'Horáková', requires: ['warrant'], title: 'Forensic search of the house', offer: 'Warrant is signed. Let me take the technicians to the house.',
      levels: [
        {
          hours: 8,
          report: 'Luminol. The kitchen floor lights up – blood washed into the grout, more in the sink trap. The big knife is missing from the block. Klára\'s mother says they had a meat tenderiser; there is none in the house.',
          effects: [{ t: 'object', id: 'blood', text: 'Washed-out blood on the kitchen floor and in the sink trap.' }, { t: 'object', id: 'knifeblock', text: 'Large knife and meat tenderiser missing from the house.' }],
        },
        {
          hours: 24,
          report: 'Lab: the blood from the kitchen is Klára\'s.',
          effects: [
            { t: 'object', id: 'blood', text: 'DNA: Klára\'s blood.' },
            { t: 'check', id: 'link', text: 'Klára\'s blood in Pavel\'s kitchen.' },
            { t: 'tl', who: 'klara', where: 'house', from: '2014-03-10 22:20', status: 'confirmed', text: 'Killed in the kitchen (blood).' },
            { t: 'flag', id: 'blood' },
          ],
        },
        {
          hours: 8,
          report: 'Gun safe: the 7×64 rifle, freshly cleaned and oiled. Seized.',
          effects: [{ t: 'object', id: 'rifles', text: '7×64 rifle seized – freshly cleaned.' }, { t: 'flag', id: 'rifle_seized' }],
        },
        { hours: 8, report: 'Nothing more in the house.', effects: [] },
      ],
    },
    {
      id: 'ballistics', by: 'Sedláček', requires: ['rifle_seized', 'bullet'], title: 'Ballistics: Pavel\'s rifle vs. the bullets', offer: 'We have his rifle and the fragments. Ballistics?',
      levels: [
        {
          hours: 48,
          report: 'Match. The bullets in Klára\'s head were fired from Pavel Kostka\'s 7×64 rifle.',
          effects: [{ t: 'object', id: 'rifles', text: 'Ballistics: the fatal bullets came from this rifle.' }, { t: 'check', id: 'link', text: 'Bullets fired from Pavel\'s rifle.' }, { t: 'flag', id: 'ballistics' }],
        },
      ],
    },
    {
      id: 'arrest', by: 'Novák', requires: ['body'], requiresAny: ['contra:pavel', 'idcard_pavel', 'blood'], title: 'Arrest Pavel Kostka', offer: 'That is enough. I can pick up Kostka.',
      levels: [
        {
          hours: 2,
          report: 'Picked him up at the sawmill. No resistance. He asked if he could finish his coffee.',
          effects: [
            { t: 'check', id: 'suspect', text: 'Pavel Kostka.' },
            { t: 'check', id: 'custody', text: 'Arrested at the sawmill.' },
            { t: 'flag', id: 'arrested' },
          ],
        },
      ],
    },
    {
      id: 'interrogate', by: 'Novák', requires: ['arrested'], title: 'Interrogate Pavel Kostka', offer: 'Let me sit with him.',
      levels: [
        { hours: 4, report: 'He denies everything for four hours. "She left me. I don\'t know anything."', effects: [] },
        {
          hours: 8,
          report: 'We lay it out: the phone in Bor at midnight, the envelope, the apprentice. He breaks.\n\nSunday she told him she was leaving and suing for the money. Monday evening they argued in the kitchen – "she said I would lose the house". He grabbed the knife. Then the tenderiser. Then he went for the rifle, "so she would not suffer". At half past eleven he drove her to Bor and buried her by his feeder. He cleaned all night. He threw the knife and tenderiser in a pond – "that\'s why I didn\'t want divers there first".',
          effects: [{ t: 'info', id: 'pavel', key: 'Confession', text: 'Killed her in the kitchen Monday night after an argument about money; buried her in Bor.' }, { t: 'flag', id: 'confession' }],
        },
        { hours: 8, report: 'He just repeats the confession. Nothing new.', effects: [] },
      ],
    },
  ],

  trial: {
    strengthFlags: ['motive', 'blood', 'ballistics', 'idcard_pavel', 'contra:pavel', 'confession'],
    verdicts: [
      { min: 5, text: 'Regional Court: Pavel Kostka is guilty of murder. 17 years, and 5 million CZK to Klára\'s family. The appeal court confirms. The defence never found a gap.' },
      { min: 3, text: 'Regional Court: guilty of murder, 15 years. The defence attacked the gaps in the evidence and the appeal drags on, but the verdict stands.' },
      { min: 0, text: 'The case is thin. The court convicts only of manslaughter – 8 years. Klára\'s mother leaves the courtroom without a word.' },
    ],
  },
};
