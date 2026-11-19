import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHead } from '../components/Blocks';
import { Reveal } from '../components/Reveal';
import { estates } from '../data';

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHead
        title="Talk to us first."
        intro="Questions on fractions, tokens, or a second home. Write in. A human replies."
      />

      <div className="container">
        <Reveal delay={1}>
          <div className="chart-card" style={{ marginTop: 30, padding: 'clamp(20px, 3vw, 30px)', maxWidth: 640 }}>
            {sent ? (
              <div>
                <h2 className="h3">Noted. We will reply soon.</h2>
                <p className="body" style={{ marginTop: 10 }}>
                  This screen is a prototype, so nothing was sent. In the live site your note goes to the team.
                </p>
                <p className="body" style={{ marginTop: 10 }}>
                  In a hurry? Write to <a href="mailto:hello@greenlakes.in">hello@greenlakes.in</a>.
                </p>
                <Link className="btn" to="/explore" style={{ marginTop: 20 }}>
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
                <h2 className="h3">Tell us what you're looking for</h2>
                <label className="field-label" htmlFor="contact-name" style={{ display: 'block', marginTop: 20 }}>
                  Name
                </label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required className="field" placeholder="Your name" />
                <label className="field-label" htmlFor="contact-email" style={{ display: 'block', marginTop: 14 }}>
                  Email or phone
                </label>
                <input id="contact-email" name="email" type="text" autoComplete="email" required className="field" placeholder="you@example.com" />
                <label className="field-label" htmlFor="contact-interest" style={{ display: 'block', marginTop: 14 }}>
                  Interested in
                </label>
                <select id="contact-interest" name="interest" className="field" defaultValue="">
                  <option value="" disabled>
                    Choose a second home
                  </option>
                  {estates.map((e) => (
                    <option key={e.slug} value={e.slug}>
                      {e.name}
                    </option>
                  ))}
                  <option value="unsure">Not sure yet</option>
                </select>
                <label className="field-label" htmlFor="contact-message" style={{ display: 'block', marginTop: 14 }}>
                  Message
                </label>
                <textarea id="contact-message" name="message" rows={4} className="field" placeholder="What would you like to know?" />
                <button className="btn" type="submit" style={{ width: '100%', marginTop: 20 }}>
                  Send
                </button>
                <p className="tiny" style={{ marginTop: 12 }}>
                  No OTP is ever asked for over a call.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </>
  );
}
