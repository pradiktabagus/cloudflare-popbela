import type { ContainerProps } from '@chakra-ui/layout';

import type { TScriptGA } from '@/containers/detail/Scripts';

import type { DeviceViewProps } from '../device';
import type { ResponseLatest } from '../section/latest';
import type { ResponsePopcreators } from '../section/popcreators';

export type LatestProps = {
  data?: ResponseLatest[];
  category?: string | string[];
  titleLatest?: string | string[];
  backgroundCard?: string;
  containerProps?: ContainerProps;
  article?: TScriptGA;
} & DeviceViewProps;

export type LatestOptProps = {
  type?: 'author' | 'popcreators';
} & LatestProps;

export type LatestPopCreatorProps = ContainerProps & {
  data?: ResponsePopcreators[];
  containerProps?: ContainerProps;
} & DeviceViewProps;
