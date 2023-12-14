import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import clsxm from '@/utils/clsxm';

const SkeletonBox = dynamic(() =>
  import('../SkeletonBox').then((mod) => mod.SkeletonBox)
);
const SkeletonExclusive = ({
  dataDummy,
  isDesktop,
}: {
  dataDummy: number[];
  isDesktop?: boolean;
}) => {
  return (
    <div
      className={clsxm(
        `grid mb-4`,
        isDesktop ? 'grid-cols-4 gap-x-[30px]' : 'grid-cols-1 gap-y-[30px]'
      )}
    >
      {dataDummy.map((_, i) => (
        <div
          key={i}
          className={clsxm(
            'relative flex w-full gap-2',
            isDesktop ? 'flex-col' : 'flex-row'
          )}
        >
          <SkeletonBox
            className={clsxm(
              ' rounded leading-none',
              isDesktop ? 'h-[307px] w-[255px]' : 'h-[309px] w-[414px]'
            )}
          />
          {isDesktop ? (
            <Fragment>
              <div className="relative flex h-[92px] flex-[1] flex-col">
                <SkeletonBox className="mb-6 h-2 w-1/2 rounded leading-none" />
                <SkeletonBox className="mb-2 h-2 w-full rounded leading-none" />
                <SkeletonBox className="mb-2 h-2 w-full rounded leading-none" />
                <SkeletonBox className="mb-2 h-2 w-1/2 rounded leading-none" />
              </div>
              <div className="flex justify-between">
                <SkeletonBox className="mb-6 h-2 w-1/3 rounded leading-none" />
                <SkeletonBox className="mb-6 h-2 w-1/3 rounded leading-none" />
              </div>
            </Fragment>
          ) : (
            <div className="absolute bottom-0 left-0 h-1/3 w-9/12 bg-white p-4">
              <SkeletonBox className="mb-[4px] h-2 w-1/2 rounded leading-none" />
              <SkeletonBox className="mb-[4px] h-2 w-full rounded leading-none" />
              <SkeletonBox className="mb-[4px] h-2 w-full rounded leading-none" />
              <div className="flex justify-between">
                <SkeletonBox className="mb-[4px] h-2 w-1/3 rounded leading-none" />
                <SkeletonBox className="mb-[4px] h-2 w-1/3 rounded leading-none" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default SkeletonExclusive;
