import type { ButtonProps } from '@chakra-ui/button';
import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { useGetLatest } from '@/adapters/hooks/components';
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
export const SectionLatestBottom = (props: LatestProps) => {
  const { isDesktop = true, containerProps } = props;
  const router = useRouter();
  const { category } = router.query;
  const {
    data,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useGetLatest({
    end_point: `/component/latest-article?category=${
      props.category ? props.category : category
    }`,
    version: 'v2',
  });
  return (
    <ContainerSection {...containerProps}>
      <section data-testid="section-latest-bottom">
        <Grid
          templateColumns={isDesktop ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)'}
          gap={isDesktop ? '14px' : '10px'}
        >
          {isSuccess &&
            !isLoading &&
            data?.pages.map((dataPage, i) => {
              return (
                <Fragment key={i}>
                  {dataPage?.data.map((item: ResponseLatest, j: number) => {
                    const articleComp = (itemArticle: ResponseLatest) => {
                      return (
                        <Box
                          key={itemArticle.title}
                          data-testid="list-latest-bottom"
                        >
                          <CardLandscape
                            csc={itemArticle.flag === 'csc'}
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
                            widthSponsored="25px"
                            heightSponsored="40px"
                            loadingImg="lazy"
                          />
                        </Box>
                      );
                    };
                    if (i === 0 && j < 12) {
                      return null;
                    }
                    return articleComp(item);
                  })}
                </Fragment>
              );
            })}
        </Grid>
        {hasNextPage && (
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
