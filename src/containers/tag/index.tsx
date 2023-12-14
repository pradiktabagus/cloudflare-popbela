import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import type { DeviceViewProps } from '@/types';
import type { LatestProps } from '@/types/latest';
import type { TagPageResponse } from '@/types/responses/pages/tag';

export type TTag = DeviceViewProps & {
  data: TagPageResponse;
};

const SectionLatestTag = dynamic<LatestProps>(() =>
  import('@/sections/Latest/tag').then((mod) => mod.SectionLatestTag)
);
const Tag = ({ isDesktop, data }: TTag) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <h1 className="seo">{data?.data?.title}</h1>
      <SectionLatestTag
        data={data?.data?.articles}
        isDesktop={isDesktop}
        category={slug}
        titleLatest={data?.data?.title}
      />
    </>
  );
};
export default Tag;
