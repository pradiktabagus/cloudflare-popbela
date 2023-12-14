import dynamic from 'next/dynamic';

import type { DeviceViewProps } from '@/types';
import type { LatestPopCreatorProps } from '@/types/latest';
import type { PopCreatorPageResponse } from '@/types/responses/pages/popcreator';

type TPopCreator = DeviceViewProps;

export type TPopCreatorPage = {
  data?: PopCreatorPageResponse;
} & TPopCreator;

const SectionLatestPopCreator = dynamic<LatestPopCreatorProps>(() =>
  import('@/sections/Latest/popcreator').then(
    (mod) => mod.SectionLatestPopCreator
  )
);

const PopCreator = ({ data, isDesktop }: TPopCreatorPage) => {
  return (
    <>
      <h1 className="seo">
        Popbela.com: A Pop-culture and Lifestyle for Millennials Women
      </h1>
      <SectionLatestPopCreator data={data?.popcreators} isDesktop={isDesktop} />
    </>
  );
};
export default PopCreator;
