import type { ButtonProps } from '@chakra-ui/button';
import type { ContainerProps } from '@chakra-ui/layout';
import { Flex, Grid, GridItem } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import { useGetLatest } from '@/adapters/hooks/components';
import type { HeadingVariantProps } from '@/components';
import { trackerArticles } from '@/containers/detail/Scripts';
import type { CardOptionProps } from '@/types/card';
import type { LatestProps } from '@/types/latest';
import type { ResponseLatest } from '@/types/section/latest';
import { getPositionItem } from '@/utils/getPotitionItem';

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
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading').then((mod) => mod.HeadingVariant)
);
const SkeletonLatest = dynamic(() => import('@/components/Skeleton/Latest'));

export const SectionLatest = ({
  category,
  titleLatest,
  backgroundCard,
  isDesktop,
  containerProps,
  article,
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
      <section
        data-testid="section-latest"
        className="mb-[15px]"
        id="latest-article"
      >
        <HeadingVariant
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
          templateColumns={isDesktop ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)'}
          gap={isDesktop ? '14px' : '10px'}
        >
          {isFetching && !isFetchingNextPage ? (
            <SkeletonLatest dataDummy={[1, 2, 3, 4, 5, 6]} />
          ) : (
            data?.pages.map((dataPage, i) => {
              return (
                <Fragment key={i}>
                  {dataPage?.data.map((item: ResponseLatest, j: number) => {
                    const page = i + 1;
                    const index = j + 1;
                    const articleComp = (itemArticle: ResponseLatest) => {
                      return (
                        <GridItem
                          key={j}
                          data-testid="list-latest"
                          className="latest-item"
                        >
                          <CardLandscape
                            trackerCallbacks={() =>
                              trackerArticles({
                                article,
                                position:
                                  page === 1
                                    ? page * index
                                    : getPositionItem(page, index, 18),
                                destination: itemArticle.article_url,
                                section: `Latest From ${article?.sub_category_name}`,
                              })
                            }
                            backgroundColor={backgroundCard && backgroundCard}
                            data={{
                              sub_category: itemArticle.sub_category,
                              title: itemArticle.title,
                              author: itemArticle.author,
                              cover: itemArticle.cover,
                              release_date: itemArticle.release_date,
                              article_url: itemArticle.article_url,
                            }}
                            widthimg={isDesktop ? '133px' : '130px'}
                            heightimg={isDesktop ? '166px' : '155px'}
                            loadingImg="lazy"
                          />
                        </GridItem>
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
