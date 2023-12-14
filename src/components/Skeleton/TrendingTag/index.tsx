import dynamic from 'next/dynamic';

const SkeletonBox = dynamic(() =>
  import('../SkeletonBox').then((mod) => mod.SkeletonBox)
);
const SkeletonTrendingTag = ({ dataDummy }: { dataDummy: number[] }) => {
  return (
    <div className="relative">
      <ul className="mb-0 flex h-full pl-5">
        {dataDummy.map((_, i) => (
          <li key={i} className="flex items-center py-[5px] pl-0 pr-[15px]">
            <SkeletonBox className="h-6 w-36 rounded leading-none" />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SkeletonTrendingTag;
