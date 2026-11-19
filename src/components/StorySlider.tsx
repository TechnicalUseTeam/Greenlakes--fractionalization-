import { useEffect, useState } from 'react';

const people: { role: string; place: string; initial: string; story: string }[] = [
  {
    role: 'The teacher',
    place: 'Bengaluru',
    initial: 'T',
    story:
      'She teaches Class 5 in Bengaluru. A full plot was never realistic on her salary. A fraction of farmland was.',
  },
  {
    role: 'The engineer',
    place: 'Pune',
    initial: 'E',
    story:
      'He grew up on a farm in Vidarbha and now works in Pune. He wanted farmland of his own, without buying a whole plot in another city.',
  },
  {
    role: 'The shop owner',
    place: 'Kochi',
    initial: 'S',
    story:
      'She runs a stationery shop in Kochi. Land felt out of reach until a fraction made the first step small.',
  },
];

const photos = [
  {
    src: '/media/story-interior.png',
    alt: 'A dining room opening onto a green hillside',
    fact: 'The estate house',
  },
  {
    src: '/media/story-hillside.png',
    alt: 'Homes set among wooded hills in late sun',
    fact: 'The setting · Hillside',
  },
  {
    src: '/media/story-aerial.png',
    alt: 'An aerial view of a shingled roof ringed by trees',
    fact: 'The property · From above',
  },
];

const slides = people.map((p, i) => ({ ...p, ...photos[i % photos.length] }));

export function StorySlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => {
      setIndex((v) => (v + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="story-slider__track" role="group" aria-roledescription="carousel" aria-label="Land and the people who joined">
        {slides.map((s, i) => (
          <div
            key={s.role}
            className={`story-slide${i === index ? ' is-active' : ''}`}
            aria-hidden={i !== index}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <div className="story-slide__media">
              <img src={s.src} alt={s.alt} loading="lazy" width="1200" height="800" />
              <span>{s.fact}</span>
            </div>
            <div className="story-slide__quote">
              <p className="story-slide__kicker">Owner stories</p>
              <blockquote>{s.story}</blockquote>
              <p className="story-slide__attr">
                {s.role} · {s.place}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="story-slider__controls">
        <div className="story-slider__thumbs" role="tablist" aria-label="Choose story">
          {slides.map((s, i) => (
            <button
              key={s.role}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${s.role}`}
              className={i === index ? 'is-active' : ''}
              onClick={() => setIndex(i)}
            >
              <img src={s.src} alt="" aria-hidden="true" loading="lazy" width="300" height="300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
