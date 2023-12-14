/* eslint-disable tailwindcss/no-custom-classname */
import { Box } from '@chakra-ui/layout';
import type { ReactNode } from 'react';

import type { DeviceViewProps } from '@/types/device';

type IMainProps = {
  meta?: ReactNode;
  script?: ReactNode;
  children: ReactNode;
} & DeviceViewProps;
const Campaign = (props: IMainProps) => (
  <>
    {props.meta}
    {props.script}
    <Box as="main" w="full" className="antialiased" pos="relative" mt={75}>
      {props.children}
    </Box>
  </>
);

export { Campaign };
