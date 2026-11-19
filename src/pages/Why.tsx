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
          src: '/media/nandi-fog.jpg',
          alt: 'Fog rolling over the Nandi Hills',
          caption: 'Nandi Hills',
          fact: 'Karnataka',
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
                We take one verified estate. We place it in a company built for that estate alone. We split it into
                fractions, sold at a published price. The land stays whole. The ownership divides.
              </p>
            </Reveal>
          </div>
        </section>

        <PhotoStrip
          items={[
            {
              src: '/media/orchard-laterite.jpg',
              alt: 'Mango trees standing in red laterite soil',
              name: 'Laterite orchard floor',
              fact: 'Konkan, Maharashtra',
            },
            {
              src: '/media/nandi-monsoon.jpg',
              alt: 'Monsoon clouds over the Nandi Hills',
              name: 'Monsoon over Nandi',
              fact: 'Karnataka',
            },
            {
              src: '/media/alibaug-beach.jpg',
              alt: 'The palm-lined beach at Alibaug',
              name: 'Alibaug coast',
              fact: 'Raigad, Maharashtra',
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
