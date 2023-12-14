import type { TextProps } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';

import { CustomLink } from '@/components/Link';

export type HeadingAuthorProps = TextProps & {
  children: React.ReactNode;
  path?: string;
  target?: string;
  className?: string;
};
export const HeadingAuthor = (props: HeadingAuthorProps) => {
  const {
    children,
    path = '',
    fontSize = '16px',
    className,
    target = '_self',
    ...textProps
  } = props;
  return (
    <Box
      as={CustomLink}
      href={path}
      target={target}
      className={className}
      textTransform="uppercase"
      fontSize={fontSize}
      data-testid="author"
      color="secondary"
      fontFamily="bahijMitra"
      _hover={{ color: 'primary' }}
      {...textProps}
    >
      {children}
    </Box>
  );
};
