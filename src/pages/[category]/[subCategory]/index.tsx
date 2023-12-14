import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDefaultPages } from '@/adapters/hooks/pages';
import {
  getDefaultComponent,
  getDefaultSSRPages,
  getRedirectionPages,
} from '@/adapters/request';
import type { TSubCategory } from '@/containers/sub-category';
import { Meta } from '@/layouts/Meta';
import { SubCategoryPageScript } from '@/layouts/Script';
import type { DeviceViewProps } from '@/types';
import type { CategoryPageResponse } from '@/types/responses/pages/category';
import type { IRedirection } from '@/types/responses/pages/redirection';
import { isPageFound } from '@/utils/DetectPage';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const SubCategory = dynamic<TSubCategory>(
  () => import('@/containers/sub-category')
);
const Main = dynamic<any>(() => import('@/templates/Main'));
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));
export default function PageSubCategory({
  isDesktop,
  isMobile,
}: DeviceViewProps) {
  const router = useRouter();
  const { category, subCategory } = router.query;
  const { data, isSuccess, isError, ...rest } =
    useDefaultPages<CategoryPageResponse>({
      end_point: `homepage/${category}/${subCategory}`,
    });
  const [pos, setPos] = useState('top');
  const topSign = useInView();
  const bottomSign = useInView();
  useEffect(() => {
    if (topSign.inView && pos === 'bottom') {
      setPos('top');
    } else if (bottomSign.inView && pos === 'top') {
      setPos('bottom');
    }
  }, [topSign.inView, bottomSign.inView, pos]);
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
      script={<SubCategoryPageScript />}
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
        adUnit: 'sub-category',
      }}
    >
      {isSuccess && (
        <SubCategory isDesktop={isDesktop} isMobile={isMobile} data={data} />
      )}
    </Main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { category, subCategory } = query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [`homepage/${category}/${subCategory}`, 'v1'],
    () =>
      getDefaultSSRPages({ end_point: `homepage/${category}/${subCategory}` })
  );
  const isPageAvailable = isPageFound(
    `/v1/homepage/${category}/${subCategory}`,
    'meta',
    dehydrate(queryClient)
  );
  if (isPageAvailable) {
    const { redirection }: IRedirection = await getRedirectionPages(
      `v1/redirection?url=/${category}/${subCategory}`
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
