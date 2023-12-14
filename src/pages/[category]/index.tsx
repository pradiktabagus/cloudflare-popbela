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
import type { TCategory } from '@/containers/category';
import { Meta } from '@/layouts/Meta';
import { CategoryPageScript } from '@/layouts/Script';
import type { DeviceViewProps } from '@/types';
import type { CategoryPageResponse } from '@/types/responses/pages/category';
import type { IRedirection } from '@/types/responses/pages/redirection';
import { isPageFound } from '@/utils/DetectPage';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const Category = dynamic<TCategory>(() => import('@/containers/category'));
const Main = dynamic<any>(() => import('@/templates/Main'));
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));
export default function PageCategory({ isDesktop, isMobile }: DeviceViewProps) {
  const router = useRouter();
  const { category } = router.query;
  const { data, isSuccess, isError, ...rest } =
    useDefaultPages<CategoryPageResponse>({
      end_point: `homepage/${category}`,
    });
  const { error }: any = rest;
  if (isError && error?.response.status === 500) {
    return <Custom500 />;
  }
  if (
    (isSuccess && Array.isArray(data.meta)) ||
    (isError && error?.response.status === 404)
  ) {
    return <Custom404 />;
  }
  return (
    <Main
      script={<CategoryPageScript />}
      meta={
        <Meta
          description={data?.meta?.description}
          slug={data?.meta?.slug}
          title={data?.meta?.meta}
          url={`https://www.popbela.com${data?.meta?.category_url}`}
        />
      }
      isDesktop={isDesktop}
      isMobile={isMobile}
      ads={{
        adUnit: 'Category',
      }}
    >
      {isSuccess && (
        <Category isDesktop={isDesktop} isMobile={isMobile} data={data} />
      )}
    </Main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { category } = query;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([`homepage/${category}`, 'v1'], () =>
    getDefaultSSRPages({ end_point: `homepage/${category}` })
  );
  const isPageAvailable = isPageFound(
    `/v1/homepage/${category}`,
    'meta',
    dehydrate(queryClient)
  );
  if (isPageAvailable) {
    const { redirection }: IRedirection = await getRedirectionPages(
      `v1/redirection?url=/${category}`
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
