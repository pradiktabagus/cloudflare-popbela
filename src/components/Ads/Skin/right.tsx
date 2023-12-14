import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

export const AdsSkinRight = (isDesktop: TAdProps) => {
  return isDesktop ? (
    <div
      data-testid="ads-skin-right"
      className="fixed left-[calc(50%_+_500px)] top-[138px] z-[2]"
    >
      <Ad id="div-gpt-ad-skin_right" />
    </div>
  ) : (
    <></>
  );
};
