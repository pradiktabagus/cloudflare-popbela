import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Container } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { useGetPopcreatorSection } from '@/adapters/hooks/components';
import type { CardProps } from '@/types/card';
import type { ResponseArticle } from '@/types/responses/article';
import type { ResponsePopcreator } from '@/types/responses/components/popcreator';
import { ImageThumbnail } from '@/utils/ResizeImage';

export type SectionPopCreatorProps = {
  data?: ResponseArticle;
  containerProps?: ContainerProps;
  ssr?: boolean;
};
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const CardPopCreator = dynamic<CardProps>(() =>
  import('@/components/Cards/CardPopCreator').then((mod) => mod.CardPopCreator)
);
const SkeletonPopCreator = dynamic(
  () => import('@/components/Skeleton/popcreator')
);

export const SectionPopCreator = ({
  containerProps,
  ssr = true,
}: SectionPopCreatorProps) => {
  const { data, isFetching, isSuccess } =
    useGetPopcreatorSection<ResponsePopcreator>({
      end_point: '/article/popcreator/this-month',
    });
  if (Array.isArray(data) && isSuccess) return null;
  return (
    <ContainerSection {...containerProps}>
      <Box as="section" w="full" data-testid="section-pop-creator">
        <Container maxW="1145px" px="15px">
          {isFetching && !ssr ? (
            <SkeletonPopCreator />
          ) : (
            <CardPopCreator
              data={{
                src: data?.data?.cover?.source_url,
                blurSrc: ImageThumbnail(data?.data.cover?.source_url || ''),
                title: data?.data.title ?? '',
                category: data?.data.category?.name ?? '',
                date: data?.data.release_date?.toString() ?? '',
                author: data?.data.author?.name ?? '',
                url: data?.data.article_url ?? '',
                text: data?.data.excerpt ?? '',
              }}
            />
          )}
        </Container>
      </Box>
    </ContainerSection>
  );
};
