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
  SectionExclusiveProps,
  SectionPopCreatorProps,
  TrendingProps,
} from '@/sections';
import type { DeviceViewProps } from '@/types';
import type { TAdProps, TadsSlot } from '@/types/ads';
import type { LatestProps } from '@/types/latest';
import type { CategoryPageResponse } from '@/types/responses/pages/category';
import clsxm from '@/utils/clsxm';

export type TSubCategory = DeviceViewProps & {
  data: CategoryPageResponse;
};

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading/HeadingVariant').then(
    (mod) => mod.HeadingVariant
  )
);
const TabNavigation = dynamic<TabNavigationProps>(() =>
  import('@/components/TabNavigation').then((mod) => mod.TabNavigation)
);
const SectionHeadline = dynamic<HeadlineProps>(() =>
  import('@/sections/Headline').then((sec) => sec.SectionHeadline)
);

const SectionExclusive = dynamic<SectionExclusiveProps>(() =>
  import('@/sections/Exclusive').then((sec) => sec.SectionExclusive)
);

const SectionPopCreator = dynamic<SectionPopCreatorProps>(() =>
  import('@/sections/PopCreator').then((sec) => sec.SectionPopCreator)
);
const SectionLatest = dynamic<LatestProps>(() =>
  import('@/sections/Latest/category').then((sec) => sec.SectionLatestCategory)
);
const SectionTrending = dynamic<TrendingProps>(() =>
  import('@/sections/Trending').then((sec) => sec.SectionTrending)
);
const AdsLeaderboard = dynamic<TAdProps>(() =>
  import('@/components/Ads/Leaderboard').then((ads) => ads.AdsLeaderboard)
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
  import('@/components/Ads/Sticky').then((ads) => ads.AdsSticky)
);
const AdsSkinLeft = dynamic<TAdProps>(() =>
  import('@/components/Ads/Skin/left').then((ads) => ads.AdsSkinLeft)
);
const AdsSkinRight = dynamic<TAdProps>(() =>
  import('@/components/Ads/Skin/right').then((ads) => ads.AdsSkinRight)
);
const Breadcrumb = dynamic<BreadcrumbProps>(() =>
  import('@/components/Breadcrumb').then((cmp) => cmp.Breadcrumb)
);
const SubCategory = ({ isDesktop, isMobile, data }: TSubCategory) => {
  const router = useRouter();
  const { pos } = useTrendingObserver();
  const { subCategory } = router.query;
  return (
    <>
      <AdsLeaderboard
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="sub-category-leaderboard"
      />
      <ContainerSection>
        <Breadcrumb
          paths={[
            { title: 'Home', link: '/' },
            {
              title: data?.meta?.parent_category?.name ?? '',
              link: data?.meta?.parent_category?.category_url ?? '',
            },
            {
              title: data?.meta?.name ?? '',
              isCurrentPage: true,
            },
          ]}
          py="8px"
        />
      </ContainerSection>
      <Box as="nav" w="full" mb={{ base: '12px', md: '30px' }}>
        <ContainerSection>
          <h1 className="seo">{data?.meta?.name}</h1>
          <HeadingVariant
            variant="category"
            textTransform="uppercase"
            m={{ base: '10px auto 15px', md: '35px auto' }}
            textAlign="center"
            fontSize={{ base: '14px', md: '18px' }}
            fontWeight={{ base: 400, md: 500 }}
          >
            {data?.meta?.name}
          </HeadingVariant>
          <Box w="full" overflowY="hidden" h="25px">
            <TabNavigation
              tabs={[
                {
                  url: data?.meta?.parent_category?.category_url ?? '',
                  name: 'all',
                },
                ...(data?.sub_category?.map((cate) => ({
                  url: cate.category_url,
                  name: cate.name,
                })) || []),
              ]}
              activeTabName={data?.meta?.name}
            />
          </Box>
        </ContainerSection>
      </Box>
      <SectionHeadline
        containerProps={{
          px: isDesktop ? '15px' : 0,
        }}
        isDesktop={isDesktop}
        data={data?.headline}
        imageHeight="229px"
      />
      <ContainerSection width={isDesktop ? '1145px' : 'full'} px={0}>
        <Grid
          templateColumns={isDesktop ? 'repeat(12, 1fr)' : 'repeat(1, 1fr)'}
          gap="26px"
          className={isDesktop ? 'mb-5' : 'mb-[10px]'}
          position="relative"
        >
          <GridItem colSpan={isDesktop ? 8 : 1} order={isDesktop ? 1 : 2}>
            <SectionLatest
              data={data?.latest}
              isDesktop={isDesktop}
              category={subCategory}
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
              <Box className="lg:sticky lg:top-[113px]">
                <AdsMr1
                  isMobile={isMobile}
                  isDesktop={isDesktop}
                  key="sub-category-mr-1"
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
                  key="sub-category-mr-2"
                />
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </ContainerSection>
      <AdsInfeed1
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="sub-category-infeed-1"
      />
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
        key="sub-category-infeed-2"
      />
      <SectionPopCreator
        data={data?.popcreator_of_the_month}
        containerProps={{
          mb: { base: '25px', md: '30px' },
          mt: { md: '40px' },
        }}
        ssr={false}
      />
      <AdsInfeed3
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="sub-category-infeed-3"
      />
      <AdsSticky key="sub-category-sticky" />
      <AdsSkinLeft
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="sub-category-skin-left"
      />
      <AdsSkinRight
        isMobile={isMobile}
        isDesktop={isDesktop}
        key="sub-category-skin-right"
      />
    </>
  );
};
export default SubCategory;
