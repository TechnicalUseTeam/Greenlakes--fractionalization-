import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EstateCard, PageHead, SoldOutTile } from '../components/Blocks';
import { Reveal } from '../components/Reveal';
import { useEstates } from '../lib/estates';

const filters = ['All land', 'Managed farmland', 'Residential land'] as const;

export function Explore() {
  const [active, setActive] = useState<(typeof filters)[number]>('All land');
  const { estates, soldOut } = useEstates();
  const shown = estates.filter((e) => active === 'All land' || e.kind === active);

  return (
    <>
      <PageHead title="Explore the second homes" />

      <div className="container">
        <Reveal>
          <div className="filters" role="group" aria-label="Filter second homes">
            {filters.map((f) => (
              <button key={f} type="button" className="filter" aria-pressed={active === f} onClick={() => setActive(f)}>
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="estates">
          {shown.map((e) => (
            <EstateCard key={e.slug} estate={e} />
          ))}
          {soldOut.map((p) => (
            <SoldOutTile
              key={p.slug}
              to={`/estates/${p.slug}`}
              src={p.image}
              alt={`${p.name}, ${p.place} — sold out`}
              name={p.name}
              place={`${p.place}, India`}
              blurb={p.summary}
            />
          ))}
          {shown.length === 0 && (
            <p className="body" style={{ paddingBlock: 40 }}>
              Nothing open in this category yet. <Link className="text-link" to="/explore">See all land</Link>.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
