import { Image } from '@chakra-ui/image';
import { Box, Center, Flex, Grid } from '@chakra-ui/layout';
import { Fragment } from 'react';

import { useInfinityGeneralPages } from '@/adapters/hooks/pages';
import type { ResponseArticle } from '@/types/responses/article';
import type { TrendingArticleProps } from '@/types/section/trending';

import { Button } from '../Buttons';
import { CardLandscape, CardPotrait } from '../Cards';

export const TrendingArticle = ({
  isDesktop,
  limit = 6,
}: TrendingArticleProps) => {
  const {
    data,
    isSuccess,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfinityGeneralPages({
    url: '/page/trending',
    type: 'trendings',
    limit,
    retry: false,
    version: 'v2',
  });
  return (
    <Box data-testid="trending-article">
      {isFetching && isLoading && (
        <Box minHeight="200px" overflow="hidden" padding="15px">
          <div>
            <Center width="100%" data-testid="image-loader">
              <Image
                alt="Loader"
                src="/v3/assets/images/global/loader.gif"
                width={65}
                height={65}
              />
            </Center>
          </div>
        </Box>
      )}
      <Grid
        templateColumns={isDesktop ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)'}
        gap="10px 54px"
      >
        {isSuccess &&
          data?.pages.map((dataPage, i) => {
            return (
              <Fragment key={i}>
                {dataPage?.trendings?.map(
                  (item: ResponseArticle, j: number) => {
                    const articleComp = (itemArticle: ResponseArticle) => {
                      return (
                        <Box key={j} data-testid="list-trending-article">
                          {isDesktop ? (
                            <CardPotrait
                              data={itemArticle}
                              heightimg="229px"
                              paddingdesc="15px 10px"
                              widthSponsored={30}
                              heightSponsored={50}
                              loadingImg="lazy"
                            />
                          ) : (
                            <CardLandscape
                              data={itemArticle}
                              widthimg="130px"
                              heightimg="155px"
                              widthSponsored={30}
                              heightSponsored={50}
                              loadingImg="lazy"
                            />
                          )}
                        </Box>
                      );
                    };
                    return articleComp(item);
                  }
                )}
              </Fragment>
            );
          })}
      </Grid>
      {hasNextPage && (
        <Flex
          data-testid="section-load-more-trending"
          flexDirection="row"
          justifyContent="center"
          paddingBottom="84px"
        >
          <Button
            className="mt-9 py-1 text-base text-primary"
            data-testid="button-load-more-trending"
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Box>
  );
};
