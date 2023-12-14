import type { CardProps } from '../card';

type DataImageArticle = {
  source_name: string;
  image_url: string;
  title: string;
  alt?: string;
};
export type ImageArticleProps = Omit<
  CardProps,
  'paddingdesc' | 'titlecolor' | 'background'
> & {
  sourcepotition?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
  data: DataImageArticle;
};

export type ImageLoaderProps = {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'png' | string;
};
