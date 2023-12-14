import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

export const AdsCustom1 = (_: TAdProps) => {
  return (
    <div
      data-testid="ads-custom-1"
      className="relative z-[1] bg-white md:bg-transparent"
    >
      <Ad id="div-gpt-ad-custom1" className="block" />
    </div>
  );
};
