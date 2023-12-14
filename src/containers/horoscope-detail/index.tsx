import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Grid, GridItem } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { BreadcrumbProps } from '@/components';
import type { TrendingProps } from '@/sections';
import type { DeviceViewProps } from '@/types/device';
import type { LatestProps } from '@/types/latest';
import type { IHoroscopeDetail } from '@/types/responses/pages/detail-horoscopes';

import type { BannerProps } from './Banner';
import type { TSectionZodiacMingguIni } from './ZodiacMingguIni';

const Breadcrumb = dynamic<BreadcrumbProps>(() =>
  import('@/components/Breadcrumb').then((mod) => mod.Breadcrumb)
);
const SectionZodiac = dynamic<TSectionZodiacMingguIni>(
  () => import('./ZodiacMingguIni')
);
const SectionTrending = dynamic<TrendingProps>(() =>
  import('@/sections/Trending').then((sec) => sec.SectionTrending)
);
const SectionLatest = dynamic<LatestProps>(() =>
  import('@/sections/Latest/category').then((sec) => sec.SectionLatestCategory)
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const SectionZodiacLainnya = dynamic<BannerProps>(() => import('./Banner'));
const HeadingSeo = dynamic<any>(() => import('./HeadingSeo'));
export type THoroscopeDetail = DeviceViewProps & {
  data: IHoroscopeDetail;
};
const Horoscopes = ({ isDesktop, data }: THoroscopeDetail) => {
  return (
    <>
      <ContainerSection>
        {isDesktop && (
          <Breadcrumb
            paths={[
              { title: 'Home', link: '/' },
              { title: 'Horoscopes', link: '/horoscopes' },
              {
                title: data?.horoscope?.name ?? '-',
                isCurrentPage: true,
              },
            ]}
            py="8px"
            mb="20px"
          />
        )}
      </ContainerSection>
      <HeadingSeo horoscope={data?.horoscope?.name} />
      <ContainerSection>
        <Grid
          display={{ base: 'block', lg: 'grid' }}
          templateColumns={isDesktop ? 'repeat(12, 1fr)' : 'repeat(1, 1fr)'}
          position="relative"
          gap={isDesktop ? '20px' : '0px'}
        >
          <GridItem colSpan={isDesktop ? 8 : 1} order={isDesktop ? 1 : 2}>
            <SectionZodiac
              isDesktop={isDesktop}
              name={data?.horoscope?.name ?? ''}
              iconSrc={data?.horoscope?.icon}
              rangeTime={`${data?.horoscope?.start_date} - ${data?.horoscope?.end_date}`}
              excerpt={data?.horoscope?.excerpt}
              description={data?.horoscope?.description}
            />
            <SectionZodiacLainnya
              srcBg="/v3/assets/images/desktop/background-detail-horoscope-select.png"
              srcBgMobile="/v3/assets/images/mobile/background-detail-horoscope-select.png"
              containerProps={{ w: 'full', mb: '30px' }}
            />
            <SectionLatest
              data={data?.latest}
              isDesktop={isDesktop}
              category={'zodiac'}
              titleLatest={'article'}
              backgroundCard="white"
              containerProps={{ px: 'unset' }}
            />
          </GridItem>
          <GridItem
            colSpan={{ base: 1, lg: 4 }}
            order={{ base: 1, lg: 2 }}
            display="flex"
            flexDirection="column"
            pos="relative"
          >
            <Box className="lg:sticky lg:top-[113px]">
              {isDesktop && (
                <SectionTrending
                  data={data?.trending ?? []}
                  classNameSection="lg:bg-transparent"
                  backgroundCard="transparent"
                  isDesktop={isDesktop}
                  ssr={false}
                />
              )}
            </Box>
          </GridItem>
        </Grid>
      </ContainerSection>
    </>
  );
};
export default Horoscopes;
