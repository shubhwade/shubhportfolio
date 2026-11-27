import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const ORANGE = "#ff5b1f";
const BONE = "#e9e5dc";
const ASH = "#5d5a54";
const LINE = "#2f2e2b";

function useActive<T extends Element>() {
  const ref = React.useRef<T>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  return [ref, inView] as const;
}

/* Isoline: three forensic score dials */
export function ScoreDials() {
  const [ref, on] = useActive<SVGSVGElement>();
  const dials = [
    { label: "Piotroski F", value: "8 / 9", p: 8 / 9, note: "Strong" },
    { label: "Altman Z″", value: "4.65", p: 0.78, note: "Safe zone" },
    { label: "Beneish M", value: "−2.41", p: 0.7, note: "No red flag" },
  ];
  const r = 52, c = 2 * Math.PI * r;
  return (
    <svg ref={ref} viewBox="0 0 480 260" className="h-full w-full" role="img" aria-label="Example Isoline scores for a sample company">
      {dials.map((d, i) => {
        const cx = 80 + i * 160;
        return (
          <g key={d.label}>
            <circle cx={cx} cy={110} r={r} fill="none" stroke={LINE} strokeWidth={10} />
            <motion.circle
              cx={cx} cy={110} r={r} fill="none" stroke={i === 0 ? ORANGE : BONE} strokeWidth={10} strokeLinecap="round"
              transform={`rotate(-90 ${cx} 110)`} strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: on ? c * (1 - d.p) : c }}
              transition={{ duration: 1.6, delay: 0.15 + i * 0.18, ease: EASE }}
            />
            <text x={cx} y={118} textAnchor="middle" fill={BONE} fontSize={24} fontWeight={700} className="tabular">{d.value}</text>
            <text x={cx} y={198} textAnchor="middle" fill={BONE} fontSize={14} fontWeight={600}>{d.label}</text>
            <text x={cx} y={218} textAnchor="middle" fill="#8f8b83" fontSize={12}>{d.note}</text>
          </g>
        );
      })}
      <text x={240} y={252} textAnchor="middle" fill="#6b6861" fontSize={11} letterSpacing=".08em">SAMPLE OUTPUT · SYNTHETIC COMPANY</text>
    </svg>
  );
}

/* IndiaFin: fund-category heatmap that keeps updating */
export function Heatmap() {
  const [ref, on] = useActive<SVGSVGElement>();
  const reduce = useReducedMotion();
  const rows = ["Large cap", "Mid cap", "Small cap", "Flexi cap", "ELSS", "Debt"];
  const cols = 10;
  const seed = () => Array.from({ length: rows.length * cols }, () => Math.random());
  const [vals, setVals] = React.useState<number[]>(() => seed());
  React.useEffect(() => {
    if (!on || reduce) return;
    const t = setInterval(() => setVals(seed()), 2200);
    return () => clearInterval(t);
  }, [on, reduce]);
  const size = 30, gap = 5;
  return (
    <svg ref={ref} viewBox="0 0 460 230" className="h-full w-full" aria-hidden>
      {rows.map((l, r) => (
        <text key={l} x={0} y={r * (size + gap) + 20} fill="#8f8b83" fontSize={12}>{l}</text>
      ))}
      {vals.map((v, i) => {
        const r = Math.floor(i / cols), col = i % cols;
        const neg = v < 0.16;
        return (
          <motion.rect
            key={i} x={86 + col * (size + gap)} y={r * (size + gap)} width={size} height={size} rx={6}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={on ? { opacity: 1, scale: 1, fill: neg ? "#7a2e15" : ORANGE, fillOpacity: neg ? 0.9 : 0.12 + v * 0.88 } : {}}
            transition={{ duration: 0.8, delay: on ? (col + r) * 0.025 : 0, ease: EASE }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        );
      })}
    </svg>
  );
}

/* YieldLens: yield curve drawing, with a dot that rides it */
export function YieldCurve() {
  const [ref, on] = useActive<SVGSVGElement>();
  const d = "M30,190 C90,130 140,98 200,82 S330,58 450,48";
  const prev = "M30,172 C90,128 140,108 200,98 S330,82 450,76";
  const ticks = [["3M", 30], ["2Y", 115], ["5Y", 200], ["10Y", 320], ["30Y", 450]] as const;
  return (
    <svg ref={ref} viewBox="0 0 480 240" className="h-full w-full" aria-hidden>
      {[60, 110, 160].map((y) => <line key={y} x1={30} x2={450} y1={y} y2={y} stroke={LINE} strokeDasharray="2 6" />)}
      <line x1={30} x2={450} y1={210} y2={210} stroke={LINE} />
      <motion.path d={prev} fill="none" stroke={ASH} strokeWidth={2} strokeDasharray="5 6"
        initial={{ pathLength: 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 1.6, ease: EASE }} />
      <motion.path d={`${d} L450,210 L30,210 Z`} fill="url(#yc)" initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 1, delay: 1 }} />
      <motion.path d={d} fill="none" stroke={ORANGE} strokeWidth={3} strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 1.8, delay: 0.2, ease: EASE }} />
      <defs>
        <linearGradient id="yc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={ORANGE} stopOpacity=".22" /><stop offset="1" stopColor={ORANGE} stopOpacity="0" /></linearGradient>
      </defs>
      {on && (
        <circle r={6} fill={ORANGE} stroke="#161615" strokeWidth={3}>
          <animateMotion dur="5s" repeatCount="indefinite" path={d} keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="spline" keySplines=".4 0 .2 1;.4 0 .2 1" />
        </circle>
      )}
      {ticks.map(([t, x]) => <text key={t} x={x} y={232} textAnchor="middle" fill="#8f8b83" fontSize={12}>{t}</text>)}
      <g fontSize={12}>
        <rect x={300} y={6} width={10} height={3} fill={ORANGE} /><text x={316} y={12} fill={BONE}>Today</text>
        <rect x={372} y={6} width={10} height={3} fill={ASH} /><text x={388} y={12} fill="#8f8b83">1Y ago</text>
      </g>
    </svg>
  );
}

/* Economic Verdict: cycle gauge with a sprung needle */
export function CycleGauge() {
  const [ref, on] = useActive<SVGSVGElement>();
  const arc = (a0: number, a1: number, r = 130) => {
    const p = (a: number) => [240 + r * Math.cos((a * Math.PI) / 180), 200 + r * Math.sin((a * Math.PI) / 180)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1}`;
  };
  const zones = [
    { d: arc(180, 223), c: "#7a2e15" },
    { d: arc(227, 268), c: ASH },
    { d: arc(272, 313), c: BONE },
    { d: arc(317, 360), c: ORANGE },
  ];
  return (
    <svg ref={ref} viewBox="0 0 480 240" className="h-full w-full" aria-hidden>
      {zones.map((z, i) => (
        <motion.path key={i} d={z.d} fill="none" stroke={z.c} strokeWidth={22} strokeLinecap="butt"
          initial={{ pathLength: 0, opacity: 0 }} animate={on ? { pathLength: 1, opacity: 1 } : {}} transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }} />
      ))}
      <motion.g style={{ originX: "240px", originY: "200px" }} initial={{ rotate: -90 }} animate={{ rotate: on ? 52 : -90 }}
        transition={{ type: "spring", stiffness: 60, damping: 9, delay: 0.7 }}>
        <line x1={240} y1={200} x2={240} y2={92} stroke={BONE} strokeWidth={4} strokeLinecap="round" />
      </motion.g>
      <circle cx={240} cy={200} r={11} fill={BONE} />
      <circle cx={240} cy={200} r={4} fill="#161615" />
      <g fill="#8f8b83" fontSize={12} textAnchor="middle">
        <text x={96} y={228}>Contraction</text><text x={384} y={228}>Expansion</text>
      </g>
    </svg>
  );
}

/* LearnVestX: candlesticks rising with a moving-average line */
export function Candles() {
  const [ref, on] = useActive<SVGSVGElement>();
  const data = React.useMemo(() => {
    let p = 170; const out: { o: number; c: number; h: number; l: number }[] = [];
    for (let i = 0; i < 22; i++) {
      const ch = Math.sin(i * 1.7) * 12 + i * 0.9 - 2 + (((i * 37) % 11) - 5);
      const o = p, c = o - ch; p = c;
      out.push({ o, c, h: Math.min(o, c) - 6 - (i % 3) * 4, l: Math.max(o, c) + 6 + (i % 4) * 3 });
    }
    return out;
  }, []);
  const w = 440 / data.length;
  const ma = data.map((d, i) => `${i ? "L" : "M"}${20 + i * w + w * 0.3},${(d.o + d.c) / 2}`).join(" ");
  return (
    <svg ref={ref} viewBox="0 0 480 230" className="h-full w-full" aria-hidden>
      <line x1={10} x2={470} y1={215} y2={215} stroke={LINE} />
      {data.map((d, i) => {
        const up = d.c < d.o, x = 20 + i * w;
        return (
          <motion.g key={i} initial={{ scaleY: 0, opacity: 0 }} animate={on ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.04, ease: EASE }} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
            <line x1={x + w * 0.3} x2={x + w * 0.3} y1={d.h} y2={d.l} stroke={up ? ORANGE : ASH} strokeWidth={1.5} />
            <rect x={x} y={Math.min(d.o, d.c)} width={w * 0.6} height={Math.max(3, Math.abs(d.c - d.o))} rx={2} fill={up ? ORANGE : ASH} />
          </motion.g>
        );
      })}
      <motion.path d={ma} fill="none" stroke={BONE} strokeWidth={2} strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 1.6, delay: 0.9, ease: EASE }} />
    </svg>
  );
}
