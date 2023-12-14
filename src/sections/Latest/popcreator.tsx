import type { ButtonProps } from '@chakra-ui/button';
import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import { useInfinityPopCreator } from '@/adapters/hooks/components';
import type { ImageLoaderProps } from '@/components';
import type { CardProps } from '@/types/card';
import type { LatestPopCreatorProps } from '@/types/latest';
import type { ResponsePopcreators } from '@/types/section/popcreators';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const ButtonLoadMore = dynamic<ButtonProps>(() =>
  import('@/components/Buttons/ButtonLoadMore').then(
    (mod) => mod.ButtonLoadMore
  )
);
const CardCreator = dynamic<CardProps>(() =>
  import('@/components/Cards/CardCreator').then((mod) => mod.CardCreator)
);
export const SectionLatestPopCreator = ({
  isDesktop,
  containerProps,
  ...props
}: LatestPopCreatorProps) => {
  const {
    data,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useInfinityPopCreator({
    url: `/popcreator?type=all`,
  });

  return (
    <ContainerSection {...containerProps}>
      <section data-testid="section-latest" className="mb-[15px] pt-4">
        <Box
          marginTop="1rem"
          marginBottom="1rem"
          width="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            height={{ sm: '35px', lg: '59px' }}
            width={{ sm: 'full', lg: '244px' }}
            position="relative"
            as="h2"
          >
            <ImageLoader
              data-testid="logo-popcreator"
              fill
              alt="popcreator"
              className="object-contain"
              src={'/v3/assets/images/global/logo-popcreator-medium.svg'}
              loading="lazy"
            />
          </Box>
        </Box>
        <hr className="mb-5" />
        <Grid
          templateColumns={isDesktop ? 'repeat(5, 1fr)' : 'repeat(1, 1fr)'}
          gap="10px"
        >
          {isSuccess && !isLoading ? (
            data?.pages.map((dataPage, i) => {
              return (
                <Fragment key={i}>
                  {dataPage?.popcreators.map(
                    (item: ResponsePopcreators, j: number) => {
                      const articleComp = (
                        itemArticle: ResponsePopcreators
                      ) => {
                        return (
                          <Box key={j} data-testid="list-latest">
                            <CardCreator
                              data={{
                                url: `/popcreators${itemArticle.popcreator_url}`,
                                src: itemArticle.avatar2,
                                blurSrc: itemArticle.avatar,
                                author: itemArticle.name,
                                date: itemArticle.period,
                              }}
                              widthimg={isDesktop ? '133px' : '130px'}
                              heightimg={isDesktop ? '197px' : '155px'}
                              loadingImg="lazy"
                              marginBottom="2"
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
              {props.data?.map((item, i) => {
                return (
                  <Box key={i} data-testid="list-latest">
                    <CardCreator
                      data={{
                        url: `/popcreators${item.popcreator_url}`,
                        src: item.avatar2,
                        blurSrc: item.avatar,
                        author: item.name,
                        date: item.period,
                      }}
                      widthimg={isDesktop ? '133px' : '130px'}
                      heightimg={isDesktop ? '197px' : '155px'}
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
