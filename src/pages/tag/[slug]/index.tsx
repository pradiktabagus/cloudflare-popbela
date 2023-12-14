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
import type { TTag } from '@/containers/tag';
import { Meta } from '@/layouts/Meta';
import { CategoryPageScript } from '@/layouts/Script';
import type { DeviceViewProps } from '@/types';
import type { IRedirection } from '@/types/responses/pages/redirection';
import type { TagPageResponse } from '@/types/responses/pages/tag';
import { getDeviceFromReq } from '@/utils/DeviceDetect';
import { hostNameOrigin } from '@/utils/hostnameOrigin';

const Tag = dynamic<TTag>(() => import('@/containers/tag'));
const Main = dynamic<any>(() => import('@/templates/Main'));
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));
export default function PageTag({ isDesktop, isMobile }: DeviceViewProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isSuccess, isError, ...rest } =
    useDefaultPages<TagPageResponse>({ end_point: `tag/${slug}` });
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
  if (isError && error?.response.status === 404) {
    return <Custom404 />;
  }
  return (
    <Main
      script={<CategoryPageScript />}
      meta={
        <Meta
          meta_title={
            data?.data?.meta_title ??
            `Berita ${data?.data?.title} Terbaru dan Terkini Hari Ini`
          }
          meta_description={
            data?.data?.description ??
            `Kumpulan berita ${data?.data?.title} terbaru dan terkini hari ini bisa kamu simak dengan lengkap disini dari berbagai macam sudut pandang`
          }
          description={`Kumpulan artikel Tentang ${data?.data?.title} terbaru dan terlengkap hari ini bisa kamu baca secara update disini.`}
          slug={data?.data?.slug}
          title={`Kumpulan Artikel Tentang ${data?.data?.title} Terbaru - Popbela.com`}
          url={`https://www.popbela.com/tag/${data?.data?.slug}`}
          img_cover={`${hostNameOrigin()}/v3/assets/images/global/popbela.png`}
        />
      }
      isDesktop={isDesktop}
      isMobile={isMobile}
    >
      {isSuccess && (
        <Tag isDesktop={isDesktop} isMobile={isMobile} data={data} />
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

  try {
    await queryClient.fetchQuery([`tag/${slug}`, 'v1'], () =>
      getDefaultSSRPages({ end_point: `tag/${slug}` })
    );
  } catch (error: any) {
    if (error.response.status === 404) {
      const { redirection }: IRedirection = await getRedirectionPages(
        `v1/redirection?url=/tag/${slug}`
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
