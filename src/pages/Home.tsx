import { Link } from 'react-router-dom';
import { SoldOutTile } from '../components/Blocks';
import { Logo } from '../components/Logo';
import { Reveal } from '../components/Reveal';
import { StorySlider } from '../components/StorySlider';
import { entryStake, estates, inrWords } from '../data';

const howSteps = [
  {
    title: 'Choose',
    line: 'Pick your second home and your fraction. Two verified second homes, each in its own company.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11.5V5.5a1.5 1.5 0 0 1 3 0v5m0-2a1.5 1.5 0 0 1 3 0v2m0-1a1.5 1.5 0 0 1 3 0v4c0 3-2 5.5-5 5.5-2.2 0-3.4-1-4.8-3.4L4.6 9.9a1.6 1.6 0 0 1 2.6-1.8L9 10.5" />
      </svg>
    ),
  },
  {
    title: 'Own',
    line: 'Own a share of the company. Title, survey, legal opinion and caretaker, sorted before you arrive.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5.5 10.5V20h13v-9.5" />
        <circle cx="12" cy="14.5" r="1.6" />
        <path d="M12 16.1v1.4" />
      </svg>
    ),
  },
  {
    title: 'Enjoy',
    line: 'Enjoy the returns. The orchard is leased. Lease income is the aim, paid quarterly.',
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 17v-6a2 2 0 0 1 4 0" />
        <path d="M12 17V7a2 2 0 0 1 4 0v10" />
        <path d="M2 17h20" />
        <path d="M18 4.5 19 7l2.5 1-2.5 1-1 2.5L17 9l-2.5-1L17 7" />
      </svg>
    ),
  },
];

export function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero__bg"
          src="/media/hero-estate.jpg"
          alt="A white villa with a pool among palm trees and lawns"
          width="1672"
          height="941"
        />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="container hero__brand">
          <Logo tone="light" />
        </div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <h1>
              <span className="line">
                <span>Co-Own Your Dream Second Home</span>
              </span>
            </h1>
            <p className="hero__note">Fractions of a verified Indian second home, starting from ₹1,00,000.</p>
            <div className="hero__actions">
              <Link className="btn btn--light" to="/explore">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section collection" aria-labelledby="collection-title">
        <div className="container">
          <Reveal className="home-head">
            <div>
              <h2 className="h2" id="collection-title">
                Featured properties
              </h2>
            </div>
            <p className="body home-head__intro">
              Second homes worth owning a share of.
            </p>
          </Reveal>

          <div className="collection__grid">
            {estates.map((estate, i) => (
              <Reveal key={estate.slug} delay={(i % 3) as 0 | 1 | 2}>
                <Link className="collection__card" to={`/estates/${estate.slug}`}>
                  <span className="collection__media">
                    <img src={estate.image} alt={estate.imageAlt} loading="lazy" width="1200" height="800" />
                  </span>
                  <span className="collection__body">
                    <span className="collection__name">{estate.name}</span>
                    <span className="collection__place">{estate.shortName}</span>
                    <span className="collection__mood">{estate.mood}</span>
                    <span className="collection__price">
                      From {inrWords(entryStake(estate).price)} · {entryStake(estate).label}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={2}>
              <SoldOutTile src="/plot-photos/property3/1.png" alt="Sold out second home" />
            </Reveal>
          </div>

          <Reveal className="home-link" delay={1}>
            <Link className="text-link" to="/explore">
              All second homes
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section home-how" aria-labelledby="how-title">
        <div className="container">
          <Reveal className="home-how__head">
            <p className="eyebrow">The Green Lakes way</p>{/* taste-skill-ignore: Pacaso-style section label */}
            <h2 className="h2" id="how-title">
              How it works
            </h2>
          </Reveal>

          <div className="how-cards">
            {howSteps.map((step, i) => (
              <Reveal as="article" className="how-card" key={step.title} delay={(i % 3) as 0 | 1 | 2}>
                <span className="how-card__icon">{step.icon}</span>
                <h3>{step.title}</h3>
                <p>{step.line}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="how-cta" delay={1}>
            <Link className="btn btn--gold" to="/explore">
              Get Started
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section difference" aria-labelledby="difference-title">
        <div className="container difference__grid">
          <Reveal>
            <img
              src="/media/story-hillside.png"
              alt="Homes set among wooded hills in late sun"
              loading="lazy"
              width="1200"
              height="1500"
            />
          </Reveal>
          <Reveal delay={1}>
            <p className="eyebrow">The Green Lakes difference</p>{/* taste-skill-ignore: Pacaso-style section label */}
            <h2 className="h2" id="difference-title">
              The life you imagined
            </h2>
            <p className="body">
              A place of your own, shared with family and friends. Owning part of it should not cost you your freedom.
            </p>
            <p className="body">
              We handle the title, the survey, the caretaker and the accounts. You hold a fraction of the company that owns
              the whole second home. Not a fenced-off parcel.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="story-band" aria-labelledby="stories-title">
        <div className="container">
          <Reveal className="story-band__head">
            <h2 className="h2" id="stories-title">
              The people who stopped waiting
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <StorySlider />
          </Reveal>
        </div>
      </section>

      <section className="closing closing--plain" aria-labelledby="closing-title">
        <div className="container closing__inner">
          <Reveal className="closing__copy">
            <p className="eyebrow closing__eyebrow">Payment methods accepted</p>{/* taste-skill-ignore: Pacaso-style section label */}
            <h2 className="h2" id="closing-title">
              Pay your way.
            </h2>
            <p className="closing__sub">UPI, cards and netbanking. Collected over secure escrow.</p>
            <ul className="pay-badges" aria-label="Payment methods accepted">
              <li className="pay-big">
                <img src="/logos/Visa%20Logo.png" alt="Verified by Visa" loading="lazy" width="160" height="80" />
              </li>
              <li>
                <img src="/logos/MasterCard%20logo.png" alt="Mastercard" loading="lazy" width="120" height="60" />
              </li>
              <li className="pay-big">
                <img src="/logos/UPI%20logo.png" alt="UPI" loading="lazy" width="160" height="80" />
              </li>
              <li>
                <img src="/logos/Rupay%20Logo.png" alt="RuPay" loading="lazy" width="120" height="60" />
              </li>
              <li>
                <img src="/logos/Paypal%20Logo.png" alt="PayPal" loading="lazy" width="120" height="60" />
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

