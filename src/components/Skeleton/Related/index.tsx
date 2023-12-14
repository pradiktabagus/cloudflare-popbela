import dynamic from 'next/dynamic';

import clsxm from '@/utils/clsxm';

const SkeletonBox = dynamic(() =>
  import('../SkeletonBox').then((mod) => mod.SkeletonBox)
);
const SkeletonRelated = ({
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
        isDesktop ? 'grid-cols-3 gap-x-[30px]' : 'grid-cols-1 gap-y-[30px]'
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
              isDesktop ? 'h-[150px] w-[225px]' : 'h-[155px] w-[130px]'
            )}
          />
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
        </div>
      ))}
    </div>
  );
};
export default SkeletonRelated;
