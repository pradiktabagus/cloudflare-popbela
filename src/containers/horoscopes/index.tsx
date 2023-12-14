import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Grid, GridItem } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDefaultPages } from '@/adapters/hooks/pages';
import type { BreadcrumbProps } from '@/components';
import type { TrendingProps } from '@/sections';
import type { DeviceViewProps } from '@/types/device';
import type { LatestProps } from '@/types/latest';
import type { ResponseHoroscopes } from '@/types/responses/pages/horoscopes';
import clsxm from '@/utils/clsxm';

import type { TSectionFindZodiac } from './FindZodiac';

const Breadcrumb = dynamic<BreadcrumbProps>(() =>
  import('@/components/Breadcrumb').then((mod) => mod.Breadcrumb)
);
const SectionFindZodiac = dynamic<TSectionFindZodiac>(
  () => import('./FindZodiac')
);
const SectionTrending = dynamic<TrendingProps>(() =>
  import('@/sections/Trending').then((mod) => mod.SectionTrending)
);
const SectionLatest = dynamic<LatestProps>(() =>
  import('@/sections/Latest/category').then((sec) => sec.SectionLatestCategory)
);
const SectionSeo = dynamic<any>(() => import('./HeadingSeo'));
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
export type THoroscope = DeviceViewProps;
const Horoscopes = ({ isDesktop, isMobile }: THoroscope) => {
  const { data } = useDefaultPages<ResponseHoroscopes>({
    end_point: 'horoscopes',
    version: 'v1',
  });
  const [pos, setPos] = useState('top');
  const topSign = useInView();
  const bottomSign = useInView();

  useEffect(() => {
    if (topSign.inView && pos === 'bottom') {
      setPos('top');
    } else if (bottomSign.inView && pos === 'top') {
      setPos('bottom');
    }
  }, [topSign.inView, bottomSign.inView, pos]);
  return (
    <>
      <ContainerSection>
        {isDesktop && (
          <Breadcrumb
            paths={[
              { title: 'Home', link: '/' },
              {
                title: 'All',
                isCurrentPage: true,
              },
            ]}
            py="8px"
            mb="20px"
          />
        )}
      </ContainerSection>
      <SectionSeo />
      <ContainerSection width={isDesktop ? '1145px' : 'full'}>
        <Grid
          templateColumns={isDesktop ? 'repeat(12, 1fr)' : 'repeat(1, 1fr)'}
          gap="26px"
          className={isDesktop ? 'mb-5' : 'mb-[10px]'}
          position="relative"
        >
          <GridItem colSpan={isDesktop ? 8 : 1} order={isDesktop ? 1 : 2}>
            <SectionFindZodiac
              data={data?.horoscope}
              isDesktop={isDesktop}
              isMobile={isMobile}
              containerProps={{
                px: 'unset',
                marginBottom: isDesktop ? '70px' : '30px',
              }}
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
          {isDesktop && (
            <GridItem
              colSpan={4}
              order={2}
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
                <SectionTrending
                  containerProps={{ px: 'unset' }}
                  data={data?.trending}
                  isDesktop={isDesktop}
                  classNameSection="bg-white"
                  ssr={false}
                />
              </Box>
            </GridItem>
          )}
        </Grid>
      </ContainerSection>
    </>
  );
};
export default Horoscopes;
