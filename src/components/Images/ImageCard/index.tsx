import Image from 'next/image';
import { useEffect, useState } from 'react';

import { imageLoader } from '@/utils/LoaderImage';

import type { ImageLoaderProps } from '../ImageLoader';

export const ImageCard = ({
  alt,
  src = '',
  srcblur = 'https://image.popbela.com/content-images/avatar/dummy_200x200.jpg',
  fallback = 'https://image.popbela.com/content-images/avatar/dummy_200x200.jpg',
  ...props
}: ImageLoaderProps): JSX.Element => {
  const [imgSrc, setImgSrc] = useState(src);
  const [blurSrc, setBlurSrc] = useState(srcblur);
  const [onErrorSrc, setOnErrorSrc] = useState<string | undefined>(undefined);
  // error handling apabila ada kerusakan selama fetch src
  function handleOnError(
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void {
    if (e?.currentTarget?.src !== fallback) {
      setOnErrorSrc(fallback);
    }
  }
  useEffect(() => {
    setBlurSrc(srcblur);
    setImgSrc(src);
  }, [src, srcblur]);
  return (
    <Image
      {...props}
      sizes="(max-width: 320px) 40vw, (max-width: 640px) 40vw, (max-width: 1200px) 40vw, 40vw"
      alt={alt ?? 'ImageLoader'}
      loader={imageLoader}
      src={onErrorSrc || imgSrc}
      onError={(e) => handleOnError(e)}
      placeholder="blur"
      blurDataURL={blurSrc}
    />
  );
};
