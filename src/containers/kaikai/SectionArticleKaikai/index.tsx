/* eslint-disable @typescript-eslint/naming-convention */
import { Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDefaultPages } from '@/adapters/hooks/pages';
import type { HeadingTitleProps, ImageLoaderProps } from '@/components';
import type { ArticleProps } from '@/types/article';
import type { ImageArticleProps } from '@/types/image';
import type {
  ArticleCover,
  IArticleDetail,
  IDataDetailArticleKaikai,
  ResponseDetailArticleKaikai,
} from '@/types/responses/pages/detail-article';
import { hostNameOrigin } from '@/utils/hostnameOrigin';
import { toSafetyStringSEO } from '@/utils/TextTransform';
import { toDateFormat } from '@/utils/toDateFromUnix';

const Article = dynamic<ArticleProps>(() =>
  import('@/components/Article/article-split').then((cmp) => cmp.ArticleSpit)
);
const ImageArticle = dynamic<ImageArticleProps>(() =>
  import('@/components/Images/ImageArticle').then((mod) => mod.ImageArticle)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const HeadingTitle = dynamic<HeadingTitleProps>(() =>
  import('@/components/Typography/Heading/HeadingTitle').then(
    (mod) => mod.HeadingTitle
  )
);
const AdsKaikaiLeaderboard = dynamic(() =>
  import('@/components/Ads/Kaikai').then((mod) => mod.default)
);
export type SectionArticleKaikaiProps = {
  apiUrl: string;
  // url sebenarnya, include semua params
  previousUrl?: string;
  onEmpty?: () => void;
};

const SectionArticleKaikai = ({
  apiUrl,
  onEmpty,
  previousUrl,
}: SectionArticleKaikaiProps) => {
  const {
    data: queryData,
    isLoading,
    isError,
  } = useDefaultPages<ResponseDetailArticleKaikai>(
    { end_point: `${apiUrl}`, version: 'v1' },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const data = useMemo(() => {
    const initArticle: IArticleDetail[] = queryData?.data.article_details ?? [];
    const initData: IDataDetailArticleKaikai | undefined = queryData?.data;
    const listicle1 = initArticle.findIndex(
      (item: IArticleDetail, i: number) => {
        const nextIdx: number = i + 1;
        return (
          item?.listicle_no === 0 && initArticle[nextIdx]?.listicle_no === 1
        );
      }
    );
    const listicle2 = initArticle.findIndex(
      (item: IArticleDetail, i: number) => {
        const nextIdx = i + 1;
        return (
          item.listicle_no === 2 && initArticle[nextIdx]?.listicle_no === 3
        );
      }
    );
    if (listicle1 && initArticle[listicle1])
      initArticle[listicle1] = {
        type: initArticle[listicle1]?.type ?? '',
        value: initArticle[listicle1]?.value ?? '',
        order_no: initArticle[listicle1]?.order_no ?? 0,
        value_type: initArticle[listicle1]?.value_type ?? '',
        cover: initArticle[listicle1]?.cover ?? ({} as ArticleCover),
        listicle_no: initArticle[listicle1]?.listicle_no,
        ads: 'div-gpt-ad-inarticle1',
      };
    if (listicle2 && initArticle[listicle2])
      initArticle[listicle2] = {
        type: initArticle[listicle1]?.type ?? '',
        value: initArticle[listicle1]?.value ?? '',
        order_no: initArticle[listicle1]?.order_no ?? 0,
        value_type: initArticle[listicle1]?.value_type ?? '',
        cover: initArticle[listicle1]?.cover ?? ({} as ArticleCover),
        listicle_no: initArticle[listicle1]?.listicle_no,
        ads: 'div-gpt-ad-inarticle2',
      };
    if (initData?.article_details) {
      initData.article_details = initArticle;
    }
    return initData;
  }, [queryData]);
  const cover =
    data?.article_details?.find(({ type }) => type === 'cover')?.cover ??
    ({} as ArticleCover);
  const { ref: sectionRef } = useInView({
    onChange: (inView) => {
      if (inView && data?.url) {
        const nextUrl = `/${data?.category?.slug}/${data?.sub_category?.slug}/${data?.author?.username}/${data?.slug}?utm_source=kaikainow&utm_medium=web`;
        window.history.replaceState(
          `${previousUrl ?? nextUrl}`,
          '',
          `${previousUrl ?? nextUrl}`
        );
        const code = `
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'read_article',
          'property':'popbela',
              'platform':'web',
              'device':'mobile',
              'page_type':'article_detail',
              'page_type_var': 'full',
              'screen_name': '${toSafetyStringSEO(
                data.meta_title ?? data.title
              )}',
              'content_type':'article',
              'content_type_var':'${data.type}',
              'content_title':'${toSafetyStringSEO(data.title)}',
              'content_id':'${data.uuid}',
              'content_slug':'${data.url}',
              'content_publisher': 'popbela',
              'content_tag':'${data?.tags?.map(({ name }) => name).join(',')}',
              'content_published_date':'${toDateFormat(
                data?.release_date,
                'YYYY-MM-DD hh:mm:ss'
              )}',
              'content_updated_date':'${toDateFormat(
                data?.updated_at,
                'YYYY-MM-DD hh:mm:ss'
              )}',
              'content_category': '${data.category.name}',
              'content_category_id':'${data.category.slug}',
              'content_subcategory':'${data.sub_category.name}',
              'content_subcategory_id':'${data.sub_category.slug}',
              'content_creator_id':'${data.author.uuid}',
              'content_creator_username':'${toSafetyStringSEO(
                data.author.username
              )}',
              'content_creator_fullname':'${toSafetyStringSEO(
                data.author.name
              )}',
              'content_creator_role':'writer',
        })
      `;
        const GaScript = document.createElement('script');
        GaScript.async = true;
        GaScript.appendChild(document.createTextNode(code));
        document.head.appendChild(GaScript);
      }
    },
  });
  useEffect(() => {
    if (isError && onEmpty) onEmpty();
  }, [isError, onEmpty]);

  if (isLoading) {
    return (
      <div className="flex h-10 items-center justify-center">
        <div className="bubblingG">
          <span id="bubblingG_1"></span>
          <span id="bubblingG_2"></span>
          <span id="bubblingG_3"></span>
        </div>
      </div>
    );
  }
  if (!data) return <span />;

  return (
    <>
      <section
        id="article-section"
        data-url={data?.url}
        data-meta-title={data.title}
        className="mb-10"
        ref={sectionRef}
      >
        <div
          data-io-article-url={`${hostNameOrigin()}/${data.category.slug}/${
            data.sub_category?.slug
          }/${data.author.username}/${data.slug}`}
        >
          <div className="mt-5">
            <ImageArticle
              priorityImg={true}
              data={{
                source_name: cover?.source_name ?? '',
                image_url: cover?.source_url ?? '',
                title: data.title ?? '',
                blurSrc: cover?.placeholder_image_url,
              }}
            />
          </div>
          <HeadingTitle
            as="h1"
            lineHeight="1.4"
            color="title"
            fontSize={{ base: '26px', lg: '30px' }}
            my="10px"
            data-testid="title-article"
          >
            {data.title}
          </HeadingTitle>
          <HeadingTitle
            as="h2"
            lineHeight="1.4"
            color="title"
            fontSize="18px"
            my="10px"
            fontWeight="bold"
          >
            Kaikai
          </HeadingTitle>
          <div className="text-center">
            <AdsKaikaiLeaderboard
              id="div-gpt-ad-leaderboard"
              adUnit="/ContentGenerator/KaikaiPopbela"
              size={[[320, 100]]}
            />
          </div>
          <Text fontSize="24px" color="#616161" fontStyle="italic" my="20px">
            {data.excerpt}
          </Text>
          <div className="article-content ">
            <Article
              isMobile={true}
              classNames=" mb-[10px]"
              variant="kaikai"
              data={{
                description: data.description,
                sub_category: data.sub_category,
                listicle: data?.article_details?.slice(3) ?? [],
              }}
            />
          </div>
          <div className="flex items-center">
            <Text fontSize="22px" color="#333" fontWeight="700">
              Source:&nbsp;&nbsp;
            </Text>
            <Link href="/" className="relative h-[45px] w-[190px]">
              <ImageLoader
                src="/v3/assets/images/global/logo.png"
                fill
                alt="popbela.com"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionArticleKaikai;
