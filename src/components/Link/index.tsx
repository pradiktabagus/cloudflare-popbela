import Link from 'next/link';

import type { LinkProps } from '@/types/customLink';

export function CustomLink(props: LinkProps) {
  const {
    children,
    href = '/',
    className,
    target = '_self',
    ariaLabel = '',
    onClick,
  } = props;
  return (
    <Link
      {...props}
      href={href || '/'}
      rel="noopener"
      className={className}
      target={target}
      aria-label={ariaLabel && ariaLabel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
