import { useEffect, useRef } from 'react';

/**
 * Scroll parallax: translates the element (with scale headroom) as it moves through the
 * viewport. Respects prefers-reduced-motion, rAF-throttled, observer-gated so work only
 * happens while the element is visible.
 */
export function useParallax<T extends HTMLElement>(strength = 0.08) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -80 || rect.top > vh + 80) return;
      // -1 (below fold) .. 1 (above fold)
      const progress = (rect.top + rect.height / 2 - vh / 2) / ((vh + rect.height) / 2);
      el.style.transform = `translate3d(0, ${(progress * strength * 100).toFixed(2)}%, 0) scale(1.12)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        schedule();
      },
      { rootMargin: '80px' },
    );
    io.observe(el);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [strength]);

  return ref;
}
