import type { BoxProps } from '@chakra-ui/layout';

export type AvatarProps = BoxProps & {
  badge?: boolean;
  badgecolor?: string;
  data: {
    name: string;
    avatar: string;
    author_url: string;
  };
};
