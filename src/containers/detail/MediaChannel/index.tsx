import { type ContainerProps, Box, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { usePublisherAll } from '@/adapters/hooks/components';
import type { HeadingVariantProps, ImageLoaderProps } from '@/components';
import type { CardOptionProps } from '@/types/card';
import type { MediaChannelsProps } from '@/types/mediaChannels';
import type { ArticleCrossPublisher } from '@/types/responses/components/media-channels';
import getImagePublisher from '@/utils/getImagePublisher';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const CardLandscape = dynamic<CardOptionProps>(() =>
  import('@/components/Cards/CardLandscape').then((mod) => mod.CardLandscape)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading').then((mod) => mod.HeadingVariant)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const Index = (props: MediaChannelsProps) => {
  const { isDesktop, containerProps, category, backgroundCard } = props;
  const data = usePublisherAll(category);
  if (data.every((item) => !item.data)) {
    return <></>;
  }
  return (
    <ContainerSection {...containerProps}>
      <section
        data-testid="section-media-channels"
        className="mb-[15px]"
        id="media-channels"
      >
        <HeadingVariant
          data-testid="title-section-media-channels"
          variant="section"
          fontSize={isDesktop ? '30px' : '24px'}
          marginBottom={isDesktop ? '20px' : '15px'}
          display="flex"
          overflow="hidden"
          alignItems="baseline"
          textAlign={isDesktop ? 'left' : 'center'}
          _before={{
            content: isDesktop ? 'none' : '""',
            position: 'relative',
            flexGrow: 1,
            background: '#bbb',
            lineHeight: 0,
            height: '1px',
            right: '.5rem',
            width: 'auto',
            display: 'inline-block',
          }}
          _after={{
            content: '""',
            position: 'relative',
            left: '.5rem',
            flexGrow: 1,
            background: '#bbb',
            lineHeight: 0,
            height: '1px',
            width: 'auto',
            display: 'inline-block',
          }}
        >
          IDN Media Channels
        </HeadingVariant>
      </section>
      <Grid
        data-testid="list-publisher"
        templateColumns={isDesktop ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
        gap={isDesktop ? '14px' : '10px'}
      >
        {data.map((pub, i) => {
          if (!pub.data) return <></>;
          const item: ArticleCrossPublisher = pub.data?.data.item[0];
          const imageSrc = getImagePublisher(item?.publisher.slug);
          return (
            <CardLandscape
              backgroundColor={backgroundCard}
              newBlank
              type="cross-publisher"
              data={{
                sub_category: {
                  name: item?.category,
                  category_url: `${item?.link}?utm_source=popbela&utm_medium=crosspublisher`,
                },
                title: item?.title,
                author: {
                  avatar: '/',
                  avatar2: '/',
                  author_url: `${item?.link}?utm_source=popbela&utm_medium=crosspublisher`,
                  name: item?.author.name,
                },
                cover: {
                  source_url: item?.coverImages,
                },
                release_date: item?.pubDate,
                article_url: `${item?.link}?utm_source=popbela&utm_medium=crosspublisher`,
              }}
              key={i}
              loadingImg="lazy"
              widthimg={isDesktop ? '133px' : '130px'}
              heightimg={isDesktop ? '166px' : '155px'}
              leftTag={
                <Box width={'45px'} height={'16px'} padding="4px">
                  <ImageLoader
                    data-testid="image-publiser"
                    fill
                    alt="image-publiser"
                    className="object-scale-down p-1"
                    src={imageSrc}
                    loading="lazy"
                  />
                </Box>
              }
            />
          );
        })}
      </Grid>
    </ContainerSection>
  );
};
export default Index;
