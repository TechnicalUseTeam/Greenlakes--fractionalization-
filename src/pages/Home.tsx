import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Reveal } from '../components/Reveal';
import { StorySlider } from '../components/StorySlider';
import { entryStake, estates, inrWords } from '../data';

const howSteps = [
  {
    image: '/media/nandi-real.jpg',
    alt: 'Mango and jackfruit orchard below the Nandi Hills at sunrise',
    title: 'Choose your second home',
    line: 'Two verified second homes. Each in its own company.',
  },
  {
    image: '/media/orchard-laterite.jpg',
    alt: 'Mango trees standing in red laterite soil',
    title: 'Choose your fraction',
    line: 'Fractions of the whole second home. Pick the share that fits.',
  },
  {
    image: '/media/story-interior.png',
    alt: 'A dining room opening onto a green hillside',
    title: 'Everything is ready',
    line: 'Title, survey, legal opinion, caretaker. Sorted before you arrive.',
  },
  {
    image: '/media/nandi-monsoon.jpg',
    alt: 'Monsoon clouds over the Nandi Hills',
    title: 'Hold it, or let it work',
    line: 'The orchard is leased. Lease income is the aim, paid quarterly.',
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
                Explore second homes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-how" aria-labelledby="how-title">
        <div className="container">
          <Reveal className="home-head">
            <div>
              <p className="eyebrow">The Green Lakes way</p>{/* taste-skill-ignore: Pacaso-style section label */}
              <h2 className="h2" id="how-title">
                How it works
              </h2>
            </div>
            <p className="body home-head__intro">
              One second home. Fully managed. You choose the place and the share. We handle the rest.
            </p>
          </Reveal>

          <div className="home-steps">
            {howSteps.map((step, i) => (
              <Reveal as="article" className="home-step" key={step.title} delay={(i % 3) as 0 | 1 | 2}>
                <img src={step.image} alt={step.alt} loading="lazy" width="900" height="1125" />
                <h3>{step.title}</h3>
                <p>{step.line}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="home-link" delay={1}>
            <Link className="text-link" to="/how-it-works">
              How it works
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section collection" aria-labelledby="collection-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Our collection</p>{/* taste-skill-ignore: Pacaso-style section label */}
            <h2 className="h2" id="collection-title">
              Some places are worth owning
            </h2>
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
          </div>

          <Reveal className="home-link" delay={1}>
            <Link className="text-link" to="/explore">
              All second homes
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

