import { Box, Heading, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { ImageLoaderProps } from '@/components/Images';
import { CustomLink } from '@/components/Link';
import type { CardProps } from '@/types/card';

const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
export const CardPopCreator = (props: CardProps) => {
  const {
    data,
    width = 'full',
    height = { sm: 'auto', lg: '426px' },
    paddingTop = { sm: '100px' },
    paddingBottom = { sm: '50px' },
    position = 'relative',
    ...boxProps
  } = props;
  const { src, title = '', text = '', url = '' } = data;
  return (
    <Box
      data-testid="card-popcreator"
      height={height}
      width={width}
      position={position}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      {...boxProps}
    >
      <Box
        data-testid="background-card"
        position="absolute"
        top={0}
        right={0}
        left={0}
        bottom={0}
        overflow="hidden"
        margin="0 auto"
        zIndex={3}
        opacity=".5"
        width={{ lg: '100%' }}
        height={{ lg: '100%' }}
      >
        <Box
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          filter="grayscale(100%)"
          width={{ sm: '100%' }}
          height={{ sm: '200%', lg: '100%' }}
        >
          {src && (
            <ImageLoader
              data-testid="card-image"
              fill
              alt={title}
              className="object-cover"
              src={src}
              loading="lazy"
            />
          )}
        </Box>
      </Box>
      <Box
        data-testid="desc-popcreator"
        background="white"
        overflow="inherit"
        padding={{ sm: '20px', lg: '10px' }}
        width="90%"
        height={{ lg: '395px' }}
        top={{ sm: '14px', lg: '15px' }}
        left={{ lg: '38px' }}
        right={{ lg: '18px' }}
        margin="0 auto"
        position={{ sm: 'relative', lg: 'absolute' }}
        zIndex={4}
        display="flex"
        flexDirection={{ sm: 'column', lg: 'row' }}
        textAlign={{ sm: 'center', lg: 'left' }}
        alignItems={{ lg: 'center' }}
      >
        <Box
          flex={{ lg: '1' }}
          paddingRight={{ lg: '65px' }}
          marginLeft={{ lg: '-30px' }}
        >
          <CustomLink href={url}>
            <Box
              width="100%"
              height={{ sm: '290px', lg: '371px' }}
              position="relative"
              marginTop={{ sm: '-85px', lg: '0' }}
              display="block"
            >
              {src && (
                <ImageCard
                  data-testid="card-image"
                  width={500}
                  height={380}
                  alt={title}
                  className="h-[inherit] object-cover sm:mx-auto sm:my-0"
                  src={src}
                  loading="lazy"
                  srcblur={src}
                />
              )}
            </Box>
          </CustomLink>
        </Box>
        <Box
          flex={{ lg: '1' }}
          height={{ lg: 'fit-content' }}
          paddingRight={{ lg: '55px' }}
          alignItems="center"
        >
          <Box marginTop="1rem" marginBottom="20px">
            <CustomLink href="/popcreators">
              <Box
                height={{ sm: '35px', lg: '40px' }}
                width={{ sm: 'full', lg: '165px' }}
                position="relative"
                as="h2"
              >
                <ImageLoader
                  data-testid="logo-popcreator"
                  fill
                  alt={title}
                  className="object-contain"
                  src={'/v3/assets/images/global/logo-popcreator-medium.svg'}
                  loading="lazy"
                />
              </Box>
            </CustomLink>
          </Box>
          <Heading
            data-testid="title-popcreator"
            as="h3"
            paddingBottom="2rem"
            fontSize={{ sm: '18px', lg: '22px' }}
            fontFamily="limerick"
            fontWeight={700}
            lineHeight="1.3"
            _hover={{ color: 'primary' }}
          >
            <CustomLink href={url}>{title}</CustomLink>
          </Heading>
          <Box>
            <Text
              data-testid="text-popcreator"
              fontSize={{ sm: '16px', lg: '20px' }}
              color="secondary"
              marginBottom="10px"
            >
              {text}
            </Text>
          </Box>
          <Box
            marginTop="2rem"
            marginBottom="1.5rem"
            textTransform="uppercase"
            fontFamily="futuraBook"
            data-testid="button-seemore"
          >
            <CustomLink
              href={url}
              className="rounded-none border-[1px] border-[#ccc] bg-white p-1 font-futuraBook text-[12px] uppercase leading-normal text-title hover:bg-primary hover:text-white lg:px-[10px] lg:py-[5px] lg:font-bahijMitra lg:text-[14px] lg:font-bold"
            >
              See More
            </CustomLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
