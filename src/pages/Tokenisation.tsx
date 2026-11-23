import { Link } from 'react-router-dom';
import { ChainTable, PageHead, RiskNote } from '../components/Blocks';
import { Faq } from '../components/Faq';
import { Reveal } from '../components/Reveal';
import { ReturnsPanel } from '../components/ShareCalculator';
import { StorySlider } from '../components/StorySlider';
import { entryStake, inrWords, nandi, rupees, steps } from '../data';

// The Green Lakes farmland listing on Alt DRX.
const ALT_DRX_LISTING = 'https://www.altdrx.com/investment/farmland';

export function Tokenisation() {
  return (
    <>
      <PageHead
        title="Tokenisation, explained."
        eyebrow="Listed on Alt DRX"
        variant="altdrx"
        intro="The Green Lakes farmland listings live on Alt DRX. You can see the Tokens and the documents there."
        action={
          <>
            <a className="btn" href={ALT_DRX_LISTING} target="_blank" rel="noreferrer">
              See the Green Lakes listing on Alt DRX
            </a>
            <span className="tiny">Opens altdrx.com in a new tab.</span>
          </>
        }
        image={{
          src: '/plot-photos/property3/1.jpeg',
          alt: 'Green Haven Farmhouse and its lawn',
          caption: 'Green Haven Farmhouse',
          fact: 'Dodballapur Main Road',
        }}
      />

      <div className="container">
        <section className="section" aria-labelledby="what-title">
          <div className="prose">
            <Reveal>
              <h2 className="h2" id="what-title" style={{ maxWidth: '16ch' }}>
                What gets tokenised.
              </h2>
            </Reveal>
            <Reveal className="prose__body" delay={1}>
              <div>
                <h2>The land stays whole</h2>
                <p>
                  Nothing is carved out of the ground. One company, the SPV, holds the title to the whole second home. What
                  divides is the ownership of that company. Not the field.
                </p>
              </div>
              <div>
                <h2>Tokens count the stake</h2>
                <p>
                  Tokens are how the SPV register counts it. Each second home company issues tokens against its shares. The
                  bigger the fraction, the more tokens you hold. A twelfth is the smallest purchase.
                </p>
              </div>
              <div>
                <h2>The token is the record</h2>
                <p>
                  A token is the digital record of the fraction in your name. It lives in a permissioned SPV register, not a
                  public wallet.
                </p>
              </div>
              <div>
                <h2>One asset, one owner of record</h2>
                <p>
                  A twelfth is about 8% of the company. Not 8% of a field. The second home keeps one title, one survey and
                  one registered owner.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" aria-labelledby="chain-title">
          <Reveal>
            <h2 className="h2" id="chain-title" style={{ maxWidth: '18ch' }}>
              From land to token.
            </h2>
          </Reveal>
          <Reveal style={{ marginTop: 32 }} delay={1}>
            <ChainTable />
          </Reveal>
        </section>
      </div>

      <div className="container">
        <section className="section" aria-labelledby="issue-title">
          <Reveal>
            <h2 className="h2" id="issue-title">
              How a stake is issued.
            </h2>
          </Reveal>
          <div style={{ marginTop: 12 }}>
            {steps.map((step) => (
              <Reveal className="exchange" key={step.title}>
                <div className="exchange__call">
                  <span className="tag">{step.time}</span>
                  <h3>{step.title}</h3>
                </div>
                <div>
                  <p className="body" style={{ maxWidth: '48ch' }}>
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

      </div>

      <section className="story-band" aria-labelledby="people-title">
        <div className="container">
          <Reveal className="story-band__head">
            <h2 className="h2" id="people-title">
              Three different lives. One idea.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <StorySlider />
          </Reveal>
        </div>
      </section>

      <div className="container">
        <section className="section" aria-labelledby="faq-title">
          <Reveal>
            <h2 className="h2" id="faq-title">
              Tokenisation questions.
            </h2>
          </Reveal>
          <Reveal style={{ marginTop: 36 }} delay={1}>
            <Faq />
          </Reveal>
          <Reveal style={{ marginTop: 36 }} delay={1}>
            <RiskNote />
          </Reveal>
        </section>
      </div>

      <section className="section--tight section--forest">
        <div className="container center-band">
          <Reveal>
            <h2 className="h2">See what you would own.</h2>
            <div>
              <Link className="btn" to="/explore">
                See the second homes
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
