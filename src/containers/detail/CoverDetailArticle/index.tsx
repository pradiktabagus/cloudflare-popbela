import { Box, Flex, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import type { RefObject } from 'react';

import type { HeadingTitleProps } from '@/components';
import type {
  AuthorArticle,
  CoverArticle,
  SubCategoryArticle,
} from '@/types/article';
import type { AvatarProps } from '@/types/avatar';
import type { LinkProps } from '@/types/customLink';
import type { DateDefaultProps } from '@/types/date';
import type { ImageArticleProps } from '@/types/image';
import { hostNameOrigin } from '@/utils/hostnameOrigin';

import type { TShareDetailArticle } from '../Share/Content';

export type CoverDetailArticleProps = {
  title?: string;
  excerpt?: string;
  sub_category?: SubCategoryArticle;
  release_date: number;
  cover?: Omit<CoverArticle, 'height' | 'width'> & {
    source_name?: string;
    og_image_url?: string;
    source_url?: string;
  };
  author?: AuthorArticle;
  article_url?: string;
  article_url_amp?: string;
  avatarRef?: RefObject<HTMLDivElement>;
};
const ShareDetail = dynamic<TShareDetailArticle>(() =>
  import('../Share').then((cmp) => cmp.ContentShare)
);
const Avatar = dynamic<AvatarProps>(() =>
  import('@/components/Avatar/index').then((mod) => mod.Avatar)
);
const DateDefault = dynamic<DateDefaultProps>(() =>
  import('@/components/Date/index').then((mod) => mod.DateDefault)
);
const ImageArticle = dynamic<ImageArticleProps>(() =>
  import('@/components/Images/ImageCoverArticle').then(
    (mod) => mod.ImageCoverArticle
  )
);
const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link/index').then((mod) => mod.CustomLink)
);
const HeadingTitle = dynamic<HeadingTitleProps>(() =>
  import('@/components/Typography/Heading/HeadingTitle').then(
    (mod) => mod.HeadingTitle
  )
);
export const CoverDetailArticle = ({
  title,
  sub_category,
  excerpt,
  release_date,
  cover,
  author,
  article_url = '',
  avatarRef,
}: CoverDetailArticleProps) => {
  return (
    <div data-testid="cover-detail-article">
      <HeadingTitle
        as="h1"
        lineHeight="1.4"
        color="title"
        fontSize={{ base: '26px', lg: '30px' }}
        marginBottom="10px"
        data-testid="title-article"
      >
        {title}
      </HeadingTitle>
      <Text
        data-testid="excerpt-article"
        fontSize={{ base: '22px', lg: '1.5rem' }}
        className="text-[#616161]"
      >
        <em>{excerpt}</em>
      </Text>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box
          display={{ base: 'block', lg: 'none' }}
          color="primary"
          textTransform="uppercase"
          fontSize="22px"
          lineHeight="1.4"
          fontWeight="600"
          data-testid="sub-category-article"
        >
          <CustomLink href={sub_category?.category_url}>
            {sub_category?.name}
          </CustomLink>
        </Box>
        <time
          data-testid="time"
          className="mt-0 text-2xl capitalize text-[#616161]"
        >
          <DateDefault date={release_date} />
        </time>
      </Flex>
      <div data-testid="cover-article">
        <ImageArticle
          priorityImg={true}
          data={{
            source_name: cover?.source_name ?? '',
            image_url: cover?.source_url ?? '',
            title: title ?? '',
            blurSrc: cover?.placeholder_image_url,
          }}
        />
        <Box padding="10px" paddingTop="20px">
          <Flex flexDirection={{ base: 'column', lg: 'row' }}>
            <Flex
              width={{ base: '100%', lg: '75%' }}
              alignItems="center"
              gap="10px"
              justifyContent={{ base: 'center', lg: 'flex-start' }}
              ref={avatarRef}
            >
              <Avatar
                boxSize={{ base: '35px', lg: '42px' }}
                data={{
                  name: author?.name ?? '',
                  avatar: author?.avatar2 ?? '',
                  author_url: author?.author_url ? `${author?.author_url}` : '',
                }}
              />
              <Box
                overflow="hidden"
                color="#616161"
                fontSize="22px"
                fontWeight="600"
                textTransform="uppercase"
                data-testid="author-article"
              >
                <CustomLink href={author?.author_url}>
                  {author?.name}
                </CustomLink>
              </Box>
            </Flex>
            <Flex
              data-testid="share-section-article"
              margin={{ base: '10px 0px', lg: '0px' }}
              alignItems="center"
              gap="10px"
              flex={1}
              width={{ base: '100%', lg: '25%' }}
              justifyContent={{ base: 'center', lg: 'flex-end' }}
            >
              <ShareDetail
                article={{
                  title: title ?? '',
                  url: hostNameOrigin() + article_url,
                  excerpt: excerpt ?? '',
                }}
              />
            </Flex>
          </Flex>
        </Box>
      </div>
    </div>
  );
};
