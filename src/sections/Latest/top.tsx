import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { useGetLatest } from '@/adapters/hooks/components';
import type { CardPotraitProps, HeadingVariantProps } from '@/components';
import type { CardOptionProps } from '@/types/card';
import type { LatestProps } from '@/types/latest';
import type { ResponseLatest } from '@/types/section/latest';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
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
export const SectionLatestTop = (props: LatestProps) => {
  const { isDesktop = true, containerProps, titleLatest } = props;
  const router = useRouter();
  const { category } = router.query;
  const { data, isFetching, isFetchingNextPage } = useGetLatest({
    end_point: `/component/latest-article?category=${
      props.category || category
    }`,
    version: 'v2',
  });
  return (
    <ContainerSection {...containerProps}>
      <Box as="section" data-testid="section-latest-top">
        <HeadingVariant
          data-testid="title-section-now-on-popbela"
          variant="section"
          fontSize={isDesktop ? '25px' : '24px'}
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
          {titleLatest || (category ? `Latest from ${category}` : 'The Latest')}
        </HeadingVariant>
        <Box>
          <Grid
            templateColumns={isDesktop ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
            gap="10px 54px"
          >
            {isFetching && !isFetchingNextPage ? (
              <SkeletonLatestCategory
                dataDummy={[1, 2, 3, 4]}
                isDesktop={isDesktop}
              />
            ) : (
              data?.pages?.map((dataPage, i) => {
                return (
                  <Fragment key={i}>
                    {dataPage?.data?.map((item: ResponseLatest, j: number) => {
                      const articleComp = (itemArticle: ResponseLatest) => {
                        if (j > 11) return null;
                        return (
                          <Box
                            key={itemArticle.title}
                            data-testid="list-latest-top"
                          >
                            {isDesktop ? (
                              <CardPotrait
                                data={itemArticle}
                                heightimg="229px"
                                paddingdesc="15px 10px"
                                csc={itemArticle.flag === 'csc'}
                                widthSponsored={30}
                                heightSponsored={50}
                                loadingImg="lazy"
                              />
                            ) : (
                              <CardLandscape
                                data={itemArticle}
                                widthimg="130px"
                                heightimg="155px"
                                csc={itemArticle.flag === 'csc'}
                                widthSponsored={30}
                                heightSponsored={50}
                                loadingImg="lazy"
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
        </Box>
      </Box>
    </ContainerSection>
  );
};
