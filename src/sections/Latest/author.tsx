import type { ButtonProps } from '@chakra-ui/button';
import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import { useInfinityAuthor } from '@/adapters/hooks/components';
import type { HeadingVariantProps } from '@/components';
import type { CardOptionProps } from '@/types/card';
import type { LatestOptProps } from '@/types/latest';
import type { ResponseLatest } from '@/types/section/latest';

const ButtonLoadMore = dynamic<ButtonProps>(() =>
  import('@/components/Buttons/ButtonLoadMore').then(
    (mod) => mod.ButtonLoadMore
  )
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const CardLandscape = dynamic<CardOptionProps>(() =>
  import('@/components/Cards/CardLandscape').then((mod) => mod.CardLandscape)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading').then((mod) => mod.HeadingVariant)
);
export const SectionLatestAuthor = ({
  category,
  backgroundCard,
  isDesktop,
  type,
  ...containerProps
}: LatestOptProps) => {
  const initData = containerProps.data;
  const {
    data,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useInfinityAuthor({
    url: `/user/${category}?type=${type}`,
  });

  return (
    <ContainerSection {...containerProps}>
      <section data-testid="section-latest" className="mb-[15px]">
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
          ARTICLES
        </HeadingVariant>
        <Grid
          templateColumns={isDesktop ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)'}
          gap={isDesktop ? '24px' : '10px'}
        >
          {isSuccess && !isLoading ? (
            data?.pages.map((dataPage, i) => {
              return (
                <Fragment key={i}>
                  {dataPage?.latest.articles.map(
                    (item: ResponseLatest, j: number) => {
                      const articleComp = (itemArticle: ResponseLatest) => {
                        return (
                          <Box key={j} data-testid="list-latest">
                            <CardLandscape
                              backgroundColor={backgroundCard && backgroundCard}
                              data={{
                                sub_category: itemArticle.sub_category,
                                title: itemArticle.title,
                                author: itemArticle.author,
                                cover: itemArticle.cover,
                                // release_date: itemArticle.release_date,
                                article_url: itemArticle.article_url,
                              }}
                              widthimg={isDesktop ? '133px' : '130px'}
                              heightimg={isDesktop ? '166px' : '155px'}
                              type={type}
                              headingType="h2"
                              loadingImg="lazy"
                            />
                          </Box>
                        );
                      };
                      return articleComp(item);
                    }
                  )}
                </Fragment>
              );
            })
          ) : (
            <>
              {initData?.map((datas, i) => {
                return (
                  <Box key={i} data-testid="list-latest">
                    <CardLandscape
                      backgroundColor={backgroundCard && backgroundCard}
                      data={{
                        sub_category: datas.sub_category,
                        title: datas.title,
                        author: datas.author,
                        cover: datas.cover,
                        // release_date: datas.release_date,
                        article_url: datas.article_url,
                      }}
                      widthimg={isDesktop ? '133px' : '130px'}
                      heightimg={isDesktop ? '166px' : '155px'}
                      loadingImg="lazy"
                    />
                  </Box>
                );
              })}
            </>
          )}
        </Grid>
        {isSuccess ? (
          hasNextPage && (
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
          )
        ) : (
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
