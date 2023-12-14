import type { ButtonProps } from '@chakra-ui/button';
import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import { useInfinityTag } from '@/adapters/hooks/components';
import type { HeadingVariantProps } from '@/components';
import type { CardLandscapeProps } from '@/types/card';
import type { LatestProps } from '@/types/latest';
import type { TagPageResponse } from '@/types/responses/pages/tag';
import type { ResponseLatest } from '@/types/section/latest';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const ButtonLoadMore = dynamic<ButtonProps>(() =>
  import('@/components/Buttons/ButtonLoadMore').then(
    (mod) => mod.ButtonLoadMore
  )
);

const CardLandscapeTag = dynamic<CardLandscapeProps>(() =>
  import('@/components/Cards/CardLandscape/tag').then(
    (mod) => mod.CardLandscapeTag
  )
);

const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading').then((mod) => mod.HeadingVariant)
);

export const SectionLatestTag = ({
  category,
  titleLatest,
  isDesktop,
  containerProps,
  ...props
}: LatestProps) => {
  const {
    data,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useInfinityTag({
    url: `/tag/${category}?type=`,
    version: 'v1',
  });

  return (
    <ContainerSection {...containerProps}>
      <section data-testid="section-latest" className="mb-[15px] pt-4">
        <HeadingVariant
          data-testid="title-section-latest"
          variant="section"
          fontSize={isDesktop ? '30px' : '24px'}
          marginBottom={isDesktop ? '20px' : '15px'}
          display="flex"
          overflow="hidden"
          alignItems="baseline"
          textTransform="capitalize"
          textAlign="center"
          className="pb-2 md:pb-5"
          _before={{
            content: '""',
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
          {titleLatest ? `${titleLatest}` : 'Popbela Tag'}
        </HeadingVariant>
        <Grid
          templateColumns={isDesktop ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)'}
          gap={isDesktop ? '24px' : '10px'}
        >
          {isSuccess && !isLoading ? (
            data?.pages.map((dataPage: TagPageResponse, i) => {
              return (
                <Fragment key={i}>
                  {dataPage?.data?.articles?.map(
                    (item: ResponseLatest, j: number) => {
                      const articleComp = (itemArticle: ResponseLatest) => {
                        return (
                          <Box key={j} data-testid="list-latest">
                            <CardLandscapeTag
                              data={{
                                sub_category: itemArticle.sub_category,
                                title: itemArticle.title,
                                author: itemArticle.author,
                                cover: itemArticle.cover,
                                release_date: itemArticle.release_date,
                                article_url: itemArticle.article_url,
                              }}
                              widthimg={isDesktop ? '133px' : '130px'}
                              heightimg={isDesktop ? '197px' : '155px'}
                              isDesktop={isDesktop}
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
              {props.data?.map((datas, i) => {
                return (
                  <Box key={i} data-testid="list-latest">
                    <CardLandscapeTag
                      data={{
                        sub_category: datas.sub_category,
                        title: datas.title,
                        author: datas.author,
                        cover: datas.cover,
                        release_date: datas.release_date,
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
