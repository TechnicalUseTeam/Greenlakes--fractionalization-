import { PageHead, PhotoStrip } from '../components/Blocks';
import { Reveal } from '../components/Reveal';
import { personas } from '../data';

export function Why() {
  return (
    <>
      <PageHead
        title="Land without the crore."
        intro="Owning a piece of India’s land has been priced for people who already own land."
        image={{
          src: '/plot-photos/property3/1.jpeg',
          alt: 'Farm villa at night',
          caption: 'Green Haven Farmhouse',
          fact: 'Dodballapur Main Road',
        }}
      />

      <div className="container">
        <section className="section" aria-labelledby="do-title">
          <Reveal>
            <h2 className="h2" id="do-title">
              What we do.
            </h2>
          </Reveal>
          <div className="why-intro" style={{ marginTop: 40 }}>
            <Reveal delay={1}>
              <p className="pull">The land is not scarce. Access is.</p>
              <p className="body" style={{ marginTop: 24 }}>
                We take one verified second home. We place it in a company built for that second home alone. We split it into
                fractions, sold at a published price. The land stays whole. The ownership divides.
              </p>
            </Reveal>
          </div>
        </section>

        <PhotoStrip
          items={[
            {
              src: '/plot-photos/property1/1.jpeg',
              alt: 'Farm villa with pool and lawns',
              name: 'Boho Living villa',
              fact: 'Bangalore, Karnataka',
            },
            {
              src: '/plot-photos/property2/1.jpeg',
              alt: 'A-frame cabin among trees at dusk',
              name: 'Cabin second home',
              fact: 'By The Creek',
            },
            {
              src: '/plot-photos/property3/1.jpeg',
              alt: 'Farm villa at night',
              name: 'Green Haven Farmhouse',
              fact: 'Dodballapur Main Road',
            },
          ]}
        />

        <section className="section" aria-labelledby="goal-title">
          <Reveal>
            <h2 className="h2" id="goal-title">
              Our goal.
            </h2>
          </Reveal>
          <div className="personas">
            {personas.map((p, i) => (
              <Reveal className="persona" key={p.title} delay={(i % 3) as 0 | 1 | 2}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
