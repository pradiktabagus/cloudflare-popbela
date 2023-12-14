import { Fragment } from 'react';

import type { DateDefaultProps } from '@/types/date';
import { toStringFromUnix } from '@/utils/toDateFromUnix';

export const DateMinDay = ({ date }: DateDefaultProps) => {
  const dateString = toStringFromUnix(date, 'MMMM YYYY');
  return <Fragment>{dateString}</Fragment>;
};
