import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const useTrendingObserver = () => {
  const [pos, setPos] = useState<'top' | 'bottom'>('top');
  const topSign = useInView();
  const bottomSign = useInView();

  useEffect(() => {
    if (topSign.inView && pos === 'bottom') {
      setPos('top');
    } else if (bottomSign.inView && pos === 'top') {
      setPos('bottom');
    }
  }, [topSign.inView, bottomSign.inView, pos]);
  return { pos };
};
