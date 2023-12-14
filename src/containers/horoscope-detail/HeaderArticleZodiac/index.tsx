import type { BoxProps } from '@chakra-ui/layout';
import { Box, Heading, HStack, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { ImageLoaderProps } from '@/components';
import type { DeviceViewProps } from '@/types';

export type HeaderArticleZodiacData = {
  iconSrc?: string | any;
  name: string;
  rangeTime?: string;
  excerpt?: string;
};
export type TExcerptZodiac = DeviceViewProps & {
  data: HeaderArticleZodiacData;
  iconSize?: number;
  titleClassname?: string;
  excerptClassname?: string;
  mobileIconSize?: string | number;
} & BoxProps;

const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);

const HeaderArticleZodiac = ({
  data,
  titleClassname,
  excerptClassname,
  mobileIconSize = '40px',
  isDesktop,
  ...boxProps
}: TExcerptZodiac) => {
  return (
    <Box data-testid="header-article-zodiac" {...boxProps}>
      <HStack
        color="horoscopeDetail"
        mb="30px"
        spacing={isDesktop ? '20px' : '10px'}
        alignItems="center"
        justifyContent={isDesktop ? 'flex-start' : 'center'}
        className={titleClassname}
      >
        <Box
          data-testid="img-zodiac"
          boxSize={isDesktop ? '60px' : mobileIconSize}
        >
          <ImageLoader
            src={data.iconSrc}
            alt={data.name}
            noLoader={false}
            width={60}
            height={60}
            priority
          />
        </Box>
        <Box
          mt={isDesktop ? '9px !important' : 0}
          mr={isDesktop ? 0 : '5px !important'}
        >
          <Heading
            textTransform="uppercase"
            fontSize={isDesktop ? '35px' : '30px'}
            fontWeight="600"
            fontFamily="limerick"
          >
            {data.name}
          </Heading>
        </Box>
        <Text fontSize={isDesktop ? '24px' : '18px'}>{data.rangeTime}</Text>
      </HStack>
      <Box
        p={isDesktop ? '30px' : 0}
        border={isDesktop ? '2px solid #bbb' : 'none'}
        borderRadius={isDesktop ? '15px' : 0}
        className={excerptClassname}
      >
        <Text fontSize={isDesktop ? '24px' : '22px'} color="horoscopeDetail">
          {data.excerpt}
        </Text>
      </Box>
    </Box>
  );
};
export default HeaderArticleZodiac;
