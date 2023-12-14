import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { useDefaultPages } from '@/adapters/hooks/pages';
import { getDefaultComponent, getDefaultSSRPages } from '@/adapters/request';
import type { TPopCreatorPage } from '@/containers/popcreator';
import { Meta } from '@/layouts/Meta';
import { CategoryPageScript } from '@/layouts/Script';
import type { DeviceViewProps } from '@/types';
import type { PopCreatorPageResponse } from '@/types/responses/pages/popcreator';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const PopCreator = dynamic<TPopCreatorPage>(
  () => import('@/containers/popcreator')
);
const Main = dynamic<any>(() => import('@/templates/Main'));
const Custom500 = dynamic<any>(() => import('@/pages/500'));
export default function PagePopCreator({
  isDesktop,
  isMobile,
}: DeviceViewProps) {
  const { data, isSuccess, isError, ...rest } =
    useDefaultPages<PopCreatorPageResponse>({ end_point: 'popcreator' });

  const { error }: any = rest;
  if (isError && error?.response.status === 500) {
    return <Custom500 />;
  }
  return (
    <Main
      script={<CategoryPageScript />}
      meta={
        <Meta
          description="Kisah perempuan muda yang menginspirasi pilihan POPBELA.com dalam bidang fashion, kecantikan, kisah sukses dan kehidupan bulan ini."
          slug="popcreators"
          title="PopCreators | POPBELA.com"
          url="https://www.popbela.com/popcreators"
          alt_image="POPBELA.com"
        />
      }
      isDesktop={isDesktop}
      isMobile={isMobile}
    >
      {isSuccess && (
        <PopCreator isDesktop={isDesktop} isMobile={isMobile} data={data} />
      )}
    </Main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(['popcreator', 'v1'], () =>
      getDefaultSSRPages({ end_point: 'popcreator' })
    ),
    queryClient.prefetchQuery(['/component/categories', 'v1'], () =>
      getDefaultComponent({ end_point: '/categories' })
    ),
    queryClient.prefetchQuery(['/component/trending-tags', 'v1'], () =>
      getDefaultComponent({ end_point: '/trending-tags' })
    ),
  ]);
  const devices = getDeviceFromReq(req);
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...devices,
    },
  };
};
