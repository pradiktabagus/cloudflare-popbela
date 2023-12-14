import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import { useGetTrending } from '@/adapters/hooks/components';
import type {
  CardNoImageProps,
  CardTrendingProps,
  HeadingVariantProps,
  ImageLoaderProps,
} from '@/components';
import type { TScriptGA } from '@/containers/detail/Scripts';
import { trackerArticles } from '@/containers/detail/Scripts';
import type { DeviceViewProps } from '@/types/device';
import type { ResponseArticle } from '@/types/responses/article';
import type { ResponseTrending } from '@/types/section/trending';

export type TrendingProps = {
  data?: ResponseTrending[];
  classNameSection?: string;
  backgroundCard?: string;
  containerProps?: ContainerProps;
  ssr?: boolean;
  article?: TScriptGA;
} & DeviceViewProps;

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const CardNoImage = dynamic<CardNoImageProps>(() =>
  import('@/components/Cards/CardNoImage').then((mod) => mod.CardNoImage)
);
const CardTrending = dynamic<CardTrendingProps>(() =>
  import('@/components/Cards/CardTrending').then((mod) => mod.CardTrending)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading/HeadingVariant').then(
    (mod) => mod.HeadingVariant
  )
);
const SkeletonTrending = dynamic(
  () => import('@/components/Skeleton/Trending')
);

export const SectionTrending = (props: TrendingProps) => {
  const {
    classNameSection,
    isDesktop = true,
    containerProps,
    backgroundCard,
    article,
  } = props;
  const { data, isFetching } = useGetTrending({
    params: `limit=${10}`,
    end_point: '/page/trending',
    version: 'v2',
  });
  return (
    <ContainerSection {...containerProps}>
      <section
        id="trending-article"
        data-testid="section-trending"
        className={`mb-[25px] lg:mb-[15px] lg:p-3 ${
          classNameSection && classNameSection
        }`}
      >
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Box
            display={isDesktop ? 'block' : 'none'}
            height="55px"
            width="55px"
            position="relative"
            transform="rotate(-20deg)"
          >
            <ImageLoader
              data-testid="image-trending"
              fill
              alt="trending"
              className="object-cover"
              src="/v3/assets/images/global/icon-trending.png"
              loading="lazy"
            />
          </Box>
          <HeadingVariant
            width={isDesktop ? 'auto' : 'full'}
            fontSize={isDesktop ? '25px' : '24px'}
            lineHeight={isDesktop ? '1.3' : '1.1'}
            marginBottom={isDesktop ? '0px' : '15px'}
            variant="section"
            alignItems="baseline"
            display="flex"
            overflow="hidden"
            padding="0 15px"
            _before={{
              content: isDesktop ? 'none' : '""',
              position: 'relative',
              flexGrow: 1,
              background: '#bbb',
              lineHeight: 0,
              height: '1px',
              right: isDesktop ? '.5rem' : 0,
              width: 'auto',
              display: 'inline-block',
            }}
            _after={{
              content: isDesktop ? 'none' : '""',
              position: 'relative',
              left: isDesktop ? '.5rem' : 0,
              flexGrow: 1,
              background: '#bbb',
              lineHeight: 0,
              height: '1px',
              width: 'auto',
              display: 'inline-block',
            }}
          >
            Trending
          </HeadingVariant>
        </Flex>
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={isDesktop ? '15px' : '0px'}
          padding={isDesktop ? '30px 15px' : '0 1rem'}
        >
          <Fragment>
            {isFetching ? (
              <SkeletonTrending
                dataDummy={[1, 2, 3, 4, 5]}
                isDesktop={isDesktop}
              />
            ) : (
              <Fragment>
                {data?.data?.trendings?.map(
                  (item: ResponseArticle, index: number) => (
                    <GridItem
                      key={index}
                      data-testid="item-trending"
                      className="trending-item"
                    >
                      {isDesktop ? (
                        <CardTrending
                          trackerCallbacks={
                            article
                              ? () =>
                                  trackerArticles({
                                    article,
                                    position: index + 1,
                                    destination: item.article_url,
                                    section: `Trending`,
                                  })
                              : () => null
                          }
                          backgroundColor={backgroundCard && backgroundCard}
                          width="full"
                          widthimg="92px"
                          heightimg="92px"
                          data={{
                            article_url: item.article_url,
                            cover: item.cover,
                            release_date: item.release_date,
                            title: item.title,
                          }}
                        />
                      ) : (
                        <CardNoImage
                          trackerCallbacks={
                            article
                              ? () =>
                                  trackerArticles({
                                    article,
                                    position: index + 1,
                                    destination: item.article_url,
                                    section: `Trending`,
                                  })
                              : () => null
                          }
                          data={{
                            article_url: item.article_url,
                            author: item.author,
                            release_date: item.release_date,
                            sub_category: item.sub_category,
                            title: item.title,
                          }}
                        />
                      )}
                    </GridItem>
                  )
                )}
              </Fragment>
            )}
          </Fragment>
        </Grid>
      </section>
    </ContainerSection>
  );
};
