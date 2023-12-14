import type { TadsSlot } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';
import clsxm from '@/utils/clsxm';

export const AdsSticky = ({ className }: TadsSlot) => {
  return (
    <div
      data-testid="ads-sticky"
      className={clsxm(
        'fixed inset-x-0 bottom-0 z-10 w-full text-center',
        className && className
      )}
    >
      <Ad id="div-gpt-ad-sticky" />
    </div>
  );
};
