/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { DateDefault } from '@/components/Date';
import type { ImageLoaderProps } from '@/components/Images';
import { CustomLink } from '@/components/Link';
import { HeadingAuthor } from '@/components/Typography';
import type { AuthorArticle, CoverArticle } from '@/types/article';
import type { CardProps } from '@/types/card';
import type { CategoryNowOnPopbela } from '@/types/section/now-on-popbela';

const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
export type DataCardNowOnPopbela = CategoryNowOnPopbela & {
  title?: string | any;
  article_url?: string | any;
  release_date?: number | any;
  cover_article?: CoverArticle;
  excerpt?: string | any;
  author?: AuthorArticle;
};
export type CardNowOnPopbelaProps = Omit<CardProps, 'data'> & {
  data: DataCardNowOnPopbela;
};
export const CardNowOnPopbela = (props: CardNowOnPopbelaProps) => {
  const {
    data,
    paddingdesc = '40px',
    backgroundColor = 'white',
    widthimg = 336,
    heightimg = 398,
    ...boxProps
  } = props;
  const {
    name,
    category_url,
    article_url,
    cover_article,
    title,
    excerpt,
    author,
    release_date,
  } = data;
  const getAssetPath = (filename: string) =>
    `/v3/assets/images/nowonpopbela/${filename}`;
  const coverCategory = useMemo((): any => {
    switch (name) {
      case 'Fashion':
        return getAssetPath('icon-fashion.png');
      case 'Beauty':
        return getAssetPath('icon-beauty.png');
      case 'Relationship':
        return getAssetPath('icon-relationship.png');
      case 'Career':
        return getAssetPath('icon-career.png');
      case 'Lifestyle':
        return getAssetPath('icon-lifestyle.png');
      default:
        return getAssetPath('icon-beauty.png');
    }
  }, [name]);
  return (
    <Box
      data-testid="card-now-on-popbela"
      width="full"
      {...boxProps}
      backgroundColor={backgroundColor}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <CustomLink href={article_url}>
          <Box
            width={widthimg}
            height={heightimg}
            position="relative"
            display="block"
          >
            <ImageCard
              data-testid="card-image"
              width={750}
              height={500}
              alt={title || 'headline'}
              className="h-[inherit] object-cover"
              src={cover_article?.source_url ?? ''}
              loading="lazy"
              srcblur={cover_article?.source_url}
            />
          </Box>
        </CustomLink>
        <Box flex={1} padding={paddingdesc} textAlign="center">
          <Box
            position="relative"
            boxSize="60px"
            margin="0 auto"
            marginBottom=".5rem"
          >
            <ImageLoader
              data-testid="image-category"
              fill
              src={coverCategory}
              alt={title}
              loading="lazy"
            />
          </Box>
          <Box marginBottom="1.5rem">
            <CustomLink href={category_url}>
              <Text
                data-testid="category"
                fontSize={14}
                color="primary"
                fontFamily="futuraBook"
                textTransform="uppercase"
                _hover={{
                  color: 'secondary',
                }}
              >
                {name}
              </Text>
            </CustomLink>
          </Box>
          <CustomLink href={article_url}>
            <Heading
              data-testid="title"
              as="h3"
              color="title"
              fontSize={22}
              lineHeight="1.4"
              fontWeight={700}
              fontFamily="limerick"
              marginBottom="1.5rem"
              paddingBottom={0}
              _hover={{ color: 'primary' }}
            >
              {title}
            </Heading>
          </CustomLink>
          <Text
            data-testid="text"
            color="secondary"
            lineHeight="1.4"
            fontSize="1.3rem"
          >
            {excerpt}
          </Text>
          <Flex justifyContent="center" gap="5px">
            <HeadingAuthor
              path={`/author${author?.author_url}`}
              fontSize="18px"
            >
              {author?.name}
            </HeadingAuthor>
            <time
              data-testid="time"
              className="text-lg capitalize text-secondary"
            >
              <DateDefault date={release_date} />
            </time>
          </Flex>
          <Box
            data-testid="read-more"
            paddingBottom="20px"
            textAlign="center"
            fontSize="18px"
            fontWeight={600}
            lineHeight="1.4"
            color="primary"
            _hover={{
              color: 'secondary',
            }}
          >
            <CustomLink href={article_url}>Read More</CustomLink>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
