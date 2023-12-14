import type { HeadingProps } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';

import type { BrandFontFamily, HeadingLevel } from '@/types/typography';

export type HeadingTitleProps = {
  as?: HeadingLevel;
  fontFamily?: BrandFontFamily;
} & Omit<HeadingProps, 'fontFamily'>;

export const HeadingTitle = ({
  as = 'h2',
  fontFamily = 'limerick',
  children,
  ...otherProps
}: HeadingTitleProps) => {
  return (
    <Heading as={as} fontFamily={fontFamily} {...otherProps}>
      {children}
    </Heading>
  );
};
