import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useGetRelatedSection } from '@/adapters/hooks/components';
import type { CardLandscapeProps } from '@/types/card';
import type { ResponseRelated } from '@/types/responses/components/related';

const CardLandscapeAmp = dynamic<CardLandscapeProps>(() =>
  import('@/components/Cards/CardLandscape/amp').then(
    (mod) => mod.CardLandscapeAmp
  )
);
const RelatedArticleAmp = () => {
  const router = useRouter();
  const { query } = router;
  const { data: articles } = useGetRelatedSection<ResponseRelated>({
    end_point: `category=${query.category}`,
    version: 'v2',
  });
  return (
    <section data-testid="section-related-amp" className="section-related-amp">
      <h2
        data-testid="title-related-article-amp"
        className="heading-title-related"
      >
        RELATED ARTICLES
      </h2>
      <div className="grid-related-article">
        {articles?.data.map((releated, index) => (
          <div key={index} data-testid="item-article-amp">
            <CardLandscapeAmp
              data={releated}
              widthimg="130px"
              heightimg="135px"
              titleProps={{
                fontSize: '16px',
                fontFamily: 'limerickMedium',
                as: 'h4',
              }}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .section-related-amp {
          width: 100%;
        }
        .heading-title-related {
          font-family: futuraTemeed;
          font-weight: 700;
          font-size: 24px;
          line-height: 1.5;
          color: #d72772;
          text-transform: uppercase;
          margin-bottom: 15px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          overflow: hidden;
          -webkit-align-items: baseline;
          -webkit-box-align: baseline;
          -ms-flex-align: baseline;
          align-items: baseline;
          text-align: center;
          letter-spacing: 3px;
        }
        .heading-title-related:before {
          content: '';
          position: relative;
          -webkit-box-flex: 1;
          -webkit-flex-grow: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          background: #bbb;
          line-height: 0;
          height: 1px;
          right: 0.5rem;
          width: auto;
          display: inline-block;
        }
        .heading-title-related:after {
          content: '';
          position: relative;
          left: 0.5rem;
          -webkit-box-flex: 1;
          -webkit-flex-grow: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          background: #bbb;
          line-height: 0;
          height: 1px;
          width: auto;
          display: inline-block;
        }
        .grid-related-article {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(1, 1fr);
        }
      `}</style>
    </section>
  );
};
export default RelatedArticleAmp;
