"use client";

import * as htmlToImage from "html-to-image";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Section } from "@/components/section";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Brush,
} from "recharts";

type Row = {
  date: string;
  visitors: number;
  signups: number;
  conversion: number;
  latency_ms: number;
};
type ChannelRow = {
  channel: string;
  visitors: number;
  signups?: number;
  conversion?: number;
};
type ChannelDaily = {
  date: string;
  channel: string;
  visitors: number;
  signups: number;
};

type RetentionRow = {
  cohort_start: string;
  d1: number;
  d7: number;
  d14: number;
  d30: number;
};

type MetricsJson = {
  kpis: Row[];
  breakdowns?: {
    by_channel_last_30d?: ChannelRow[];
    by_channel_daily?: ChannelDaily[];
  };
  retention?: {
    weekly_cohorts?: RetentionRow[];
  };
};

// ---- helpers ---------------------------------------------------------
const fmtNum = (n?: number) =>
  typeof n === "number" ? n.toLocaleString() : "–";
const fmtPct = (n?: number) =>
  typeof n === "number" ? `${n.toFixed(1)}%` : "–";
const fmtMs = (n?: number) =>
  typeof n === "number" ? `${Math.round(n)} ms` : "–";

function useKpis(rows: Row[]) {
  return useMemo(() => {
    if (!rows.length) {
      return {
        visitors: 0,
        signups: 0,
        conv: 0,
        latency: 0,
        delta: { v: 0, s: 0, c: 0, l: 0 },
      };
    }
    const last = rows[rows.length - 1];
    const prev = rows[rows.length - 2] ?? last;
    const sum = rows.reduce(
      (a, r) => {
        a.visitors += r.visitors;
        a.signups += r.signups;
        a.latency += r.latency_ms;
        return a;
      },
      { visitors: 0, signups: 0, latency: 0 }
    );
    const avgLatency = sum.latency / rows.length;
    const delta = {
      v: ((last.visitors - prev.visitors) / Math.max(prev.visitors, 1)) * 100,
      s: ((last.signups - prev.signups) / Math.max(prev.signups, 1)) * 100,
      c: last.conversion - prev.conversion,
      l:
        ((last.latency_ms - prev.latency_ms) / Math.max(prev.latency_ms, 1)) *
        100,
    };
    return {
      visitors: sum.visitors,
      signups: sum.signups,
      conv: last.conversion,
      latency: avgLatency,
      delta,
    };
  }, [rows]);
}

// ---- UI bits ---------------------------------------------------------
function Stat({
  label,
  value,
  sub,
  positive = true,
}: {
  label: string;
  value: string;
  sub: string;
  positive?: boolean;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="text-xs uppercase tracking-wide opacity-70">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div
        className={`mt-1 text-xs ${
          positive ? "text-emerald-500" : "text-rose-500"
        }`}
      >
        {sub}
      </div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass p-4 md:p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 text-xs">
      <ul className="mt-1 space-y-0.5">
        {payload.map((p: any) => (
          <li key={p.dataKey} className="flex items-center gap-2">
            <span
              className="inline-block size-2 rounded-full"
              style={{ background: p.color }}
            />
            <span className="opacity-70">{p.name}:</span>
            <span className="font-medium">
              {p.dataKey === "conversion"
                ? fmtPct(p.value)
                : p.dataKey === "latency_ms"
                ? fmtMs(p.value)
                : fmtNum(p.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ---- page ------------------------------------------------------------
export default function ChartsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [channels, setChannels] = useState<ChannelRow[]>([]);
  const [channelsDaily, setChannelsDaily] = useState<ChannelDaily[]>([]);
  const [cohorts, setCohorts] = useState<RetentionRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  // range: '7' | '30' | '90' | 'all'
  const [range, setRange] = useState<"7" | "30" | "90" | "all">("30");

  // Filter rows by date window
  const filteredRows = useMemo(() => {
    if (!rows.length || range === "all") return rows;
    const last = new Date(rows[rows.length - 1].date).getTime();
    const days = Number(range) * 24 * 60 * 60 * 1000;
    return rows.filter((r) => new Date(r.date).getTime() >= last - days);
  }, [rows, range]);

  // Wrap the whole chart area to export it
  const exportRef = useRef<HTMLDivElement>(null);

  // Export handler (PNG)
  const handleExportPng = useCallback(async () => {
    if (!exportRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");

    // Hide export-excluded layers (noise/overlays) while capturing
    document.body.setAttribute("data-exporting", "true");

    try {
      const dataUrl = await htmlToImage.toPng(exportRef.current, {
        pixelRatio: 2,
        backgroundColor: isDark ? "#0b1220" : "#ffffff", // ← important for light mode
        filter: (node) => {
          // skip anything marked with data-export-exclude
          return !(
            node instanceof HTMLElement &&
            node.dataset.exportExclude !== undefined
          );
        },
        cacheBust: true,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `amolsidhu-metrics-${range}.png`;
      a.click();
    } finally {
      document.body.removeAttribute("data-exporting");
    }
  }, [range]);

  useEffect(() => {
    fetch("/data/metrics.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))))
      .then((d: MetricsJson) => {
        setRows(d.kpis ?? []);
        setChannels(d.breakdowns?.by_channel_last_30d ?? []);
        setChannelsDaily(d.breakdowns?.by_channel_daily ?? []);
        setCohorts(d.retention?.weekly_cohorts ?? []);
      });
  }, []);

  const lastDate = useMemo(
    () => (rows.length ? new Date(rows[rows.length - 1].date).getTime() : 0),
    [rows]
  );
  const rangeStartMs = useMemo(() => {
    if (!lastDate || range === "all") return 0;
    const days = Number(range) * 24 * 60 * 60 * 1000;
    return lastDate - days;
  }, [lastDate, range]);

  const toMs = (iso: string) => new Date(iso).getTime();

  const k = useKpis(filteredRows);
  const heatColor = (v: number) => {
    // Indigo to emerald
    const clamped = Math.max(0, Math.min(100, v));
    const hue = 260 - (clamped / 100) * 100;
    const sat = 75;
    const light = 45 + (100 - clamped) * 0.15;
    return `hsl(${hue} ${sat}% ${light}%)`;
  };

  const fmtShort = (d: string) =>
    new Date(d).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });

  const channelsDailyDerived = useMemo<ChannelDaily[]>(() => {
    if (channelsDaily.length) return channelsDaily;
    if (!channels.length || !rows.length) return [];
    // compute shares from provided totals
    const totalV = channels.reduce((a, c) => a + (c.visitors || 0), 0) || 1;
    const totalS = channels.reduce((a, c) => a + (c.signups || 0), 0) || 1;
    const vShare: Record<string, number> = {};
    const sShare: Record<string, number> = {};
    channels.forEach((c) => {
      vShare[c.channel] = (c.visitors || 0) / totalV;
      sShare[c.channel] = (c.signups || 0) / totalS;
    });
    // split each day by shares
    const out: ChannelDaily[] = [];
    rows.forEach((r) => {
      channels.forEach((c) => {
        out.push({
          date: r.date,
          channel: c.channel,
          visitors: Math.round(r.visitors * vShare[c.channel]),
          signups: Math.round(r.signups * sShare[c.channel]),
        });
      });
    });
    return out;
  }, [channelsDaily, channels, rows]);

  // windowed sum by channel for current range
  const channelsWindow = useMemo<ChannelRow[]>(() => {
    if (!channelsDailyDerived.length) return channels; // fallback: static
    const start = rangeStartMs;
    const sums = new Map<string, { visitors: number; signups: number }>();
    channelsDailyDerived.forEach((row) => {
      if (range === "all" || toMs(row.date) >= start) {
        const prev = sums.get(row.channel) ?? { visitors: 0, signups: 0 };
        prev.visitors += row.visitors;
        prev.signups += row.signups;
        sums.set(row.channel, prev);
      }
    });
    return Array.from(sums, ([channel, v]) => ({
      channel,
      visitors: v.visitors,
      signups: v.signups,
    }));
  }, [channelsDailyDerived, range, rangeStartMs, channels]);
  const stackedChannels = useMemo(() => {
    if (!channelsWindow.length) return [];
    const byKey = (key: "visitors" | "signups") =>
      channelsWindow.reduce(
        (acc: any, c) => ({ ...acc, [c.channel]: (c as any)[key] || 0 }),
        {}
      );
    return [
      { metric: "Visitors", ...byKey("visitors") },
      { metric: "Signups", ...byKey("signups") },
    ];
  }, [channelsWindow]);

  const channelPalette = useMemo(() => {
    const base = [
      "rgba(139,92,246,0.9)",
      "rgba(6,182,212,0.9)",
      "rgba(16,185,129,0.9)",
      "rgba(234,179,8,0.9)",
      "rgba(244,63,94,0.9)",
    ];
    const map: Record<string, string> = {};
    channelsWindow.forEach((c, i) => (map[c.channel] = base[i % base.length]));
    return map;
  }, [channelsWindow]);
  const cohortsWindow = useMemo(() => {
    if (!cohorts.length || range === "all") return cohorts;
    const start = rangeStartMs;
    return cohorts.filter((c) => toMs(c.cohort_start) >= start);
  }, [cohorts, range, rangeStartMs]);

  function CohortHeatmap({ rows }: { rows: RetentionRow[] }) {
    const headers = ["d1", "d7", "d14", "d30"] as const;
    return (
      <div className="glass p-4 md:p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Retention Cohorts</h3>
          <div className="flex items-center gap-2 text-xs">
            <span
              className="inline-block w-3 h-3 rounded"
              style={{ background: heatColor(15) }}
            />
            <span>low</span>
            <span
              className="inline-block w-3 h-3 rounded"
              style={{ background: heatColor(50) }}
            />
            <span>mid</span>
            <span
              className="inline-block w-3 h-3 rounded"
              style={{ background: heatColor(85) }}
            />
            <span>high</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[140px_repeat(4,1fr)] gap-2 items-stretch">
              {/* header row */}
              <div />
              {headers.map((h) => (
                <div
                  key={h}
                  className="text-xs uppercase tracking-wide opacity-70 text-center py-1"
                >
                  {h.toUpperCase()}
                </div>
              ))}

              {/* rows */}
              {rows.map((r) => (
                <div key={r.cohort_start} className="contents">
                  <div className="text-sm py-2 px-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/60">
                    {new Date(r.cohort_start).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  {headers.map((h) => {
                    const v = r[h];
                    return (
                      <div
                        key={h}
                        className="rounded-lg h-10 flex items-center justify-center text-[11px] font-medium text-white/90"
                        style={{ background: heatColor(v) }}
                        title={`${h.toUpperCase()}: ${v}%`}
                      >
                        {v}%
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24">
      <Section
        title="Product Analytics"
        subtitle="Executive-ready dashboards that teams can customize and export with ease."
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="glass rounded-xl p-1 inline-flex">
            {(["7", "30", "90", "all"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  range === r ? "btn-shimmer text-white" : "hover:opacity-80"
                }`}
              >
                {r === "all" ? "All" : `Last ${r}d`}
              </button>
            ))}
          </div>
          <button
            onClick={handleExportPng}
            className="glass px-3 py-1.5 rounded-lg text-sm hover:shadow-glow"
          >
            Download Report PNG
          </button>
        </div>
        <div ref={exportRef}>
          {/* KPI band */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Stat
              label="Visitors (Total)"
              value={fmtNum(k.visitors)}
              sub={`${k.delta.v >= 0 ? "▲" : "▼"} ${Math.abs(k.delta.v).toFixed(
                1
              )}% vs prev`}
              positive={k.delta.v >= 0}
            />
            <Stat
              label="Signups (Total)"
              value={fmtNum(k.signups)}
              sub={`${k.delta.s >= 0 ? "▲" : "▼"} ${Math.abs(k.delta.s).toFixed(
                1
              )}% vs prev`}
              positive={k.delta.s >= 0}
            />
            <Stat
              label="Conversion (Latest)"
              value={fmtPct(k.conv)}
              sub={`${k.delta.c >= 0 ? "▲" : "▼"} ${Math.abs(k.delta.c).toFixed(
                1
              )} pts vs prev`}
              positive={k.delta.c >= 0}
            />
            <Stat
              label="Avg Latency"
              value={fmtMs(k.latency)}
              sub={`${k.delta.l <= 0 ? "▲ faster" : "▼ slower"} ${Math.abs(
                k.delta.l
              ).toFixed(1)}%`}
              positive={k.delta.l <= 0}
            />
          </div>

          {/* Combined chart: Visitors + Signups (bars) with Conversion (line) */}
          <Card title="Acquisition & Conversion">
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredRows}
                  margin={{ left: 8, right: 8, top: 8 }}
                >
                  <defs>
                    <linearGradient id="gVisitors" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(139,92,246,0.9)" />
                      <stop offset="100%" stopColor="rgba(139,92,246,0.2)" />
                    </linearGradient>
                    <linearGradient id="gSignups" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(6,182,212,0.9)" />
                      <stop offset="100%" stopColor="rgba(6,182,212,0.2)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(d) =>
                      new Date(d).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    tickMargin={8}
                  />
                  <YAxis
                    yAxisId="left"
                    tickFormatter={(v) => fmtNum(v)}
                    width={56}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v) => `${v}%`}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="visitors"
                    name="Visitors"
                    fill="url(#gVisitors)"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="signups"
                    name="Signups"
                    fill="url(#gSignups)"
                    radius={[8, 8, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversion"
                    name="Conversion"
                    dot={false}
                    stroke="rgba(16,185,129,0.95)"
                    strokeWidth={2.5}
                  />
                  <Brush
                    travellerWidth={10}
                    height={22}
                    className="fill-transparent"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Two-up: Conversion focus, Latency distribution */}
          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <Card title="Conversion Trend">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredRows}
                    margin={{ left: 8, right: 8, top: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) =>
                        new Date(d).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })
                      }
                      tickMargin={8}
                    />
                    <YAxis tickFormatter={(v) => `${v}%`} width={40} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={k.conv}
                      stroke="rgba(16,185,129,0.35)"
                      strokeDasharray="4 4"
                    />
                    <Line
                      type="monotone"
                      dataKey="conversion"
                      name="Conversion"
                      stroke="rgba(16,185,129,0.95)"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Latency (ms)">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={filteredRows}
                    margin={{ left: 8, right: 8, top: 8 }}
                  >
                    <defs>
                      <linearGradient id="gLatency" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(139,92,246,0.9)" />
                        <stop offset="100%" stopColor="rgba(139,92,246,0.05)" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) =>
                        new Date(d).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })
                      }
                      tickMargin={8}
                    />
                    <YAxis
                      tickFormatter={(v) => fmtMs(v).replace(" ms", "")}
                      width={46}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={k.latency}
                      stroke="rgba(148,163,184,0.5)"
                      strokeDasharray="4 4"
                      label={{
                        value: "avg",
                        position: "insideTopLeft",
                        fill: "rgba(148,163,184,0.9)",
                        fontSize: 10,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="latency_ms"
                      name="Latency"
                      stroke="rgba(139,92,246,0.95)"
                      fill="url(#gLatency)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card title="Latency — avg vs p95 vs p99">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredRows}
                    margin={{ left: 8, right: 8, top: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={fmtShort}
                      tickMargin={8}
                    />
                    <YAxis
                      tickFormatter={(v) => Math.round(v).toString()}
                      width={46}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="latency_ms"
                      name="Avg"
                      stroke="rgba(139,92,246,0.95)"
                      strokeWidth={2.5}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="p95_ms"
                      name="p95"
                      stroke="rgba(6,182,212,0.95)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="p99_ms"
                      name="p99"
                      stroke="rgba(244,63,94,0.95)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card title="Acquisition by Channel (stacked)">
              <div className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stackedChannels}
                    margin={{ left: 8, right: 8, top: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="metric" tickMargin={8} />
                    <YAxis tickFormatter={(v) => fmtNum(v)} width={70} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {channels.map((c) => (
                      <Bar
                        key={c.channel}
                        dataKey={c.channel}
                        stackId="total"
                        fill={channelPalette[c.channel]}
                        radius={[0, 0, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className="mt-4 grid lg:grid-cols-1 gap-4">
            {/* keep Latency (ms) card or Percentiles here if you want side-by-side */}
            <CohortHeatmap rows={cohorts} />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-rose-500">{error}</p>}
      </Section>
      <section className="mb-6"> </section>
      <div className="sticky top-24 mt-16"> ‎ </div>
    </main>
  );
}
