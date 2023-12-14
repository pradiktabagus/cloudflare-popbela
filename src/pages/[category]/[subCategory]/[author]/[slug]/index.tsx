/* eslint-disable @typescript-eslint/naming-convention */
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useIncrementPage, usePageDetail } from '@/adapters/hooks/pages';
import {
  getPageDetail,
  getPublisher,
  getRedirectionPages,
  getSection,
} from '@/adapters/request';
import type { TDetail } from '@/containers/detail';
import { Meta } from '@/layouts/Meta';
import { DetailArticlePageScript } from '@/layouts/Script';
import { SchemaRecipe } from '@/layouts/Script/SchemaRecipe';
import type { ItemPublisher } from '@/types/crossPublisher';
import type { DeviceViewProps } from '@/types/device';
import type {
  ArticleCover,
  ResponseDataArticle,
} from '@/types/responses/pages/detail-article';
import type { IRedirection } from '@/types/responses/pages/redirection';
import mapPublisher from '@/utils/cross-publisher.json';
import { getDeviceFromReq } from '@/utils/DeviceDetect';
import { toSafetyStringSEO } from '@/utils/TextTransform';

const Detail = dynamic<TDetail>(() => import('@/containers/detail'));
const Main = dynamic<any>(() => import('@/templates/Main'));
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));

export default function DetailArtikel({
  isDesktop,
  isMobile,
}: DeviceViewProps) {
  const router = useRouter();
  const { slug, scriptkey, category, subCategory, author } = router.query;
  const key = `/${category}/${subCategory}/${author}/${slug}`;
  const { data, isSuccess, isError, ...rest } =
    usePageDetail<ResponseDataArticle>(
      { end_point: `article/detail${key}` },
      key
    );

  const article = data?.data ?? ({} as ResponseDataArticle['data']);
  const cover =
    article?.article_details?.find(({ type }) => type === 'cover')?.cover ??
    ({} as ArticleCover);
  useIncrementPage(`v1/article/increment-views/${slug}`);

  const { error }: any = rest;
  if (isError && error?.response?.status === 500) {
    return <Custom500 />;
  }
  if (isError && error?.response?.status === 404) {
    return <Custom404 />;
  }
  return (
    <Main
      script={
        scriptkey === process.env.dfp_network_id ? null : (
          <DetailArticlePageScript
            article={article}
            isMobile={isMobile}
            otherScript={SchemaRecipe({
              data: {
                listicle: article?.article_details,
                cover,
                release_date: article?.release_date,
                author_name: article?.author?.name ?? 'Popbela',
                meta_description: toSafetyStringSEO(
                  article.meta_description ?? article.excerpt
                ),
                tags: article.tags,
              },
            })}
          />
        )
      }
      ads={{
        adUnit: 'Detail-artikel',
      }}
      meta={
        <Meta
          meta_title={toSafetyStringSEO(article?.meta_title)}
          meta_description={toSafetyStringSEO(article?.meta_description)}
          slug={article?.slug}
          title={article?.title}
          description={article?.excerpt}
          url={`https://www.popbela.com${article?.article_url}`}
          img_cover={cover?.source_url}
          author={article?.author?.name}
        />
      }
      isDesktop={isDesktop}
      isMobile={isMobile}
    >
      {isSuccess && (
        <Detail isDesktop={isDesktop} isMobile={isMobile} data={data} />
      )}
    </Main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
  req,
  query,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const { category, subCategory, author, slug } = query;
  const url = `/${category}/${subCategory}/${author}/${slug}`;
  const queryClient = new QueryClient();
  const mabByCategory =
    mapPublisher.category.find((cat) => cat.category === category)?.publisher ??
    [];
  try {
    await queryClient.fetchQuery([url], () =>
      getPageDetail({ end_point: `article/detail${url}` })
    );
  } catch (error: any) {
    if (error.response.status) {
      const { redirection }: IRedirection = await getRedirectionPages(
        `v1/redirection?url=${url}`
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
    queryClient.prefetchQuery(['/component/trending-tags'], () =>
      getSection({ end_point: '/component/trending-tags' })
    ),
    queryClient.prefetchQuery(['/component/current-horoscope'], () =>
      getSection({ end_point: '/component/current-horoscope' })
    ),
    queryClient.prefetchQuery(['/component/horoscopes'], () =>
      getSection({ end_point: '/component/horoscopes' })
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
  const devices = getDeviceFromReq(req);
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...devices,
    },
  };
};
