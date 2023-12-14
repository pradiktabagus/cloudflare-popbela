/* eslint-disable @typescript-eslint/naming-convention */
import type { BoxProps } from '@chakra-ui/layout';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { ImageLoaderProps } from '@/components/Images';
import { CustomLink } from '@/components/Link';
import type { Horoscope } from '@/types/responses/pages/horoscopes';

const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
export type ZodiacProps = BoxProps & {
  data: Horoscope;
  namecolor?: string;
};
export const CardZodiac = (props: ZodiacProps) => {
  const { data, namecolor = '#616161', ...boxProps } = props;
  const { icon, start_date, end_date, name, slug } = data;
  return (
    <CustomLink href={`/horoscope/${slug}`}>
      <Box
        data-testid="card-zodiac"
        width="100%"
        border="1px solid #bbb"
        borderRadius="10px"
        padding="10px 20px"
        textAlign="center"
        _hover={{
          borderColor: 'primary',
        }}
        {...boxProps}
      >
        <Flex
          gap="10px"
          alignItems="center"
          justifyContent="center"
          marginBottom="5px"
          marginTop="15px"
        >
          <Box boxSize={23} position="relative" display="block">
            <ImageCard
              data-testid="card-image"
              width={400}
              height={400}
              alt="headline"
              className="object-cover"
              src={icon}
              priority
              srcblur={icon}
            />
          </Box>
          <Heading
            data-testid="name-zodiac"
            as="h3"
            fontSize={18}
            color={namecolor}
            fontFamily="limerick"
            textTransform="uppercase"
            fontWeight={700}
          >
            {name}
          </Heading>
        </Flex>
        <Box>
          <Text color="title" fontSize="14px" data-testid="range-time">
            {`${start_date} - ${end_date}`}
          </Text>
        </Box>
      </Box>
    </CustomLink>
  );
};
