import { Box, Flex, Heading } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { DateMinDay } from '@/components/Date/MinDay';
import type { ImageLoaderProps } from '@/components/Images';
import { CustomLink } from '@/components/Link';
import type { CardProps } from '@/types/card';

const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
export const CardCreator = (props: CardProps) => {
  const {
    backgroundColor = 'white',
    paddingdesc = '10px',
    data,
    width = 'full',
    ...boxProps
  } = props;
  const { url, src, author, date } = data;
  return (
    <Box width={width} {...boxProps} backgroundColor={backgroundColor}>
      <Flex flexDirection={{ sm: 'row', md: 'column' }}>
        <CustomLink href={url}>
          <Box
            width={{ sm: 130, md: '100%' }}
            height={{ sm: 155, md: 200 }}
            position="relative"
            display="block"
          >
            <ImageCard
              data-testid="card-image"
              width={300}
              height={400}
              alt="creator"
              className="h-[inherit] object-cover"
              src={src}
              loading="lazy"
              srcblur={src}
            />
          </Box>
        </CustomLink>
        <Box
          flex={1}
          padding={paddingdesc}
          position="relative"
          display="flex"
          flexDirection={{ sm: 'column' }}
          justifyContent={{ sm: 'center', md: 'center' }}
          alignItems={{ sm: 'center', md: 'center' }}
          textAlign={{ sm: 'center', md: 'center' }}
        >
          <Heading
            data-testid="author"
            as="h2"
            color="title"
            letterSpacing=".5"
            _hover={{ color: 'primary' }}
            textTransform={{ sm: 'uppercase', md: 'none' }}
            fontFamily="limerick"
            fontSize={{ sm: '16px', md: '18px' }}
            lineHeight={{ sm: '1.3' }}
            fontWeight={{ sm: 700 }}
            marginBottom="1rem"
            overflow="hidden"
          >
            <CustomLink href={`${url}`}>{author}</CustomLink>
          </Heading>
          <Box>
            <time
              data-testid="time"
              className="mt-0 text-base capitalize text-secondary"
            >
              <DateMinDay date={date} />
            </time>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
