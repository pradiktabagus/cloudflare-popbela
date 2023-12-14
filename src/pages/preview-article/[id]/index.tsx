import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useDefaultPages } from '@/adapters/hooks/pages';
import { getDefaultSSRPages, getRedirectionPages } from '@/adapters/request';
import type { TPreviewArticle } from '@/containers/preview-article';
import type { DeviceViewProps } from '@/types';
import type { ResponsePreviewArticlePage } from '@/types/responses/pages/preview-article';
import type { IRedirection } from '@/types/responses/pages/redirection';
import { isPageFound } from '@/utils/DetectPage';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const PreviewArticle = dynamic<TPreviewArticle>(
  () => import('@/containers/preview-article')
);
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));
const PreviewArticlePage = ({ isDesktop, isMobile }: DeviceViewProps) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isSuccess, isError, ...rest } =
    useDefaultPages<ResponsePreviewArticlePage>({
      end_point: `article/preview/${id}`,
    });

  const { error }: any = rest;
  if (isError && error?.response.status === 500) {
    return <Custom500 />;
  }
  if (
    (isSuccess && Array.isArray(data)) ||
    (isError && error?.response.status === 404)
  ) {
    return <Custom404 />;
  }

  return (
    <main className="w-full py-20 md:py-40">
      {isSuccess && (
        <PreviewArticle isDesktop={isDesktop} isMobile={isMobile} data={data} />
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id } = query;

  const queryClient = new QueryClient();

  const queryKey = `article/preview/${id}`;

  await queryClient.prefetchQuery([queryKey, 'v1'], () =>
    getDefaultSSRPages({ end_point: queryKey })
  );
  const isPageAvailable = isPageFound(
    queryKey,
    'preview',
    dehydrate(queryClient)
  );
  if (isPageAvailable) {
    const { redirection }: IRedirection = await getRedirectionPages(
      `v1/redirection?url=/preview/${id}`
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
  const devices = getDeviceFromReq(req);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...devices,
    },
  };
};

export default PreviewArticlePage;
