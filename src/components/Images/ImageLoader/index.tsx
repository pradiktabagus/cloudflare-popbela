import 'react-loading-skeleton/dist/skeleton.css';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

import { SkeletonBox } from '@/components/Skeleton';
import { imageLoader } from '@/utils/LoaderImage';

export type ImageLoaderProps = ImageProps & {
  // Gunakan value false apabila komponent ini digunakan untuk image static
  noLoader?: boolean;
  // value fallback komponen
  fallback?: string;
  // digunakan untuk debuging komponent
  debug?: string;
  alt?: string;
  srcblur?: string;
};
export const ImageLoader = ({
  alt,
  noLoader = true,
  src = '',
  fallback = 'https://image.popbela.com/content-images/avatar/dummy_200x200.jpg',
  ...props
}: ImageLoaderProps): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [onErrorSrc, setOnErrorSrc] = useState<string | undefined>(undefined);
  // error handling apabila ada kerusakan selama fetch src
  function handleOnError(
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void {
    if (e?.currentTarget?.src !== fallback) {
      setOnErrorSrc(fallback);
    }
  }
  return (
    <>
      {noLoader && loading === true && (
        <SkeletonBox
          className={`absolute left-0 top-0 h-full w-full leading-none ${
            props.debug === 'true' ? 'z-[99]' : 'z-auto'
          }`}
        />
      )}
      <Image
        {...props}
        sizes="(max-width: 320) 33vw,
          (max-width: 640) 55vw,
              (max-width: 1200px) 55vw,
              (max-width: 1600px) 75vw, 80vw"
        alt={alt ?? 'ImageLoader'}
        src={onErrorSrc || src}
        loader={imageLoader}
        onLoadingComplete={() => !props.debug && setLoading(false)}
        onError={(e) => handleOnError(e)}
      />
    </>
  );
};
