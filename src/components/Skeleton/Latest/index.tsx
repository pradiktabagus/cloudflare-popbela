import dynamic from 'next/dynamic';
import { Fragment } from 'react';

const SkeletonBox = dynamic(() =>
  import('../SkeletonBox').then((mod) => mod.SkeletonBox)
);
const SkeletonLatest = ({ dataDummy }: { dataDummy: number[] }) => {
  return (
    <Fragment>
      {dataDummy.map((_, i) => (
        <div key={i} className="relative flex w-full gap-2">
          <SkeletonBox className="h-[170px] w-[133px] rounded leading-none" />
          <div className="relative flex h-[92px] flex-[1] flex-col">
            <SkeletonBox className="mb-6 h-2 w-1/2 rounded leading-none" />
            <SkeletonBox className="mb-2 h-2 w-full rounded leading-none" />
            <SkeletonBox className="mb-2 h-2 w-full rounded leading-none" />
            <SkeletonBox className="mb-2 h-2 w-1/2 rounded leading-none" />
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export default SkeletonLatest;
