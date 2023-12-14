/* eslint-disable @typescript-eslint/naming-convention */
import type { HeadingProps } from '@chakra-ui/layout';
import { Box, Heading } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { DateDefault } from '@/components/Date';
import type { ImageLoaderProps } from '@/components/Images';
import { CustomLink } from '@/components/Link';
import { HeadingAuthor } from '@/components/Typography';
import type { CardProps } from '@/types/card';
import type { ResponseHeadline } from '@/types/section/headline';

const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
export type CardMobileProps = Omit<CardProps, 'data'> & {
  backgrounddesc?: string;
  data: ResponseHeadline;
  titleProps?: HeadingProps;
  csc?: boolean;
  widthSponsored?: string | number;
  heightSponsored?: string | number;
  trackerCallbacks?: ((e: any) => void) | undefined;
};
export const CardMobilePotrait = (props: CardMobileProps) => {
  const {
    width = 'full',
    backgroundColor = 'white',
    backgrounddesc = 'white',
    data,
    heightimg = '300px',
    widthimg = 'full',
    titleProps,
    csc = false,
    widthSponsored = 30,
    heightSponsored = 50,
    priorityImg = false,
    loadingImg,
    trackerCallbacks,
    ...boxProps
  } = props;
  const {
    cover = {
      image_url: '',
    },
    article_url = '/',
    sub_category = {
      category_url: '',
    },
    title,
    author,
    release_date,
  } = data;
  return (
    <Box
      data-testid="card-potrait-mobile"
      width={width}
      backgroundColor={backgroundColor}
      position="relative"
      {...boxProps}
    >
      <Box as="article" className="relative">
        <Box
          as={CustomLink}
          href={article_url}
          width={widthimg}
          height={heightimg}
          onClick={trackerCallbacks}
          position="relative"
          display="block"
        >
          <ImageCard
            data-testid="card-image"
            width={400}
            height={300}
            alt={title}
            className="h-[inherit] object-cover"
            src={cover?.source_url ?? ''}
            priority={priorityImg}
            loading={loadingImg && loadingImg}
            srcblur={cover?.source_url}
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
        <Box width="75%" position="absolute" bottom="-10px">
          <Box
            textTransform="uppercase"
            fontSize={12}
            fontFamily="futuraBook"
            data-testid="category"
          >
            <CustomLink
              href={sub_category?.category_url}
              className="inline-block bg-[#d51c6a] px-4 py-1 text-xs text-white"
            >
              {sub_category?.name}
            </CustomLink>
          </Box>
          <Box backgroundColor={backgrounddesc}>
            <Heading
              data-testid="title"
              as="h3"
              fontSize={16}
              padding="8px 15px 5px"
              fontWeight={700}
              lineHeight="1.3"
              fontFamily="limerick"
              color="title"
              overflow="hidden"
              _hover={{
                color: 'primary',
              }}
              letterSpacing=".6px"
              noOfLines={2}
              {...titleProps}
            >
              <CustomLink href={article_url} onClick={trackerCallbacks}>
                {title}
              </CustomLink>
            </Heading>
            <Box
              data-testid="author"
              position="static"
              pb="8px"
              pl="15px"
              mb="10px"
              display="flex"
              gap="5px"
              color="secondary"
              flexWrap="wrap"
            >
              <HeadingAuthor path={`/author${author?.author_url}`}>
                {author?.name}
              </HeadingAuthor>
              |
              <time
                data-testid="time"
                className="mt-0 text-base capitalize text-secondary"
              >
                <DateDefault date={release_date} />
              </time>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
