import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { getDefaultComponent } from '@/adapters/request';
import type { TCyberMedia } from '@/containers/cyber-media-guidlines';
import type { DeviceViewProps } from '@/types/device';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const CyberMedia = dynamic<TCyberMedia>(
  () => import('@/containers/cyber-media-guidlines')
);
const Main = dynamic<any>(() => import('@/templates/Main'));
export default function index({ isDesktop, isMobile }: DeviceViewProps) {
  return (
    <Main
      isDesktop={isDesktop}
      isMobile={isMobile}
      meta={
        <NextSeo
          title="Cyber Guidelines POPBELA.com"
          description="Pedoman Media Siber POPBELA.com yang memenuhi fungsi, hak, dan kewajibannya sesuai Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik."
        />
      }
    >
      <CyberMedia isDesktop={isDesktop} isMobile={isMobile} />
    </Main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['/component/categories', 'v1'], () =>
    getDefaultComponent({ end_point: '/categories' })
  );
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
