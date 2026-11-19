import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: 0 | 1 | 2 | 3;
  slide?: 'left' | 'right';
  className?: string;
  id?: string;
  style?: CSSProperties;
};

export function Reveal({ children, as: Tag = 'div', delay = 0, slide, className = '', id, style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-in');
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-in');
            obs.unobserve(node);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} data-delay={delay || undefined} data-slide={slide || undefined} style={style}>
      {children}
    </Tag>
  );
}
