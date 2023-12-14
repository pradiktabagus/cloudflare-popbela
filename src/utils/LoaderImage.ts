import type { ImageLoaderProps } from '@/types/image';

export const imageLoader = ({ src, width = 750 }: ImageLoaderProps) => {
  return `${src}?width=${width}&format=webp&w=${width}`;
};
