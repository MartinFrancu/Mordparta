// Mordparta engine. Knows NOTHING about a specific case: it only reads window.CASE.
// Case format is documented in CASE_FORMAT.md.
(function () {
  'use strict';
  const C = window.CASE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- slate: fixed structure every case fills ----------
  const CHECKLIST = [
    ['suspect', 'Suspect identified'],
    ['custody', 'Suspect in custody'],
    ['motive', 'Motive established'],
    ['body', 'Body found'],
    ['link', 'Evidence linking suspect to body / scene'],
    ['method', 'Weapon / method of killing known'],
  ];
  const TABS = ['People', 'Objects', 'Timeline', 'Theories', 'Trial'];

  // ---------- time ----------
  const parseT = (s) => { const [d, h] = s.split(' '); const [y, mo, da] = d.split('-').map(Number); const [hh, mm] = (h || '00:00').split(':').map(Number); return Date.UTC(y, mo - 1, da, hh, mm); };
  const START = parseT(C.start);
  const toHours = (s) => (parseT(s) - START) / 3600000;
  const fmtAbs = (ms) => { const d = new Date(ms); return d.toUTCString().slice(0, 22).replace(/ (\d\d:\d\d)$/, ', $1'); };
  const fmtH = (h) => fmtAbs(START + h * 3600000);
  const fmtCase = (s) => fmtAbs(parseT(s));
  const dur = (h) => (h < 1 ? Math.round(h * 60) + ' min' : h < 48 ? h + ' h' : (h / 24) + ' days');

  // ---------- state ----------
  const S = {
    t: 0, flags: new Set(), people: {}, objects: {}, timeline: [], theoryNotes: {}, slots: {},
    checks: {}, level: {}, ops: C.operatives.map((n) => ({ name: n, until: null, lead: null })),
    scheduled: [], fired: new Set(), queue: [], tab: 'People', over: false,
  };
  const has = (f) => S.flags.has(f);
  const reqOk = (o) => (o.requires || []).every(has) && (!o.requiresAny || o.requiresAny.some(has)) && !(o.hiddenBy || []).some(has);
  const place = (id) => (C.places[id] ? C.places[id].name : id);
  const pname = (id) => (C.people[id] ? C.people[id].name : id);

  // ---------- availability ----------
  const running = (id) => S.ops.some((o) => o.lead === id);
  const levelOf = (id) => S.level[id] || 0;
  const availableLeads = () => C.leads.filter((l) => reqOk(l) && levelOf(l.id) < l.levels.length);
  const availableTheories = () => C.theories.filter(reqOk);

  // ---------- effects ----------
  function apply(effects, changes) {
    for (const e of effects || []) {
      switch (e.t) {
        case 'flag': S.flags.add(e.id); break;
        case 'person': {
          const p = C.people[e.id];
          if (!S.people[e.id]) { S.people[e.id] = { info: [] }; changes.push('New person: <b>' + esc(p.name) + '</b> – ' + esc(p.role)); }
          break;
        }
        case 'info': {
          if (!S.people[e.id]) apply([{ t: 'person', id: e.id }], changes);
          S.people[e.id].info.push({ key: e.key, text: e.text });
          changes.push(esc(pname(e.id)) + ' – ' + esc(e.key) + ': ' + esc(e.text));
          break;
        }
        case 'object': {
          const o = C.objects[e.id];
          if (!S.objects[e.id]) { S.objects[e.id] = { notes: [] }; changes.push('New object: <b>' + esc(o.name) + '</b>'); }
          if (e.text) { S.objects[e.id].notes.push(e.text); changes.push(esc(o.name) + ': ' + esc(e.text)); }
          break;
        }
        case 'tl': {
          const x = Object.assign({}, e, { a: toHours(e.from), b: toHours(e.to || e.from) });
          S.timeline.push(x);
          changes.push('Timeline: ' + esc(pname(e.who)) + ' @ ' + esc(place(e.where)) + ', ' + esc(fmtCase(e.from)) + ' (' + e.status + ')');
          break;
        }
        case 'tnote': {
          (S.theoryNotes[e.id] = S.theoryNotes[e.id] || []).push({ effect: e.effect, text: e.text });
          const th = C.theories.find((x) => x.id === e.id);
          const word = { support: 'supported', weaken: 'weakened', ruleout: 'RULED OUT' }[e.effect];
          changes.push('Theory “' + esc(th.title) + '” ' + word + ': ' + esc(e.text));
          break;
        }
        case 'slot': {
          (S.slots[e.id] = S.slots[e.id] || {})[e.slot] = e.value;
          break;
        }
        case 'check': {
          if (!S.checks[e.id]) { S.checks[e.id] = e.text; changes.push('✔ Trial checklist: <b>' + esc(CHECKLIST.find((c) => c[0] === e.id)[1]) + '</b> – ' + esc(e.text)); }
          break;
        }
        default: console.warn('Unknown effect', e);
      }
    }
  }

  // ---------- automatic alibi check ----------
  function travel(a, b) {
    if (a === b) return 0;
    const pa = C.places[a] || {}, pb = C.places[b] || {};
    return ((pa.travel || {})[b] ?? (pb.travel || {})[a] ?? 60) / 60;
  }
  function checkAlibis(changes) {
    for (const c of S.timeline) {
      if (c.status !== 'claimed' || c.false) continue;
      for (const k of S.timeline) {
        if (k.status !== 'confirmed' || k.who !== c.who || travel(c.where, k.where) === 0) continue;
        const gap = Math.max(k.a - c.b, c.a - k.b); // <0 means overlap
        if (gap < travel(c.where, k.where)) {
          c.false = 'Impossible: ' + pname(k.who) + ' was confirmed at ' + place(k.where) + ' (' + fmtCase(k.from) + ').';
          S.flags.add('contra:' + c.who);
          S.flags.add('contra:' + (c.id || c.who));
          changes.push('⚠ <b>Contradiction</b> – ' + esc(pname(c.who)) + ' claimed “' + esc(c.text) + '”. ' + esc(c.false));
          break;
        }
      }
    }
  }

  // ---------- applying with "what changed" diff ----------
  function resolve(effects) {
    const changes = [];
    const leadsBefore = new Set(availableLeads().map((l) => l.id));
    const thBefore = new Set(availableTheories().map((x) => x.id));
    apply(effects, changes);
    checkAlibis(changes);
    for (const ev of C.events) if (ev.requires && !S.fired.has(ev.id) && !S.scheduled.some((s) => s.id === ev.id) && reqOk(ev)) S.scheduled.push({ id: ev.id, at: S.t + (ev.delay || 0) });
    for (const x of availableTheories()) if (!thBefore.has(x.id)) changes.push('New working theory (' + esc(x.by) + '): <b>' + esc(x.title) + '</b>');
    for (const l of availableLeads()) if (!leadsBefore.has(l.id) && levelOf(l.id) === 0) changes.push('New lead (' + esc(l.by) + '): ' + esc(l.title));
    return changes;
  }

  // ---------- turn loop ----------
  function assign(leadId, opIdx) {
    const l = C.leads.find((x) => x.id === leadId);
    const lv = l.levels[levelOf(leadId)];
    S.ops[opIdx].until = S.t + lv.hours;
    S.ops[opIdx].lead = leadId;
    render();
  }
  function nextTime() {
    const ts = S.ops.filter((o) => o.lead).map((o) => o.until).concat(S.scheduled.map((s) => s.at));
    return ts.length ? Math.min(...ts) : null;
  }
  function advance() {
    let nt = nextTime();
    if (nt === null) nt = S.t + 24; // nothing running: wait a day
    S.t = nt;
    for (const s of S.scheduled.filter((x) => x.at <= S.t)) {
      const ev = C.events.find((e) => e.id === s.id);
      S.fired.add(ev.id);
      S.queue.push({ title: ev.title, who: ev.who || '', text: ev.text, changes: resolve(ev.effects) });
    }
    S.scheduled = S.scheduled.filter((x) => x.at > S.t);
    S.ops.forEach((o) => {
      if (!o.lead || o.until > S.t) return;
      const l = C.leads.find((x) => x.id === o.lead);
      const lv = l.levels[levelOf(l.id)];
      S.level[l.id] = levelOf(l.id) + 1;
      o.lead = null; o.until = null;
      if (!reqOk(l)) { S.queue.push({ title: l.title, who: o.name, text: 'Called off – no longer needed.', changes: [] }); return; }
      S.queue.push({ title: l.title, who: o.name, text: lv.report, changes: resolve(lv.effects) });
    });
    if (S.t >= C.dayLimit * 24 && !S.over) {
      S.over = true;
      S.queue.push({ title: 'Time is up', who: 'Chief of police', text: C.timeUp, changes: [] });
    }
    render();
    showQueue();
  }
  function showQueue() {
    const r = S.queue.shift();
    if (!r) { $('modal').hidden = true; return; }
    modal('<h2>' + esc(r.title) + '</h2>' + (r.who ? '<div class="dim">Report – ' + esc(r.who) + ' – ' + esc(fmtH(S.t)) + '</div>' : '') +
      '<p>' + esc(r.text) + '</p>' +
      (r.changes.length ? '<div class="changes"><b>What changed</b><ul>' + r.changes.map((c) => '<li>' + c + '</li>').join('') + '</ul></div>' : '<div class="changes dim">Nothing new.</div>') +
      '<p><button id="mok">OK</button></p>');
    $('mok').onclick = showQueue;
  }
  function modal(html) { $('modal-box').innerHTML = html; $('modal').hidden = false; }

  // ---------- rendering ----------
  function render() {
    const day = S.t / 24;
    $('clock').textContent = fmtH(S.t);
    $('dayfill').style.width = Math.min(100, (day / C.dayLimit) * 100) + '%';
    $('daylabel').textContent = 'Day ' + (Math.floor(day) + 1) + ' / ' + C.dayLimit;
    $('ops').innerHTML = S.ops.map((o) => o.lead
      ? '<span class="op busy">' + esc(o.name) + ': busy until ' + esc(fmtH(o.until)) + '</span>'
      : '<span class="op free">' + esc(o.name) + ': free</span>').join('');
    $('continue').textContent = nextTime() === null ? 'Wait a day ▶' : 'Continue ▶';
    $('continue').disabled = S.over;
    renderLeads();
    renderTabs();
  }
  function renderLeads() {
    const free = S.ops.map((o, i) => [o, i]).filter(([o]) => !o.lead);
    const html = availableLeads().map((l) => {
      const n = levelOf(l.id), lv = l.levels[n];
      const run = running(l.id);
      const owner = run ? S.ops.find((o) => o.lead === l.id).name : null;
      return '<div class="lead' + (run ? ' running' : '') + '">' +
        '<div class="who">' + esc(l.by) + (n ? ' – follow-up #' + n : '') + ':</div>' +
        '<div>“' + esc(lv.offer || (n ? 'I could keep at it: ' + l.title.toLowerCase() + '.' : l.offer)) + '”</div>' +
        '<div class="cost">Takes ' + dur(lv.hours) + '</div>' +
        (run ? '<div class="dim">In progress – ' + esc(owner) + '</div>'
          : S.over ? '' : free.map(([o, i]) => '<button class="small" data-l="' + l.id + '" data-o="' + i + '">Send ' + esc(o.name) + '</button>').join('')) +
        '</div>';
    }).join('');
    $('leads').innerHTML = html || '<div class="dim">No leads left.</div>';
    $('leads').querySelectorAll('button').forEach((b) => (b.onclick = () => assign(b.dataset.l, +b.dataset.o)));
  }
  function renderTabs() {
    $('tabs').innerHTML = TABS.map((t) => '<button class="' + (t === S.tab ? 'on' : '') + '">' + t + '</button>').join('');
    $('tabs').querySelectorAll('button').forEach((b) => (b.onclick = () => { S.tab = b.textContent; renderTabs(); }));
    $('view').innerHTML = VIEWS[S.tab]();
    const tb = $('trialbtn');
    if (tb) tb.onclick = trial;
  }
  const VIEWS = {
    People() {
      const ids = Object.keys(S.people);
      if (!ids.length) return '<div class="dim">Nobody known yet.</div>';
      return ids.map((id) => {
        const p = C.people[id], st = S.people[id];
        return '<div class="card"><h3>' + esc(p.name) + ' <span class="dim">– ' + esc(p.role) + '</span></h3>' +
          st.info.map((i) => '<div><span class="k">' + esc(i.key) + ':</span> ' + esc(i.text) + '</div>').join('') + '</div>';
      }).join('');
    },
    Objects() {
      const ids = Object.keys(S.objects);
      if (!ids.length) return '<div class="dim">No objects or findings yet.</div>';
      return ids.map((id) => {
        const o = C.objects[id];
        return '<div class="card"><h3>' + esc(o.name) + '</h3><div class="dim">' + esc(o.desc || '') + '</div>' +
          S.objects[id].notes.map((n) => '<div>• ' + esc(n) + '</div>').join('') + '</div>';
      }).join('');
    },
    Timeline() {
      if (!S.timeline.length) return '<div class="dim">Nothing placed in time yet.</div>';
      const by = {};
      for (const e of S.timeline) (by[e.who] = by[e.who] || []).push(e);
      return '<div class="dim">Green = confirmed (records, footage). Orange = claimed (someone said so). Red = proven impossible.</div><br>' +
        Object.keys(by).map((w) => '<div class="card tl-row"><h3>' + esc(pname(w)) + '</h3>' +
          by[w].sort((a, b) => a.a - b.a).map((e) => {
            const cls = e.false ? 'false' : e.status;
            return '<div class="tl-entry ' + cls + '"><b>' + esc(fmtCase(e.from)) + (e.to ? ' – ' + esc(fmtCase(e.to)) : '') + '</b> @ ' + esc(place(e.where)) +
              '<span class="tag ' + cls + '">' + (e.false ? 'impossible' : e.status) + '</span><br>' + esc(e.text) +
              (e.false ? '<br><span class="dim">' + esc(e.false) + '</span>' : '') + '</div>';
          }).join('') + '</div>').join('');
    },
    Theories() {
      const th = availableTheories();
      if (!th.length) return '<div class="dim">No working theories yet.</div>';
      return th.map((x) => {
        const notes = S.theoryNotes[x.id] || [];
        const out = notes.some((n) => n.effect === 'ruleout');
        const slots = Object.assign({}, x.slots, S.slots[x.id] || {});
        return '<div class="card theory' + (out ? ' ruledout' : '') + '"><h3>' + esc(x.title) + (out ? ' <span class="tag ruleout">ruled out</span>' : '') + '</h3>' +
          '<div class="dim">Proposed by ' + esc(x.by) + '. ' + esc(x.text) + '</div>' +
          Object.keys(slots).map((k) => '<div><span class="k">' + esc(k) + ':</span> ' + esc(slots[k]) + '</div>').join('') +
          notes.map((n) => '<div><span class="tag ' + n.effect + '">' + n.effect + '</span> ' + esc(n.text) + '</div>').join('') + '</div>';
      }).join('');
    },
    Trial() {
      const all = CHECKLIST.every((c) => S.checks[c[0]]);
      return '<div class="card">' + CHECKLIST.map((c) => '<div class="check">' + (S.checks[c[0]] ? '☑' : '☐') + ' ' + esc(c[1]) +
        (S.checks[c[0]] ? ' <span class="dim">– ' + esc(S.checks[c[0]]) + '</span>' : '') + '</div>').join('') +
        '<br><button id="trialbtn"' + (all && !S.over ? '' : ' disabled') + '>Hand the case to the prosecutor ⚖</button></div>';
    },
  };

  function trial() {
    const strength = C.trial.strengthFlags.filter(has).length;
    const v = C.trial.verdicts.find((x) => strength >= x.min);
    S.over = true;
    render();
    modal('<h2>Verdict</h2><p>' + esc(v.text) + '</p><div class="changes">Solved on day ' + (Math.floor(S.t / 24) + 1) + ' of ' + C.dayLimit +
      '. Evidence strength: ' + strength + ' / ' + C.trial.strengthFlags.length + '.</div><p><button onclick="location.reload()">Play again</button></p>');
  }

  // ---------- start ----------
  $('continue').onclick = advance;
  for (const ev of C.events) if (ev.at) S.scheduled.push({ id: ev.id, at: toHours(ev.at) });
  const introChanges = resolve(C.introEffects);
  render();
  S.queue.push({ title: C.title, who: '', text: C.intro, changes: introChanges });
  showQueue();
})();
