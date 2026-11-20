import { useState, type CSSProperties } from 'react';
import { feeFor, gstFor, inrWords, rupees, type Estate } from '../data';
import { GrowthAreaChart, LandUseBar, ValuationLine } from './Charts';
import { Reveal } from './Reveal';

const yearsFor = (estate: Estate) => Math.max(1, Math.round(estate.holdMonths / 12));

const pctLabel = (share: number) => `${+(share * 100).toFixed(2)}%`;

// Alibaug is sold as eleven identical 1/11 stakes. A picker with eleven copies
// of the same button is noise, so only distinct fraction sizes are offered.
function uniqueStakes(estate: Estate) {
  const seen = new Set<string>();
  return estate.stakes.filter((s) => {
    if (seen.has(s.label)) return false;
    seen.add(s.label);
    return true;
  });
}

export function NumbersSection({ estate }: { estate: Estate }) {
  const entry = estate.stakes[estate.stakes.length - 1];
  const fee = feeFor(entry.price);
  const gst = gstFor(entry.price);
  const total = entry.price + fee + gst;
  const years = yearsFor(estate);

  return (
    <section className="ledger" aria-labelledby="numbers-title">
      <div className="ledger__inner">
        <Reveal>
          <h2 className="ledger__title" id="numbers-title">
            The numbers.
          </h2>
          <p className="ledger__sub">Four questions, answered simply.</p>
        </Reveal>

        <div className="ledger__block">
          <h3 className="ledger__q">How much do I pay?</h3>
          <p className="ledger__big">{rupees(total)}</p>
          <p className="ledger__cap">For a {entry.label} stake. You pay once, at purchase.</p>
          <dl className="ledger__rows">
            <div>
              <dt>Land</dt>
              <dd>{rupees(entry.price)}</dd>
            </div>
            <div>
              <dt>Platform fee (1.5%)</dt>
              <dd>{rupees(fee)}</dd>
            </div>
            <div>
              <dt>GST on the fee</dt>
              <dd>{rupees(gst)}</dd>
            </div>
          </dl>
        </div>

        <div className="ledger__block">
          <h3 className="ledger__q">What is the land worth?</h3>
          <p className="ledger__big">{inrWords(estate.valuation)}</p>
          <p className="ledger__cap">The whole second home, valued on 30 Jun 2026.</p>
          <ValuationLine data={estate.valuationHistory} />
          <p className="ledger__foot">Indicative series (sample) from Knight Frank India.</p>
        </div>

        <div className="ledger__block">
          <h3 className="ledger__q">How is the land used?</h3>
          <p className="ledger__big">{estate.landUse.lead}</p>
          <p className="ledger__cap">{estate.landUse.tail}</p>
          <LandUseBar rows={estate.landUse.rows} />
        </div>

        <div className="ledger__block">
          <h3 className="ledger__q">How long is my money in?</h3>
          <p className="ledger__big">{years} years</p>
          <p className="ledger__cap">That is {estate.holdMonths} months, until the second home is sold.</p>
          <ol className="steps">
            <li>
              <span className="steps__when">Month 0</span>
              <strong>You invest, once.</strong>
            </li>
            <li>
              <span className="steps__when">Every 3 months</span>
              <strong>Income is paid to you (target).</strong>
            </li>
            <li>
              <span className="steps__when">Month {estate.holdMonths}</span>
              <strong>Exit, when the second home sells.</strong>
            </li>
          </ol>
          <p className="ledger__foot">The land is also revalued once a year (target).</p>
        </div>
      </div>
    </section>
  );
}

export function GrowthSection({ estate }: { estate: Estate }) {
  const stakes = uniqueStakes(estate);
  const maxYears = yearsFor(estate);
  const [pickedStake, setPickedStake] = useState(stakes.length - 1);
  const [pickedYear, setPickedYear] = useState(maxYears);
  const index = Math.min(pickedStake, stakes.length - 1);
  const year = Math.min(pickedYear, maxYears);
  const stake = stakes[index];
  const amount = stake.price;
  const value = amount * Math.pow(1 + estate.targetIrr / 100, year);
  const gain = value - amount;
  const multiple = (value / amount).toFixed(1);
  const isToday = year === 0;

  return (
    <section className="grow" aria-labelledby="grow-title">
      <div className="grow__inner">
        <Reveal>
          <h2 className="grow__title" id="grow-title">
            What it could become.
          </h2>
          <p className="grow__sub">Choose a stake, then slide through the years.</p>
        </Reveal>

        <div className="grow__result">
          <p className="grow__label">
            {isToday ? 'Today, your stake is worth' : `By year ${year}, your stake could be worth`}
          </p>
          <p className="grow__value" key={`${stake.label}-${year}`}>
            {rupees(Math.round(value))}
          </p>
          <p className="grow__times">
            {isToday
              ? `That is the ${rupees(amount)} you put in.`
              : `About ${multiple} times the ${rupees(amount)} you put in.`}
          </p>
        </div>

        <div className="grow__card" data-ui>
          <div className="grow__step">
            <p className="grow__steplabel">1. Choose your stake</p>
            {stakes.length > 1 ? (
              <div className="grow__stakes" role="group" aria-label={`Stake in ${estate.name}`}>
                {stakes.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    className="grow__stake"
                    aria-pressed={i === index}
                    onClick={() => setPickedStake(i)}
                  >
                    <span>{s.label}</span>
                    <small>{inrWords(s.price)}</small>
                  </button>
                ))}
              </div>
            ) : (
              <p className="grow__single">
                <span>{stake.label}</span>
                <strong>{rupees(stake.price)}</strong>
              </p>
            )}
          </div>

          <div className="grow__step">
            <div className="grow__stephead">
              <p className="grow__steplabel">2. Choose the year</p>
              <span className="grow__year">Year {year}</span>
            </div>
            <label className="sr-only" htmlFor="grow-year">
              Year
            </label>
            <input
              id="grow-year"
              className="range grow__range"
              type="range"
              min={0}
              max={maxYears}
              step={1}
              value={year}
              onChange={(e) => setPickedYear(Number(e.target.value))}
              aria-valuetext={`year ${year} of ${maxYears}`}
              style={{ '--fill': `${(year / maxYears) * 100}%` } as CSSProperties}
            />
            <div className="grow__ticks" aria-hidden="true">
              {Array.from({ length: maxYears + 1 }, (_, i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
            <GrowthAreaChart amount={amount} irr={estate.targetIrr} year={year} maxYears={maxYears} />
          </div>
        </div>

        <div className="grow__stats">
          <div>
            <span>Your stake</span>
            <strong>{stake.label}</strong>
          </div>
          <div>
            <span>Share of home</span>
            <strong>{pctLabel(stake.share)}</strong>
          </div>
          <div>
            <span>Target gain</span>
            <strong>{rupees(Math.round(gain))}</strong>
          </div>
        </div>

     

        <p className="sr-only" aria-live="polite">
          Year {year}: {rupees(Math.round(value))}.
        </p>
      </div>
    </section>
  );
}
