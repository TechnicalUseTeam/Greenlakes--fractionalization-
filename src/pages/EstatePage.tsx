import { Link, useParams } from 'react-router-dom';
import { GallerySelector } from '../components/Blocks';
import { GrowthSection, NumbersSection } from '../components/EstateSections';
import { Reveal } from '../components/Reveal';
import { entryStake, inrWords, rupees } from '../data';
import { useEstates } from '../lib/estates';
import { NotFound } from './NotFound';
import { SoldOutPage } from './SoldOutPage';

const APP_LINK = 'https://play.google.com/store/apps/details?id=in.greenlakes.app';

export function EstatePage() {
  const { slug } = useParams();
  const { estates, soldOut } = useEstates();
  const estate = estates.find((e) => e.slug === slug);
  if (!estate) {
    const sold = soldOut.find((p) => p.slug === slug);
    return sold ? <SoldOutPage property={sold} /> : <NotFound />;
  }

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
          <GallerySelector
            items={estate.gallery.length > 0 ? estate.gallery : [{ src: estate.image, alt: estate.imageAlt }]}
          />
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
                <span>Target* IRR</span>
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
            <a className="btn" href={APP_LINK} target="_blank" rel="noreferrer">
              {estate.status === 'open' ? `Invest from ${rupees(entry.price)}` : 'Register interest'}
            </a>
            <p className="tiny">
              The smallest stake is {entry.label}. Payment stays in escrow until settlement.
            </p>
          </div>
        </section>

        <section className="about-estate" aria-labelledby="about-title">
          <Reveal>
            <p className="eyebrow">The property</p>{/* taste-skill-ignore: section label */}
            <h2 className="h2" id="about-title">
              What you would own.
            </h2>
            <div className="about-estate__copy">
              {estate.description.map((line) => (
                <p className="body" key={line}>
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={1}>
            <dl className="spec-list" data-ui>
              {estate.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
              <div>
                <dt>Fractions</dt>
                <dd>
                  {estate.stakes.length > 1 &&
                  new Set(estate.stakes.map((s) => s.label)).size === 1
                    ? `${estate.stakes.length} equal, ${estate.stakes[0].label} each`
                    : [...new Set(estate.stakes.map((s) => s.label))].join(' · ')}
                </dd>
              </div>
            </dl>
          </Reveal>
        </section>

      </div>

      <NumbersSection estate={estate} />
      <GrowthSection estate={estate} />
    </>
  );
}
