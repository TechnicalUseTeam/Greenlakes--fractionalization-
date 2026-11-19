import { PageHead } from '../components/Blocks';
import { HoldTimeline } from '../components/Charts';
import { Reveal } from '../components/Reveal';
import { steps } from '../data';

export function HowItWorks() {
  return (
    <>
      <PageHead
        title="A twelfth is a share."
        intro="Five steps. One signature. One bank transfer. No broker, no site visit, no registrar queue."
        image={{
          src: '/media/orchard-egrets.jpg',
          alt: 'Cattle egrets foraging in a mango orchard',
          caption: 'The working estate',
          fact: 'Mango orchard · India',
        }}
      />

      <div className="container">
        <div>
          {steps.map((step, i) => (
            <Reveal className="exchange" key={step.title}>
              <div className="exchange__call">
                <span className="tag">{step.time}</span>
                <h3>{step.title}</h3>
              </div>
              <div>
                <p className="body" style={{ maxWidth: '48ch' }}>
                  {step.body}
                </p>
                {i === 0 && (
                  <p className="tiny" style={{ marginTop: 12 }}>
                    You can browse every estate before creating an account.
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="container">
        <section className="section" aria-labelledby="hold-title">
          <div className="split">
            <Reveal>
              <h2 className="h2" id="hold-title">
                The long view.
              </h2>
              <p className="body" style={{ marginTop: 16 }}>
                This is not a savings account. Your money stays for the full term. Income comes quarterly. The exit is a
                sale: of the estate, or of your stake to another investor.
              </p>
              <p className="body" style={{ marginTop: 16 }}>
                Before you invest, you will see the hold period, exit route, fees and risks on one page. You sign to say
                you read them.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <div className="chart-card" data-ui>
                <h3>Typical 72-month hold</h3>
                <p className="tiny">Nandi Hills Orchard Estate. Month 0 is settlement, not the day you pay.</p>
                <HoldTimeline />
                <div className="ui-row">
                  <span>Lease income</span>
                  <strong>Quarterly</strong>
                </div>
                <div className="ui-row">
                  <span>Revaluation</span>
                  <strong>Yearly</strong>
                </div>
                <div className="ui-row">
                  <span>Exit</span>
                  <strong>Sale of the estate</strong>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="hold-gallery">
            <Reveal as="figure">
              <img
                src="/media/orchard-laterite.jpg"
                alt="Mango trees standing in red laterite soil"
                loading="lazy"
                width="1200"
                height="800"
              />
              <figcaption>Orchard floor · Konkan</figcaption>
            </Reveal>
            <Reveal as="figure" delay={1}>
              <img
                src="/media/nandi-real.jpg"
                alt="Mango and jackfruit orchard below the Nandi Hills at sunrise"
                loading="lazy"
                width="1200"
                height="800"
              />
              <figcaption>Nandi Hills Orchard Estate · Karnataka</figcaption>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
