import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

import { PredefinedSpaceAd } from '../Predefine';

export const AdsInfeed3 = ({ isMobile }: TAdProps) => {
  return isMobile ? (
    <PredefinedSpaceAd classNames="min-h-[270px] w-full my-[15px]">
      <div
        data-testid="ads-infeed-3"
        className="relative z-[1] flex bg-white text-center"
      >
        <Ad id="div-gpt-ad-infeed3" />
      </div>
    </PredefinedSpaceAd>
  ) : (
    <PredefinedSpaceAd classNames="min-h-[90px] w-[728px] my-[15px]">
      <div
        data-testid="ads-infeed-3"
        className="relative z-[1] flex justify-center bg-transparent text-center"
      >
        <Ad id="div-gpt-ad-infeed3" />
      </div>
    </PredefinedSpaceAd>
  );
};
