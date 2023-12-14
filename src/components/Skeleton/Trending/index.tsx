import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import clsxm from '@/utils/clsxm';

const SkeletonBox = dynamic(() =>
  import('../SkeletonBox').then((mod) => mod.SkeletonBox)
);
const SkeletonTrending = ({
  dataDummy,
  isDesktop,
}: {
  dataDummy: number[];
  isDesktop?: boolean;
}) => {
  return (
    <Fragment>
      {dataDummy.map((_, i) => (
        <div
          key={i}
          className={clsxm(
            'relative flex w-full',
            isDesktop ? 'gap-2' : 'h-[149px]'
          )}
        >
          {isDesktop && (
            <SkeletonBox className="h-[92px] w-[92px] rounded leading-none" />
          )}
          <div
            className={clsxm(
              'relative flex flex-col',
              isDesktop
                ? 'h-[92px] flex-[1]'
                : 'w-full items-center justify-center'
            )}
          >
            <SkeletonBox
              className={clsxm(
                'mb-2 h-2 rounded leading-none',
                isDesktop ? 'w-full' : 'w-1/3'
              )}
            />
            <SkeletonBox className="mb-2 h-2 w-full rounded leading-none" />
            <SkeletonBox className="mb-2 h-2 w-1/2 rounded leading-none" />
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export default SkeletonTrending;
