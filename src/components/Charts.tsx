import { rupees } from '../data';

type DonutProps = {
  pct: number;
  centerTop: string;
  centerSub: string;
  tone?: 'light' | 'dark';
  size?: number;
  stroke?: number;
};

export function Donut({ pct, centerTop, centerSub, tone = 'light', size = 190, stroke = 14 }: DonutProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, pct));
  const on = tone === 'dark' ? '#ffffff' : '#73826d';
  const off = tone === 'dark' ? 'rgba(255,255,255,0.2)' : '#e1e7db';

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`${centerTop} ${centerSub}`}
      data-ui
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={off} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={on}
        strokeWidth={stroke}
        strokeLinecap="butt"
        strokeDasharray={`${(clamped / 100) * c} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dasharray 500ms cubic-bezier(0.16,1,0.3,1)' }}
      />
      <text x="50%" y="48%" textAnchor="middle" className="donut-center" fill={tone === 'dark' ? '#ffffff' : '#73826d'}>
        {centerTop}
      </text>
      <text x="50%" y="58%" textAnchor="middle" className="donut-center-sub" fill={tone === 'dark' ? '#a6ada0' : '#5d6459'}>
        {centerSub}
      </text>
    </svg>
  );
}

export function ValuationChart() {
  const data = [
    { x: 0, v: 4.2, label: 'Jun 24' },
    { x: 1, v: 4.55, label: 'Dec 24' },
    { x: 2, v: 4.75, label: 'Jun 25' },
    { x: 3, v: 5.0, label: 'Dec 25' },
    { x: 4, v: 5.2, label: 'Jun 26' },
  ];
  const w = 520;
  const h = 210;
  const pad = { l: 56, r: 10, t: 14, b: 30 };
  const max = 5.6;
  const min = 4.0;
  const px = (i: number) => pad.l + (i / (data.length - 1)) * (w - pad.l - pad.r);
  const py = (v: number) => pad.t + ((max - v) / (max - min)) * (h - pad.t - pad.b);
  const points = data.map((d) => `${px(d.x)},${py(d.v)}`).join(' ');
  const area = `${pad.l},${h - pad.b} ${points} ${w - pad.r},${h - pad.b}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Indicative valuation from ₹4.2 crore in June 2024 to ₹5.2 crore in June 2026" data-ui>
      {[4.5, 5.0, 5.5].map((tick) => (
        <g key={tick}>
          <line x1={pad.l} x2={w - pad.r} y1={py(tick)} y2={py(tick)} stroke="#e1e7db" strokeWidth="1" />
          <text x={pad.l - 8} y={py(tick) + 4} textAnchor="end" fontSize="17" fill="#767f70">
            ₹{tick.toFixed(1)} Cr
          </text>
        </g>
      ))}
      <polygon points={area} fill="#eef1ea" />
      <polyline points={points} fill="none" stroke="#73826d" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <g key={d.label}>
          <circle cx={px(d.x)} cy={py(d.v)} r={i === data.length - 1 ? 5 : 3.4} fill="#ffffff" stroke="#73826d" strokeWidth="2" />
          <text x={px(d.x)} y={h - 10} textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'} fontSize="17" fill="#5d6459">
            {d.label}
          </text>
        </g>
      ))}
      <text x={px(4)} y={py(5.2) - 12} textAnchor="end" fontSize="17" fontWeight="600" fill="#73826d">
        ₹5.20 Cr
      </text>
    </svg>
  );
}

export function CostBars({ amount }: { amount: number }) {
  const fee = Math.round(amount * 0.015);
  const gst = Math.round(fee * 0.18);
  const total = amount + fee + gst;
  const rows = [
    { label: 'Land', value: rupees(amount), pct: (amount / total) * 100, tone: '' },
    { label: 'Platform fee 1.5%', value: rupees(fee), pct: (fee / total) * 100, tone: 'mint' },
    { label: 'GST on fee', value: rupees(gst), pct: (gst / total) * 100, tone: 'sand' },
  ];
  return (
    <div className="bars" data-ui>
      {rows.map((r) => (
        <div className="bar-row" key={r.label}>
          <span>{r.label}</span>
          <span className="bar-track" aria-hidden="true">
            <i className={r.tone} style={{ width: `${Math.max(r.pct, 0.6)}%` }} />
          </span>
          <strong>{r.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function AreaBars() {
  const rows = [
    { label: 'Mango & jackfruit orchard', value: '7.2 acres', pct: 72, tone: 'mint' },
    { label: 'Roads, shed & packing', value: '1.2 acres', pct: 12, tone: 'sand' },
    { label: 'Water tank & channels', value: '0.6 acres', pct: 6, tone: 'lake' },
    { label: 'Boundary & buffer', value: '1.0 acres', pct: 10, tone: '' },
  ];
  return (
    <div className="bars" data-ui>
      {rows.map((r) => (
        <div className="bar-row" key={r.label}>
          <span>{r.label}</span>
          <span className="bar-track" aria-hidden="true">
            <i className={r.tone} style={{ width: `${r.pct}%` }} />
          </span>
          <strong>{r.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function ProjectionChart({
  amount,
  irr,
  months,
  compact = false,
  tone = 'dark',
}: {
  amount: number;
  irr: number;
  months: number;
  compact?: boolean;
  tone?: 'light' | 'dark';
}) {
  const w = 520;
  const h = compact ? 92 : 240;
  const pad = compact ? { l: 2, r: 2, t: 8, b: 2 } : { l: 56, r: 12, t: 18, b: 32 };
  const end = amount * Math.pow(1 + irr / 100, months / 12);
  const max = end * 1.08;
  const points: string[] = [];
  const area: string[] = [];
  const steps = 12;
  for (let i = 0; i <= steps; i++) {
    const m = (months / steps) * i;
    const v = amount * Math.pow(1 + irr / 100, m / 12);
    const x = pad.l + (i / steps) * (w - pad.l - pad.r);
    const y = pad.t + (1 - v / max) * (h - pad.t - pad.b);
    points.push(`${x},${y}`);
    area.push(`${x},${y}`);
  }
  const baselineY = pad.t + (1 - amount / max) * (h - pad.t - pad.b);
  const areaPath = `${pad.l},${h - pad.b} ${area.join(' ')} ${w - pad.r},${h - pad.b}`;

  if (compact) {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Target value grows from ${amount} to ${Math.round(end)} over ${months} months`} data-ui>
        <polygon points={areaPath} fill={tone === 'light' ? '#eef1ea' : 'rgba(255,255,255,0.22)'} />
        <line
          x1={pad.l}
          x2={w - pad.r}
          y1={baselineY}
          y2={baselineY}
          stroke={tone === 'light' ? '#767f70' : 'rgba(255,255,255,0.35)'}
          strokeWidth="2"
          strokeDasharray="4 8"
        />
        <polyline points={points.join(' ')} fill="none" stroke={tone === 'light' ? '#73826d' : '#ffffff'} strokeWidth="5" strokeLinecap="round" />
        <circle cx={w - pad.r} cy={pad.t + (1 - end / max) * (h - pad.t - pad.b)} r="6" fill={tone === 'light' ? '#73826d' : '#ffffff'} />
      </svg>
    );
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Target value grows from ${amount} to ${Math.round(end)} over ${months} months`} data-ui>
      {[0.25, 0.5, 0.75, 1].map((f) => {
        const v = max * f;
        const y = pad.t + (1 - v / max) * (h - pad.t - pad.b);
        return (
          <g key={f}>
            <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke="#e1e7db" strokeWidth="1" />
            <text x={pad.l - 8} y={y + 4} textAnchor="end" fontSize="17" fill="#5d6459">
              ₹{(v / 100000).toFixed(1)}L
            </text>
          </g>
        );
      })}
      <polygon points={areaPath} fill="#eef1ea" />
      <line x1={pad.l} x2={w - pad.r} y1={baselineY} y2={baselineY} stroke="#767f70" strokeWidth="1.4" strokeDasharray="4 6" />
      <text x={w - pad.r} y={baselineY + 16} textAnchor="end" fontSize="17" fill="#5d6459">
        What you put in
      </text>
      <polyline points={points.join(' ')} fill="none" stroke="#73826d" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w - pad.r} cy={pad.t + (1 - end / max) * (h - pad.t - pad.b)} r="5" fill="#ffffff" stroke="#73826d" strokeWidth="2.4" />
      <text x={w - pad.r} y={pad.t + (1 - end / max) * (h - pad.t - pad.b) - 12} textAnchor="end" fontSize="17" fontWeight="600" fill="#73826d">
        ₹{Math.round(end).toLocaleString('en-IN')}
      </text>
      {[0, 0.5, 1].map((f) => (
        <text key={f} x={pad.l + f * (w - pad.l - pad.r)} y={h - 10} textAnchor={f === 0 ? 'start' : f === 1 ? 'end' : 'middle'} fontSize="17" fill="#5d6459">
          {f === 0 ? 'Today' : `Year ${Math.round((months / 12) * f)}`}
        </text>
      ))}
    </svg>
  );
}

function tickStep(axisMax: number) {
  const target = axisMax / 5;
  const pow = Math.pow(10, Math.floor(Math.log10(target)));
  const norm = target / pow;
  const mult = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((c) => c >= norm) ?? 10;
  return mult * pow;
}

function ticksFor(axisMax: number) {
  const step = tickStep(axisMax);
  const out: number[] = [];
  for (let v = step; v <= axisMax * 1.0001; v += step) out.push(v);
  return out;
}

const axisMoney = (v: number) => {
  if (v >= 10000000) return `₹${+(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000) return `₹${+(v / 100000).toFixed(1)}L`;
  return `₹${Math.round(v / 1000)}k`;
};

export function GrowthChart({
  amount,
  irr,
  maxYears,
  year,
}: {
  amount: number;
  irr: number;
  maxYears: number;
  year: number;
}) {
  const w = 400;
  const h = 230;
  const pad = { l: 68, r: 16, t: 26, b: 34 };
  const valueAt = (a: number, yr: number) => a * Math.pow(1 + irr / 100, yr);
  // the frame follows the stake you picked: four fractions differ by 100x,
  // so a single axis would flatten three of them into the baseline
  const axisMax = valueAt(amount, maxYears) * 1.12;
  const value = valueAt(amount, year);
  const exit = valueAt(amount, maxYears);
  const px = (yr: number) => pad.l + (yr / maxYears) * (w - pad.l - pad.r);
  const py = (v: number) => h - pad.b - (v / axisMax) * (h - pad.t - pad.b);
  const curve = (to: number, n = 24) => {
    const pts: string[] = [];
    for (let i = 0; i <= n; i++) {
      const yr = (to / n) * i;
      pts.push(`${px(yr)},${py(valueAt(amount, yr))}`);
    }
    return pts.join(' ');
  };
  const areaPath = `${pad.l},${h - pad.b} ${curve(year)} ${px(year)},${h - pad.b}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`Projection on a fixed scale: ${amount} grows to ${Math.round(value)} by year ${year}, exit at year ${maxYears} is ${Math.round(exit)}.`}
      data-ui
    >
      {ticksFor(axisMax).map((v) => {
        const y = py(v);
        return (
          <g key={v}>
            <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke="#e1e7db" strokeWidth="1" />
            <text x={pad.l - 8} y={y + 4} textAnchor="end" fontSize="17" fill="#5d6459">
              {axisMoney(v)}
            </text>
          </g>
        );
      })}
      {/* this holding's full exit path, faint */}
      <polyline points={curve(maxYears)} fill="none" stroke="#73826d" strokeWidth="1.6" opacity="0.22" strokeLinecap="round" strokeLinejoin="round" />
      {year < maxYears && (
        <text x={w - pad.r} y={py(exit) - 10} textAnchor="end" fontSize="16" fill="#767f70">
          exit year {maxYears}
        </text>
      )}
      <polygon points={areaPath} fill="#eef1ea" />
      <line x1={pad.l} x2={w - pad.r} y1={py(amount)} y2={py(amount)} stroke="#767f70" strokeWidth="1.4" strokeDasharray="4 6" />
      <polyline points={curve(year)} fill="none" stroke="#73826d" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={px(year)} cy={py(value)} r="5" fill="#ffffff" stroke="#73826d" strokeWidth="2.4" />
      <text
        x={Math.min(px(year) + 4, w - pad.r)}
        y={py(value) - 12}
        textAnchor="end"
        fontSize="17"
        fontWeight="600"
        fill="#73826d"
      >
        ₹{Math.round(value).toLocaleString('en-IN')}
      </text>
      <text x={pad.l} y={h - 10} fontSize="17" fill="#5d6459">
        Today
      </text>
      {year < maxYears && (
        <text x={px(maxYears)} y={h - 10} textAnchor="end" fontSize="17" fill="#767f70">
          Year {maxYears}
        </text>
      )}
      <text
        x={px(year)}
        y={h - 10}
        textAnchor={year === maxYears ? 'end' : 'middle'}
        fontSize="17"
        fontWeight="600"
        fill="#73826d"
      >
        Year {year}
      </text>
    </svg>
  );
}

export function TargetBars({ amount, target }: { amount: number; target: number }) {
  const gain = Math.max(0, target - amount);
  const total = Math.max(amount + gain, 1);
  const p = (amount / total) * 100;
  return (
    <div className="target-bars" data-ui>
      <div className="target-bars__track" aria-hidden="true">
        <span style={{ width: `${p}%` }} />
        <i style={{ width: `${100 - p}%` }} />
      </div>
      <div className="target-bars__legend">
        <span>
          <b style={{ background: '#73826d' }} /> You put in{' '}
          <strong>₹{amount.toLocaleString('en-IN')}</strong>
        </span>
        <span>
          <b style={{ background: '#767f70' }} /> Target gain{' '}
          <strong>₹{Math.round(gain).toLocaleString('en-IN')}</strong>
        </span>
      </div>
    </div>
  );
}

export function HoldTimeline() {
  const marks = [
    { at: 0, label: 'You invest' },
    { at: 12, label: 'Yearly revaluation' },
    { at: 36, label: 'Quarterly payouts' },
    { at: 72, label: 'Sale / exit' },
  ];
  const w = 520;
  const y = 56;
  const x = (m: number) => 24 + (m / 72) * (w - 48);
  return (
    <svg viewBox={`0 0 ${w} 110`} role="img" aria-label="72 month hold: invest at month 0, annual revaluation, quarterly payouts, exit at month 72" data-ui>
      <line x1={24} x2={w - 24} y1={y} y2={y} stroke="#e1e7db" strokeWidth="3" />
      <line x1={24} x2={w - 24} y1={y} y2={y} stroke="#73826d" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      {marks.map((m, i) => (
        <g key={m.label}>
          <circle cx={x(m.at)} cy={y} r="5" fill="#73826d" />
          <text
            x={x(m.at)}
            y={y - (i % 2 === 0 ? 18 : 38)}
            textAnchor={m.at === 0 ? 'start' : m.at === 72 ? 'end' : 'middle'}
            fontSize="17"
            fill="#5d6459"
          >
            {m.label}
          </text>
          <text
            x={x(m.at)}
            y={y + (i % 2 === 0 ? 26 : 46)}
            textAnchor={m.at === 0 ? 'start' : m.at === 72 ? 'end' : 'middle'}
            fontSize="17"
            fill="#767f70"
          >
            {m.at === 0 ? 'Month 0' : `Month ${m.at}`}
          </text>
        </g>
      ))}
    </svg>
  );
}

