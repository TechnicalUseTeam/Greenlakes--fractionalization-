import { Link } from 'react-router-dom';
import { entryStake, ownershipChain, rupees, type Estate } from '../data';
import { Reveal } from './Reveal';

export function PageHead({
  title,
  intro,
  image,
}: {
  title: string;
  intro?: string;
  image?: { src: string; alt: string; caption: string; fact: string };
}) {
  return (
    <header className={`page-head${image ? ' page-head--split' : ''}`}>
      <div className="container page-head__grid">
        <Reveal>
          <h1 className="display">{title}</h1>
          {intro && <p>{intro}</p>}
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
    <p className="notice">
      <strong>Land is illiquid.</strong> You may not be able to sell when you want. Returns are targets, not guarantees, and the
      value of land can fall. Read the offer document, the SPV agreement and the risk disclosures before investing. Green Lakes
      does not give investment, tax or legal advice.
    </p>
  );
}
