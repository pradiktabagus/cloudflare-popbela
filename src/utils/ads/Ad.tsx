import { useRouter } from 'next/router';
import { useEffect } from 'react';

import type { AdComponent } from '@/types/ads';

import clsxm from '../clsxm';
import styles from './ads-unit.module.scss';
import { useAdsContext } from './AdsContext';
import { dfp } from './dfp';

export const Ad: AdComponent = ({ id, className, classNameUnits }) => {
  const { isLoading } = useAdsContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !!id) {
      dfp.showSlot(id);
    }
  }, [isLoading, id, router.query]);

  return (
    <div
      className={clsxm(styles['ads-unit'], classNameUnits && classNameUnits)}
    >
      <div
        data-ad-format="rectangle"
        data-ad="true"
        id={id}
        data-testid="ads-slot-id"
        className={clsxm(className || 'inline-block text-center')}
      />
    </div>
  );
};
