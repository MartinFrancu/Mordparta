// CASE CONTENT ONLY – no logic. Format: see CASE_FORMAT.md.
// Invented story in the style of a real-world taxi-driver murder. All names and details are fictional.
(window.CASES = window.CASES || []).push({
  id: 'taxi',
  title: 'The Last Fare',
  teaser: 'Olomouc, November 2009. A taxi driver is found stabbed in his car on a field road. The cash is gone.',
  start: '2009-11-21 09:00',
  dayLimit: 100,
  operatives: ['Novák', 'Horáková', 'Sedláček'],

  intro:
    'Saturday, 21 November 2009, nine in the morning. I am standing on a muddy field road outside Velký Týnec, ten kilometres south of Olomouc.\n\n' +
    'At 07:20 a woman walking her dog found a yellow City Taxi Škoda Superb here, engine off, driver\'s door shut. ' +
    'Behind the wheel: Miroslav Hrubý, 52, taxi driver. Stabbed. His wallet is gone and the cash box in the door is empty.\n\n' +
    'Everyone already says "robbery". Taxi drivers carry cash at night, it happens. Maybe.\n\n' +
    'Novák, Horáková and Sedláček are here with me. The technicians are waiting for someone to tell them what matters.',

  introEffects: [
    { t: 'person', id: 'hruby' },
    { t: 'info', id: 'hruby', key: 'Background', text: '52, taxi driver at City Taxi Olomouc for 14 years. Married, lives in Nemilany.' },
    { t: 'info', id: 'hruby', key: 'Found', text: 'Saturday 07:20 in his taxi on a field road outside Velký Týnec. Stabbed. Wallet and cash missing.' },
    { t: 'person', id: 'vera' },
    { t: 'info', id: 'vera', key: 'Background', text: 'Hrubý\'s wife. Informed at 08:30.' },
    { t: 'person', id: 'pokorna' },
    { t: 'info', id: 'pokorna', key: 'Statement', text: 'Found the taxi at 07:20 while walking her dog. Touched nothing, called 158.' },
    { t: 'person', id: 'hanak' },
    { t: 'info', id: 'hanak', key: 'Background', text: 'Owns rival Hanák Taxi. The two firms have been fighting over the railway station rank all year – slashed tyres, one fist fight.' },
    { t: 'object', id: 'body' },
    { t: 'object', id: 'taxi', text: 'Yellow City Taxi Škoda Superb. Keys in the ignition, engine off.' },
    { t: 'object', id: 'cashbox', text: 'Empty. Not forced.' },
    { t: 'place', id: 'field', text: 'Field road 400 m off the Olomouc–Týnec road. No houses in sight.' },
    { t: 'place', id: 'tynec' }, { t: 'place', id: 'dispatch', text: 'City Taxi base and radio dispatch.' }, { t: 'place', id: 'nemilany', text: 'Hrubý\'s home.' },
    { t: 'check', id: 'body', text: 'Hrubý, in his taxi, field road near Velký Týnec.' },
  ],

  timeUp: 'A hundred days. The file goes to the shelf as "robbery, perpetrator unknown". City Taxi puts a black ribbon on the radio mast. Věra Hrubá still drives past that field road every week.',

  places: {
    field: { name: 'Field road near Velký Týnec', travel: { tynec: 3, petrol: 3, hodolany: 15, centre: 20, dispatch: 20, nemilany: 10 } },
    tynec: { name: 'Velký Týnec (village)', travel: { petrol: 0, hodolany: 15, centre: 20, dispatch: 20, nemilany: 10 } },
    petrol: { name: 'Petrol station, Týnec main road', travel: { hodolany: 15, centre: 20, dispatch: 20, nemilany: 10 } },
    centre: { name: 'Olomouc centre (club Kotelna)', travel: { dispatch: 5, hodolany: 8, nemilany: 12, cleaner: 5 } },
    dispatch: { name: 'City Taxi base, Olomouc', travel: { hodolany: 8, nemilany: 12, cleaner: 5 } },
    hodolany: { name: 'Kolář flat, Olomouc-Hodolany', travel: { nemilany: 12, cleaner: 8 } },
    nemilany: { name: 'Hrubý house, Nemilany', travel: { cleaner: 12 } },
    cleaner: { name: 'Dry cleaner\'s, Olomouc', travel: {} },
  },

  people: {
    hruby: { name: 'Miroslav Hrubý', role: 'the victim, taxi driver' },
    vera: { name: 'Věra Hrubá', role: 'his wife' },
    pokorna: { name: 'Anna Pokorná', role: 'dog walker who found him' },
    hanak: { name: 'Bohumil Hanák', role: 'owner of rival Hanák Taxi' },
    simek: { name: 'Josef Šimek', role: 'owner of City Taxi' },
    libor: { name: 'Libor Mach', role: 'last passenger on the dispatch log' },
    kristyna: { name: 'Kristýna Zedníková', role: 'Libor Mach\'s girlfriend' },
    kolar: { name: 'Zdeněk Kolář', role: 'City Taxi driver, Hrubý\'s colleague' },
    kolarova: { name: 'Ivana Kolářová', role: 'Kolář\'s wife' },
    attendant: { name: 'Petr Vlček', role: 'night attendant at the Týnec petrol station' },
  },

  objects: {
    body: { name: 'Body of Miroslav Hrubý', desc: 'In the driver\'s seat.' },
    taxi: { name: 'Hrubý\'s taxi', desc: 'Škoda Superb, City Taxi no. 17.' },
    cashbox: { name: 'Cash box in the driver\'s door', desc: '' },
    meter: { name: 'Taximeter', desc: 'On the dashboard.' },
    footprints: { name: 'Footprints in the mud', desc: 'From the rear right door towards the road.' },
    prints: { name: 'Fingerprints from the taxi', desc: 'Lifted by the technicians.' },
    notebook: { name: 'Black notebook from the glovebox', desc: 'Initials and numbers.' },
    radio: { name: 'Dispatch radio log', desc: 'Friday night, City Taxi.' },
    gps: { name: 'GPS log of taxi no. 17', desc: 'From the dispatch system.' },
    phoneH: { name: 'Hrubý\'s mobile phone records', desc: 'His personal phone, not the taxi radio.' },
    prepaid: { name: 'Records of the prepaid number', desc: 'The number that called Hrubý at 01:41.' },
    cctv: { name: 'Petrol station CCTV', desc: 'One camera facing the pumps and the main road.' },
    policy: { name: 'Hrubý\'s life insurance policy', desc: '' },
    shoes: { name: 'Kolář\'s shoes', desc: 'Size 44, seized.' },
    receipt: { name: 'Dry cleaner\'s receipt', desc: 'Found in Kolář\'s coat pocket.' },
    jacket: { name: 'Kolář\'s dark jacket', desc: 'Seized at the dry cleaner\'s.' },
    stove: { name: 'Ash from Kolář\'s stove', desc: '' },
  },

  theories: [
    { id: 'robbery', title: 'A robbery gone wrong', by: 'Novák', text: 'Night, cash, a lonely road. Someone wanted his money and he resisted.', slots: { Who: '?', Motive: 'cash' } },
    { id: 'rival', title: 'Taxi war', by: 'Sedláček', text: 'Hanák\'s people and City Taxi have been at each other all year. Maybe it went too far.', slots: { Who: 'Hanák Taxi?', Motive: 'the station rank' } },
    { id: 'libor', title: 'The last passenger', by: 'Horáková', requires: ['libor_known'], text: 'The last fare on the log is the last person who saw him alive.', slots: { Suspect: 'Libor Mach', Motive: 'robbery?' } },
    { id: 'widow', title: 'The widow', by: 'Horáková', requires: ['insurance'], text: 'A million in life insurance is a million.', slots: { Suspect: 'Věra Hrubá', Motive: 'insurance' } },
    { id: 'known', title: 'Someone he knew', by: 'Sedláček', requiresAny: ['private_matter', 'gps_pickup', 'prepaid'], text: 'He went there on his own, meter off. You do that for someone you know.', slots: { Suspect: '?', Motive: '?', Method: '?' } },
  ],

  events: [
    {
      id: 'kolar_walkin', at: '2009-11-23 08:30', title: 'Walk-in: a colleague', who: 'Zdeněk Kolář',
      text: 'Monday morning a big man in a City Taxi fleece is waiting at the front desk. Zdeněk Kolář, a driver, "Mirek\'s friend". He wants to help.\n\nHe tells us Hanák\'s drivers threatened Mirek at the station rank two weeks ago. "Those guys are animals." He also says Mirek always carried a lot of cash. He asks twice whether we have anyone yet.',
      effects: [
        { t: 'person', id: 'kolar' },
        { t: 'info', id: 'kolar', key: 'Walk-in', text: 'Came on his own Monday. Pushes the Hanák angle. Asked twice if we have a suspect.' },
        { t: 'tnote', id: 'rival', effect: 'support', text: 'Kolář says Hanák\'s drivers threatened Hrubý.' },
        { t: 'flag', id: 'kolar_known' },
      ],
    },
    {
      id: 'lawyer_call', requires: ['arrested'], delay: 3, title: 'Phone call: defence lawyer', who: 'Mgr. Tichý',
      text: 'Kolář\'s lawyer, polite and cold. His client will not speak without him present, and the fingerprint means nothing – "colleagues ride in each other\'s cars all the time".',
      effects: [{ t: 'tnote', id: 'known', effect: 'weaken', text: 'Defence: a print in a colleague\'s taxi proves nothing.' }],
    },
  ],

  leads: [
    // ---------------- start leads ----------------
    {
      id: 'scene', on: 'place:field', by: 'Horáková', title: 'Work the scene with the technicians', offer: 'Let me go over the car and the field with the technicians before the rain does.',
      levels: [
        {
          hours: 4,
          report: 'He was stabbed from behind – from the back seat, right side. Rear right door was open. Driver\'s window up, seat belt still on. He never turned round.\n\nThe taximeter is OFF. On a paid ride it would be running.\n\nIn the mud: one set of footprints from the rear right door to the road, about size 44. Glovebox: a small black notebook full of initials and numbers.',
          effects: [
            { t: 'object', id: 'meter', text: 'Switched off – this was not a paid ride.' },
            { t: 'object', id: 'footprints', text: 'One set, about size 44, rear right door → road.' },
            { t: 'object', id: 'notebook' },
            { t: 'info', id: 'hruby', key: 'Scene', text: 'Stabbed from the back seat. Seat belt on, never turned round. Meter off.' },
            { t: 'tnote', id: 'robbery', effect: 'weaken', text: 'Meter off – not a normal fare.' },
            { t: 'flag', id: 'footprints' }, { t: 'flag', id: 'meter_off' },
          ],
        },
        {
          hours: 8,
          report: 'Fingerprints. A taxi is a fingerprint swamp – dozens of people a week. The useful spot is the inside handle of the rear right door. Two clear prints, sent to the lab.',
          effects: [{ t: 'object', id: 'prints', text: 'Two clear prints from the inside handle of the rear right door.' }, { t: 'flag', id: 'prints_taken' }],
        },
        {
          hours: 8,
          report: 'Dog handler. The track goes from the car to the main road and turns north, towards Olomouc. After three hundred metres of asphalt the dog loses it.',
          effects: [{ t: 'place', id: 'field', text: 'Dog track: from the car to the main road, then north towards Olomouc.' }],
        },
        { hours: 8, report: 'We have walked every furrow. Nothing more out here.', effects: [] },
      ],
    },
    {
      id: 'autopsy', on: 'object:body', by: 'Sedláček', title: 'Autopsy', offer: 'I will attend the autopsy.',
      levels: [
        {
          hours: 6, wait: 18,
          report: 'Three stab wounds to the right side of the neck and shoulder, from behind and slightly above. A single-edged blade, about 9 cm – a folding knife. No defensive wounds at all. Death between 01:45 and 03:00. No alcohol.',
          effects: [
            { t: 'object', id: 'body', text: '3 stab wounds from behind, folding knife ~9 cm. No defensive wounds. Died 01:45–03:00.' },
            { t: 'check', id: 'method', text: 'Stabbed from the back seat with a folding knife.' },
            { t: 'slot', id: 'known', slot: 'Method', value: 'folding knife, from the back seat' },
            { t: 'tnote', id: 'known', effect: 'support', text: 'No defensive wounds – he did not expect it.' },
          ],
        },
        { hours: 1, wait: 23, report: 'Nothing under the fingernails. Toxicology clean.', effects: [] },
        { hours: 2, report: 'The pathologist has nothing to add.', effects: [] },
      ],
    },
    {
      id: 'dispatch', on: 'place:dispatch', by: 'Novák', title: 'Go to City Taxi dispatch', offer: 'The dispatch knows every ride he took. I will talk to the owner.',
      levels: [
        {
          hours: 2,
          report: 'Owner Josef Šimek. Hrubý\'s last dispatched fare: 01:12 from club Kotelna in the centre, passenger Libor Mach, a regular with an account. Destination Velký Týnec.\n\nŠimek, unprompted: "Mirek was the bank for half the drivers. Lent money to anyone. Without interest, but he wanted it back on time."',
          effects: [
            { t: 'person', id: 'simek' }, { t: 'person', id: 'libor' },
            { t: 'info', id: 'libor', key: 'Dispatch', text: 'Picked up 01:12 at club Kotelna, to Velký Týnec.' },
            { t: 'info', id: 'hruby', key: 'Money', text: 'Lent money to other drivers (per Šimek).' },
            { t: 'object', id: 'radio' },
            { t: 'place', id: 'centre' },
            { t: 'tl', who: 'hruby', where: 'centre', from: '2009-11-21 01:12', status: 'confirmed', text: 'Picks up Libor Mach at club Kotelna (dispatch).' },
            { t: 'flag', id: 'libor_known' }, { t: 'flag', id: 'lender' },
          ],
        },
        {
          hours: 4,
          report: 'Šimek says the drivers were scared of the Hanák people, but "nobody kills over a taxi rank. Tyres, yes. This, no."',
          effects: [{ t: 'tnote', id: 'rival', effect: 'weaken', text: 'Šimek: "Tyres, yes. This, no."' }],
        },
        { hours: 4, report: 'Šimek shows us the cars, the rota, the coffee machine. Nothing new.', effects: [] },
      ],
    },
    {
      id: 'radio', on: 'object:radio', by: 'Horáková', title: 'Listen to the radio recordings', offer: 'Dispatch records the radio. I want to hear his last words on it.',
      levels: [
        {
          hours: 3,
          report: '01:38, Hrubý: "Seventeen, free in Týnec, heading back." 01:43, Hrubý again: "Seventeen, I\'m off for half an hour, private matter." Dispatcher laughs: "Say hi to her." Nothing after that.',
          effects: [
            { t: 'object', id: 'radio', text: '01:38 "free in Týnec". 01:43 "off for half an hour, private matter". Then silence.' },
            { t: 'tl', who: 'hruby', where: 'tynec', from: '2009-11-21 01:38', status: 'confirmed', text: 'Reports free in Týnec (radio).' },
            { t: 'tnote', id: 'robbery', effect: 'weaken', text: 'He went "off for a private matter" after the last fare.' },
            { t: 'flag', id: 'private_matter' },
          ],
        },
        { hours: 4, report: 'The rest of the night: routine. He sounded calm all evening.', effects: [] },
      ],
    },
    {
      id: 'vera', on: 'person:vera', by: 'Sedláček', title: 'Talk to the widow', offer: 'Somebody has to sit with Mrs. Hrubá. I will go.',
      levels: [
        {
          hours: 1,
          report: 'He left for the night shift at 19:00. Called her at 23:05, normal. Lately he was angry about money: "someone at work owes me a lot and keeps lying to me". He would not say who. He wrote everything in "that black notebook".',
          effects: [
            { t: 'info', id: 'vera', key: 'Statement', text: 'Last call 23:05. Hrubý angry lately: "someone at work owes me a lot".' },
            { t: 'tl', who: 'vera', where: 'nemilany', from: '2009-11-20 23:05', to: '2009-11-21 06:30', status: 'claimed', text: 'Home, asleep (her word).' },
            { t: 'tnote', id: 'known', effect: 'support', text: 'A colleague owed him a lot.' },
          ],
        },
        {
          hours: 2,
          report: 'She mentions it herself, before we ask: a life insurance policy, one million, she is the beneficiary. "You will find out anyway."',
          effects: [{ t: 'object', id: 'policy', text: '1 000 000 CZK, beneficiary Věra Hrubá.' }, { t: 'flag', id: 'insurance' }],
        },
        {
          hours: 4,
          report: 'Her sister slept over on Friday – they watched a film till midnight. The sister confirms, and so does the sister\'s phone, in Nemilany all night.',
          effects: [
            { t: 'tl', who: 'vera', where: 'nemilany', from: '2009-11-20 23:05', to: '2009-11-21 06:30', status: 'confirmed', text: 'Sister + sister\'s phone.' },
            { t: 'tnote', id: 'widow', effect: 'ruleout', text: 'At home with her sister all night.' },
          ],
        },
        { hours: 4, report: 'Grief. She asks when she can have him back for the funeral.', effects: [] },
      ],
    },
    {
      id: 'canvass', on: 'place:tynec', by: 'Novák', title: 'Door-to-door in Velký Týnec', offer: 'Knock on the doors along the main road. Somebody is always awake.',
      levels: [
        {
          hours: 6,
          report: 'Nobody saw the taxi on the field road. But the petrol station on the main road is open all night and has a camera.',
          effects: [{ t: 'place', id: 'petrol' }, { t: 'person', id: 'attendant' }, { t: 'flag', id: 'petrol_known' }],
        },
        {
          hours: 12,
          report: 'A man walking home from the pub around 02:10 passed a tall man in a dark jacket on the road towards Olomouc. "Walking fast, hands in pockets. Odd, at that hour, no car."',
          effects: [{ t: 'place', id: 'tynec', text: '~02:10 a tall man in a dark jacket walking fast towards Olomouc (pub-goer).' }],
        },
        { hours: 12, report: 'The village is out of stories.', effects: [] },
      ],
    },
    {
      id: 'phoneH', on: ['object:phoneH', 'person:hruby'], by: 'Horáková', title: 'Request Hrubý\'s mobile records', offer: 'His personal mobile. Quick to file, the operator takes a couple of days.',
      levels: [
        {
          hours: 1, wait: 47,
          report: 'Last call on his mobile: 01:41, incoming, 48 seconds – two minutes before he went "off for a private matter". The caller: a prepaid number with no name. The same number called him three times in the week before.',
          effects: [
            { t: 'object', id: 'phoneH', text: '01:41 incoming call, 48 s, from an anonymous prepaid number. Same number called 3× that week.' },
            { t: 'object', id: 'prepaid' },
            { t: 'tnote', id: 'known', effect: 'support', text: 'Someone called him with a prepaid number just before.' },
            { t: 'flag', id: 'prepaid' },
          ],
        },
        { hours: 8, report: 'Months of calls: his wife, dispatch, half the drivers in Olomouc. Nothing stands out.', effects: [] },
        { hours: 8, report: 'Nothing more in his records.', effects: [] },
      ],
    },
    {
      id: 'gps', on: 'object:taxi', by: 'Sedláček', title: 'Get the GPS log of the taxi', offer: 'City Taxi tracks its cars. The log will show exactly where he drove.',
      levels: [
        {
          hours: 1, wait: 23,
          report: '01:12 Kotelna. 01:36 stop in Lipová Street, Velký Týnec, two minutes – the Mach drop-off. 01:44 leaves north. 01:47 stops for one minute at the bus stop on the main road. 01:52 turns onto the field road. 01:54 stops. Never moves again.\n\nSomeone got in at that bus stop.',
          effects: [
            { t: 'object', id: 'gps', text: '01:36 drop-off in Týnec. 01:47 one-minute stop at the main-road bus stop. 01:54 stops on the field road for good.' },
            { t: 'tl', who: 'hruby', where: 'tynec', from: '2009-11-21 01:36', status: 'confirmed', text: 'Drops off Libor Mach in Lipová St (GPS).' },
            { t: 'tl', who: 'hruby', where: 'field', from: '2009-11-21 01:54', status: 'confirmed', text: 'Stops on the field road. Never moves again (GPS).' },
            { t: 'tnote', id: 'libor', effect: 'weaken', text: 'Mach got out at 01:36. Somebody else got in at 01:47.' },
            { t: 'flag', id: 'gps_pickup' },
          ],
        },
        { hours: 4, report: 'Rest of the shift: ordinary fares, ordinary stops.', effects: [] },
      ],
    },
    {
      id: 'hanak', on: 'person:hanak', by: 'Sedláček', title: 'Pay Hanák Taxi a visit', offer: 'Let me lean on Hanák. If this is the taxi war, he will know.',
      levels: [
        {
          hours: 4,
          report: 'Hanák is furious and frightened. "We fight over the rank, yes. Nobody of mine would kill a man." Offers his own GPS logs without being asked.',
          effects: [{ t: 'info', id: 'hanak', key: 'Statement', text: 'Denies everything, offered his firm\'s GPS logs.' }],
        },
        {
          hours: 8,
          report: 'Hanák\'s eleven cars that night: none closer to Velký Týnec than the Olomouc ring road.',
          effects: [{ t: 'tnote', id: 'rival', effect: 'ruleout', text: 'No Hanák car anywhere near Týnec.' }],
        },
        { hours: 4, report: 'Nothing more from Hanák. He will complain about us to the papers.', effects: [] },
      ],
    },
    {
      id: 'cashbox', on: 'object:cashbox', by: 'Novák', title: 'Dust the cash box', offer: 'The empty cash box. Prints, maybe.',
      levels: [
        { hours: 2, wait: 22, report: 'Only Hrubý\'s own prints. Dispatch says he emptied the box into his wallet every night around one anyway.', effects: [{ t: 'object', id: 'cashbox', text: 'Only Hrubý\'s prints. He emptied it into his wallet around 01:00 every night.' }] },
      ],
    },
    {
      id: 'pokorna', on: 'person:pokorna', by: 'Horáková', title: 'Talk to the dog walker again', offer: 'Mrs. Pokorná was in shock this morning. Maybe she remembers more now.',
      levels: [
        { hours: 1, report: 'She walks there every morning at seven. Friday morning the field road was empty. She saw nobody today. Her dog barked at the car before she saw it.', effects: [] },
      ],
    },
    {
      id: 'meter', on: 'object:meter', by: 'Sedláček', title: 'Read out the taximeter memory', offer: 'The meter stores every ride. Could confirm the last fare.',
      levels: [
        { hours: 2, report: 'Last ride: 01:12–01:36, 380 CZK, paid. Then the meter was switched off at 01:38 and never on again.', effects: [{ t: 'object', id: 'meter', text: 'Last paid ride 01:12–01:36, 380 CZK. Off from 01:38.' }] },
      ],
    },

    // ---------------- unlocked leads ----------------
    {
      id: 'club', on: 'place:centre', by: 'Novák', requires: ['libor_known'], title: 'Ask at club Kotelna', offer: 'The club where Mach got in. Bouncers notice things.',
      levels: [
        {
          hours: 3,
          report: 'The bouncer knows Mach: "Drunk, harmless, always takes a taxi home to his girl." Left at 01:10, alone, singing. The club camera shows him getting into taxi 17 at 01:12.',
          effects: [{ t: 'tl', who: 'libor', where: 'centre', from: '2009-11-21 01:12', status: 'confirmed', text: 'Gets into taxi 17 (club camera).' }],
        },
        { hours: 4, report: 'Nothing else from the club. Loud music, sticky floors.', effects: [] },
      ],
    },
    {
      id: 'libor', on: 'person:libor', by: 'Novák', requires: ['libor_known'], title: 'Interview Libor Mach', offer: 'The last passenger. He has a record, by the way – assault, 2006.',
      levels: [
        {
          hours: 2,
          report: 'Hung over and scared. Got out at his girlfriend\'s in Lipová Street around half one, paid 380, "the driver was fine, we talked football". Went straight to bed. Shoe size 42.',
          effects: [
            { t: 'info', id: 'libor', key: 'Background', text: '27, warehouse worker. Assault conviction 2006 (pub fight). Shoe size 42.' },
            { t: 'tl', id: 'libor_night', who: 'libor', where: 'tynec', from: '2009-11-21 01:36', to: '2009-11-21 09:00', status: 'claimed', text: 'At his girlfriend\'s, asleep.' },
            { t: 'person', id: 'kristyna' },
            { t: 'tnote', id: 'libor', effect: 'weaken', text: 'Shoe size 42; the footprints are 44.' },
          ],
        },
        { hours: 4, report: 'He keeps saying the same thing and keeps crying. Nothing new.', effects: [] },
      ],
    },
    {
      id: 'kristyna', on: 'person:kristyna', by: 'Horáková', requires: ['libor_known'], title: 'Talk to Mach\'s girlfriend', offer: 'The girlfriend in Lipová Street. She will say if he went out again.',
      levels: [
        {
          hours: 1,
          report: 'He fell into bed at 01:40 and snored till ten. She was up feeding the baby at two and at four – he never moved. Her neighbour heard the taxi arrive and leave "straight away".',
          effects: [
            { t: 'tl', who: 'libor', where: 'tynec', from: '2009-11-21 01:40', to: '2009-11-21 04:00', status: 'confirmed', text: 'Asleep at girlfriend\'s (girlfriend awake with the baby, neighbour).' },
            { t: 'tnote', id: 'libor', effect: 'ruleout', text: 'At home asleep, girlfriend awake with the baby.' },
          ],
        },
      ],
    },
    {
      id: 'petrol', on: 'place:petrol', by: 'Sedláček', requires: ['petrol_known'], title: 'Go through the petrol station CCTV', offer: 'One camera, but it sees the main road. I will sit through the night.',
      levels: [
        {
          hours: 8,
          report: '01:47, edge of the frame: taxi 17 stops at the bus stop across the road. A tall man in a dark jacket and cap gets into the BACK, right side. He was waiting there. Face not visible.',
          effects: [
            { t: 'object', id: 'cctv', text: '01:47 tall man in dark jacket and cap gets into the back of taxi 17 at the bus stop. He was waiting.' },
            { t: 'tnote', id: 'known', effect: 'support', text: 'The killer was waiting at the bus stop – an arranged pickup.' },
          ],
        },
        {
          hours: 16,
          report: '02:14: the same tall figure walks past towards Olomouc. 02:35: a silver Škoda Fabia stops on the shoulder, he gets in, it turns back towards Olomouc. Plate unreadable – "3M…" at best.',
          effects: [{ t: 'object', id: 'cctv', text: '02:35 a silver Škoda Fabia picks him up on the main road, back to Olomouc.' }, { t: 'flag', id: 'fabia' }],
        },
        { hours: 16, report: 'Nothing else on the tapes.', effects: [] },
      ],
    },
    {
      id: 'attendant', on: 'person:attendant', by: 'Novák', requires: ['petrol_known'], title: 'Talk to the night attendant', offer: 'The man behind the counter that night.',
      levels: [
        { hours: 1, report: 'He was watching football on his phone. Saw nothing, heard nothing. He is sorry.', effects: [] },
      ],
    },
    {
      id: 'notebook', on: 'object:notebook', by: 'Sedláček', title: 'Decode the black notebook', offer: 'Initials and numbers. I would bet these are his loans.',
      levels: [
        {
          hours: 2,
          report: 'Loans, in thousands. Most are ticked off: "PV 20 ✓", "MŠ 15 ✓", "JB 8 ✓". One is not, and it is underlined twice: "ZK 150 – do pondělí!!" – 150 thousand, by Monday.',
          effects: [{ t: 'object', id: 'notebook', text: '"ZK 150 – do pondělí!!" – 150 000 CZK due Monday, the only unpaid loan.' }, { t: 'flag', id: 'zk' }],
        },
        {
          hours: 4,
          report: 'Only one City Taxi driver has the initials Z.K.: Zdeněk Kolář.',
          effects: [
            { t: 'person', id: 'kolar' },
            { t: 'info', id: 'kolar', key: 'Debt', text: 'Owed Hrubý 150 000 CZK, due Monday 23 November (notebook).' },
            { t: 'slot', id: 'known', slot: 'Suspect', value: 'Zdeněk Kolář?' },
            { t: 'slot', id: 'known', slot: 'Motive', value: 'a 150 000 debt due Monday' },
            { t: 'check', id: 'motive', text: 'Kolář owed Hrubý 150 000 CZK, due two days later.' },
            { t: 'flag', id: 'kolar_known' }, { t: 'flag', id: 'debt' },
          ],
        },
        { hours: 4, report: 'The other initials are drivers who paid back long ago.', effects: [] },
      ],
    },
    {
      id: 'drivers', on: 'place:dispatch', by: 'Novák', requires: ['lender'], title: 'Talk to the other drivers', offer: 'Drivers gossip on the rank all night. Who owed Mirek money?',
      levels: [
        {
          hours: 6,
          report: 'They liked him. Most paid him back. One did not: Zdeněk Kolář plays the slot machines and "owes everyone". On Thursday at the station rank Hrubý shouted at him: "Monday, or I go to Šimek." Kolář shouted back.',
          effects: [
            { t: 'person', id: 'kolar' },
            { t: 'info', id: 'kolar', key: 'Rank', text: 'Gambler. Thursday argued with Hrubý at the rank: "Monday, or I go to Šimek."' },
            { t: 'tnote', id: 'known', effect: 'support', text: 'A colleague argued with him about money two days before.' },
            { t: 'flag', id: 'kolar_known' },
          ],
        },
        {
          hours: 8,
          report: 'Kolář took Friday night off. Drivers say he never takes Fridays – best money of the week.',
          effects: [{ t: 'info', id: 'kolar', key: 'Rota', text: 'Took Friday night off – unusual.' }],
        },
        { hours: 8, report: 'Gossip about Šimek\'s new car. Nothing for us.', effects: [] },
      ],
    },
    {
      id: 'kolar', on: 'person:kolar', by: 'Sedláček', requires: ['kolar_known'], title: 'Interview Zdeněk Kolář', offer: 'Let me sit down with Kolář. Friendly, for now.',
      levels: [
        {
          hours: 2,
          report: 'Friday he was at home in Hodolany with his wife, in bed by eleven. He "owed Mirek a bit, fifty maybe, nothing serious". Big man, about 185 cm. I noticed his shoes: size 44 at least.',
          effects: [
            { t: 'person', id: 'kolarova' },
            { t: 'info', id: 'kolar', key: 'Statement', text: 'Home with his wife Friday night. Says he owed "fifty maybe". ~185 cm, shoe size ~44.' },
            { t: 'tl', id: 'kolar_night', who: 'kolar', where: 'hodolany', from: '2009-11-20 23:00', to: '2009-11-21 07:00', status: 'claimed', text: 'Says he was home in bed.' },
          ],
        },
        {
          hours: 4,
          report: 'We put the notebook in front of him: 150, not fifty. He sweats. "Mirek wrote things down wrong." He has a prepaid phone? "No. Why would I?"',
          effects: [{ t: 'info', id: 'kolar', key: 'Lies', text: 'Denies the 150 000. Denies owning a prepaid phone.' }],
        },
        { hours: 4, report: 'He wants a lawyer before he says anything more.', effects: [] },
      ],
    },
    {
      id: 'kolarova', on: 'person:kolarova', by: 'Horáková', title: 'Talk to Ivana Kolářová', offer: 'The wife is his alibi. Let me hear her version.',
      levels: [
        {
          hours: 1,
          report: 'She confirms it word for word: home all night, both of them, asleep by eleven. The same phrases her husband used. She drives a silver Škoda Fabia.',
          effects: [
            { t: 'info', id: 'kolarova', key: 'Statement', text: 'Both home all night (same words as her husband). Drives a silver Škoda Fabia.' },
            { t: 'tl', id: 'kolarova_night', who: 'kolarova', where: 'hodolany', from: '2009-11-20 23:00', to: '2009-11-21 07:00', status: 'claimed', text: 'Says she was home asleep.' },
            { t: 'flag', id: 'kolarova_fabia' },
          ],
        },
        { hours: 2, report: 'She repeats it. Her hands shake when she lights a cigarette.', effects: [] },
      ],
    },
    {
      id: 'prepaid', on: 'object:prepaid', by: 'Horáková', title: 'Request records of the prepaid number', offer: 'The prepaid number that called him. Operator again, a couple of days.',
      levels: [
        {
          hours: 1, wait: 47,
          report: 'Activated 10 November. Used for exactly five calls: four to Hrubý, all from the cell covering Olomouc-Hodolany – the last at 01:41 from the Velký Týnec cell. And one more: 02:20, from Týnec, an outgoing call to a mobile registered to Ivana Kolářová.',
          effects: [
            { t: 'object', id: 'prepaid', text: 'Only calls: 4× Hrubý (from Hodolany; last at 01:41 from Týnec), then 02:20 from Týnec to Ivana Kolářová.' },
            { t: 'person', id: 'kolar' }, { t: 'person', id: 'kolarova' },
            { t: 'place', id: 'hodolany' },
            { t: 'slot', id: 'known', slot: 'Suspect', value: 'Zdeněk Kolář' },
            { t: 'flag', id: 'kolar_known' }, { t: 'flag', id: 'prepaid_ivana' },
          ],
        },
        {
          hours: 1, wait: 47,
          report: 'The handset ID. The prepaid SIM ran in a phone that, until 9 November, carried Zdeněk Kolář\'s own contract SIM. Same phone. At 01:41 that phone was at Velký Týnec.',
          effects: [
            { t: 'object', id: 'prepaid', text: 'Same handset as Kolář\'s own SIM until 9 November.' },
            { t: 'tl', who: 'kolar', where: 'tynec', from: '2009-11-21 01:41', to: '2009-11-21 02:20', status: 'confirmed', text: 'His handset (prepaid SIM) calls Hrubý, then his wife, from Týnec.' },
            { t: 'tnote', id: 'known', effect: 'support', text: 'The 01:41 call came from Kolář\'s own handset.' },
            { t: 'flag', id: 'prepaid_kolar' },
          ],
        },
        { hours: 4, report: 'Nothing more from the operator.', effects: [] },
      ],
    },
    {
      id: 'phoneIvana', on: 'person:kolarova', by: 'Horáková', requires: ['kolar_known'], requiresAny: ['prepaid_ivana', 'fabia'], title: 'Request Ivana Kolářová\'s phone location', offer: 'Where was the wife\'s phone that night? Operator, a couple of days.',
      levels: [
        {
          hours: 1, wait: 47,
          report: '02:21 she takes a 30-second call from the prepaid number. 02:24 her phone leaves Hodolany. 02:35 Velký Týnec cell. 02:52 back in Hodolany.',
          effects: [{ t: 'tl', who: 'kolarova', where: 'tynec', from: '2009-11-21 02:35', status: 'confirmed', text: 'Her phone at Velký Týnec (operator).' }],
        },
      ],
    },
    {
      id: 'confrontIvana', on: 'person:kolarova', by: 'Horáková', requires: ['contra:kolarova'], title: 'Confront Ivana Kolářová', offer: 'Her phone was in Týnec at 02:35. Let me show her that.',
      levels: [
        {
          hours: 2,
          report: 'She breaks after twenty minutes. At 02:20 he called from a number she did not know: "Come for me, Týnec main road, don\'t ask." He was soaked, silent. At home he burned things in the stove and took his jacket to the cleaner\'s on Monday. He told her what to say to us.',
          effects: [
            { t: 'info', id: 'kolarova', key: 'Testimony', text: 'Picked him up on the Týnec road at 02:35. He burned things in the stove, took his jacket to the cleaner\'s.' },
            { t: 'place', id: 'cleaner' }, { t: 'flag', id: 'wife_testimony' }, { t: 'flag', id: 'cleaner_known' },
          ],
        },
      ],
    },
    {
      id: 'prints', on: 'object:prints', by: 'Sedláček', requires: ['prints_taken', 'kolar_known'], title: 'Compare the door-handle prints with Kolář', offer: 'Kolář was fingerprinted for his taxi licence. Lab can compare.',
      levels: [
        {
          hours: 1, wait: 23,
          report: 'Match. Both prints on the inside rear handle are Kolář\'s. The lab adds the obvious: drivers ride in each other\'s cars.',
          effects: [{ t: 'object', id: 'prints', text: 'Kolář\'s prints on the inside rear right handle. (Defence: colleagues ride together.)' }, { t: 'flag', id: 'print_kolar' }],
        },
      ],
    },
    {
      id: 'warrant', on: 'person:kolar', by: 'Novák', requiresAny: ['contra:kolar', 'contra:kolarova', 'prepaid_kolar'], title: 'Ask the prosecutor for a warrant for the Kolář flat', offer: 'We have enough to search Kolář\'s flat. I will get the warrant.',
      levels: [{ hours: 4, report: 'Signed.', effects: [{ t: 'flag', id: 'warrant' }] }],
    },
    {
      id: 'search', on: 'place:hodolany', by: 'Horáková', requires: ['warrant'], title: 'Search the Kolář flat', offer: 'Warrant is signed. Technicians are ready.',
      levels: [
        {
          hours: 8,
          report: 'No knife. Shoes size 44, freshly scrubbed. In a coat pocket: a receipt from a dry cleaner\'s in Olomouc, Monday 23 November, "men\'s jacket, dark".',
          effects: [
            { t: 'object', id: 'shoes', text: 'Size 44, freshly scrubbed.' },
            { t: 'object', id: 'receipt', text: 'Monday 23 November, "men\'s jacket, dark".' },
            { t: 'place', id: 'cleaner' },
            { t: 'flag', id: 'shoes' }, { t: 'flag', id: 'cleaner_known' },
          ],
        },
        {
          hours: 6, wait: 18,
          report: 'The tiled stove. In the ash: the melted remains of a bank card. The chip survived. It was Miroslav Hrubý\'s.',
          effects: [
            { t: 'object', id: 'stove', text: 'Melted remains of Hrubý\'s bank card.' },
            { t: 'check', id: 'link', text: 'Hrubý\'s bank card burnt in Kolář\'s stove.' },
            { t: 'tnote', id: 'robbery', effect: 'ruleout', text: 'His wallet ended in a colleague\'s stove.' },
            { t: 'flag', id: 'card_burnt' },
          ],
        },
        { hours: 8, report: 'Nothing more in the flat.', effects: [] },
      ],
    },
    {
      id: 'cleaner', on: ['object:jacket', 'place:cleaner'], by: 'Sedláček', requires: ['cleaner_known'], title: 'Get the jacket from the dry cleaner\'s', offer: 'If he has not picked it up yet, it is still hanging there.',
      levels: [
        {
          hours: 2,
          report: 'He never collected it. A dark jacket, cleaned and bagged. Seized. Cleaning removes a lot, but not everything from the seams.',
          effects: [{ t: 'object', id: 'jacket', text: 'Never collected. Seized.' }],
        },
        {
          hours: 2, wait: 46,
          report: 'Lab: blood in the seam of the right cuff, despite the cleaning. DNA: Miroslav Hrubý.',
          effects: [{ t: 'object', id: 'jacket', text: 'Hrubý\'s blood in the right cuff seam.' }, { t: 'check', id: 'link', text: 'Hrubý\'s blood on Kolář\'s jacket.' }, { t: 'flag', id: 'jacket_blood' }],
        },
      ],
    },
    {
      id: 'shoes', on: 'object:shoes', by: 'Novák', requires: ['shoes', 'footprints'], title: 'Compare the shoes with the footprints', offer: 'Size 44 and the prints in the mud. Let the lab compare.',
      levels: [
        {
          hours: 2, wait: 22,
          report: 'Same tread, same size, same wear on the left heel. The expert will say "highly probable".',
          effects: [{ t: 'object', id: 'shoes', text: 'Match with the field footprints, "highly probable".' }, { t: 'flag', id: 'shoes_match' }],
        },
      ],
    },
    {
      id: 'arrest', on: 'person:kolar', by: 'Novák', requires: ['kolar_known'], requiresAny: ['contra:kolar', 'jacket_blood', 'card_burnt', 'wife_testimony'], title: 'Arrest Zdeněk Kolář', offer: 'That is enough. I will bring Kolář in.',
      levels: [
        {
          hours: 2,
          report: 'Picked him up at the taxi rank by the station, in his car, waiting for a fare. He did not argue.',
          effects: [{ t: 'check', id: 'suspect', text: 'Zdeněk Kolář.' }, { t: 'check', id: 'custody', text: 'Arrested at the station rank.' }, { t: 'flag', id: 'arrested' }],
        },
      ],
    },
    {
      id: 'interrogate', on: 'person:kolar', by: 'Novák', requires: ['arrested'], title: 'Interrogate Zdeněk Kolář', offer: 'Let me sit with him.',
      levels: [
        { hours: 4, report: 'His lawyer does the talking. Kolář stares at the table.', effects: [] },
        {
          hours: 8,
          report: 'We lay it out: the handset, his wife, the card in the stove. He talks.\n\nHe owed a hundred and fifty to Mirek and more to others. Mirek was going to Šimek on Monday – that meant losing the job. He bought the prepaid card "to talk to him quietly". Called him at 01:41, "pick me up, I have your money". Sat behind him. "He laughed at me. Said I would never pay. I had the knife in my pocket." Took the wallet so it would look like a robbery. Walked, then called Ivana.',
          effects: [{ t: 'info', id: 'kolar', key: 'Confession', text: 'Lured Hrubý with the prepaid phone, stabbed him from the back seat over the debt, staged a robbery.' }, { t: 'flag', id: 'confession' }],
        },
        { hours: 8, report: 'He repeats the confession. The knife, he says, is in the Morava. Divers would never find it.', effects: [] },
      ],
    },
  ],

  trial: {
    strengthFlags: ['prepaid_kolar', 'contra:kolarova', 'wife_testimony', 'jacket_blood', 'card_burnt', 'shoes_match', 'confession'],
    verdicts: [
      { min: 5, text: 'Regional Court in Olomouc: Zdeněk Kolář is guilty of murder. 16 years. The defence tried the "colleagues ride together" line; the jacket and the card ended it. Ivana Kolářová gets a suspended sentence for the false alibi.' },
      { min: 3, text: 'Guilty of murder, 14 years. The defence picked at every gap; the appeal court sends one point back, but the verdict stands.' },
      { min: 0, text: 'Thin. The court convicts of manslaughter in a quarrel – 7 years. Věra Hrubá says that is less than he would have paid back.' },
    ],
  },
});
