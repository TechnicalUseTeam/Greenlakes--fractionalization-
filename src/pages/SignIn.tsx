import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from '../components/Logo';
import { Reveal } from '../components/Reveal';

export function SignIn() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container auth">
      <div>
        <Reveal>
          <LogoMark size={56} />
          <h1 className="display" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', marginTop: 24, maxWidth: '11ch' }}>
            Start with a twelfth.
          </h1>
        </Reveal>

        <Reveal delay={1}>
          <div className="chart-card" style={{ marginTop: 30, padding: 'clamp(20px, 3vw, 30px)' }}>
            {sent ? (
              <div>
                <h2 className="h3">This screen is a prototype.</h2>
                <p className="body" style={{ marginTop: 10 }}>
                  Sign-in itself lives in the main app.
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
                <h2 className="h3">Log in or create an account</h2>
                <label className="field-label" htmlFor="email" style={{ display: 'block', marginTop: 20 }}>
                  Email or phone
                </label>
                <input id="email" name="email" type="text" autoComplete="email" required className="field" placeholder="you@example.com" />
                <label className="field-label" htmlFor="pan" style={{ display: 'block', marginTop: 14 }}>
                  PAN (optional for now)
                </label>
                <input id="pan" name="pan" type="text" autoComplete="off" className="field" placeholder="ABCDE1234F" />
                <button className="btn" type="submit" style={{ width: '100%', marginTop: 20 }}>
                  Continue
                </button>
                <p className="tiny" style={{ marginTop: 12 }}>
                  No OTP is ever asked for over a call.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal className="auth__media" delay={1}>
        <img src="/media/nandi-real.jpg" alt="Mango and jackfruit orchard below the Nandi Hills at sunrise" width="1200" height="1500" />
        <div className="auth__thumbs">
          {[
            { src: '/media/orchard-laterite.jpg', alt: 'Mango trees standing in red laterite soil' },
            { src: '/media/nandi-fog.jpg', alt: 'Fog rolling over the Nandi Hills' },
            { src: '/media/orchard-egrets.jpg', alt: 'Cattle egrets foraging in a mango orchard' },
          ].map((img, i) => (
            <Reveal as="figure" key={img.src} delay={(i % 3) as 0 | 1 | 2}>
              <img src={img.src} alt={img.alt} width="600" height="400" />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="tiny" style={{ marginTop: 10 }}>
            Nandi Hills Orchard Second Home · 10 acres · Karnataka
          </p>
        </Reveal>
      </Reveal>
    </div>
  );
}
