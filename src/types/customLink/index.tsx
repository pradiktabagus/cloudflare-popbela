import type { LinkProps as LinkWrapProps } from 'next/link';

export type LinkProps = Omit<LinkWrapProps, 'href'> & {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: '_blank' | '_self' | string;
  ariaLabel?: string;
};
