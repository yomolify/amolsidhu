// scripts/generate-metrics.js
import { writeFileSync } from "fs";

function genData() {
  const start = new Date("2025-03-29"); // 150 days before Aug 25
  const rows = [];
  for (let i = 0; i < 150; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    // visitors grow slightly over time + noise
    const visitors = Math.round(15000 + i * 70 + Math.random() * 1500);
    const signups = Math.round(visitors * (0.06 + Math.random() * 0.02));
    const conversion = +(100 * (signups / visitors)).toFixed(1);
    const latency = Math.round(160 + Math.random() * 50 - i * 0.05); // trending down
    const p95 = latency + 180 + Math.random() * 40;
    const p99 = p95 + 250 + Math.random() * 40;
    const errors = Math.round(20 + Math.random() * 15);
    const apdex = +(0.9 + Math.random() * 0.08).toFixed(2);
    const active = Math.round(visitors * 0.5);
    const revenue = Math.round(signups * (15 + Math.random() * 10));

    rows.push({
      date: d.toISOString().slice(0, 10),
      visitors,
      signups,
      conversion,
      latency_ms: latency,
      p95_ms: Math.round(p95),
      p99_ms: Math.round(p99),
      errors,
      apdex,
      active_users: active,
      revenue_usd: revenue,
    });
  }
  return rows;
}

const json = {
  kpis: genData(),
  breakdowns: {
    by_channel_last_30d: [
      { channel: "organic", visitors: 145230, signups: 10140, conversion: 7.0 },
      {
        channel: "paid_search",
        visitors: 81210,
        signups: 5640,
        conversion: 6.9,
        cac_usd: 28.3,
        roas: 3.6,
      },
      { channel: "social", visitors: 60350, signups: 3920, conversion: 6.5 },
      { channel: "referral", visitors: 22140, signups: 1790, conversion: 8.1 },
    ],
  },
  retention: {
    weekly_cohorts: [
      { cohort_start: "2025-07-14", d1: 46, d7: 32, d14: 27, d30: 19 },
      { cohort_start: "2025-07-21", d1: 47, d7: 33, d14: 28, d30: 20 },
      { cohort_start: "2025-07-28", d1: 48, d7: 34, d14: 29, d30: 21 },
      { cohort_start: "2025-08-04", d1: 49, d7: 35, d14: 30, d30: 22 },
      { cohort_start: "2025-08-11", d1: 49, d7: 36, d14: 31, d30: 22 },
    ],
  },
};

writeFileSync("public/data/metrics.json", JSON.stringify(json, null, 2));
console.log("metrics.json generated with 150 days of kpis");
