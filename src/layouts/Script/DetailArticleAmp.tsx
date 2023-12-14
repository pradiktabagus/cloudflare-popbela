import Head from 'next/head';

import type { ResponseDetailArticle } from '@/types/responses/pages/detail-article';
import { hostNameOrigin } from '@/utils/hostnameOrigin';
import { toSafetyStringSEO } from '@/utils/TextTransform';
import { toDateFormat } from '@/utils/toDateFromUnix';

import { whiteListURL } from '../Meta';

type DetailArticleAMPPageScriptProps = {
  article: ResponseDetailArticle;
};

export const DetailArticleAMPPageScript = ({
  article,
}: DetailArticleAMPPageScriptProps) => {
  const baseUrl = hostNameOrigin();
  return (
    <Head>
      <link rel="preload" as="image" href={article?.cover?.source_url} />
      <link
        rel="preload"
        as="image"
        href="/v3/assets/images/global/logo.png"
      ></link>
      <meta
        name="robots"
        content={
          whiteListURL.includes(hostNameOrigin())
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <script
        custom-element="amp-social-share"
        async
        src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"
      />
      <script
        custom-element="amp-ad"
        async
        src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
      />
      <script
        async
        custom-element="amp-facebook-comments"
        src="https://cdn.ampproject.org/v0/amp-facebook-comments-0.1.js"
      />
      <script
        custom-element="amp-analytics"
        async
        src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
      />
      <script
        async
        custom-element="amp-sticky-ad"
        src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"
      />
      <script
        async
        custom-element="amp-fx-flying-carpet"
        src="https://cdn.ampproject.org/v0/amp-fx-flying-carpet-0.1.js"
      />
      <script
        async
        custom-element="amp-youtube"
        src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
      />
      <script
        async
        custom-element="amp-iframe"
        src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
      ></script>
      <style amp-boilerplate="">
        {`
            body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
          `}
      </style>
      <noscript>
        <style amp-boilerplate="">{`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}</style>
      </noscript>
      {/* <!-- Schema News Article AMP --> */}
      <script
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
                "url": "${article.cover?.source_url}?width=1200&height=800",
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
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      {/* <!-- DYNAMIC META TITLE & DESC --> */}
      <title itemProp="name">
        {toSafetyStringSEO(article.meta_title || article.title)}
      </title>
      <meta
        name="description"
        content={toSafetyStringSEO(article.meta_description || article.excerpt)}
      />
      <link
        itemProp="mainEntityOfPage"
        rel="canonical"
        href={`${baseUrl}${article.article_url}`}
      />
      <meta name="author" content={article.author?.name} />
      <link rel="image_src" type="image/png" href={article.cover?.source_url} />

      {/* <!-- Twitter Card data --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@popbela_com" />
      <meta name="twitter:title" content={`${article.title} - POPBELA.com`} />
      <meta name="twitter:description" content={article.excerpt} />
      <meta name="twitter:image" content={article.cover?.source_url} />

      {/* <!-- Open Graph data --> */}
      <meta property="fb:app_id" content="147110658997423" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${baseUrl}${article.article_url}`} />
      <meta property="og:title" content={`${article.title} - POPBELA.com`} />
      <meta property="og:image" content={article.cover?.source_url} />
      <meta property="og:description" content={article.excerpt} />
      <meta property="og:site_name" content="POPBELA.com" />
      <meta property="og:image:width" content="750" />
      <meta property="og:image:height" content="500" />
      <meta property="og:image:alt" content={article.title} />
    </Head>
  );
};
