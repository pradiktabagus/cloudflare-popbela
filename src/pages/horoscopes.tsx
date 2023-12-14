import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useDefaultPages } from '@/adapters/hooks/pages';
import { getDefaultComponent, getDefaultSSRPages } from '@/adapters/request';
import type { THoroscope } from '@/containers/horoscopes';
import { Meta } from '@/layouts/Meta';
import type { DeviceViewProps } from '@/types/device';
import type { ResponseHoroscopes } from '@/types/responses/pages/horoscopes';
import { getDeviceFromReq } from '@/utils/DeviceDetect';
import { getCurrentDate } from '@/utils/toDateFromUnix';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(['horoscopes', 'v1'], () =>
      getDefaultSSRPages({ end_point: 'horoscopes' })
    ),
    queryClient.prefetchQuery(['/component/categories', 'v1'], () =>
      getDefaultComponent({ end_point: '/categories' })
    ),
    queryClient.prefetchQuery(['/component/trending-tags', 'v1'], () =>
      getDefaultComponent({ end_point: '/trending-tags' })
    ),
  ]);
  const devices = getDeviceFromReq(req);
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${10}, stale-while-revalidate=59`
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...devices,
    },
  };
};

const Horoscopes = dynamic<THoroscope>(() => import('@/containers/horoscopes'));
const Main = dynamic<any>(() => import('@/templates/Main'));
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Index = ({ isDesktop, isMobile }: DeviceViewProps) => {
  const router = useRouter();
  const { isSuccess, isError, ...rest } = useDefaultPages<ResponseHoroscopes>({
    end_point: 'horoscopes',
  });
  const { error }: any = rest;
  if (isError && error?.response.status === 500) {
    return <Custom500 />;
  }
  const currentDate = getCurrentDate('DD MMMM YYYY');

  return (
    <Main
      meta={
        <Meta
          description={`Ramalan zodiak hari ini ${currentDate} tentang cinta,karir,keuangan serta kesehatan terbaru dan terlengkap. Simak juga ulasan lengkap karakter serta sifatmu disini.`}
          slug={router.pathname}
          title={`Ramalan Zodiak Hari Ini ${currentDate}`}
          url={`https://www.popbela.com${router.pathname}`}
        />
      }
      isDesktop={isDesktop}
      isMobile={isMobile}
    >
      {isSuccess && <Horoscopes isDesktop={isDesktop} isMobile={isMobile} />}
    </Main>
  );
};

export default Index;
