import dynamic from 'next/dynamic';

import { usePublisherAll } from '@/adapters/hooks/components';
import type { CardLandscapeProps } from '@/types/card';
import type { MediaChannelsProps } from '@/types/mediaChannels';
import type { ArticleCrossPublisher } from '@/types/responses/components/media-channels';
import getImagePublisher from '@/utils/getImagePublisher';

const CardLandscapeAmp = dynamic<CardLandscapeProps>(() =>
  import('@/components/Cards/CardLandscape/amp').then(
    (mod) => mod.CardLandscapeAmp
  )
);
const MediaChannelAmp = ({ category }: MediaChannelsProps) => {
  const data = usePublisherAll(category);
  if (data.every((item) => !item.data)) {
    return <></>;
  }
  return (
    <section
      data-testid="section-media-channel"
      className="section-media-channel"
    >
      <h2
        data-testid="title-media-channel"
        className="heading-title-media-channel"
      >
        IDN Media Channels
      </h2>
      <div className="grid-media-channel" data-testid="list-media-channels">
        {data?.map((pub, i) => {
          if (!pub.data) return <></>;
          const item: ArticleCrossPublisher = pub.data?.data.item[0];
          const imageSrc = getImagePublisher(item?.publisher.slug);
          return (
            <CardLandscapeAmp
              key={i}
              newBlank
              type="cross-publisher"
              isLeftTag
              leftTagSrc={imageSrc}
              data={{
                title: item?.title,
                article_url_amp: `${item?.link}?utm_source=popbela&utm_medium=crosspublisher`,
                cover: {
                  source_url: item?.coverImages,
                },
                sub_category: {
                  name: item?.category,
                  category_url: `${item?.link}?utm_source=popbela&utm_medium=crosspublisher`,
                },
                author: {
                  name: item?.author.name,
                  author_url: `${item?.link}?utm_source=popbela&utm_medium=crosspublisher`,
                },
                release_date: item?.pubDate,
              }}
            />
          );
        })}
      </div>
      <style jsx>{`
        .section-media-channel {
          width: 100%;
        }
        .heading-title-media-channel {
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
        .heading-title-media-channel:before {
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
        .heading-title-media-channel:after {
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
        .grid-media-channel {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(1, 1fr);
        }
      `}</style>
    </section>
  );
};
export default MediaChannelAmp;
