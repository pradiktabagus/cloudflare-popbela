import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useDefaultPages } from '@/adapters/hooks/pages';
import {
  getDefaultComponent,
  getDefaultSSRPages,
  getRedirectionPages,
} from '@/adapters/request';
import type { THoroscopeDetail } from '@/containers/horoscope-detail';
import { Meta } from '@/layouts/Meta';
import type { DeviceViewProps } from '@/types';
import type { IHoroscopeDetail } from '@/types/responses/pages/detail-horoscopes';
import type { IRedirection } from '@/types/responses/pages/redirection';
import { isPageFound } from '@/utils/DetectPage';
import { getDeviceFromReq } from '@/utils/DeviceDetect';
import { getCurrentDate } from '@/utils/toDateFromUnix';

const HoroscopeDetail = dynamic<THoroscopeDetail>(
  () => import('@/containers/horoscope-detail')
);
const Main = dynamic<any>(() => import('@/templates/Main'));
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));
export default function PageTag({ isDesktop, isMobile }: DeviceViewProps) {
  const router = useRouter();
  const { slugZodiac } = router.query;
  const { data, isSuccess, isError, ...rest } =
    useDefaultPages<IHoroscopeDetail>({ end_point: `horoscope/${slugZodiac}` });
  const { error }: any = rest;
  if (isError && error?.response.status === 500) {
    return <Custom500 />;
  }
  if (
    (isSuccess && Array.isArray(data.horoscope)) ||
    (isError && error?.response.status === 404)
  ) {
    return <Custom404 />;
  }
  const currentDate = getCurrentDate('DD MMMM YYYY');
  return (
    <Main
      meta={
        <Meta
          meta_title={data?.horoscope?.meta_title}
          meta_description={data?.horoscope?.meta_description}
          slug={data?.horoscope?.slug}
          description={`Ramalan zodiak hari ini ${currentDate} tentang cinta,karir,keuangan serta kesehatan terbaru dan terlengkap. Simak juga ulasan lengkap karakter serta sifatmu disini.`}
          title={`Ramalan Zodiak Hari Ini ${currentDate}`}
          url={`https://www.popbela.com/horoscope/${data?.horoscope?.slug}`}
        />
      }
      isDesktop={isDesktop}
      isMobile={isMobile}
    >
      {isSuccess && (
        <HoroscopeDetail
          isDesktop={isDesktop}
          isMobile={isMobile}
          data={data}
        />
      )}
    </Main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { slugZodiac } = query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([`horoscope/${slugZodiac}`, 'v1'], () =>
    getDefaultSSRPages({ end_point: `horoscope/${slugZodiac}` })
  );
  const isPageAvailable = isPageFound(
    `horoscope/${slugZodiac}`,
    'horoscope',
    dehydrate(queryClient)
  );
  if (isPageAvailable) {
    const { redirection }: IRedirection = await getRedirectionPages(
      `v1/redirection?url=/horoscope/${slugZodiac}`
    );
    if (redirection?.status_code !== 404) {
      return {
        props: {},
        redirect: {
          destination: redirection?.url,
          statusCode: Number(redirection?.status_code),
        },
      };
    }
    return {
      props: {},
      notFound: true,
    };
  }
  await Promise.all([
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
