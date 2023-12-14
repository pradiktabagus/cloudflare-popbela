import { Fragment } from 'react';

import type { DateDefaultProps } from '@/types/date';
import { toStringFromUnix } from '@/utils/toDateFromUnix';

export const DateDefault = ({ date }: DateDefaultProps) => {
  const dateString = toStringFromUnix(date, 'DD MMMM YYYY');
  return <Fragment>{dateString}</Fragment>;
};
