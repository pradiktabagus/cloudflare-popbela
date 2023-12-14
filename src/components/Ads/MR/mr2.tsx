import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

export const AdsMr2 = (isDesktop: TAdProps) => {
  return isDesktop ? (
    <div
      data-testid="ads-mr-2"
      className="relative z-[1] bg-transparent text-center"
    >
      <Ad id="div-gpt-ad-mr2" />
    </div>
  ) : (
    <></>
  );
};
