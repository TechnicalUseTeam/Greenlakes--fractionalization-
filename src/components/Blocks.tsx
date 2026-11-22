import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { entryStake, ownershipChain, rupees, type Estate, type GalleryImage } from '../data';
import { Reveal } from './Reveal';

export function PageHead({
  title,
  intro,
  image,
  action,
  eyebrow,
  variant,
}: {
  title: string;
  intro?: string;
  image?: { src: string; alt: string; caption: string; fact: string };
  action?: ReactNode;
  eyebrow?: string;
  variant?: 'altdrx';
}) {
  return (
    <header className={`page-head${image ? ' page-head--split' : ''}${variant ? ` page-head--${variant}` : ''}`}>
      <div className="container page-head__grid">
        <Reveal>
          {eyebrow && <p className="page-head__eyebrow">{eyebrow}</p>}
          <h1 className="display">{title}</h1>
          {intro && <p>{intro}</p>}
          {action && <div className="page-head__action">{action}</div>}
        </Reveal>
        {image && (
          <Reveal delay={1}>
            <figure className="page-head__media">
              <img src={image.src} alt={image.alt} width="1200" height="800" />
            </figure>
          </Reveal>
        )}
      </div>
    </header>
  );
}

export function EstateCard({ estate }: { estate: Estate }) {
  const open = estate.status === 'open';
  const entry = entryStake(estate);

  return (
    <Reveal>
      <Link className="estate-card" to={`/estates/${estate.slug}`}>
        <figure className="estate-card__img">
          <img src={estate.image} alt={estate.imageAlt} loading="lazy" width="1200" height="800" />
          <figcaption className="estate-card__place">
            {estate.shortName}, {estate.state}
          </figcaption>
        </figure>
        <div className="estate-card__body" data-ui>
          <h3 className="estate-card__title">{estate.name}</h3>
          <span className={`estate-card__badge${open ? ' is-open' : ''}`}>
            {open ? 'Open now' : 'Coming soon'}
          </span>
          <p className="estate-card__price">
            Stake Value: <strong>{rupees(entry.price)}</strong>
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export function ChainTable() {
  return (
    <table className="chain" data-ui>
      <thead>
        <tr>
          <th scope="col">What</th>
          <th scope="col">Status</th>
          <th scope="col">What it means for you</th>
        </tr>
      </thead>
      <tbody>
        {ownershipChain.map((row) => (
          <tr key={row.title}>
            <td>{row.title}</td>
            <td>{row.state}</td>
            <td>{row.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function GallerySelector({ items }: { items: GalleryImage[] }) {
  const [index, setIndex] = useState(0);
  const step = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);
  const current = items[index];
  const multiple = items.length > 1;

  return (
    <div className="estate-hero__media">
      <div className="estate-hero__img">
        <img src={current.src} alt={current.alt} width="1600" height="1200" />
        {multiple && (
          <>
            <button
              type="button"
              className="gal-arrow gal-arrow--prev"
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button type="button" className="gal-arrow gal-arrow--next" onClick={() => step(1)} aria-label="Next photo">
              ›
            </button>
            <span className="gal-count">
              {index + 1} / {items.length}
            </span>
          </>
        )}
      </div>
      {multiple && (
        <div className="gal-row" role="group" aria-label="Property photos">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              className={`gal-thumb${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1} of ${items.length}`}
              aria-pressed={i === index}
            >
              <img src={item.src} alt="" aria-hidden="true" loading="lazy" width="400" height="300" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SoldOutTile({
  to,
  src,
  alt,
  name,
  place,
  blurb,
}: {
  to: string;
  src: string;
  alt: string;
  name: string;
  place: string;
  blurb: string;
}) {
  return (
    <div className="sold-wrap">
      <Link className="sold-tile" to={to} aria-label={`${name}, ${place} — sold out. See the profile.`}>
        <img src={src} alt="" aria-hidden="true" loading="lazy" width="1200" height="800" />
        <span className="sold-tile__bar">Sold out</span>
      </Link>
      <div className="sold-cap">
        <Link to={to}>
          <strong>{name}</strong>
        </Link>
        <span>{place}</span>
        <span>{blurb}</span>
      </div>
    </div>
  );
}

export function PhotoStrip({
  items,
}: {
  items: { src: string; alt: string; name: string; fact: string }[];
}) {
  return (
    <div className="photo-strip">
      {items.map((item, i) => (
        <Reveal as="figure" className="photo-strip__item" key={item.name} delay={(i % 3) as 0 | 1 | 2} slide="left">
          <img src={item.src} alt={item.alt} loading="lazy" width="1200" height="800" />
          <figcaption>
            <span>{item.name}</span>
            <span>{item.fact}</span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}

export function RiskNote() {
  return (
    <></>
  );
}
