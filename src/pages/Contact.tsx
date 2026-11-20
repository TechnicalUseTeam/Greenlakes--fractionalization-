import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { estates } from '../data';

const icons = {
  mail: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
};

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="contact-page">
      <div className="container contact__grid">
        <Reveal className="contact__intro">
          <span className="contact__tag">Contact</span>
          <h1 className="contact__title">How can we help you today?</h1>
          <p className="body contact__sub">
            Questions on fractions, tokens or a second home. Write in. A person reads it and replies.
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__icon">{icons.mail}</span>
              <span>
                <small>Email</small>
                <a href="mailto:hello@greenlakes.in">hello@greenlakes.in</a>
              </span>
            </li>
            <li>
              <span className="contact__icon">{icons.pin}</span>
              <span>
                <small>Location</small>
                <strong>Bengaluru, Karnataka</strong>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal className="contact__card" delay={1}>
          {sent ? (
            <div className="contact__done">
              <h2 className="h3">Noted. We will reply soon.</h2>
              <p className="body">
                This screen is a prototype, so nothing was sent. In the live site your note goes to the team.
              </p>
              <p className="body">
                In a hurry? Write to <a href="mailto:hello@greenlakes.in">hello@greenlakes.in</a>.
              </p>
              <Link className="btn" to="/explore">
                Back to the second homes
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="contact__row">
                <label className="contact__field">
                  <span className="field-label">First name*</span>
                  <input name="firstName" type="text" autoComplete="given-name" required className="field" placeholder="First name" />
                </label>
                <label className="contact__field">
                  <span className="field-label">Last name*</span>
                  <input name="lastName" type="text" autoComplete="family-name" required className="field" placeholder="Last name" />
                </label>
              </div>

              <label className="contact__field">
                <span className="field-label">Email*</span>
                <input name="email" type="email" autoComplete="email" required className="field" placeholder="you@example.com" />
              </label>

              <label className="contact__field">
                <span className="field-label">Phone number</span>
                <input name="phone" type="tel" autoComplete="tel" className="field" placeholder="+91 98765 43210" />
              </label>

              <label className="contact__field">
                <span className="field-label">Second home</span>
                <select name="interest" className="field" defaultValue="">
                  <option value="" disabled>
                    Choose one, or leave it open
                  </option>
                  {estates.map((e) => (
                    <option key={e.slug} value={e.slug}>
                      {e.name}
                    </option>
                  ))}
                  <option value="unsure">Not sure yet</option>
                </select>
              </label>

              <label className="contact__field">
                <span className="field-label">Message*</span>
                <textarea name="message" rows={4} required className="field" placeholder="Question, feedback, or what you are looking for…" />
              </label>

              <div className="contact__submit">
                <button className="btn" type="submit">
                  Submit
                </button>
                <p className="tiny">No OTP is ever asked for over a call.</p>
              </div>
            </form>
          )}
        </Reveal>
      </div>

      <div className="container contact__trust">
        <p className="tiny">Payments collected over secure escrow.</p>
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
      </div>
    </section>
  );
}
