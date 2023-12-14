import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Grid, GridItem, VStack } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { useTrendingObserver } from '@/adapters/hooks/useTrendingObserver';
import type {
  HeadlineProps,
  NowOnPopbelaProps,
  SectionExclusiveProps,
  SectionHoroscopeProps,
  SectionPopCreatorProps,
  TrendingProps,
} from '@/sections';
import type { DeviceViewProps } from '@/types';
import type { TAdProps, TadsSlot } from '@/types/ads';
import type { LatestProps } from '@/types/latest';
import type { IHomepage } from '@/types/responses/pages/homepage';
import clsxm from '@/utils/clsxm';

const AdsLeaderboard = dynamic<TAdProps>(() =>
  import('@/components/Ads/Leaderboard/index').then((mod) => mod.AdsLeaderboard)
);
const AdsInfeed1 = dynamic<TAdProps>(() =>
  import('@/components/Ads/Infeed/infeed1').then((mod) => mod.AdsInfeed1)
);
const AdsMr1 = dynamic<TAdProps>(() =>
  import('@/components/Ads/MR/mr1').then((mod) => mod.AdsMr1)
);
const AdsMr2 = dynamic<TAdProps>(() =>
  import('@/components/Ads/MR/mr2').then((mod) => mod.AdsMr2)
);
const AdsInfeed2 = dynamic<TAdProps>(() =>
  import('@/components/Ads/Infeed/infeed2').then((mod) => mod.AdsInfeed2)
);
const AdsInfeed3 = dynamic<TAdProps>(() =>
  import('@/components/Ads/Infeed/infeed3').then((mod) => mod.AdsInfeed3)
);
const AdsSticky = dynamic<TadsSlot>(() =>
  import('@/components/Ads/Sticky/index').then((mod) => mod.AdsSticky)
);
const AdsSkinLeft = dynamic<TAdProps>(() =>
  import('@/components/Ads/Skin/left').then((mod) => mod.AdsSkinLeft)
);
const AdsSkinRight = dynamic<TAdProps>(() =>
  import('@/components/Ads/Skin/right').then((mod) => mod.AdsSkinRight)
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container/index').then(
    (component) => component.ContainerSection
  )
);
const SectionSeo = dynamic<any>(() => import('./HeadingSeo'));
const SectionHeadline = dynamic<HeadlineProps>(() =>
  import('@/sections/Headline').then((sec) => sec.SectionHeadline)
);
const SectionNowOnPopbela = dynamic<NowOnPopbelaProps>(() =>
  import('@/sections/NowOnPopbela').then((sec) => sec.SectionNowOnPopbela)
);
const SectionExclusive = dynamic<SectionExclusiveProps>(() =>
  import('@/sections/Exclusive').then((sec) => sec.SectionExclusive)
);
const SectionTrending = dynamic<TrendingProps>(() =>
  import('@/sections/Trending').then((sec) => sec.SectionTrending)
);
const SectionHoroscope = dynamic<SectionHoroscopeProps>(() =>
  import('@/sections/Horoscope').then((sec) => sec.SectionHoroscope)
);
const SectionLatestTop = dynamic<LatestProps>(() =>
  import('@/sections/Latest/top').then((sec) => sec.SectionLatestTop)
);
const SectionLatestBottom = dynamic<LatestProps>(() =>
  import('@/sections/Latest/bottom').then((sec) => sec.SectionLatestBottom)
);
const SectionPopCreator = dynamic<SectionPopCreatorProps>(() =>
  import('@/sections/PopCreator').then((sec) => sec.SectionPopCreator)
);
export type THomepage = DeviceViewProps & {
  data: IHomepage;
};

const Homepage = (props: THomepage) => {
  const { isDesktop, isMobile, data } = props;
  const { pos } = useTrendingObserver();
  return (
    <>
      <SectionSeo />
      <AdsLeaderboard
        isDesktop={isDesktop}
        isMobile={isMobile}
        key="homepage-leaderboard"
      />
      <SectionHeadline
        data={data?.headline}
        containerProps={{
          maxW: isDesktop ? '1145px' : 'full',
          px: isDesktop ? '1rem' : 0,
        }}
        isDesktop={isDesktop}
        isMobile={isMobile}
      />
      {isDesktop && (
        <SectionNowOnPopbela
          data={data?.now_on_popbela ?? []}
          containerProps={{ px: isMobile ? 0 : '1rem' }}
          isDesktop={isDesktop}
          isMobile={isMobile}
        />
      )}
      <AdsInfeed1
        key="homepage-infeed-1"
        isDesktop={isDesktop}
        isMobile={isMobile}
      />
      <Box h={{ base: '25px', md: 0 }} />
      <SectionExclusive
        articles={data?.exclusive_interview}
        containerProps={{
          mb: { base: '25px', md: '20px' },
          maxW: 'full',
          px: 0,
        }}
        isDesktop={isDesktop}
        isMobile={isMobile}
        ssr={false}
      />
      <ContainerSection width={isDesktop ? '1145px' : 'full'} px={0}>
        <section data-testid="section-news-top" className="mb-5">
          <Grid
            templateColumns={isDesktop ? 'repeat(12, 1fr)' : 'repeat(1, 1fr)'}
            gap="26px"
            className={isDesktop ? 'mb-5' : 'mb-[10px]'}
            position="relative"
          >
            <GridItem colSpan={isDesktop ? 8 : 1} order={isDesktop ? 1 : 2}>
              <SectionLatestTop
                data={data?.latest}
                isDesktop={isDesktop}
                isMobile={isMobile}
                category="all"
              />
            </GridItem>
            <GridItem
              colSpan={isDesktop ? 4 : 1}
              order={isDesktop ? 2 : 1}
              display="flex"
              flexDirection="column"
            >
              <VStack position={{ base: 'unset', lg: 'relative' }} flex="1">
                <Box
                  className={clsxm(
                    'lg:sticky w-full',
                    pos === 'top' && 'lg:top-[113px]',
                    pos === 'bottom' && 'mt-auto lg:bottom-0'
                  )}
                >
                  <AdsMr1
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    key="homepage-mr-1"
                  />
                  <SectionTrending
                    containerProps={{ px: isDesktop ? '1rem' : 0 }}
                    data={data?.trending}
                    classNameSection="bg-white"
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    ssr={false}
                  />
                  <AdsMr2
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    key="homepage-mr-2"
                  />
                  <SectionHoroscope
                    containerProps={{ px: isDesktop ? '1rem' : 0 }}
                    horoscopes={data?.horoscopes}
                    currentHoroscope={data?.current_horoscope}
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    ssr={false}
                  />
                  {isMobile && (
                    <AdsInfeed2
                      key="homepage-infeed-2"
                      isDesktop={isDesktop}
                      isMobile={isMobile}
                    />
                  )}
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </section>
      </ContainerSection>
      {isDesktop && (
        <AdsInfeed2
          isMobile={isMobile}
          isDesktop={isDesktop}
          key="homepage-infeed-2"
        />
      )}
      <SectionLatestBottom
        isDesktop={isDesktop}
        isMobile={isMobile}
        category="all"
      />
      <SectionPopCreator
        containerProps={{
          px: 0,
          mb: { base: '25px', md: '30px' },
          mt: { md: '40px' },
          paddingInlineStart: 0,
          paddingInlineEnd: 0,
        }}
        data={data?.popcreator_of_the_month}
        ssr={false}
      />
      <AdsInfeed3
        key="homepage-infeed-3"
        isDesktop={isDesktop}
        isMobile={isMobile}
      />
      <AdsSticky key="homepage-sticky" />
      <AdsSkinLeft
        isDesktop={isDesktop}
        isMobile={isMobile}
        key="homepage-skin-left"
      />
      <AdsSkinRight
        isDesktop={isDesktop}
        isMobile={isMobile}
        key="homepage-skin-right"
      />
    </>
  );
};
export default Homepage;
