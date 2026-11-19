import { useState, type CSSProperties } from 'react';
import { entryStake, inrWords, rupees, type Estate } from '../data';
import { GrowthChart, ProjectionChart } from './Charts';

const pctLabel = (share: number) => `${+(share * 100).toFixed(2)}%`;

function useStake(estate: Estate) {
  const [index, setIndex] = useState(estate.stakes.length - 1);
  return { stake: estate.stakes[index], index, setIndex };
}

export function StakePicker({
  estate,
  index,
  onSelect,
  label,
}: {
  estate: Estate;
  index: number;
  onSelect: (index: number) => void;
  label: string;
}) {
  return (
    <div className="stakes" role="group" aria-label={label}>
      {estate.stakes.map((s, i) => (
        <button
          key={s.label}
          type="button"
          className={`stake${i === index ? ' is-active' : ''}`}
          aria-pressed={i === index}
          onClick={() => onSelect(i)}
        >
          <span>{s.label}</span>
          <small>{inrWords(s.price)}</small>
        </button>
      ))}
    </div>
  );
}

export function ShareCalculator({ estate }: { estate: Estate }) {
  const { stake, index, setIndex } = useStake(estate);
  const entry = entryStake(estate);

  return (
    <div className="share-card" data-ui>
      <div className="share-card__top">
        <span>Your stake</span>
        <span>{estate.shortName}</span>
      </div>
      <div className="share-card__amount">
        <strong className="mono-num">{stake.label}</strong>
        <span>{rupees(stake.price)}</span>
      </div>
      <StakePicker estate={estate} index={index} onSelect={setIndex} label={`Fraction of ${estate.name}`} />
      <div className="share-card__result">
        <div className="share-card__pct">
          {pctLabel(stake.share)}
          <small>of this second home</small>
        </div>
        <div className="share-card__units">
          <strong>{inrWords(estate.valuation * stake.share)}</strong> of land value
          <br />
          {stake.label} of {estate.name}
        </div>
      </div>
      <div className="share-card__target">
        <div>
          <span>Target at exit</span>
          <strong>{rupees(stake.price * Math.pow(1 + estate.targetIrr / 100, estate.holdMonths / 12))}</strong>
        </div>
        <ProjectionChart amount={stake.price} irr={estate.targetIrr} months={estate.holdMonths} compact tone="light" />
      </div>
      <div className="share-card__foot">
        <span>
          From {inrWords(entry.price)} · {entry.label}
        </span>
        <span>Target {estate.targetIrr}% IRR</span>
      </div>
    </div>
  );
}

export function ReturnsPanel({ estate }: { estate: Estate }) {
  const { stake, index, setIndex } = useStake(estate);
  const maxYears = Math.max(1, Math.round(estate.holdMonths / 12));
  const [year, setYear] = useState(maxYears);
  const amount = stake.price;
  const valueAt = (yr: number) => amount * Math.pow(1 + estate.targetIrr / 100, yr);
  const value = valueAt(year);
  const gain = Math.max(0, value - amount);

  return (
    <div className="returns">
      <div className="returns__copy">
        <p className="returns__statement">
          Put in {rupees(amount)}. The model points to {rupees(value)} by year {year}.
        </p>
        <p className="returns__explain">
          The dashed line is what you put in. Each point on the curve is what your stake could be worth that year. The{' '}
          {estate.targetIrr}% target compounds orchard income with the once-a-year revaluation. Move the year slider to
          travel the hold. The faint line at the top is the full exit target, year {maxYears}.
        </p>
        <div className="returns__facts">
          <div>
            <span>Your stake</span>
            <strong>{stake.label}</strong>
          </div>
          <div>
            <span>Share of the second home</span>
            <strong>{pctLabel(stake.share)}</strong>
          </div>
          <div>
            <span>Target gain by year {year}</span>
            <strong>{rupees(gain)}</strong>
          </div>
        </div>
        <p className="tiny returns__note">
          Target, not a promise. {estate.targetIrr}% IRR over {estate.holdMonths} months; land can fall.
        </p>
      </div>
      <div className="returns__card" data-ui>
        <div className="returns__row">
          <span>Your stake</span>
          <strong>{rupees(amount)}</strong>
        </div>
        <StakePicker estate={estate} index={index} onSelect={setIndex} label={`Fraction of ${estate.name}`} />
        <div className="returns__row" style={{ marginTop: 18 }}>
          <span>Projection year</span>
          <strong>Year {year}</strong>
        </div>
        <label className="sr-only" htmlFor="returns-year">
          Projection year
        </label>
        <input
          id="returns-year"
          className="range"
          type="range"
          min={1}
          max={maxYears}
          step={1}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          aria-valuetext={`year ${year} of ${maxYears}`}
          style={{ '--fill': `${((year - 1) / (maxYears - 1)) * 100}%` } as CSSProperties}
        />
        <GrowthChart amount={amount} irr={estate.targetIrr} maxYears={maxYears} year={year} />
        <p className="tiny returns__foot">
          The faint line is the full exit target: {rupees(valueAt(maxYears))} at {estate.holdMonths} months.
        </p>
      </div>
    </div>
  );
}
