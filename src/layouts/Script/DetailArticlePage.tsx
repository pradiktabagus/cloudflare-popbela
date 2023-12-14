/* eslint-disable @typescript-eslint/naming-convention */
import Head from 'next/head';
import Script from 'next/script';
import { Fragment, useMemo } from 'react';

import type {
  ArticleCover,
  ResponseDetailArticleSplit,
} from '@/types/responses/pages/detail-article';
import { hostNameOrigin } from '@/utils/hostnameOrigin';
import { toSafetyStringSEO } from '@/utils/TextTransform';
import { toDateFormat, toStringFromUnix } from '@/utils/toDateFromUnix';

type DetailPageScriptProps = {
  article: ResponseDetailArticleSplit;
  isMobile?: boolean;
  otherScript?: any;
};

export const DetailArticlePageScript = ({
  article,
  isMobile,
  otherScript,
}: DetailPageScriptProps) => {
  const { article_details = [], tags = [] } = article;
  const baseUrl = hostNameOrigin();
  const { topics, cover, embedInstagram, embedTwitter } = useMemo(() => {
    const isInstagram = article_details.some(
      (insta) => insta.type === 'instagram'
    );
    const isTwitter = article_details.some((twit) => twit.type === 'twitter');
    const tag = tags?.map((topic) => `topics.push('${topic?.name}');`);
    const image =
      article_details?.find(({ type }) => type === 'cover')?.cover ??
      ({} as ArticleCover);
    return {
      topics: tag,
      cover: image,
      embedInstagram: isInstagram,
      embedTwitter: isTwitter,
    };
  }, [article_details, tags]);
  return (
    <Fragment>
      <Head>
        <link
          href={hostNameOrigin() + article.article_url_amp}
          rel="amphtml"
        ></link>
        {/* <!-- Schema Markup Organization --> */}
        <script
          id="schema-org-popbela"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context" : "https://schema.org",
            "@type" : "Organization",
            "name" : "POPBELA.com",
            "url" : "https://www.popbela.com",
            "logo": "${baseUrl}/v3/assets/images/global/logo.png",
            "sameAs" : [
              "https://www.facebook.com/popbelacom",
              "https://twitter.com/popbela_com",
              "https://www.instagram.com/popbela_com/"
            ]
          }
					`,
          }}
        />
        {/* <!-- RICH SNIPPETS FOR ARTICLES --> */}
        <script
          id="schema-rich-snippet-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": "${baseUrl}${article.article_url}",
            "headline": "${toSafetyStringSEO(
              article.meta_title || article.title
            )}",
            "description": "${toSafetyStringSEO(
              article.meta_description || article.excerpt
            )}",
            "image": {
              "@type": "ImageObject",
              "url": "${cover?.source_url}?width=1200&height=800",
              "height": 800,
              "width": 1200
            },
            "datePublished": "${toDateFormat(article.release_date, '')}",
            "dateModified": "${toDateFormat(article.updated_at, '')}",
                  "author": {
                    "@type": "Person",
                    "name": "${article.author?.name}",
                    "url": "${baseUrl}${article.author?.author_url}"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Popbela.com",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "${baseUrl}/v3/assets/images/global/logo-amp.png",
                      "width": 600,
                      "height": 60
                    }
                  }
                }
                `,
          }}
        />
        {/* <!-- SCHEMA BREADCRUMBS --> */}
        <script
          id="schema-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
          {
                "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [{
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@id": "${baseUrl}${article.category?.category_url}",
                    "name": "${article.category?.name}"
                  }
                },{
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@id": "${baseUrl}${article.sub_category?.category_url}",
                    "name": "${article.sub_category?.name}"
                  }
                }]
              }
              `,
          }}
        />
        {/* Schema website */}
        <script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": "https://www.popbela.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.popbela.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }  
              }
              `,
          }}
        />
        {/* end schema website */}
        {embedInstagram && (
          <script
            async
            defer
            src="https://platform.instagram.com/en_US/embeds.js"
          />
        )}
        {embedTwitter && (
          <script async defer src="https://platform.twitter.com/widgets.js" />
        )}
        <script
          id="detail-topics"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          var topics = []
          ${topics?.join('\n')}
          window.dataLayer.push({
            'event': 'articleInfo',
            'authorName': '${article?.author?.name?.replace(
              /'/g,
              '&#39;'
            )}' || 'unknown',
              'authorStatus': 'Verified',
              'editorName': '${article?.author?.name?.replace(/'/g, '&#39;')}',
              'category': '${article?.category?.name}',
              'subCategory':'${article?.sub_category?.name}',
              'topics': topics.join(),
              'publishedDate' : '${toStringFromUnix(
                article.release_date,
                'DD MMMM YYYY'
              )}'
              });
              `,
          }}
        />
        <script
          id="GA-Read"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event':'read_article',
              'property':'popbela',
              'platform':'web',
              'device':'${isMobile ? 'mobile' : 'desktop'}',
              'page_type':'article_detail',
              'page_type_var': 'not_full',
              'screen_name': '${toSafetyStringSEO(
                article.meta_title ?? article.title
              )}',
              'content_type':'article',
              'content_type_var':'${article.type}',
              'content_title':'${toSafetyStringSEO(article.title)}',
              'content_id':'${article.uuid}',
              'content_slug':'${article.article_url}',
              'content_publisher': 'popbela',
              'content_tag':'${article?.tags
                ?.map(({ name }) => name)
                .join(',')}',
              'content_published_date':'${toDateFormat(
                article?.release_date,
                'YYYY-MM-DD hh:mm:ss'
              )}',
              'content_updated_date':'${toDateFormat(
                article?.updated_at,
                'YYYY-MM-DD hh:mm:ss'
              )}',
              'content_category': '${article.category?.name}',
              'content_category_id':'${article.category?.slug}',
              'content_subcategory':'${article.sub_category?.name}',
              'content_subcategory_id':'${article.sub_category?.slug}',
              'content_creator_id':'${article.author?.uuid}',
              'content_creator_username':'${toSafetyStringSEO(
                article.author?.username
              )}',
              'content_creator_fullname':'${toSafetyStringSEO(
                article.author?.name
              )}',
              'content_creator_role':'writer',
            });
          `,
          }}
        />
        {otherScript}
      </Head>
      {/* appsfyler */}
      {isMobile && (
        <Script
          id="appsflyer"
          async
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `!function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a,t.AF=t.AF||function(){(t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))},t.AF.id=t.AF.id||i,t.AF.plugins={},o=e.createElement(n),p=e.getElementsByTagName(n)[0],o.async=1,o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:""),p.parentNode.insertBefore(o,p)}(window,document,"script",0,"AF","banners",{banners: {key: "5877ccf5-f240-45fe-9c74-d2ab3f141841"}})

AF('banners', 'showBanner')`,
          }}
        />
      )}
      {/* end of appsflyer */}
    </Fragment>
  );
};
