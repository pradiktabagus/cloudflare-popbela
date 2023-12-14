import type { ContainerProps } from '@chakra-ui/layout';

import type { DeviceViewProps } from '../device';

export type MediaChannelsProps = {
  data?: any[];
  category?: string | string[];
  backgroundCard?: string;
  containerProps?: ContainerProps;
} & DeviceViewProps;
