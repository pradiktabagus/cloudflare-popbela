import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

import { PredefinedSpaceAd } from '../Predefine';

export const AdsMr1 = (isDesktop: TAdProps) => {
  return isDesktop ? (
    <PredefinedSpaceAd classNames="min-h-[250px] w-[300px] my-[15px]">
      <div
        data-testid="ads-mr-1"
        className="relative z-[1] bg-transparent text-center"
      >
        <Ad id="div-gpt-ad-mr1" />
      </div>
    </PredefinedSpaceAd>
  ) : (
    <></>
  );
};
