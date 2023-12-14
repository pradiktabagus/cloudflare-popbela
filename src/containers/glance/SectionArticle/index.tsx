/* eslint-disable @typescript-eslint/naming-convention */
import { Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDefaultPages } from '@/adapters/hooks/pages';
import type { HeadingTitleProps, ImageLoaderProps } from '@/components';
import type { ArticleProps } from '@/types/article';
import type { ImageArticleProps } from '@/types/image';
import type { ResponseGlance } from '@/types/responses/pages/glance';
import { hostNameOrigin } from '@/utils/hostnameOrigin';
import { toSafetyStringSEO } from '@/utils/TextTransform';
import { toDateFormat } from '@/utils/toDateFromUnix';

const Article = dynamic<ArticleProps>(() =>
  import('@/components/Article').then((cmp) => cmp.Article)
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
export type SectionArticleGlanceProps = {
  apiUrl: string;
  // url sebenarnya, include semua params
  previousUrl?: string;
  onEmpty?: () => void;
  type: {
    param_oem: string | string[] | undefined;
    oem: string | string[] | undefined;
  };
};

const SectionArticleGlance = ({
  apiUrl,
  onEmpty,
  previousUrl,
  type,
}: SectionArticleGlanceProps) => {
  const { oem, param_oem } = type;
  const {
    data: queryData,
    isLoading,
    isError,
  } = useDefaultPages<ResponseGlance>(
    { end_point: `${apiUrl}`, version: 'v1' },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const data = useMemo(() => queryData?.data, [queryData]);
  const { ref: sectionRef } = useInView({
    onChange: (inView) => {
      if (inView && data?.glanceUrl) {
        const nextUrl = `/${data?.category?.slug}/${data?.sub_category?.slug}/${data?.author?.username}/${data?.slug}?utm_source=g&utm_medium=${param_oem}`;
        window.history.replaceState(
          `${previousUrl ?? nextUrl}`,
          '',
          `${previousUrl ?? nextUrl}`
        );

        // Tracker
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
              'content_slug':'${data.glanceUrl}',
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
      <Head>
        <script
          id="section-ads"
          dangerouslySetInnerHTML={{
            __html: `
              window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
              var REFRESH_KEY = 'refresh';
              var REFRESH_VALUE = 'true';
              //define penamaan slot untuk random ID
              var randNumber = Math.floor((Math.random() * 10000000) + 1);
              var ads_1 = "div-gpt-ad-1-"+randNumber;

              //override nama div menjadi Random ID
              document.getElementById("div-gpt-ad-1").id = ads_1;
              
              gptadslots['popbela_mrec_top'] = googletag.defineSlot('/${process.env.NEXT_PUBLIC_DFP_NETWORK_ID_GLANCE}/${oem}/popbela_mrec_top', [[336, 280],[300, 250],[300, 300]], ads_1).setTargeting(REFRESH_KEY, REFRESH_VALUE).setTargeting('pos', ['mrec_top']).addService(googletag.pubads());
              googletag.display(ads_1);
              googletag.pubads().refresh([gptadslots['popbela_mrec_top']]);
              googletag.pubads().disableInitialLoad();
              googletag.pubads().enableSingleRequest();
              googletag.pubads().collapseEmptyDivs();
              googletag.enableServices();
          });

          googletag.cmd.push(function() {
              var REFRESH_KEY = 'refresh';
              var REFRESH_VALUE = 'true';
              //define penamaan slot untuk random ID
              var randNumber = Math.floor((Math.random() * 10000000) + 1);
              var ads_2 = "div-gpt-ad-2-"+randNumber;

              //override nama div menjadi Random ID
              document.getElementById("div-gpt-ad-2").id = ads_2;

              gptadslots['popbela_small_banner_top'] = googletag.defineSlot('/${process.env.NEXT_PUBLIC_DFP_NETWORK_ID_GLANCE}/${oem}/popbela_small_banner_top', [[320,100],[320,50],[300, 50]], ads_2).setTargeting(REFRESH_KEY, REFRESH_VALUE).setTargeting('pos', ['small_banner_top']).addService(googletag.pubads());
              googletag.display(ads_2);
              googletag.pubads().refresh([gptadslots['popbela_small_banner_top']]);
              googletag.pubads().disableInitialLoad();
              googletag.pubads().enableSingleRequest();
              googletag.pubads().collapseEmptyDivs();
              googletag.enableServices();
          });
          `,
          }}
        />
      </Head>
      <section
        id="article-section"
        data-url={data.glanceUrl}
        data-meta-title={data.title}
        className="mb-10"
        ref={sectionRef}
      >
        <div
          data-io-article-url={`${hostNameOrigin()}/${data.category.slug}/${
            data.sub_category.slug
          }/${data.author.username}/${data.slug}`}
        >
          <div className="text-center">
            <div id="div-gpt-ad-1" className="inline-block"></div>
          </div>

          <div className="mt-5">
            <ImageArticle
              priorityImg={true}
              data={{
                source_name: data.cover?.source_name ?? '',
                image_url: data.cover?.source_url ?? '',
                title: data.title ?? '',
                blurSrc: data.cover?.placeholder_image_url,
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
            Glance
          </HeadingTitle>
          <div className="text-center">
            <div id="div-gpt-ad-2" className="inline-block"></div>
          </div>
          <Text fontSize="24px" color="#616161" fontStyle="italic" my="20px">
            {data.excerpt}
          </Text>
          <div className="article-content ">
            <Article
              oem={oem?.toString()}
              classNames=" mb-[10px]"
              variant="glance"
              data={{
                description: data.description,
                sub_category: data.sub_category,
              }}
            />
          </div>
          <div className="flex items-center">
            <Text fontSize="22px" color="#333" fontWeight="700">
              Source:&nbsp;&nbsp;
            </Text>
            <div className="relative h-[45px] w-[190px]">
              <ImageLoader
                src="/v3/assets/images/global/logo.png"
                fill
                alt="popbela.com"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionArticleGlance;
