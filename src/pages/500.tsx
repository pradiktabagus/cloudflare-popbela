import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { isDesktop, isMobile } from 'react-device-detect';

import type { ImageLoaderProps } from '@/components';
import { Meta } from '@/layouts/Meta';

const Main = dynamic<any>(() => import('@/templates/Main'));
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
export default function Custom500() {
  return (
    <Main
      meta={
        <Meta
          description="POPBELA.com adalah media digital multi-platform tentang fashion, kecantikan, kultur pop, dan gaya hidup untuk perempuan Millennial & Gen Z di Indonesia."
          slug=""
          title="Popbela.com: A Pop-culture & Lifestyle for Millennials Women"
          url="https://www.popbela.com"
        />
      }
      isDesktop={isDesktop}
      isMobile={isMobile}
    >
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
            <Box width="239px" height="144px" position="relative">
              <ImageLoader
                src="/v3/assets/images/global/500.png"
                priority
                alt="not found page"
                fill
                className="object-cover"
              />
            </Box>
          </Box>
          <Grid
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
    </Main>
  );
}
