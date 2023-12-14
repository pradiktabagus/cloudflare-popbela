import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Container, Grid, GridItem } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import { useGetExclusiveSection } from '@/adapters/hooks/components';
import type {
  CardMobileProps,
  CardPotraitProps,
  CustomSLiderProps,
  HeadingVariantProps,
} from '@/components';
import { type TScriptGA, trackerArticles } from '@/containers/detail/Scripts';
import type { DeviceViewProps } from '@/types/device';
import type { ResponseArticle } from '@/types/responses/article';
import type { ResponseExclusive } from '@/types/responses/components/exclusive';

const beforeAfterStyle = {
  bgColor: '#bbb',
  content: '""',
  display: 'inline-block',
  height: '1px',
  pos: 'relative',
  width: '50%',
};

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const CardMobilePotrait = dynamic<CardMobileProps>(() =>
  import('@/components/Cards/CardMobilePotrait').then(
    (mod) => mod.CardMobilePotrait
  )
);
const CardPotrait = dynamic<CardPotraitProps>(() =>
  import('@/components/Cards/CardPotrait').then((mod) => mod.CardPotrait)
);
const CustomSlider = dynamic<CustomSLiderProps>(() =>
  import('@/components/Slider').then((mod) => mod.CustomSlider)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading/HeadingVariant').then(
    (mod) => mod.HeadingVariant
  )
);
const SkeletonExclusive = dynamic(
  () => import('@/components/Skeleton/Exclusive')
);
export type SectionExclusiveProps = {
  articles?: ResponseArticle[];
  containerProps?: ContainerProps;
  ssr?: boolean;
  article?: TScriptGA;
} & DeviceViewProps;

export const SectionExclusive = ({
  isDesktop = true,
  containerProps,
  article,
}: SectionExclusiveProps) => {
  const { data, isFetching } = useGetExclusiveSection<ResponseExclusive>({
    end_point: '/article/exclusive',
    version: 'v2',
  });
  if (isFetching)
    return (
      <Container maxW="1145px" px={isDesktop ? '1rem' : '0px'}>
        <SkeletonExclusive
          dataDummy={isDesktop ? [1, 2, 3, 4] : [1]}
          isDesktop={isDesktop}
        />
      </Container>
    );
  return (
    <ContainerSection {...containerProps}>
      <Box
        as="section"
        w="full"
        bg={isDesktop ? 'black' : 'transparent'}
        data-testid="section-exclusive"
        id="exclusive-article"
      >
        <Container maxW="1145px" px={isDesktop ? '1rem' : '0px'}>
          <HeadingVariant
            variant="section"
            textAlign="center"
            pb={isDesktop ? '25px' : '15px'}
            pt={isDesktop ? '45px' : 0}
            mx={isDesktop ? '0px' : '15px'}
            _before={{
              ...beforeAfterStyle,
              right: '0.5em',
              ml: '-50%',
            }}
            _after={{
              ...beforeAfterStyle,
              left: '0.5em',
              mr: '-50%',
            }}
            overflow="hidden"
            fontSize={isDesktop ? '30px' : '24px'}
          >
            Exclusive
          </HeadingVariant>
          <Fragment>
            {isDesktop ? (
              <Grid templateColumns="repeat(4, 1fr)" columnGap="30px">
                {data?.data.map((item: any, index: number) => (
                  <GridItem key={item.article_url} className="exclusive-item">
                    <CardPotrait
                      trackerCallbacks={
                        article
                          ? () =>
                              trackerArticles({
                                article,
                                position: index + 1,
                                destination: item.article_url,
                                section: `Exclusive`,
                              })
                          : () => null
                      }
                      data={item}
                      background="black"
                      heightimg="307px"
                      paddingdesc="15px 0"
                      titlecolor="white"
                      h={{ base: '550px', md: '510px' }}
                      authorDateProps={{
                        mt: 'auto',
                      }}
                      mb="50px"
                      loadingImg="lazy"
                    />
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <CustomSlider
                withDefaultResponsive={true}
                slidesToShow={3}
                slidesToScroll={1}
                withMargin={false}
                autoplay
                autoplaySpeed={5000}
              >
                {data?.data.map((item: any, i: number) => (
                  <Box key={item.article_url + i} className="exclusive-item">
                    <CardMobilePotrait
                      trackerCallbacks={
                        article
                          ? () =>
                              trackerArticles({
                                article,
                                position: i + 1,
                                destination: item.article_url,
                                section: `Exclusive`,
                              })
                          : () => null
                      }
                      data={item}
                    />
                  </Box>
                ))}
              </CustomSlider>
            )}
          </Fragment>
        </Container>
      </Box>
    </ContainerSection>
  );
};
