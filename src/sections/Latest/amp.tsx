import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useGetLatestAmp } from '@/adapters/hooks/components';
import type { CardLandscapeProps } from '@/types/card';
import type { LatestProps } from '@/types/latest';
import type { ResponseLatest } from '@/types/section/latest';

const CardLandscapeAmp = dynamic<CardLandscapeProps>(() =>
  import('@/components/Cards/CardLandscape/amp').then(
    (mod) => mod.CardLandscapeAmp
  )
);
const LatestAmp = ({ data }: { data?: ResponseLatest[] }) => {
  return (
    <div className="grid-latest-amp">
      {data?.map((itemArticle, index) => (
        <div key={index} data-testid="list-latest-amp">
          <CardLandscapeAmp
            data={itemArticle}
            widthimg="130px"
            heightimg="135px"
            titleProps={{ fontSize: '16px', fontFamily: 'limerickMedium' }}
          />
        </div>
      ))}
      <style jsx>{`
        .grid-latest-amp {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(1, 1fr);
        }
      `}</style>
    </div>
  );
};
export const SectionLatestAmp = ({ titleLatest }: LatestProps) => {
  const router = useRouter();
  const { category } = router.query;
  const { data } = useGetLatestAmp({
    end_point: `/component/latest-article?category=${category}&page=1`,
    version: 'v2',
  });
  return (
    <div data-testid="section-latest-amp" className="section-latest-amp">
      <h2
        data-testid="title-latest-article-amp"
        className="heading-title-latest"
      >
        {titleLatest ? `Latest from ${titleLatest}` : 'The Latest'}
      </h2>
      <LatestAmp data={data.data} />
      <style jsx>{`
        .section-latest-amp {
          width: 100%;
        }
        .heading-title-latest {
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
        .heading-title-latest:before {
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
        .heading-title-latest:after {
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
      `}</style>
    </div>
  );
};
