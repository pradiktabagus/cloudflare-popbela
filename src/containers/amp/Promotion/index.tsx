import dynamic from 'next/dynamic';

import { usePromotionMarketing } from '@/adapters/hooks/components';
import type { CardPromotionProps } from '@/types/card';
import type { ResponsePromotionTag } from '@/types/responses/components/promotion-tag';

const CardPromotion = dynamic<CardPromotionProps>(() =>
  import('@/components/Cards/CardPromotion/amp').then(
    (mod) => mod.CardPromotionAmp
  )
);
export type TSectionPromotion = {
  tag: string[];
};

const SectionPromotion = ({ tag }: TSectionPromotion) => {
  const { data } = usePromotionMarketing<ResponsePromotionTag>({
    end_point: 'promotion-tags',
    params: tag,
  });
  return (
    <section
      className="section-promotion-amp"
      data-testid="section-promotion-amp"
    >
      {data?.data.map((promotion, index) => (
        <CardPromotion
          key={index}
          title={promotion.products[0]?.title ?? ''}
          partner={promotion.products}
        />
      ))}
      <style jsx>{`
        .section-promotion-amp {
          margin: 1.5rem 0;
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          row-gap: 0.5rem;
        }
      `}</style>
    </section>
  );
};

export default SectionPromotion;
