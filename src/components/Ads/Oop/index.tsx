import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

export const AdsOop1 = (_: TAdProps) => {
  return (
    <div
      data-testid="ads-oop-1"
      className="relative z-[1] bg-white text-center"
    >
      <Ad id="div-gpt-ad-oop1" className="block" />
    </div>
  );
};
