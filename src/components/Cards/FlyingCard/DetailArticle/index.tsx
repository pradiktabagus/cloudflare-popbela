import { Box, Flex } from '@chakra-ui/layout';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { useScrollDirection } from '@/adapters/hooks';
import { useGetLatest } from '@/adapters/hooks/components';
import type { ImageLoaderProps } from '@/components/Images';
import { CustomLink } from '@/components/Link';
import type { ResponseArticle } from '@/types/responses/article';

const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
export type FlyingCardDetailProps = {
  article?: ResponseArticle;
  canShow?: boolean;
  category: string;
};
export const FlyingCardDetail = ({
  canShow,
  category,
}: FlyingCardDetailProps) => {
  const { data } = useGetLatest({
    end_point: `/component/latest-article?category=${category}`,
    version: 'v2',
  });
  const article = data?.pages[0].data[0];
  const { isScrollUp } = useScrollDirection();
  // untuk check apakah sudah ditutup
  // jika sudah maka logic canShow dan isScrollUp tidak berlaku
  const [closed, setClosed] = useState(false);
  return (
    <Box
      data-testid="fyling-card"
      pos="fixed"
      top="130px"
      w="100vw"
      zIndex="99"
      px="5px"
      className={clsx(
        'slide-left',
        !closed && canShow && isScrollUp && 'slideit'
      )}
    >
      {article && (
        <Flex
          as="article"
          pos="relative"
          h="87px"
          borderRadius="4px"
          bg="rgba(255,214,232,.9)"
        >
          <Box
            as="button"
            pos="absolute"
            right="10px"
            top="-7px"
            fontSize="30px"
            fontWeight="700"
            color="#ddd"
            zIndex="5"
            onClick={() => setClosed(true)}
          >
            <span aria-hidden="true">×</span>
          </Box>
          <Box flex="1" h="full" p="8px 5px 5px 8px">
            <Box
              textTransform="uppercase"
              fontFamily="futuraBook"
              fontSize="12px"
              color="primary"
            >
              Baca Juga
            </Box>
            <Box
              as={CustomLink}
              href={article.article_url}
              noOfLines={3}
              textOverflow="ellipsis"
              color="#333"
              fontFamily="limerickMedium"
              fontSize="14px"
              fontWeight="700"
              data-testid="baca-juga-excerpt"
            >
              {article.excerpt}
            </Box>
          </Box>
          <Box
            w="130px"
            h="87px"
            borderRightRadius="4px"
            overflow="hidden"
            display="block"
          >
            <ImageCard
              width={130}
              height={87}
              noLoader={false}
              src={article.cover?.source_url || ''}
              loading="lazy"
              alt={article.excerpt ?? 'Baca juga'}
              srcblur={article.cover?.source_url}
              className="h-[inherit]"
            />
          </Box>
        </Flex>
      )}
    </Box>
  );
};
