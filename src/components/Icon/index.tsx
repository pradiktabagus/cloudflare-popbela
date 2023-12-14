import type { BoxProps } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';

import { CustomLink } from '@/components/Link';

type Props = BoxProps & {
  children: React.ReactNode;
  sizeIcon?: string | number;
  url: string;
};
export const Icon = (props: Props) => {
  const { children, boxSize = 45, sizeIcon = '32px', url, ...boxProps } = props;
  return (
    <CustomLink href={url}>
      <Box
        data-testid="icon-box"
        position="relative"
        boxSize={boxSize}
        padding="5px"
        {...boxProps}
      >
        <Box
          boxSize={sizeIcon}
          margin="0 auto"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          {children}
        </Box>
      </Box>
    </CustomLink>
  );
};
