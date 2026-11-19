import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
          </div>
          <div className="footer__cols">
            <nav aria-label="Own">
              <h2>Own</h2>
              <ul>
                <li>
                  <Link to="/explore">Explore land</Link>
                </li>
                <li>
                  <Link to="/estates/nandi-hills-orchard-estate">Nandi Hills</Link>
                </li>
                <li>
                  <Link to="/estates/alibaug-coastal-plots">By The Creek</Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="Learn">
              <h2>Learn</h2>
              <ul>
                <li>
                  <Link to="/how-it-works">How it works</Link>
                </li>
                <li>
                  <Link to="/tokenisation">Tokenisation</Link>
                </li>
                <li>
                  <Link to="/ownership">Ownership &amp; SPVs</Link>
                </li>
                <li>
                  <Link to="/why-green-lakes">Why Green Lakes</Link>
                </li>
                <li>
                  <Link to="/ownership#risks">Risk disclosures</Link>
                </li>
              </ul>
            </nav>
            <nav aria-label="Company">
              <h2>Company</h2>
              <ul>
                <li>
                  <Link to="/why-green-lakes">About us</Link>
                </li>
                <li>
                  <a href="mailto:hello@greenlakes.in">Contact</a>
                </li>
                <li>
                  <Link to="/ownership#documents">Offer documents</Link>
                </li>
                <li>
                  <a href="#legal">Terms &amp; privacy</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      </div>
    </footer>
  );
}
