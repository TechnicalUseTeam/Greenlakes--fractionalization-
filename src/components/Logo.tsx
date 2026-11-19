import { Link } from 'react-router-dom';

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true" focusable="false">
      <path
        d="M20 2.5c8.6 0 17 5.3 17 15.2 0 10.8-7.6 19.8-17.6 19.8C9.6 37.5 3 30 3 20.6 3 10 11 2.5 20 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path
        d="M20.4 9c5.2 0 10 3.3 10 9.3 0 6.4-4.6 11.8-10.6 11.8-5.8 0-9.6-4.4-9.6-10.1C10.2 13.6 15 9 20.4 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path
        d="M20.6 15c2.6 0 4.6 1.7 4.6 4.4 0 3-2.2 5.2-5 5.2-2.6 0-4.4-1.9-4.4-4.4 0-3 2.2-5.2 4.8-5.2Z"
        fill="#2afeb7"
      />
    </svg>
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
