import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Grid, GridItem } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useTrendingObserver } from '@/adapters/hooks/useTrendingObserver';
import type {
  BreadcrumbProps,
  HeadingVariantProps,
  TabNavigationProps,
} from '@/components';
import type {
  HeadlineProps,
  NowOnPopbelaProps,
  SectionExclusiveProps,
  SectionPopCreatorProps,
  TrendingProps,
} from '@/sections';
import type { DeviceViewProps } from '@/types';
import type { TAdProps, TadsSlot } from '@/types/ads';
import type { LatestProps } from '@/types/latest';
import type { CategoryPageResponse } from '@/types/responses/pages/category';
import clsxm from '@/utils/clsxm';

export type TCategory = DeviceViewProps & {
  data: CategoryPageResponse;
};
const AdsLeaderboard = dynamic<TAdProps>(() =>
  import('@/components/Ads/Leaderboard/index').then((ads) => ads.AdsLeaderboard)
);
const AdsMr1 = dynamic<TAdProps>(() =>
  import('@/components/Ads/MR/mr1').then((ads) => ads.AdsMr1)
);
const AdsMr2 = dynamic<TAdProps>(() =>
  import('@/components/Ads/MR/mr2').then((ads) => ads.AdsMr2)
);
const AdsInfeed1 = dynamic<TAdProps>(() =>
  import('@/components/Ads/Infeed/infeed1').then((ads) => ads.AdsInfeed1)
);
const AdsInfeed2 = dynamic<TAdProps>(() =>
  import('@/components/Ads/Infeed/infeed2').then((ads) => ads.AdsInfeed2)
);
const AdsInfeed3 = dynamic<TAdProps>(() =>
  import('@/components/Ads/Infeed/infeed3').then((ads) => ads.AdsInfeed3)
);
const AdsSticky = dynamic<TadsSlot>(() =>
  import('@/components/Ads/Sticky/index').then((ads) => ads.AdsSticky)
);
const AdsSkinLeft = dynamic<TAdProps>(() =>
  import('@/components/Ads/Skin/left').then((ads) => ads.AdsSkinLeft)
);
const AdsSkinRight = dynamic<TAdProps>(() =>
  import('@/components/Ads/Skin/right').then((ads) => ads.AdsSkinRight)
);
const SectionHeadline = dynamic<HeadlineProps>(() =>
  import('@/sections/Headline').then((sec) => sec.SectionHeadline)
);
const SectionLatest = dynamic<LatestProps>(() =>
  import('@/sections/Latest/category').then((sec) => sec.SectionLatestCategory)
);
const SectionTrending = dynamic<TrendingProps>(() =>
  import('@/sections/Trending').then((mod) => mod.SectionTrending)
);
const SectionExclusive = dynamic<SectionExclusiveProps>(() =>
  import('@/sections/Exclusive').then((mod) => mod.SectionExclusive)
);
const SectionNowOnPopbela = dynamic<NowOnPopbelaProps>(() =>
  import('@/sections/NowOnPopbela').then((mod) => mod.SectionNowOnPopbela)
);
const SectionPopCreator = dynamic<SectionPopCreatorProps>(() =>
  import('@/sections/PopCreator').then((mod) => mod.SectionPopCreator)
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container/index').then((mod) => mod.ContainerSection)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading/HeadingVariant/index').then(
    (mod) => mod.HeadingVariant
  )
);
const TabNavigation = dynamic<TabNavigationProps>(() =>
  import('@/components/TabNavigation/index').then((mod) => mod.TabNavigation)
);
const Breadcrumb = dynamic<BreadcrumbProps>(() =>
  import('@/components/Breadcrumb/index').then((cmp) => cmp.Breadcrumb)
);
const Category = ({ isMobile, isDesktop, data }: TCategory) => {
  const router = useRouter();
  const { category } = router.query;
  const { pos } = useTrendingObserver();
  return (
    <>
      <AdsLeaderboard
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="category-leaderboard"
      />
      <ContainerSection>
        <Breadcrumb
          paths={[
            { title: 'Home', link: '/' },
            {
              title: data?.meta?.name ?? '',
              isCurrentPage: true,
            },
          ]}
          py="8px"
        />
      </ContainerSection>
      <ContainerSection>
        <Box as="nav" w="full" mb={isDesktop ? '30px' : '12px'}>
          <h1 className="seo">{data?.meta?.meta}</h1>
          <HeadingVariant
            variant="category"
            textTransform="uppercase"
            m={isDesktop ? '35px auto' : '10px auto 15px'}
            textAlign="center"
            fontSize={isDesktop ? '18px' : '14px'}
            fontWeight={isDesktop ? 500 : 400}
          >
            {data?.meta?.name}
          </HeadingVariant>

          <Box w="full" overflowY="hidden" h="25px">
            <TabNavigation
              tabs={[
                {
                  url: data?.meta?.category_url ?? '',
                  name: 'all',
                  active: true,
                },
                ...(data?.sub_category?.map((cate) => ({
                  url: cate.category_url,
                  name: cate.name,
                })) || []),
              ]}
            />
          </Box>
        </Box>
      </ContainerSection>
      <SectionHeadline
        containerProps={{
          px: isDesktop ? '15px' : 0,
        }}
        data={data?.headline}
        imageHeight="229px"
        headingTitle="h3"
        isDesktop={isDesktop}
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
              <SectionLatest
                isDesktop={isDesktop}
                category={category}
                titleLatest={data?.meta?.name}
                backgroundCard="white"
              />
            </GridItem>
            <GridItem
              colSpan={isDesktop ? 4 : 1}
              order={isDesktop ? 2 : 1}
              display="flex"
              flexDirection="column"
            >
              <Box
                className={clsxm(
                  'lg:sticky',
                  pos === 'top' && 'lg:top-[113px]',
                  pos === 'bottom' && 'mt-auto lg:bottom-0'
                )}
              >
                <AdsMr1
                  isMobile={isMobile}
                  isDesktop={isDesktop}
                  key="category-mr-1"
                />

                <SectionTrending
                  data={data?.trending ?? []}
                  isDesktop={isDesktop}
                  classNameSection="bg-white"
                  ssr={false}
                />
                <AdsMr2
                  isMobile={isMobile}
                  isDesktop={isDesktop}
                  key="category-mr-2"
                />
              </Box>
            </GridItem>
          </Grid>
        </section>
      </ContainerSection>
      <AdsInfeed1
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="category-infeed-1"
      />

      <Box h={isDesktop ? 0 : '25px'} />
      <SectionExclusive
        containerProps={{
          maxW: 'full',
          px: 0,
          mb: isDesktop ? '20px' : '25px',
        }}
        articles={data?.exclusive_interview}
        isDesktop={isDesktop}
        ssr={false}
      />
      <AdsInfeed2
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="category-infeed-2"
      />
      {isDesktop && (
        <SectionNowOnPopbela
          data={data?.now_on_popbela ?? []}
          isDesktop={isDesktop}
        />
      )}
      <SectionPopCreator
        containerProps={{
          mb: { base: '25px', md: '30px' },
          mt: { md: '40px' },
          paddingInlineStart: 0,
          paddingInlineEnd: 0,
        }}
        data={data?.popcreator_of_the_month}
        ssr={false}
      />
      <AdsInfeed3
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="category-infeed-3"
      />
      <AdsSticky key="category-sticky" />
      <AdsSkinLeft
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="category-skin-left"
      />
      <AdsSkinRight
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="category-skin-right"
      />
    </>
  );
};
export default Category;
