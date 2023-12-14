import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

export const AdsSkinLeft = (isDesktop: TAdProps) => {
  return isDesktop ? (
    <div
      data-testid="ads-skin-left"
      className="fixed right-[calc(50%_+_500px)] top-[138px] z-[2]"
    >
      <Ad id="div-gpt-ad-skin_left" />
    </div>
  ) : (
    <></>
  );
};
