import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

export const AdsCustom2 = (_: TAdProps) => {
  return (
    <div
      data-testid="ads-custom-2"
      className="relative z-[1] bg-white md:bg-transparent"
    >
      <Ad id="div-gpt-ad-custom2" className="block" />
    </div>
  );
};
