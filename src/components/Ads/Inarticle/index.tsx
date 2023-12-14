import { useEffect, useState } from 'react';

import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

import { PredefinedSpaceAd } from '../Predefine';

const AdsInarticle = ({ id, isMobile }: { id: string } & TAdProps) => {
  const [adsId, setAdsId] = useState('');
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const elementAds = document?.createElement('div');
      if (elementAds) {
        elementAds.innerHTML = id;
        const getId = elementAds
          ?.getElementsByClassName('loading-ads')[0]
          ?.getAttribute('id');
        setAdsId(getId ?? '');
      }
    }
  }, [id]);

  return isMobile ? (
    <PredefinedSpaceAd classNames="min-h-[250px] w-[300px] my-[15px]">
      <div
        data-testid="ads-inarticle"
        className="relative z-[1] bg-transparent text-center"
      >
        <Ad id={adsId} />
      </div>
    </PredefinedSpaceAd>
  ) : (
    <div
      data-testid="ads-inarticle"
      className="relative z-[1] bg-transparent text-center"
    >
      <Ad id={adsId} />
    </div>
  );
};
export default AdsInarticle;
