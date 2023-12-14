/* eslint-disable @typescript-eslint/naming-convention */
import { Box } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { ImageLoaderProps } from '@/components/Images';
import { CustomLink } from '@/components/Link';
import type { AvatarProps } from '@/types/avatar';

const ImageCard = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageCard').then((mod) => mod.ImageCard)
);
export const Avatar = (props: AvatarProps) => {
  const { badge, badgecolor = 'primary', data, boxSize = '42px' } = props;
  const { name, avatar, author_url } = data;
  return (
    <CustomLink href={author_url} data-testid="avatar">
      <Box
        data-testid="avatar"
        boxSize={boxSize}
        backgroundColor="transparent"
        position="relative"
        _after={{
          backgroundColor: badge ? badgecolor : 'transparent',
          height: '1rem',
          width: '1rem',
          right: '-0.1rem',
          bottom: '-0.1rem',
          position: 'absolute',
          borderRadius: '50%',
          content: '""',
          display: 'block',
        }}
      >
        <ImageCard
          data-testid="avatar"
          width={150}
          height={150}
          srcblur={avatar}
          alt={name}
          src={`${avatar}?width=150&height=150`}
          loading="lazy"
          className="h-[inherit] w-[inherit] rounded-full object-cover"
          sizes="(max-width: 320) 33vw,
          (max-width: 640) 33vw,
              (max-width: 1200px) 55vw"
        />
      </Box>
    </CustomLink>
  );
};
