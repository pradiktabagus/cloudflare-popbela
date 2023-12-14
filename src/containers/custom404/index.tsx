import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useInView } from 'react-intersection-observer';

import { useDefaultComponent } from '@/adapters/hooks/components';
import { useDefaultPages } from '@/adapters/hooks/pages';
import type { ImageLoaderProps } from '@/components';
import type {
  NowOnPopbelaProps,
  SectionExclusiveProps,
  SectionHoroscopeProps,
  SectionPopCreatorProps,
  TrendingProps,
} from '@/sections';
import type { DeviceViewProps } from '@/types';
import type { LatestProps } from '@/types/latest';
import type {
  ResponseCurrentHoroscope,
  ResponseHoroscopes,
} from '@/types/responses/components/horoscopes';
import type { ICustom404 } from '@/types/responses/pages/custom404';
import clsxm from '@/utils/clsxm';

export type TContainerCustom404 = {
  data?: ICustom404;
} & DeviceViewProps;
const SectionPopCreator = dynamic<SectionPopCreatorProps>(() =>
  import('@/sections/PopCreator').then((sec) => sec.SectionPopCreator)
);
const SectionLatestTop = dynamic<LatestProps>(() =>
  import('@/sections/Latest/top').then((sec) => sec.SectionLatestTop)
);
const SectionLatestBottom = dynamic<LatestProps>(() =>
  import('@/sections/Latest/bottom').then((sec) => sec.SectionLatestBottom)
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
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container/index').then((mod) => mod.ContainerSection)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader/index').then((mod) => mod.ImageLoader)
);
const Custom404 = ({ isDesktop }: TContainerCustom404) => {
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
  const currentHoroscope = useDefaultComponent<ResponseCurrentHoroscope>({
    end_point: '/current-horoscope',
  });
  const horoscopes = useDefaultComponent<ResponseHoroscopes>({
    end_point: '/horoscopes',
  });
  const { data } = useDefaultPages<ICustom404>({
    end_point: 'page/not-found',
    version: 'v1',
  });
  return (
    <>
      <ContainerSection mb={{ base: '25px', md: '30px' }} mt="40px">
        <Flex
          background="white"
          padding={isDesktop ? '80px 170px' : '10px'}
          flexDirection={isDesktop ? 'row' : 'column'}
        >
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            borderRight={isDesktop ? '1px solid #bbb' : 'unset'}
            paddingRight={isDesktop ? '15px' : '0px'}
          >
            <Box
              width="239px"
              height="144px"
              position="relative"
              data-testid="image-not-found"
            >
              <ImageLoader
                src="/v3/assets/images/global/404.png"
                priority
                alt="not found page"
                fill
                className="object-cover"
              />
            </Box>
          </Box>
          <Grid
            data-testid="description-not-found"
            flex="1"
            paddingLeft={isDesktop ? '49px' : 'unset'}
            textAlign={isDesktop ? 'left' : 'center'}
            position="relative"
          >
            <Box order={isDesktop ? 1 : 3} position="relative" marginTop="20px">
              <Box
                width="120px"
                height="28px"
                position={isDesktop ? 'relative' : 'absolute'}
                transform={isDesktop ? 'unset' : 'translate(-50%, -50%)'}
                top={isDesktop ? 'unset' : '50%'}
                left={isDesktop ? 'unset' : '50%'}
              >
                <ImageLoader
                  src="/v3/assets/images/global/logo.png"
                  priority
                  alt="logo"
                  fill
                  className="object-cover"
                />
              </Box>
            </Box>

            <Text
              color="#333"
              fontSize="48px"
              fontWeight="700"
              mb="10px"
              order={isDesktop ? 2 : 1}
            >
              Ooops...
            </Text>
            <Text color="#646464" fontSize="18px" order={isDesktop ? 3 : 2}>
              The page you&apos;re looking for is missing.
            </Text>
          </Grid>
        </Flex>
      </ContainerSection>
      {isDesktop && (
        <>
          <ContainerSection width={isDesktop ? '1145px' : 'full'} px={0}>
            <section data-testid="section-news-top" className="mb-5">
              <Grid
                templateColumns={
                  isDesktop ? 'repeat(12, 1fr)' : 'repeat(1, 1fr)'
                }
                gap="26px"
                className={isDesktop ? 'mb-5' : 'mb-[10px]'}
                position="relative"
              >
                <GridItem colSpan={isDesktop ? 8 : 1} order={isDesktop ? 1 : 2}>
                  <SectionLatestTop
                    data={data?.latest}
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    titleLatest="The Latest"
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
                      <SectionTrending
                        containerProps={{ px: isDesktop ? '1rem' : 0 }}
                        data={data?.trending}
                        classNameSection="bg-white"
                        isDesktop={isDesktop}
                        isMobile={isMobile}
                        ssr={false}
                      />
                      <SectionHoroscope
                        containerProps={{ px: isDesktop ? '1rem' : 0 }}
                        currentHoroscope={currentHoroscope.data?.horoscope}
                        horoscopes={horoscopes.data?.horoscopes}
                        isDesktop={isDesktop}
                        isMobile={isMobile}
                        ssr={false}
                      />
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>
            </section>
          </ContainerSection>
          {data?.latest && data?.latest.length > 12 && (
            <SectionLatestBottom
              data={data?.latest}
              isDesktop={isDesktop}
              isMobile={isMobile}
              category="all"
            />
          )}
          <SectionExclusive
            articles={data?.exclusive_interview}
            containerProps={{
              mb: { base: '25px', md: '20px' },
              mt: { base: '25px', md: '20px' },
              maxW: 'full',
              px: 0,
            }}
            isDesktop={isDesktop}
            isMobile={isMobile}
            ssr={false}
          />
          {isDesktop && (
            <SectionNowOnPopbela
              data={data?.now_on_popbela ?? []}
              containerProps={{ px: isMobile ? 0 : '1rem' }}
              isDesktop={isDesktop}
              isMobile={isMobile}
            />
          )}
          <SectionPopCreator
            containerProps={{
              px: 0,
              mb: { base: '25px', md: '30px' },
              mt: { md: '40px' },
            }}
            data={data?.popcreator_of_the_month}
            ssr={false}
          />
        </>
      )}
    </>
  );
};
export default Custom404;
