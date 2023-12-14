import type { TadsSlotGlance } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

export const AdsStickyGlance = ({ className, id }: TadsSlotGlance) => {
  return (
    <div
      data-testid="ads-sticky"
      className={`fixed inset-x-0 bottom-0 z-10 w-full text-center ${
        className && className
      }`}
    >
      <Ad id={id} />
    </div>
  );
};
