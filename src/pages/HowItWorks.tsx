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
          src: '/plot-photos/property2/1.jpeg',
          alt: 'A-frame cabin among trees at dusk',
          caption: 'Home By The Creek',
          fact: 'Bangalore',
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
                    You can browse every second home before creating an account.
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
                sale: of the second home, or of your stake to another investor.
              </p>
              <p className="body" style={{ marginTop: 16 }}>
                Before you invest, you will see the hold period, exit route, fees and risks on one page. You sign to say
                you read them.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <div className="chart-card" data-ui>
                <h3>Typical 72-month hold</h3>
                <p className="tiny">Nandi Hills Orchard Second Home. Month 0 is settlement, not the day you pay.</p>
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
                  <strong>Sale of the second home</strong>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="hold-gallery">
            <Reveal as="figure">
              <img
                src="/plot-photos/property1/1.jpeg"
                alt="Farm villa with pool and lawns"
                loading="lazy"
                width="1200"
                height="800"
              />
              <figcaption>Nandi Hills second home · Karnataka</figcaption>
            </Reveal>
            <Reveal as="figure" delay={1}>
              <img
                src="/plot-photos/property2/1.jpeg"
                alt="A-frame cabin among trees at dusk"
                loading="lazy"
                width="1200"
                height="800"
              />
              <figcaption>Home By The Creek · Bangalore</figcaption>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
