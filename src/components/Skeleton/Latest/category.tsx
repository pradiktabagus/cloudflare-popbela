import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import clsxm from '@/utils/clsxm';

const SkeletonBox = dynamic(() =>
  import('../SkeletonBox').then((mod) => mod.SkeletonBox)
);
const SkeletonLatestCategory = ({
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
            'relative flex w-full rounded ',
            isDesktop ? 'flex-col bg-white' : 'flex-row'
          )}
        >
          <SkeletonBox
            className={clsxm(
              'rounded leading-none',
              isDesktop ? 'h-[229px] w-full' : 'w-[130px] h-[155px]'
            )}
          />
          <div
            className={clsxm(
              'relative flex flex-col',
              isDesktop
                ? 'h-[179px] px-[30px] py-[15px]'
                : 'h-[155px] w-full flex-1 p-[10px]'
            )}
          >
            <SkeletonBox className="mb-6 h-2 w-1/2 rounded leading-none" />
            <SkeletonBox className="mb-2 h-2 w-full rounded leading-none" />
            <SkeletonBox className="mb-2 h-2 w-full rounded leading-none" />
            <SkeletonBox className="mb-2 h-2 w-1/2 rounded leading-none" />
            <div
              className={clsxm(
                'absolute bottom-[15px]',
                isDesktop ? 'left-[30px]' : 'left-[10px]'
              )}
            >
              <SkeletonBox className="h-2 w-[100px] rounded leading-none" />
            </div>
            <div
              className={clsxm(
                'absolute bottom-[15px]',
                isDesktop ? 'right-[30px]' : 'right-[10px]'
              )}
            >
              <SkeletonBox className="h-2 w-[100px] rounded leading-none" />
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export default SkeletonLatestCategory;
