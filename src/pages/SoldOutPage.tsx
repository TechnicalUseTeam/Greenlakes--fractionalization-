import { Link } from 'react-router-dom';
import { GallerySelector } from '../components/Blocks';
import { Reveal } from '../components/Reveal';
import type { SoldOutProperty } from '../data';

export function SoldOutPage({ property }: { property: SoldOutProperty }) {
  return (
    <div className="container">
      <div className="crumbs" style={{ paddingTop: 28 }}>
        <Link to="/explore">Explore land</Link>
        <span>/</span>
        <span>{property.name}</span>
      </div>

      <section className="estate-hero" aria-labelledby="estate-title">
        <div className="estate-hero__img">
          <img src={property.image} alt={property.imageAlt} width="1600" height="1200" />
        </div>
        <div className="estate-hero__panel">
          <h1 id="estate-title">{property.name}</h1>
          <div className="estate-card__meta">
            <span className="tag tag--sold">Sold out</span>
            <span>{property.kind}</span>
          </div>
          <p className="small">
            {property.place}, {property.state}
          </p>
          <p className="body" style={{ maxWidth: '38ch' }}>
            {property.summary}
          </p>
          <div className="estate-hero__figures">
            <div>
              <span>Location</span>
              <strong>{property.place}</strong>
            </div>
            <div>
              <span>Drive</span>
              <strong>One hour</strong>
            </div>
            <div>
              <span>Fractions left</span>
              <strong>None</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Sold out</strong>
            </div>
          </div>
          <p className="sold-banner" role="status">
            Sold out
          </p>
          <p className="tiny">
            No fractions are available here. The profile stays up so the home and its record remain visible.
          </p>
          <Link className="text-link" to="/explore">
            See the second homes that are open
          </Link>
        </div>
      </section>

      <GallerySelector items={property.gallery} />

      <section className="about-estate" aria-labelledby="about-title">
        <Reveal>
          <p className="eyebrow">The property</p>{/* taste-skill-ignore: section label */}
          <h2 className="h2" id="about-title">
            About this second home.
          </h2>
          <div className="about-estate__copy">
            {property.description.map((line) => (
              <p className="body" key={line}>
                {line}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={1}>
          <dl className="spec-list" data-ui>
            {property.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="section--tight">
        <Reveal className="cta">
          <p>This one is gone. See what is still open.</p>
          <div className="cta__actions">
            <Link className="btn" to="/explore">
              Explore the second homes
            </Link>
            <Link className="text-link" to="/contact">
              Ask what is next
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
