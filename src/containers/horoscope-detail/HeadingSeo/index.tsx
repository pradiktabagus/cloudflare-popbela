import dynamic from 'next/dynamic';

import type { DateDefaultProps } from '@/types/date';

const DateDefault = dynamic<DateDefaultProps>(() =>
  import('@/components/Date/index').then((mod) => mod.DateDefault)
);
const HeadingSeo = ({ horoscope }: { horoscope: string }) => {
  const date = new Date(Date.now());
  return (
    <h1 className="seo">
      {`Ramalan Zodiak ${horoscope} Hari Ini `}
      <DateDefault date={Math.floor(date.getTime() / 1000)} />
    </h1>
  );
};
export default HeadingSeo;
