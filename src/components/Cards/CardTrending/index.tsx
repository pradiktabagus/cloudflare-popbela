/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Flex, Heading } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { DateDefault } from '@/components/Date';
import type { ImageLoaderProps } from '@/components/Images';
import { CustomLink } from '@/components/Link';
import type { CoverArticle } from '@/types/article';
import type { CardProps } from '@/types/card';

const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
export type DataCardTrending = {
  title?: string | any;
  release_date?: number | any;
  cover?: CoverArticle;
  article_url?: string | any;
};
export type CardTrendingProps = Omit<CardProps, 'data'> & {
  data: DataCardTrending;
  trackerCallbacks?: ((e: any) => void) | undefined;
};
export function CardTrending(props: CardTrendingProps) {
  const {
    data,
    heightimg = 92,
    widthimg = 92,
    width = 'sm',
    paddingdesc = '0 0 0 10px',
    titlecolor = 'title',
    backgroundColor = 'white',
    trackerCallbacks,
    ...boxProps
  } = props;
  const { release_date, title, article_url, cover } = data;
  return (
    <Box
      data-testid="card-trending"
      backgroundColor={backgroundColor}
      width={width}
      {...boxProps}
    >
      <Flex>
        <CustomLink href={article_url} onClick={trackerCallbacks}>
          <Box
            data-testid="card-image-container"
            height={heightimg}
            width={widthimg}
            position="relative"
            display="block"
          >
            <ImageCard
              data-testid="card-image"
              width={320}
              height={320}
              alt={title}
              className="h-[inherit] object-cover"
              src={cover?.source_url}
              loading="lazy"
              srcblur={cover?.source_url}
            />
          </Box>
        </CustomLink>
        <Box
          data-testid="description-container"
          padding={paddingdesc}
          alignItems="flex-start"
          position="relative"
          flex={1}
        >
          <Heading
            as="h3"
            className="mb-2"
            fontSize={16}
            fontFamily="limerick"
            _hover={{ color: 'primary' }}
            color={titlecolor}
            data-testid="title"
            letterSpacing=".6px"
            lineHeight="1.4"
            noOfLines={3}
          >
            <CustomLink href={article_url} onClick={trackerCallbacks}>
              {title}
            </CustomLink>
          </Heading>
          <Box position="absolute" bottom={0}>
            <time
              data-testid="time"
              className="mt-0 text-lg capitalize text-primary"
            >
              <DateDefault date={release_date} />
            </time>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
