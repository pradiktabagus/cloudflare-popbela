import type { ContainerProps } from '@chakra-ui/layout';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { getDefaultComponent } from '@/adapters/request';
import type { DeviceViewProps } from '@/types/device';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const Main = dynamic<any>(() => import('@/templates/Main'));

const SearchContainer = dynamic<any>(() =>
  import('@/components/SearchContainer').then(
    (searchContainer) => searchContainer.SearchContainer
  )
);

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);

export default function Search({ isDesktop, isMobile }: DeviceViewProps) {
  return (
    <Main
      isDesktop={isDesktop}
      isMobile={isMobile}
      meta={
        <NextSeo
          title="Search POPBELA.com"
          description="Popbela.com is a fashion, beauty, and lifestyle digital media company for Millennials and Gen Z women in Indonesia."
        />
      }
    >
      <ContainerSection maxWidth="full">
        <SearchContainer isMobile={isMobile} isDesktop={isDesktop} />
      </ContainerSection>
    </Main>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const queryClient = new QueryClient();

  await Promise.all([
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
