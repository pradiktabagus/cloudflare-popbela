import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { useDefaultPages } from '@/adapters/hooks/pages';
import { getDefaultComponent, getDefaultSSRPages } from '@/adapters/request';
import type { THomepage } from '@/containers/homepage';
import { Meta } from '@/layouts/Meta';
import { HomePageScript } from '@/layouts/Script';
import type { DeviceViewProps } from '@/types/device';
import type { IHomepage } from '@/types/responses/pages/homepage';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const Homepage = dynamic<THomepage>(() => import('@/containers/homepage'));

const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Main = dynamic<any>(() => import('@/templates/Main'));
const Index = ({ isDesktop, isMobile }: DeviceViewProps) => {
  const { data, isSuccess, isError, ...rest } = useDefaultPages<IHomepage>({
    end_point: 'homepage',
  });
  const { error }: any = rest;

  if (isError && error?.response?.status === 500) {
    return <Custom500 />;
  }
  return (
    <Main
      meta={
        <Meta
          description="POPBELA.com adalah media digital multi-platform tentang fashion, kecantikan, kultur pop, dan gaya hidup untuk perempuan Millennial & Gen Z di Indonesia."
          slug=""
          title="Popbela.com: A Pop-culture & Lifestyle for Millennials Women"
          url="https://www.popbela.com"
        />
      }
      ads={{
        adUnit: 'Homepage',
      }}
      isDesktop={isDesktop}
      isMobile={isMobile}
      script={<HomePageScript />}
    >
      {isSuccess && (
        <Homepage isDesktop={isDesktop} isMobile={isMobile} data={data} />
      )}
    </Main>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(['homepage', 'v1'], () =>
      getDefaultSSRPages({ end_point: 'homepage' })
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
      dehydratedState: dehydrate(queryClient),
      ...devices,
    },
  };
};
