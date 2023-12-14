/* eslint-disable @typescript-eslint/naming-convention */
import type { ButtonProps as ButtonWrapProps } from '@chakra-ui/button';
import { Button as ButtonWrap } from '@chakra-ui/button';

import { CustomLink } from '@/components/Link';

export type ButtonProps = ButtonWrapProps & {
  children: React.ReactNode;
  buttonlink?: boolean;
  url?: string;
};
export const Button = (props: ButtonProps) => {
  const {
    children,
    url = 'https://popbela.com',
    buttonlink = false,
    borderRadius = 'unset',
    borderColor = 'secondary',
    borderWidth = 1,
    background = 'white',
    _hover = {},
    ...buttonProps
  } = props;
  const defaultStyle: ButtonWrapProps = {
    borderRadius,
    borderColor,
    borderWidth,
    background,
    _hover: {
      background: 'primary',
      color: 'white',
      borderColor: 'primary',
      ..._hover,
    },
    ...buttonProps,
  };
  return buttonlink ? (
    <CustomLink href={url}>
      <ButtonWrap data-testid="button" {...defaultStyle}>
        {children}
      </ButtonWrap>
    </CustomLink>
  ) : (
    <ButtonWrap data-testid="button" {...defaultStyle}>
      {children}
    </ButtonWrap>
  );
};
