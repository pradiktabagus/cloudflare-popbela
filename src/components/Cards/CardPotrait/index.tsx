/* eslint-disable @typescript-eslint/naming-convention */
import type { BoxProps, HeadingProps } from '@chakra-ui/layout';
import { Box, Heading, HStack } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { DateDefault } from '@/components/Date';
import type { ImageLoaderProps } from '@/components/Images';
import { CustomLink } from '@/components/Link';
import { HeadingAuthor } from '@/components/Typography';
import type {
  AuthorArticle,
  CoverArticle,
  SubCategoryArticle,
} from '@/types/article';
import type { CardProps } from '@/types/card';

const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
export type DataCardPotraitProps = {
  sub_category?: SubCategoryArticle;
  title?: string | any;
  author?: AuthorArticle;
  cover?: CoverArticle;
  release_date?: number | any;
  article_url?: string | any;
};
export type CardPotraitProps = Omit<CardProps, 'data'> & {
  titleProps?: HeadingProps;
  authorDateProps?: BoxProps;
  data: DataCardPotraitProps;
  csc?: boolean;
  widthSponsored?: string | number;
  heightSponsored?: string | number;
  trackerCallbacks?: ((e: any) => void) | undefined;
};
export function CardPotrait(props: CardPotraitProps): JSX.Element {
  const {
    background = 'white',
    heightimg = 436,
    paddingdesc = '15px 30px',
    data,
    titlecolor = 'black',
    titleProps,
    authorDateProps,
    csc = false,
    widthSponsored = 50,
    heightSponsored = 70,
    priorityImg = false,
    loadingImg,
    trackerCallbacks,
    ...otherProps
  } = props;
  const { sub_category, title, author, article_url, cover, release_date } =
    data;
  return (
    <Box
      data-testid="card-potrait"
      position="relative"
      backgroundColor={background}
      display="flex"
      flexDirection="column"
      {...otherProps}
    >
      <Box>
        <Box
          as={CustomLink}
          href={article_url}
          h="full"
          onClick={trackerCallbacks}
        >
          <Box
            data-testid="card-image-container"
            position="relative"
            height={heightimg}
            display="block"
          >
            <ImageCard
              data-testid="card-image"
              alt={title}
              width={400}
              height={540}
              className="h-[inherit] object-cover"
              src={cover?.source_url ?? ''}
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
        </Box>
      </Box>
      <Box
        data-testid="description-container"
        width="full"
        height="auto"
        padding={paddingdesc}
        position="relative"
        flex={1}
        display="flex"
        flexDirection="column"
      >
        <Box
          textTransform="uppercase"
          fontSize="14px"
          color="primary"
          marginBottom="1rem"
          data-testid="category"
          fontFamily="futuraBook"
          _hover={{ color: background === 'black' ? 'white' : 'secondary' }}
        >
          <CustomLink href={sub_category?.category_url}>
            {sub_category?.name}
          </CustomLink>
        </Box>

        <Heading
          as="h3"
          className="mb-2 pb-4"
          fontSize={18}
          fontFamily="limerick"
          _hover={{ color: 'primary' }}
          color={titlecolor}
          data-testid="title"
          letterSpacing=".6px"
          lineHeight="1.4"
          noOfLines={3}
          paddingBottom="4rem"
          {...titleProps}
          height="80px"
        >
          <CustomLink href={article_url} onClick={trackerCallbacks}>
            {title}
          </CustomLink>
        </Heading>

        <Box width="auto" bottom={0} {...authorDateProps}>
          <HStack justifyContent="space-between">
            <HeadingAuthor path={`/author${author?.author_url}`}>
              {author?.name}
            </HeadingAuthor>
            <time
              data-testid="time"
              className="text-base capitalize text-secondary"
            >
              <DateDefault date={release_date} />
            </time>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
