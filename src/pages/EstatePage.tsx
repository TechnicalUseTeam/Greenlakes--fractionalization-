import { Link, useParams } from 'react-router-dom';
import { EstateGallery, PhotoStrip } from '../components/Blocks';
import { AreaBars, CostBars, HoldTimeline, ValuationChart } from '../components/Charts';
import { EstateMap } from '../components/EstateMap';
import { Reveal } from '../components/Reveal';
import { ReturnsPanel, SharePanel } from '../components/ShareCalculator';
import { entryStake, estates, feeFor, gstFor, inrWords, rupees } from '../data';
import { NotFound } from './NotFound';

export function EstatePage() {
  const { slug } = useParams();
  const estate = estates.find((e) => e.slug === slug);
  if (!estate) return <NotFound />;

  const pct = estate.subscribedPct;
  const entry = entryStake(estate);

  return (
    <>
      <div className="container">
        <div className="crumbs" style={{ paddingTop: 28 }}>
          <Link to="/explore">Explore land</Link>
          <span>/</span>
          <span>{estate.name}</span>
        </div>

        <section className="estate-hero" aria-labelledby="estate-title">
          <div className="estate-hero__img">
            <img src={estate.image} alt={estate.imageAlt} width="1600" height="1200" />
          </div>
          <div className="estate-hero__panel">
            <h1 id="estate-title">{estate.name}</h1>
            <div className="estate-card__meta">
              <span className={`tag ${estate.status === 'open' ? 'tag--open' : 'tag--soon'}`}>
                {estate.status === 'open' ? 'Open now' : 'Coming soon'}
              </span>
              <span>{estate.kind}</span>
            </div>
            <p className="small">
              {estate.place}, {estate.state}
            </p>
            <p className="body" style={{ maxWidth: '38ch' }}>
              {estate.summary}
            </p>
            <div className="estate-hero__figures">
              <div>
                <span>Smallest stake</span>
                <strong>{entry.label}</strong>
              </div>
              <div>
                <span>Target IRR</span>
                <strong>{estate.targetIrr}%</strong>
              </div>
              <div>
                <span>Second home value</span>
                <strong>{inrWords(estate.valuation)}</strong>
              </div>
              <div>
                <span>Hold period</span>
                <strong>{estate.holdMonths} months</strong>
              </div>
            </div>
            {estate.status === 'open' && (
              <div>
                <div className="progress" aria-hidden="true">
                  <span style={{ width: `${Math.max(pct, 1)}%` }} />
                </div>
                <p className="tiny" style={{ marginTop: 6 }}>
                  {pct.toFixed(1)}% subscribed
                </p>
              </div>
            )}
            <Link className="btn" to={estate.status === 'open' ? '/sign-in' : '/explore'}>
              {estate.status === 'open' ? `Invest from ${rupees(entry.price)}` : 'Register interest'}
            </Link>
            <p className="tiny">
              The smallest stake is {entry.label}. Payment stays in escrow until settlement.
            </p>
          </div>
        </section>

        <EstateGallery items={estate.gallery} />

        {estate.showShare !== false && (
        <section className="section" aria-labelledby="share-title">
          <div className="split">
            <Reveal>
              <div className="split__head">
                <h2 className="h2" id="share-title">
                  What you own a share of.
                </h2>
                <p className="body">The whole second home. Never a parcel. The map is the survey drawing from the offer document.</p>
              </div>
              <EstateMap kind={estate.map} />
              <div className="map-legend">
                <span>
                  <i className="swatch" style={{ background: '#e7eae2', border: '1px solid #cfd4c8' }} /> Orchard / grove
                </span>
                <span>
                  <i className="swatch" style={{ background: '#cfd4c8' }} /> Water
                </span>
                <span>
                  <i className="swatch" style={{ background: '#a6ada0' }} /> Built
                </span>
              </div>
              <div className="map-caption">
                <span>{estate.spv}</span>
                <span>{estate.areaAcres} acres</span>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <SharePanel estate={estate} />
              <div className="notice" style={{ marginTop: 18 }}>
                <strong>What you hold:</strong> a fraction of {estate.spv}: 1/2, 1/4, 1/6 or 1/12. No plot. No boundary.
                No separate title.
              </div>
            </Reveal>
          </div>
        </section>
        )}

        <section className="section" aria-labelledby="numbers-title">
          <Reveal>
            <h2 className="h2" id="numbers-title">
              The numbers.
            </h2>
            <p className="body" style={{ marginTop: 14 }}>
              What it costs, how the land is used, and how long your money stays.
            </p>
          </Reveal>
          <div className="charts" style={{ marginTop: 34 }}>
            <Reveal className="chart-card">
              <h3>Valuation history</h3>
              <p className="tiny">Indicative series. Latest: 30 Jun 2026, Knight Frank India (sample).</p>
              <ValuationChart />
              <p className="tiny" style={{ marginTop: 10 }}>
                Latest valuation {inrWords(estate.valuation)} for the whole second home
              </p>
            </Reveal>
            <Reveal className="chart-card" delay={1}>
              <h3>What a stake costs</h3>
              <p className="tiny">Principal, platform fee and GST. Fees are charged once, at purchase.</p>
              <CostBars amount={entry.price} />
              <p className="tiny" style={{ marginTop: 14 }}>
                Example: {entry.label} = {rupees(entry.price)} principal + {rupees(feeFor(entry.price))} fee +{' '}
                {rupees(gstFor(entry.price))} GST ={' '}
                <strong>{rupees(entry.price + feeFor(entry.price) + gstFor(entry.price))}</strong>
              </p>
            </Reveal>
            <Reveal className="chart-card">
              <h3>How the {estate.areaAcres} acres are used</h3>
              <p className="tiny">All acres. One company. One price per fraction size.</p>
              <AreaBars />
            </Reveal>
            <Reveal className="chart-card" delay={1}>
              <h3>Hold period</h3>
              <p className="tiny">Income every quarter. Revaluation every year. Both are targets. Exit when the second home sells.</p>
              <HoldTimeline />
            </Reveal>
          </div>
        </section>

        <section className="section section--forest" aria-labelledby="target-title">
          <div className="container">
            <Reveal>
              <h2 className="h2" id="target-title">
                What it could become.
              </h2>
              <p className="body" style={{ marginTop: 12 }}>
                Move the slider. These are targets, not promises. {estate.targetIrr}% over {estate.holdMonths} months, as
                set by the offer document. The exit is a sale of the second home or your stake.
              </p>
            </Reveal>
            <Reveal style={{ marginTop: 28 }} delay={1}>
              <ReturnsPanel estate={estate} />
            </Reveal>
          </div>
        </section>
      </div>

      <section className="section--tight section--paper">
        <div className="container">
          <Reveal className="cta">
            <p>{`A ${entry.label} stake is a share of ${estate.areaAcres} acres.`}</p>
            <div className="cta__actions">
              <Link className="btn" to="/sign-in">
                Start with {rupees(entry.price)}
              </Link>
              <a className="text-link" href="mailto:hello@greenlakes.in?subject=Question%20about%20Nandi%20Hills">
                Ask a question first
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
