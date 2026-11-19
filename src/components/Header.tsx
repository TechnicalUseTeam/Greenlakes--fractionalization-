import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { nav } from '../data';
import { Logo } from './Logo';

const menuLinks = [...nav, { to: '/ownership', label: 'Ownership & SPVs' }];

export function Header() {
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const { pathname } = useLocation();
  const overlay = pathname === '/';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>('.hero');
      if (!hero) {
        setPastHero(true);
        return;
      }
      const heroEnd = hero.offsetTop + hero.offsetHeight;
      const below = document.body.scrollHeight - heroEnd;
      // a page that ends just under the hero gives no room to scroll past it,
      // so bring the bar in on the first scroll instead of a full screen later
      const threshold = below < window.innerHeight * 1.5 ? 40 : heroEnd - 80;
      const next = window.scrollY > threshold;
      // the fixed bar carries its own logo, so the hero's fades out as it arrives
      document.body.classList.toggle('hero-bar-on', next);
      setPastHero(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.body.classList.remove('hero-bar-on');
    };
  }, [overlay, pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // On the landing page the bar is absent over the hero and slides in past it;
  // everywhere else it is always visible.
  const headerClass = overlay
    ? `site-header site-header--overlay is-scrolled${pastHero ? '' : ' is-hidden'}`
    : 'site-header';

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={headerClass}>
        <div className="container site-header__inner">
          <Logo />
          <div className="header-actions">
            <Link className="btn btn--sm" to="/contact">
              Get started
            </Link>
            <button
              type="button"
              className={`menu-btn${open ? ' is-open' : ''}`}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div className={`menu-overlay${open ? ' is-open' : ''}`} id="site-menu" aria-hidden={!open}>
        <nav className="container menu-overlay__nav" aria-label="Menu">
          {menuLinks.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="menu-overlay__link"
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
              aria-current={pathname === item.to ? 'page' : undefined}
              tabIndex={open ? undefined : -1}
            >
              <span className="menu-overlay__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="container menu-overlay__foot" aria-hidden={!open}>
          <a href="mailto:hello@greenlakes.in" tabIndex={open ? undefined : -1}>
            hello@greenlakes.in
          </a>
          <span>Green Lakes Technologies, Bengaluru</span>
        </div>
      </div>
    </>
  );
}
