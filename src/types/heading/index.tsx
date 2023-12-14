import type { BoxProps } from '@chakra-ui/layout';
import type { ColorProps, TypographyProps } from '@chakra-ui/styled-system';

export type HeadingProps = Pick<ColorProps, 'color'> &
  Pick<
    TypographyProps,
    'fontWeight' | 'fontFamily' | 'fontSize' | 'textTransform'
  > &
  Pick<
    BoxProps,
    | '_after'
    | '_before'
    | 'children'
    | '_hover'
    | 'marginBottom'
    | 'display'
    | 'overflow'
    | 'alignItems'
  >;
