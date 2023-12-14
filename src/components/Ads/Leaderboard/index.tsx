import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

import { PredefinedSpaceAd } from '../Predefine';

export const AdsLeaderboard = (props: TAdProps) => {
  const { isMobile } = props;
  return isMobile ? (
    <PredefinedSpaceAd classNames="min-h-[270px] w-full mb-[15px]">
      <div
        data-testid="ads-leaderboard"
        className="relative z-[1] bg-white text-center"
      >
        <Ad id="div-gpt-ad-leaderboard" />
      </div>
    </PredefinedSpaceAd>
  ) : (
    <PredefinedSpaceAd classNames="min-h-[250px] w-[970px] my-[15px]">
      <div
        data-testid="ads-leaderboard"
        className="relative z-[1] bg-transparent p-3 text-center"
      >
        <Ad id="div-gpt-ad-leaderboard" />
      </div>
    </PredefinedSpaceAd>
  );
};
