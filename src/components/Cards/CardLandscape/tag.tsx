/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { DateDefault } from '@/components/Date';
import type { ImageLoaderProps } from '@/components/Images';
import type { CardLandscapeProps } from '@/types/card';
import type { LinkProps } from '@/types/customLink';

const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
export function CardLandscapeTag(props: CardLandscapeProps): JSX.Element {
  const {
    data,
    background,
    paddingdesc = '10px',
    titlecolor = 'title',
    widthimg = 133,
    heightimg = 166,
    backgroundColor = 'white',
    csc = false,
    widthSponsored = 30,
    heightSponsored = 50,
    titleProps,
    priorityImg = false,
    loadingImg,
    isDesktop,
    ...boxProps
  } = props;
  const { article_url, release_date, title, sub_category, cover } = data;
  return (
    <Box
      data-testid="card-landscape"
      backgroundColor={backgroundColor}
      {...boxProps}
    >
      <Flex>
        <CustomLink href={article_url}>
          <Box
            data-testid="card-image-container"
            height={heightimg}
            width={widthimg}
            position="relative"
            display="block"
          >
            <ImageCard
              data-testid="card-image"
              fill
              alt={title}
              className="h-[inherit] object-cover"
              src={cover?.source_url}
              srcblur={cover?.source_url}
              priority={priorityImg}
              loading={loadingImg && loadingImg}
            />
            {csc && (
              <Box
                width={widthSponsored}
                height={heightSponsored}
                position="absolute"
                top="10px"
                left="10px"
                background="transparent"
              >
                <ImageLoader
                  data-testid="card-image"
                  fill
                  alt="sponsored"
                  className="object-cover"
                  src="/v3/assets/images/global/sponsored.png"
                  loading="lazy"
                />
              </Box>
            )}
          </Box>
        </CustomLink>
        <Box
          data-testid="description-container"
          padding={paddingdesc}
          alignItems="flex-start"
          position="relative"
          flex={1}
          className="flex flex-col items-start justify-between"
        >
          <div>
            <CustomLink href={sub_category?.category_url}>
              <Text
                textTransform="uppercase"
                fontSize="14px"
                color="primary"
                marginBottom={isDesktop ? `1.5rem` : '10px'}
                data-testid="category"
                as="p"
                fontFamily="futuraBook"
                _hover={{
                  color: background === 'black' ? 'white' : 'secondary',
                }}
              >
                {sub_category?.name}
              </Text>
            </CustomLink>
            <Heading
              as="h2"
              className="mb-2"
              fontSize={isDesktop ? 18 : 16}
              fontFamily="inherit"
              _hover={{ color: 'primary' }}
              color={titlecolor}
              data-testid="title"
              letterSpacing=".6px"
              lineHeight="1.4"
              {...titleProps}
            >
              <CustomLink href={article_url}>{title}</CustomLink>
            </Heading>
          </div>
          <Box alignItems="flex-start">
            <time
              data-testid="time"
              className="mt-0 text-base capitalize text-secondary"
            >
              <DateDefault date={release_date} />
            </time>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
