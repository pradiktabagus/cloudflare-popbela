import type { ButtonProps } from '@chakra-ui/button';
import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import { useGetLatest } from '@/adapters/hooks/components';
import type { CardPotraitProps, HeadingVariantProps } from '@/components';
import type { CardOptionProps } from '@/types/card';
import type { LatestProps } from '@/types/latest';
import type { ResponseLatest } from '@/types/section/latest';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);

const ButtonLoadMore = dynamic<ButtonProps>(() =>
  import('@/components/Buttons/ButtonLoadMore').then(
    (mod) => mod.ButtonLoadMore
  )
);

const CardLandscape = dynamic<CardOptionProps>(() =>
  import('@/components/Cards/CardLandscape').then((mod) => mod.CardLandscape)
);

const CardPotrait = dynamic<CardPotraitProps>(() =>
  import('@/components/Cards/CardPotrait').then((mod) => mod.CardPotrait)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading').then((mod) => mod.HeadingVariant)
);
const SkeletonLatestCategory = dynamic(
  () => import('@/components/Skeleton/Latest/category')
);
export const SectionLatestCategory = ({
  category,
  titleLatest,
  backgroundCard,
  isDesktop,
  containerProps,
}: LatestProps) => {
  const {
    data,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
  } = useGetLatest({
    end_point: `/component/latest-article?category=${category}`,
    version: 'v2',
  });
  return (
    <ContainerSection {...containerProps}>
      <section data-testid="section-latest" className="mb-[15px]">
        <HeadingVariant
          as={category === 'zodiac' ? 'h3' : 'h2'}
          data-testid="title-section-latest"
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
          {titleLatest ? `Latest from ${titleLatest}` : 'The Latest'}
        </HeadingVariant>
        <Grid
          templateColumns={isDesktop ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
          gap={isDesktop ? '14px' : '10px'}
        >
          {isFetching && !isFetchingNextPage ? (
            <SkeletonLatestCategory
              dataDummy={[1, 2, 3, 4]}
              isDesktop={isDesktop}
            />
          ) : (
            data?.pages.map((dataPage, i) => {
              return (
                <Fragment key={i}>
                  {dataPage?.data.map((item: ResponseLatest, j: number) => {
                    const articleComp = (itemArticle: ResponseLatest) => {
                      return (
                        <Box key={j} data-testid="list-latest">
                          {isDesktop ? (
                            <CardPotrait
                              backgroundColor={backgroundCard && backgroundCard}
                              data={{
                                sub_category: itemArticle.sub_category,
                                title: itemArticle.title,
                                author: itemArticle.author,
                                cover: itemArticle.cover,
                                release_date: itemArticle.release_date,
                                article_url: itemArticle.article_url,
                              }}
                              widthimg="100%"
                              heightimg="229px"
                              loadingImg="lazy"
                              titleProps={{
                                as: category === 'zodiac' ? 'h4' : 'h3',
                              }}
                            />
                          ) : (
                            <CardLandscape
                              backgroundColor={backgroundCard && backgroundCard}
                              data={{
                                sub_category: itemArticle.sub_category,
                                title: itemArticle.title,
                                author: itemArticle.author,
                                cover: itemArticle.cover,
                                release_date: itemArticle.release_date,
                                article_url: itemArticle.article_url,
                              }}
                              widthimg="130px"
                              heightimg="155px"
                              loadingImg="lazy"
                              titleProps={{
                                as: category === 'zodiac' ? 'h4' : 'h3',
                              }}
                            />
                          )}
                        </Box>
                      );
                    };
                    return articleComp(item);
                  })}
                </Fragment>
              );
            })
          )}
        </Grid>
        {isSuccess && hasNextPage && (
          <Flex
            data-testid="section-load-more-latest"
            flexDirection="row"
            justifyContent="center"
            marginTop="2rem"
          >
            <ButtonLoadMore
              data-testid="button-load-more-latest"
              isLoading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            />
          </Flex>
        )}
      </section>
    </ContainerSection>
  );
};
