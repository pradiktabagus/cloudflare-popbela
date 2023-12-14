/* eslint-disable @typescript-eslint/naming-convention */
import { Box } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import { CustomLink } from '@/components/Link';
import type { ImageArticleProps } from '@/types/image';

import styles from '../image-article.module.scss';
import type { ImageLoaderProps } from '../ImageLoader';

const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('../ImageLoader').then((mod) => mod.ImageLoader)
);
export const ImageArticle = (props: ImageArticleProps) => {
  const {
    data,
    sourcepotition = 'bottomRight',
    heightimg = 'auto',
    widthimg = 'full',
    priorityImg = false,
    loadingImg,
    ...boxProps
  } = props;
  const { image_url, source_name, title } = data;

  const styleSource = (position: string) => {
    switch (position) {
      case 'topRight':
        return {
          top: '0',
          right: '0',
        };
      case 'topLeft':
        return {
          top: '0',
          left: '0',
        };
      case 'bottomRight':
        return {
          bottom: '0',
          right: '0',
        };
      case 'bottomLeft':
        return {
          bottom: '0',
          left: '0',
        };
      default:
        return {
          bottom: '0',
          right: '0',
        };
    }
  };
  return (
    <Box data-testid="card-image-article">
      <Box
        {...boxProps}
        className={styles['image-article']}
        position="relative"
        width={widthimg}
        height={heightimg}
        minHeight="200px"
        display="block"
      >
        <ImageLoader
          fill
          data-testid="card-image"
          alt={title}
          src={image_url}
          priority={priorityImg}
          srcblur={image_url}
          loading={loadingImg && loadingImg}
          className="relative h-auto object-cover"
        />
        {source_name && (
          <Box
            data-testid="card-image-source"
            position="absolute"
            padding="1px 6px"
            background="rgba(0,0,0,.5)"
            fontSize="16px"
            fontStyle="italic"
            {...styleSource(sourcepotition)}
          >
            <CustomLink className="!text-white" href={'/'}>
              {source_name}
            </CustomLink>
          </Box>
        )}
      </Box>
    </Box>
  );
};
