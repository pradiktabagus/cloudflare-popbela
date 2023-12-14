/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { DateDefault } from '@/components/Date';
import type { ImageLoaderProps } from '@/components/Images';
import { HeadingAuthor } from '@/components/Typography';
import type { CardOptionProps } from '@/types/card';
import type { LinkProps } from '@/types/customLink';

const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);

export function CardLandscape(props: CardOptionProps): JSX.Element {
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
    type = 'author',
    headingType = 'h3',
    trackerCallbacks,
    leftTag,
    newBlank = false,
    ...boxProps
  } = props;
  const { article_url, release_date, author, title, sub_category, cover } =
    data;
  return (
    <Box
      data-testid="card-landscape"
      backgroundColor={backgroundColor}
      {...boxProps}
    >
      <Flex>
        <CustomLink
          target={newBlank ? '_blank' : '_self'}
          href={article_url}
          onClick={trackerCallbacks}
        >
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
              height={240}
              alt={title}
              className="h-[inherit] object-cover"
              src={cover?.source_url}
              priority={priorityImg}
              loading={loadingImg && loadingImg}
              srcblur={cover?.source_url}
            />
            {leftTag && (
              <Box
                width={'72px'}
                height={'24px'}
                position="absolute"
                top="0px"
                left="0px"
                background="white"
                borderBottomRightRadius={'8px'}
              >
                {leftTag}
              </Box>
            )}
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
            <CustomLink
              href={sub_category?.category_url}
              target={newBlank ? '_blank' : '_self'}
            >
              <Text
                textTransform="uppercase"
                fontSize="14px"
                color="primary"
                marginBottom={release_date ? '1.5rem' : ''}
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
          </div>
          <Heading
            as={headingType}
            className="mb-2"
            fontSize={18}
            fontFamily="limerick"
            _hover={{ color: 'primary' }}
            color={titlecolor}
            data-testid="title"
            letterSpacing=".6px"
            lineHeight="1.4"
            noOfLines={2}
            {...titleProps}
          >
            <CustomLink
              target={newBlank ? '_blank' : '_self'}
              href={article_url}
              onClick={trackerCallbacks}
            >
              {title}
            </CustomLink>
          </Heading>
          <Box alignItems="flex-start">
            <HeadingAuthor
              target={newBlank ? '_blank' : '_self'}
              path={
                type === 'cross-publisher'
                  ? author?.author_url
                  : `/${type}${author?.author_url}`
              }
            >
              {author?.name}
            </HeadingAuthor>
            {release_date && (
              <time
                data-testid="time"
                className="mt-0 block text-base capitalize text-secondary"
              >
                <DateDefault date={release_date} />
              </time>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
