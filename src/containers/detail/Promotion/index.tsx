import dynamic from 'next/dynamic';

import { usePromotionMarketing } from '@/adapters/hooks/components';
import type { CardPromotionProps } from '@/types/card';
import type { ResponsePromotionTag } from '@/types/responses/components/promotion-tag';

const CardPromotion = dynamic<CardPromotionProps>(() =>
  import('@/components/Cards/CardPromotion').then((mod) => mod.CardPromotion)
);
const SkeletonPromotion = dynamic(
  () => import('@/components/Skeleton/PromotionMarketing')
);
export type TSectionPromotion = {
  tag: string[];
};

const SectionPromotion = ({ tag }: TSectionPromotion) => {
  const { data, isLoading } = usePromotionMarketing<ResponsePromotionTag>({
    end_point: 'promotion-tags',
    params: tag,
  });
  if (isLoading) return <SkeletonPromotion />;
  return (
    <section
      className="my-6 grid grid-cols-1 gap-y-2"
      data-testid="section-promotion"
    >
      {data?.data.map((promotion, index) => (
        <CardPromotion
          key={index}
          title={promotion.products[0]?.title ?? ''}
          partner={promotion.products}
        />
      ))}
    </section>
  );
};

export default SectionPromotion;
