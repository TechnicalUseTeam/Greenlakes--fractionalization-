import { Link } from 'react-router-dom';

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <img
      src="/greenlake_logo.jpeg"
      alt=""
      width={size}
      height={size}
      className="logo-mark"
      aria-hidden="true"
    />
  );
}

export function Logo({ to = '/', tone = 'dark' }: { to?: string; tone?: 'dark' | 'light' }) {
  return (
    <Link to={to} className="brand" aria-label="Green Lakes home" style={tone === 'light' ? { color: '#ffffff' } : undefined}>
      <LogoMark />
      <span translate="no">Green Lakes</span>
    </Link>
  );
}
