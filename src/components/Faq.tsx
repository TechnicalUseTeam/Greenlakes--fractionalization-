import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqs } from '../data';

export function Faq({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  return (
    <div className="faq">
      <div className="faq__list">
        {items.map((item, i) => (
          <div key={item.q}>
            <button
              type="button"
              className="faq__q"
              aria-expanded={i === active}
              onClick={() => {
                setActive(i);
                setOpenMobile((v) => (v === i ? null : i));
              }}
              onFocus={() => setActive(i)}
            >
              {item.q}
            </button>
            {openMobile === i && <p className="faq__mobile-answer">{item.a}</p>}
          </div>
        ))}
      </div>
      <div className="faq__answer" aria-live="polite">
        <p key={active}>{items[active]?.a}</p>
        <p className="tiny">
          Still unsure? <Link to="/ownership">Read how ownership works</Link> or write to{' '}
          <a href="mailto:hello@greenlakes.in">hello@greenlakes.in</a>.
        </p>
      </div>
    </div>
  );
}
