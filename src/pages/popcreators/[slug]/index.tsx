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
import type { TAuthorPage } from '@/containers/author';
import { Meta } from '@/layouts/Meta';
import { CategoryPageScript } from '@/layouts/Script';
import type { DeviceViewProps } from '@/types';
import type { AuthorPageResponse } from '@/types/responses/pages/author';
import type { IRedirection } from '@/types/responses/pages/redirection';
import { isPageFound } from '@/utils/DetectPage';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const Author = dynamic<TAuthorPage>(() => import('@/containers/author'));
const Main = dynamic<any>(() => import('@/templates/Main'));
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));
export default function PageDetailPopcreator({
  isDesktop,
  isMobile,
}: DeviceViewProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isSuccess, isError, ...rest } =
    useDefaultPages<AuthorPageResponse>({ end_point: `user/${slug}` });

  const { error }: any = rest;
  if (isError && error?.response.status === 500) {
    return <Custom500 />;
  }
  if (
    (isSuccess && Array.isArray(data.user)) ||
    (isError && error?.response.status === 404)
  ) {
    return <Custom404 />;
  }
  return (
    <Main
      script={<CategoryPageScript />}
      meta={
        <Meta
          description={`Kumpulan artikel ${data?.user?.name} hanya di Popbela.`}
          slug={data?.user?.username}
          title={`${data?.user?.name} - POPBELA.com`}
          url={`https://www.popbela.com/popcreators/${data?.user?.username}`}
        />
      }
      isDesktop={isDesktop}
      isMobile={isMobile}
    >
      {isSuccess && (
        <Author isDesktop={isDesktop} isMobile={isMobile} data={data} />
      )}
    </Main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { slug } = query;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([`user/${slug}`, 'v1'], () =>
    getDefaultSSRPages({ end_point: `user/${slug}` })
  );
  const isPageAvailable = isPageFound(
    `user/${slug}`,
    'user',
    dehydrate(queryClient)
  );
  if (isPageAvailable) {
    const { redirection }: IRedirection = await getRedirectionPages(
      `v1/redirection?url=/popcreators/${slug}`
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
