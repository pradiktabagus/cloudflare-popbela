import { Box, Center, Container, Flex, Grid, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

import { useInfinityGeneralPages } from '@/adapters/hooks/pages';
import type { DeviceViewProps } from '@/types';
import type { Category } from '@/types/category';
import type {
  SearchPagination,
  SearchResponse,
} from '@/types/responses/search';

import type { ButtonProps } from '../Buttons';
import type { ImageLoaderProps } from '../Images';

const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('../Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const Button = dynamic<ButtonProps>(() =>
  import('../Buttons').then((mod) => mod.Button)
);
const CardLandscape = dynamic(() =>
  import('../Cards').then((mod) => mod.CardLandscape)
);
const CardPotrait = dynamic(() =>
  import('../Cards').then((mod) => mod.CardPotrait)
);
const ContainerSearchDefault = dynamic(() =>
  import('../ContainerSearch').then((mod) => mod.ContainerSearchDefault)
);
const ContainerSearchNotFound = dynamic(() =>
  import('../ContainerSearch').then((mod) => mod.ContainerSearchNotFound)
);
const SearchBar = dynamic(() =>
  import('../SearchBar').then((mod) => mod.SearchBar)
);
const TrendingArticle = dynamic(() =>
  import('../TrendingArticle').then((mod) => mod.TrendingArticle)
);
export type SearchContainerProps = {
  categories: Category[];
} & DeviceViewProps;

export const SearchContainer = ({
  isMobile,
  isDesktop,
}: SearchContainerProps) => {
  const router = useRouter();
  const { q } = router.query;
  const [keyword, setKeyword] = useState<any>('');
  const [errorValidation, setErrorValidation] = useState<string>('');
  const {
    refetch,
    data,
    isFetching,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfinityGeneralPages({
    keyword,
    url: '/search',
    limit: 6,
    keywordCheck: true,
    type: 'search',
    version: 'v1',
  });

  useEffect(() => {
    if (keyword.length >= 3) {
      setErrorValidation('');
    }
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    if (q) {
      setKeyword(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const onSubmitSearching = (keywordValue: string) => {
    if (keywordValue.length < 3) {
      setErrorValidation('Minimum 3 characters in field search');
      router.push(``, undefined, { shallow: true });
      return;
    }
    setKeyword(keywordValue);
    router.push(`?q=${keywordValue}`, undefined, { shallow: true });
  };

  const NumberInfoPages = ({ loading }: { loading: boolean }): JSX.Element => {
    const { articles, pagination }: SearchPagination = data?.pages[0] || {};

    if (loading || !data?.pages[0]?.articles || errorValidation) return <></>;

    if (keyword !== '' && data?.pages[0]?.articles?.length === 0)
      return (
        <Text fontSize="14px" fontFamily="bahijMitra" color="#797D7F">
          Showing 0 results for &quot;
          {keyword}
          &quot;
        </Text>
      );
    return (
      <Text fontSize="14px" fontFamily="bahijMitra" color="#797D7F">
        Showing {articles?.length} of {pagination?.total_data} articles &quot;
        {keyword}&quot;
      </Text>
    );
  };

  const WarningKeywords = () => {
    if (!errorValidation) return <></>;
    return (
      <Text fontSize="14px" fontFamily="bahijMitra" color="#797D7F">
        {errorValidation}
      </Text>
    );
  };

  const LoadingIndicator = () => {
    return (
      <Box minHeight="200px" overflow="hidden" padding="15px">
        <Center width="100%" data-testid="image-loader">
          <ImageLoader
            alt="Loader"
            src="/v3/assets/images/global/loader.gif"
            width={65}
            height={65}
          />
        </Center>
      </Box>
    );
  };

  return (
    <Container
      maxW="1145px"
      marginBottom="30px"
      data-testid="search-container"
      background={isDesktop ? 'transparent' : 'white'}
    >
      <Box paddingY="10px">
        {isMobile ? (
          <Box data-testid="search-mobile">
            <div className="pb-4">
              <ContainerSearchDefault />
              <SearchBar keyword={keyword} onSubmitSearch={onSubmitSearching} />
              <NumberInfoPages loading={isFetching} />
              <WarningKeywords />
            </div>
          </Box>
        ) : (
          <Box data-testid="search-desktop">
            <Box marginY="30px" overflowY="auto">
              <ContainerSearchDefault isDesktop={isDesktop} />
              <Box paddingX="20%">
                <SearchBar
                  onSubmitSearch={onSubmitSearching}
                  keyword={keyword}
                />
                <NumberInfoPages loading={isFetching} />
                <WarningKeywords />
              </Box>
            </Box>
          </Box>
        )}{' '}
        {isFetching && <LoadingIndicator />}
        {keyword !== '' && data?.pages[0]?.articles?.length === 0 && (
          <ContainerSearchNotFound isDesktop={isDesktop} />
        )}
        {data?.pages[0]?.articles && data?.pages[0]?.articles?.length > 0 ? (
          <Grid
            templateColumns={isDesktop ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)'}
            gap="10px 54px"
          >
            {isSuccess &&
              data?.pages.map((dataPage, i) => {
                return (
                  <Fragment key={i}>
                    {dataPage?.articles?.map(
                      (item: SearchResponse, j: number) => {
                        const articleComp = (itemArticle: SearchResponse) => {
                          return (
                            <Box key={j} data-testid="list-search">
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
        ) : (
          <Box>
            <TrendingArticle limit={6} isDesktop={isDesktop} />
          </Box>
        )}
      </Box>
      {hasNextPage && (
        <Flex
          data-testid="section-load-more-search"
          flexDirection="row"
          justifyContent="center"
          marginTop="1rem"
          paddingBottom="84px"
        >
          <Button
            className="py-1 text-base text-primary"
            data-testid="button-load-more-search"
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Container>
  );
};
