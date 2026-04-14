// ─── Scoring Engine ────────────────────────────────────────────────────────
// Shared across all tool pages. Add new angles here only.

export const ANGLES = [
  { id:"skip",      label:"Skip tracking",   desc:"Draws since last seen — overdue signal" },
  { id:"hotcold",   label:"Hot / cold",       desc:"Frequency vs expected — momentum signal" },
  { id:"oddeven",   label:"Odd / even",       desc:"Rebalancing current ratio toward 50/50" },
  { id:"sum",       label:"Sum analysis",     desc:"Digits that fill underrepresented sums" },
  { id:"posbias",   label:"Position bias",    desc:"Digit affinity for this specific position" },
  { id:"repeat",    label:"Repeat pattern",   desc:"Back-to-back appearance rate" },
  { id:"pair",      label:"Pair affinity",    desc:"Digits that appear together most often" },
  { id:"dayofweek", label:"Day of week",      desc:"Hit rate on today's day of week" },
  { id:"delta",     label:"Digit delta",      desc:"Trend in consecutive draw differences" },
];

export const PRESETS = {
  aggressive:   { skip:.20, hotcold:.20, oddeven:.05, sum:.05, posbias:.15, repeat:.15, pair:.10, dayofweek:.05, delta:.05 },
  balanced:     { skip:.15, hotcold:.15, oddeven:.10, sum:.10, posbias:.10, repeat:.10, pair:.15, dayofweek:.10, delta:.05 },
  conservative: { skip:.10, hotcold:.20, oddeven:.15, sum:.15, posbias:.10, repeat:.05, pair:.10, dayofweek:.10, delta:.05 },
};

export const API_BASE = "https://data.ny.gov/resource/hsys-3def.json";

// ─── Helpers ────────────────────────────────────────────────────────────────
export function padNum(s, len) {
  if (!s) return null;
  const r = String(s).trim();
  if (!r || isNaN(r)) return null;
  return r.padStart(len, "0");
}

export function norm(arr) {
  const mn = Math.min(...arr), mx = Math.max(...arr);
  if (mx === mn) return arr.map(() => 0.5);
  return arr.map(v => (v - mn) / (mx - mn));
}

// ─── Parse API records into draw objects ────────────────────────────────────
export function parseDraws(records, game, drawTime) {
  const len = game === "pick3" ? 3 : 4;
  const out = [];
  for (const r of records) {
    const date = (r.draw_date || "").split("T")[0];
    if (!date) continue;
    const dow = new Date(date).getDay();
    const mid = game === "pick3"
      ? padNum(r.midday_daily_number, len)
      : padNum(r.midday_win_4, len);
    const eve = game === "pick3"
      ? padNum(r.evening_daily_number, len)
      : padNum(r.evening_win_4, len);
    if ((drawTime === "both" || drawTime === "midday") && mid)
      out.push({ date, time: "midday", number: mid, dow });
    if ((drawTime === "both" || drawTime === "evening") && eve)
      out.push({ date, time: "evening", number: eve, dow });
  }
  return out;
}

// ─── Run all 9 angle engines ─────────────────────────────────────────────────
export function runEngine(draws, game, win) {
  const len = game === "pick3" ? 3 : 4;
  const sl = draws.slice(0, win);
  const n = sl.length;
  if (!n) return null;

  const freq     = Array.from({ length: len }, () => Array(10).fill(0));
  const lastSeen = Array.from({ length: len }, () => Array(10).fill(null));
  const skip     = Array.from({ length: len }, () => Array(10).fill(n + 1));
  const dow      = Array.from({ length: len }, () => Array(10).fill(0).map(() => Array(7).fill(0)));
  const pairs    = {};
  const rep      = Array.from({ length: len }, () => Array(10).fill(0));
  const delta    = Array.from({ length: len }, () => Array(10).fill(0));
  const sumD     = Array(game === "pick3" ? 28 : 37).fill(0);
  let odd = 0, even = 0;

  sl.forEach(({ number, dow: d }, idx) => {
    const digs = number.split("").map(Number);
    const s = digs.reduce((a, b) => a + b, 0);
    sumD[s]++;
    digs.forEach((v, p) => {
      freq[p][v]++;
      if (lastSeen[p][v] === null) skip[p][v] = idx;
      lastSeen[p][v] = idx;
      dow[p][v][d]++;
      if (v % 2 === 0) even++; else odd++;
    });
    for (let i = 0; i < digs.length; i++)
      for (let j = i + 1; j < digs.length; j++) {
        const k = [digs[i], digs[j]].sort().join("-");
        pairs[k] = (pairs[k] || 0) + 1;
      }
    if (idx > 0) {
      const pv = sl[idx - 1].number.split("").map(Number);
      digs.forEach((v, p) => {
        if (v === pv[p]) rep[p][v]++;
        delta[p][v] += Math.abs(v - pv[p]);
      });
    }
  });

  const exp   = n / 10;
  const late  = Math.ceil(exp * 1.5);
  const vLate = Math.ceil(exp * 2.0);
  const oddR  = odd / (odd + even);
  const raw   = {};

  raw.skip    = skip.map(p => norm(p));
  raw.hotcold = freq.map(p => norm(p));
  raw.oddeven = Array.from({ length: len }, () =>
    Array.from({ length: 10 }, (_, d) => oddR > .5 ? (d % 2 === 0 ? 1 : 0) : (d % 2 !== 0 ? 1 : 0))
  );
  raw.sum = Array.from({ length: len }, (_, p) =>
    norm(Array.from({ length: 10 }, (_, d) => {
      let sc = 0;
      sumD.forEach((cnt, s) => {
        const gap = Math.max(...sumD) - cnt;
        const av  = (s - d) / (len - 1 || 1);
        if (av >= 0 && av <= 9) sc += gap;
      });
      return sc;
    }))
  );
  raw.posbias = Array.from({ length: len }, (_, p) =>
    norm(Array.from({ length: 10 }, (_, d) => {
      const op = freq.reduce((s, pp, pi) => pi !== p ? s + pp[d] : s, 0) / (len - 1 || 1);
      return freq[p][d] - op;
    }))
  );
  raw.repeat = rep.map(p => norm(p));
  raw.pair = Array.from({ length: len }, () =>
    norm(Array.from({ length: 10 }, (_, d) => {
      let best = 0;
      for (let o = 0; o < 10; o++) {
        if (o === d) continue;
        const k = [d, o].sort().join("-");
        best = Math.max(best, pairs[k] || 0);
      }
      return best;
    }))
  );
  const todayDow = new Date().getDay();
  raw.dayofweek = Array.from({ length: len }, (_, p) =>
    norm(Array.from({ length: 10 }, (_, d) => dow[p][d][todayDow]))
  );
  raw.delta = delta.map(p => norm(p));

  return { raw, freq, skip, exp, late, vLate, odd, even, sumD, n, pairs };
}

// ─── Blend scores ────────────────────────────────────────────────────────────
export function blend(eng, weights) {
  if (!eng) return null;
  return eng.raw.skip.map((_, pos) =>
    Array.from({ length: 10 }, (_, d) =>
      ANGLES.reduce((t, { id }) => t + (eng.raw[id]?.[pos]?.[d] ?? 0) * (weights[id] ?? 0), 0)
    )
  );
}

// ─── Wheeling helpers ────────────────────────────────────────────────────────
export function getUniquePerms(arr) {
  const seen = new Set();
  const out  = [];
  function p(c, r) {
    if (!r.length) {
      const k = c.join(",");
      if (!seen.has(k)) { seen.add(k); out.push([...c]); }
      return;
    }
    for (let i = 0; i < r.length; i++)
      p([...c, r[i]], [...r.slice(0, i), ...r.slice(i + 1)]);
  }
  p([], arr);
  return out;
}

export function getBoxLabel(digits) {
  const count = getUniquePerms(digits).length;
  if (count === 1) return null;
  return `${count}-way`;
}
