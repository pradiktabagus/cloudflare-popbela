import type { HeadingProps } from '@chakra-ui/layout';
import { Heading as ChakraHeading } from '@chakra-ui/layout';
import { useMemo } from 'react';

export function Index({ children, color }: HeadingProps) {
  return <ChakraHeading color={color}>{children}</ChakraHeading>;
}

export type HeadingVariantProps = HeadingProps & {
  variant?: 'section' | 'category' | 'titlearticle';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

type FontStyle = Pick<
  HeadingVariantProps,
  'fontFamily' | 'fontSize' | 'fontWeight'
>;

export const HeadingVariant = ({
  variant = 'section',
  fontSize,
  fontFamily,
  fontWeight,
  color = 'primary',
  textTransform = 'uppercase',
  _hover,
  children,
  as = 'h2',
  ...otherProps
}: HeadingVariantProps) => {
  const fontStyle = useMemo((): FontStyle => {
    switch (variant) {
      case 'section':
        return {
          fontFamily: 'futuraTemeed',
          fontSize: '30px',
          fontWeight: '500',
        };
      case 'category':
        return {
          fontFamily: 'futuraBook',
          fontSize: '18px',
          fontWeight: '500',
        };
      case 'titlearticle':
        return {
          fontFamily: 'limerick',
          fontSize: '30px',
          fontWeight: '700',
        };
      default:
        return {};
    }
  }, [variant]);

  return (
    <ChakraHeading
      as={as}
      fontSize={fontSize ?? fontStyle.fontSize}
      fontFamily={fontFamily ?? fontStyle.fontFamily}
      fontWeight={fontWeight ?? fontStyle.fontWeight}
      color={color}
      textTransform={textTransform}
      _hover={_hover}
      {...otherProps}
    >
      {children}
    </ChakraHeading>
  );
};
