import { Box, Center, Container, Flex, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import { useInfinitySearch } from '@/adapters/hooks/components';
import type { ImageLoaderProps } from '@/components/Images';
import type { DeviceViewProps } from '@/types';
import type { CardOptionProps } from '@/types/card';
import type { Category } from '@/types/category';
import type { SearchResponse } from '@/types/responses/search';

const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const ContainerSearchDefaultPopup = dynamic(() =>
  import('@/components/ContainerSearch').then(
    (mod) => mod.ContainerSearchDefaultPopup
  )
);
const ContainerSearchNotFound = dynamic(() =>
  import('@/components/ContainerSearch').then(
    (mod) => mod.ContainerSearchNotFound
  )
);
const ButtonLoadMore = dynamic(() =>
  import('@/components/Buttons/ButtonLoadMore').then(
    (mod) => mod.ButtonLoadMore
  )
);
const CardLandscape = dynamic<CardOptionProps>(() =>
  import('@/components/Cards/CardLandscape').then((mod) => mod.CardLandscape)
);
const SearchBarPopup = dynamic(() =>
  import('@/components/SearchBar').then((mod) => mod.SearchBarPopup)
);
const SearchCategory = dynamic(() =>
  import('@/components/SearchCategory').then((mod) => mod.SearchCategory)
);
export type SearchContainerPopupProps = {
  categories: Category[];
} & DeviceViewProps;

export const SearchContainerPopUp = ({
  isMobile,
  categories,
}: SearchContainerPopupProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const {
    refetch,
    data,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinitySearch({
    keyword,
    url: 'search',
  });
  useEffect(() => {
    if (keyword !== '') {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  return (
    <Container maxW="full" data-testid="search-container">
      {isMobile ? (
        <Box height="calc(100vh - 48px)" data-testid="search-mobile">
          <div className="py-6">
            <SearchBarPopup
              keyword={keyword}
              onSubmitSearch={() => {}}
              onSearch={(e) => setKeyword(e)}
            />
          </div>
          {data?.pages[0].length === 0 && (
            <>
              <SearchCategory listcategory={categories} />
              <Box width="100%" height="1px" borderBottom="1px solid #bbb" />
            </>
          )}
          {isLoading ? (
            <>
              <SearchCategory listcategory={categories} />
              <Box width="100%" height="1px" borderBottom="1px solid #bbb" />
              <Center width="100%" marginTop="20px" data-testid="image-loader">
                <ImageLoader
                  alt="Loader"
                  src="/v3/assets/images/global/loader.gif"
                  width={45}
                  height={45}
                />
              </Center>
            </>
          ) : (
            <>
              {data?.pages[0].length > 0 ? (
                <div>
                  {isSuccess &&
                    data?.pages.map((dataPage, i) => {
                      return (
                        <React.Fragment key={i}>
                          {dataPage?.map((item: SearchResponse, j: number) => {
                            const articleComp = (
                              itemArticle: SearchResponse
                            ) => {
                              return (
                                <Box key={j} data-testid="list-search">
                                  <CardLandscape
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
                                  />
                                </Box>
                              );
                            };
                            return articleComp(item);
                          })}
                        </React.Fragment>
                      );
                    })}
                  {hasNextPage && (
                    <Flex
                      data-testid="section-load-more-search"
                      flexDirection="row"
                      justifyContent="center"
                      marginTop="1rem"
                    >
                      <ButtonLoadMore
                        data-testid="button-load-more-search"
                        isLoading={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                      />
                    </Flex>
                  )}
                </div>
              ) : (
                <>
                  <Center
                    marginBottom="20px"
                    marginTop="20px"
                    data-testid={
                      keyword !== '' && data?.pages[0].length === 0
                        ? 'not-found.png'
                        : 'empty-search.png'
                    }
                  >
                    <ImageLoader
                      alt="Logo Popbela"
                      src={`/v3/assets/images/global/${
                        keyword !== '' && data?.pages[0].length === 0
                          ? 'not-found.png'
                          : 'empty-search.png'
                      }`}
                      height={160}
                      width={209}
                    />
                  </Center>
                  <Box
                    width="100%"
                    height="1px"
                    borderBottom="1px solid #bbb"
                  />
                  {keyword !== '' && data?.pages[0].length === 0 && (
                    <Flex
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      textAlign="center"
                      data-testid="data-not-found"
                    >
                      <Text
                        color="title"
                        fontWeight="700"
                        fontSize="40px"
                        fontFamily="bahijMitra"
                        textAlign="center"
                      >
                        Ooops...
                      </Text>
                      <Text
                        fontFamily="bahijMitra"
                        fontSize="18px"
                        color="#646464"
                        textAlign="center"
                      >
                        {"We don't find anything to match your keyword."}
                        <br />
                        Please try another one.
                      </Text>
                    </Flex>
                  )}
                  <Center marginTop="20px">
                    <ImageLoader
                      alt="Logo Popbela"
                      src="/v3/assets/images/global/logo.png"
                      width={90}
                      height={21}
                    />
                  </Center>
                </>
              )}
            </>
          )}
        </Box>
      ) : (
        <div data-testid="search-desktop">
          <SearchBarPopup
            onSubmitSearch={() => {}}
            keyword={keyword}
            onSearch={(e) => setKeyword(e)}
          />
          <Box
            background="white"
            marginTop="20px"
            overflowY="auto"
            maxH="calc(100vh - 187px)"
          >
            <Box minHeight="200px" overflow="hidden" padding="15px">
              <div>
                {isLoading && (
                  <Center width="100%" data-testid="image-loader">
                    <ImageLoader
                      alt="Loader"
                      src="/v3/assets/images/global/loader.gif"
                      width={65}
                      height={65}
                    />
                  </Center>
                )}
                {isSuccess &&
                  data?.pages.map((dataPage, i) => {
                    return (
                      <React.Fragment key={i}>
                        {dataPage?.map((item: SearchResponse, j: number) => {
                          const articleComp = (itemArticle: SearchResponse) => {
                            return (
                              <Box key={j} data-testid="list-search">
                                <CardLandscape
                                  data={{
                                    sub_category: itemArticle.sub_category,
                                    title: itemArticle.title,
                                    author: itemArticle.author,
                                    cover: itemArticle.cover,
                                    release_date: itemArticle.release_date,
                                    article_url: itemArticle.article_url,
                                  }}
                                  widthimg="250px"
                                  heightimg="160px"
                                  loadingImg="lazy"
                                />
                              </Box>
                            );
                          };
                          return articleComp(item);
                        })}
                      </React.Fragment>
                    );
                  })}
                {hasNextPage && (
                  <Flex
                    data-testid="section-load-more-search"
                    flexDirection="row"
                    justifyContent="center"
                    marginTop="1rem"
                  >
                    <ButtonLoadMore
                      data-testid="button-load-more-search"
                      isLoading={isFetchingNextPage}
                      onClick={() => fetchNextPage()}
                    />
                  </Flex>
                )}
                {keyword !== '' && data?.pages[0].length === 0 && (
                  <ContainerSearchNotFound />
                )}
                {!isLoading && keyword === '' && (
                  <ContainerSearchDefaultPopup />
                )}
              </div>
            </Box>
          </Box>
        </div>
      )}
    </Container>
  );
};
