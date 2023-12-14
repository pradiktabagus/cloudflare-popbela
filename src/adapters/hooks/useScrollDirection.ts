import { useEffect, useState } from 'react';

type Direction = 'up' | 'down';

type UseScrollDirection = {
  thresholdPixels?: number;
  initialDirection?: Direction;
};

export const useScrollDirection = (params?: UseScrollDirection) => {
  const { thresholdPixels, initialDirection } = params ?? {};
  const [direction, setDirection] = useState<Direction | undefined>(
    initialDirection
  );

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels]);

  return { isScrollDown: direction === 'down', isScrollUp: direction === 'up' };
};
