import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { getDefaultComponent } from '@/adapters/request';
import type { TContact } from '@/containers/contact';
import type { DeviceViewProps } from '@/types/device';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const Contact = dynamic<TContact>(() => import('@/containers/contact'));
const Main = dynamic<any>(() => import('@/templates/Main'));
export default function index({ isDesktop, isMobile }: DeviceViewProps) {
  return (
    <Main
      isDesktop={isDesktop}
      isMobile={isMobile}
      meta={
        <NextSeo
          title="Hubungi POPBELA.com"
          description="Popbela.com is a fashion, beauty, and lifestyle digital media company for Millennials and Gen Z women in Indonesia."
        />
      }
    >
      <Contact isDesktop={isDesktop} isMobile={isMobile} />
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
