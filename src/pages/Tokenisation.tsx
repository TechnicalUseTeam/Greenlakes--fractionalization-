import { Link } from 'react-router-dom';
import { ChainTable, PageHead, RiskNote } from '../components/Blocks';
import { Faq } from '../components/Faq';
import { Reveal } from '../components/Reveal';
import { ReturnsPanel } from '../components/ShareCalculator';
import { StorySlider } from '../components/StorySlider';
import { entryStake, estates, inrWords, nandi, rupees, steps } from '../data';

const lowest = Math.min(...estates.map((e) => entryStake(e).price));

export function Tokenisation() {
  return (
    <>
      <PageHead
        title="Tokenisation, explained."
        intro="One estate. One company. 12,000 tokens. A token is the digital record of part of the company. The SPV register makes it real."
        image={{
          src: '/media/aerial-fields.jpg',
          alt: 'Aerial view of agricultural fields divided by bunds',
          caption: 'The estate',
          fact: 'One title, one company',
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
                  Nothing is carved out of the ground. One company, the SPV, holds the title to the whole estate. What
                  divides is the ownership of that company. Not the field.
                </p>
              </div>
              <div>
                <h2>12,000 tokens</h2>
                <p>
                  Tokens are how the register counts it. Each estate company issues 12,000 tokens. One token is
                  1/12,000 of the company. A 1/2 stake is 6,000 tokens. A 1/12 stake is 1,000 tokens, and that is
                  the smallest purchase.
                </p>
              </div>
              <div>
                <h2>The token is the record</h2>
                <p>
                  A token is the digital record of the fraction in your name. It lives in a permissioned register, not a
                  public wallet. It does not replace the SPV share register or the agreement you sign.
                </p>
              </div>
              <div>
                <h2>One asset, one owner of record</h2>
                <p>
                  1,000 tokens are about 8% of the company. Not 8% of a field. The estate keeps one title, one survey and
                  one registered owner.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal style={{ marginTop: 36 }} delay={1}>
            <div className="notice">
              <strong>Tokens are records, not the right itself.</strong> They are not cryptocurrency. They cannot be sent
              to outside wallets. They do not replace the SPV register or the signed agreement. If the platform
              disappeared, the company and its register would still hold your fraction.
            </div>
          </Reveal>
        </section>

        <section className="section section--paper" aria-labelledby="chain-title">
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

        <section className="section" aria-labelledby="stakes-title">
          <Reveal>
            <h2 className="lead" id="stakes-title" style={{ maxWidth: '22ch' }}>
              One estate. 12,000 tokens.
            </h2>
          </Reveal>
          <Reveal className="facts" delay={1}>
            <div>
              <strong>12,000</strong>
              <span>tokens per estate, 1/12,000 each</span>
            </div>
            <div>
              <strong>1,000</strong>
              <span>minimum tokens, a 1/12 stake</span>
            </div>
            <div>
              <strong>{inrWords(entryStake(nandi).price)}</strong>
              <span>entry price, 1,000 tokens</span>
            </div>
            <div>
              <strong>14%</strong>
              <span>target IRR, 72 months</span>
            </div>
          </Reveal>
          <Reveal style={{ marginTop: 26 }} delay={1}>
            <p className="body" style={{ maxWidth: '54ch' }}>
              The open estate sells from {rupees(entryStake(nandi).price)} for 1,000 tokens. The smallest entry anywhere is{' '}
              {inrWords(lowest)}.{' '}
              <Link className="text-link" to="/explore">
                Compare the estates
              </Link>
              .
            </p>
          </Reveal>
        </section>
      </div>

      <section className="section section--forest" aria-labelledby="returns-title">
        <div className="container">
          <Reveal>
            <h2 className="h2" id="returns-title">
              What it could become.
            </h2>
            <p className="body" style={{ marginTop: 12 }}>
              Pick a fraction and a year. These are targets, not promises. The numbers follow the {nandi.targetIrr}% target
              over {nandi.holdMonths} months, as set by the offer document.
            </p>
          </Reveal>
          <Reveal style={{ marginTop: 28 }} delay={1}>
            <ReturnsPanel estate={nandi} />
          </Reveal>
        </div>
      </section>

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
                See the estates
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
