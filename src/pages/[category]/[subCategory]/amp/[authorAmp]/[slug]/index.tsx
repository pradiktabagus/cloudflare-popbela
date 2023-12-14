import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as React from 'react';

import { usePageDetail } from '@/adapters/hooks/pages';
import {
  getDefaultComponent,
  getIncrementPageAmp,
  getPageDetail,
  getPromotionMarketing,
  getPublisher,
  getRedirectionPages,
  getSection,
} from '@/adapters/request';
import { DetailArticleAMPPageScript } from '@/layouts/Script';
import type { IAMPProps } from '@/templates/Amp';
import type { ItemPublisher } from '@/types/crossPublisher';
import type {
  ResponseDataArticle,
  Tag,
} from '@/types/responses/pages/detail-article';
import type { IRedirection } from '@/types/responses/pages/redirection';
import mapPublisher from '@/utils/cross-publisher.json';

export const config = { amp: true };

const AmpPage = dynamic<any>(() => import('@/containers/amp'));
const AMP = dynamic<IAMPProps>(() =>
  import('@/templates/Amp').then((layout) => layout.AMP)
);
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));

export default function DetailArtikelAmp() {
  const router = useRouter();
  const { slug, page, category, subCategory, authorAmp } = router.query;
  const key = `/${category}/${subCategory}/amp/${authorAmp}/${slug}`;
  const { data, isSuccess, isError, ...rest } =
    usePageDetail<ResponseDataArticle>(
      {
        end_point: `article/detail/${category}/${subCategory}/${authorAmp}/${slug}?show=${
          page ?? 'wrap'
        }&type=amp`,
      },
      key
    );
  const article = data?.data ?? ({} as ResponseDataArticle['data']);
  const { error }: any = rest;
  if (isError && error?.response?.status === 500) {
    return <Custom500 />;
  }
  if (isError && error?.response?.status === 404) {
    return <Custom404 />;
  }
  return (
    <AMP
      category={article.category.name}
      script={<DetailArticleAMPPageScript article={article} />}
    >
      {isSuccess && <AmpPage />}
    </AMP>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, subCategory, authorAmp, slug, page } = context.query;
  const key = `/${category}/${subCategory}/amp/${authorAmp}/${slug}`;
  const url = `/${category}/${subCategory}/${authorAmp}/${slug}?show=${
    page ?? 'wrap'
  }&type=amp`;
  const mabByCategory =
    mapPublisher.category.find((cat) => cat.category === category)?.publisher ??
    [];
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery([key], () =>
      getPageDetail({
        end_point: `article/detail${url}`,
      })
    );
    const { data }: any = queryClient.getQueryData([key]);
    await queryClient.prefetchQuery(
      [data?.tags.map(({ tag_slug }: Tag) => tag_slug)],
      () =>
        getPromotionMarketing({
          end_point: 'promotion-tags',
          params: data?.tags.map(({ tag_slug }: Tag) => tag_slug),
        })
    );
  } catch (error: any) {
    if (error.response.status === 404) {
      const { redirection }: IRedirection = await getRedirectionPages(
        `v1/redirection?url=/${category}/${subCategory}/amp/${authorAmp}/${slug}`
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
      getDefaultComponent({ end_point: '/trending-tags', version: 'v1' })
    ),
    queryClient.prefetchQuery(
      [`/article/related?category=${category}`, 'v2'],
      () =>
        getSection({
          end_point: `/article/related?category=${category}`,
          version: 'v2',
        })
    ),
    queryClient.prefetchQuery(
      [`/component/latest-article?category=${category}&page=1`, 'v2'],
      () =>
        getSection({
          end_point: `/component/latest-article?category=${category}&page=1`,
          version: 'v2',
        })
    ),
    mabByCategory?.map((item: ItemPublisher, i: number) =>
      queryClient.prefetchQuery(
        [`/feed/${item.name}/${item.category}`, i],
        () =>
          getPublisher({
            publisher: item.name,
            category: item.category,
            subCategory: item.subCategory,
            type: item.type,
          })
      )
    ),
  ]);

  await getIncrementPageAmp(`article/increment-views/${slug}`, 'v1');

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
