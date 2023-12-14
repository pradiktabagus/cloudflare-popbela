/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Flex, Heading } from '@chakra-ui/layout';

import { DateDefault } from '@/components/Date';
import { CustomLink } from '@/components/Link';
import { HeadingAuthor } from '@/components/Typography';
import type { AuthorArticle, SubCategoryArticle } from '@/types/article';
import type { CardProps } from '@/types/card';

export type DataCardNoImage = {
  title?: string | any;
  release_date?: number | any;
  article_url?: string | any;
  sub_category?: SubCategoryArticle;
  author?: AuthorArticle;
};
export type CardNoImageProps = Omit<CardProps, 'data'> & {
  data: DataCardNoImage;
  trackerCallbacks?: ((e: any) => void) | undefined;
};
export const CardNoImage = (props: CardNoImageProps) => {
  const {
    data,
    backgroundColor = 'none',
    width = 'full',
    marginBottom = '10px',
    trackerCallbacks,
    ...boxProps
  } = props;
  const { article_url, title, author, release_date, sub_category } = data;
  return (
    <Box
      backgroundColor={backgroundColor}
      width={width}
      marginBottom={marginBottom}
      textAlign="center"
      _after={{
        background: 'primary',
        content: '""',
        width: '35px',
        height: '3px',
        transform: 'skewX(-10deg)',
        display: 'block',
        margin: '20px auto',
      }}
      {...boxProps}
    >
      <Box
        data-testid="category"
        color="primary"
        _hover={{ color: '#911348' }}
        textTransform="uppercase"
        fontSize="14px"
        fontFamily="futuraBook"
        marginBottom="10px"
      >
        <CustomLink href={sub_category?.category_url}>
          {sub_category?.name}
        </CustomLink>
      </Box>
      <Heading
        as="h3"
        color="title"
        overflow="hidden"
        fontWeight={700}
        lineHeight="1.3"
        fontSize="16px"
        fontFamily="limerick"
        _hover={{ color: 'primary' }}
        marginBottom="10px"
        data-testid="title"
      >
        <CustomLink href={article_url} onClick={trackerCallbacks}>
          {title}
        </CustomLink>
      </Heading>
      <Flex justifyContent="center" gap="5px" marginBottom="10px">
        <HeadingAuthor path={`/author${author?.author_url}`}>
          {author?.name}
        </HeadingAuthor>
        <time
          data-testid="time"
          className="text-base capitalize text-secondary"
        >
          <DateDefault date={release_date} />
        </time>
      </Flex>
    </Box>
  );
};
