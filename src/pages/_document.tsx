import { useAmp } from 'next/amp';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import type { ParsedUrlQuery } from 'querystring';

import { listDnsPrefetch } from '@/utils/listDnsPrefetch';

interface DocumentProps extends DocumentInitialProps {
  lang: string;
  pathName: string;
  query: ParsedUrlQuery;
}

const MyDocument = (props: DocumentProps) => {
  const { lang } = props;
  const isAmp = useAmp();
  return (
    <Html lang={lang}>
      <Head itemScope itemType="https://schema.org/WebSite">
        {/* SITE VERIFICATION */}
        <meta
          name="google-site-verification"
          content="TZMOVRzLcs8si2HFp1Zel5gVPU9O0w-midgOhszOGI8"
        />
        {/* Required meta tags SEO */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta
          name="csrf-token"
          content="Aexr6DG36wbAzf1lhOf8vkyixNLuAYiWc2nKgR02"
        />
        <meta property="fb:pages" content="189375664739394" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="googlebot" content="index, follow" />
        <meta name="googlebot-news" content="index, follow" />
        <meta name="language" content="id" />
        <meta name="geo.country" content="id" />
        <meta httpEquiv="content-language" content="In-Id" />
        <meta name="geo.placename" content="Indonesia" />
        <meta name="twitter:creator" content="@popbela_com" />
        <link
          rel="apple-touch-icon"
          href="/v3/assets/images/global/favicon-120x120.png"
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          href="/v3/assets/images/global/favicon-120x120.png"
          key="icon"
        />
        {/* <link rel="icon" href="/favicon.ico" key="favicon" /> */}
        {/* Fonts */}
        <link
          rel="preload"
          href="/v3/assets/fonts/BahijMitraRegular.ttf"
          crossOrigin=""
          as="font"
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/v3/assets/fonts/BahijMitraRegular.woff2"
          crossOrigin=""
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/v3/assets/fonts/Futura_BookBoldRegular.ttf"
          crossOrigin=""
          as="font"
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/v3/assets/fonts/Futura_BookBoldRegular.woff2"
          crossOrigin=""
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/v3/assets/fonts/limerickregular.ttf"
          crossOrigin=""
          as="font"
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/v3/assets/fonts/limerickregular.woff2"
          crossOrigin=""
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/v3/assets/fonts/FE11004T.ttf"
          crossOrigin=""
          as="font"
          type="font/ttf"
        />

        {/* <!-- DNS Prefetch section--> */}
        {listDnsPrefetch?.map((dns, key) => (
          <link key={key} rel="dns-prefetch" href={dns} />
        ))}
        {/* <!--End DNS Prefetch section--> */}
        {/* Start Google Tag Manager & Google Analytic */}
        <Script
          id="gtm-ga-popbela"
          async
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PFQ54K7');`,
          }}
        />
        {/* End Google Tag Manager & Google Analytic */}
        {!isAmp && (
          <Script
            strategy="beforeInteractive"
            id="googletag"
            async
            dangerouslySetInnerHTML={{
              __html: `var googletag = googletag || {};
                googletag.cmd = googletag.cmd || [];`,
            }}
          />
        )}
        <Script
          id="googletagservice"
          strategy="beforeInteractive"
          async
          src="https://www.googletagservices.com/tag/js/gpt.js"
        />
        <Script
          strategy="beforeInteractive"
          id="securepubads.g.doubleclick"
          async
          crossOrigin="anonymous"
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        {/* start chartbeat */}
        <Script
          id="chartbeat"
          async
          strategy="beforeInteractive"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function() {
            var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
            _sf_async_config.uid = 64023;
            _sf_async_config.domain = 'www.popbela.com'; //CHANGE THIS TO THE ROOT DOMAIN
            _sf_async_config.flickerControl = false;
            _sf_async_config.useCanonical = true;
            _sf_async_config.useCanonicalDomain = true;
            //_sf_async_config.sections = dataLayer[1].lotameCategory,dataLayer[1].lotameSubCategory;
            _sf_async_config.authors = dataLayer[1]?.authorName; 
            function loadChartbeat() {
              var e = document.createElement('script');
              var n = document.getElementsByTagName('script')[0];
                e.type = 'text/javascript';
                e.async = true;
                e.src = '//static.chartbeat.com/js/chartbeat.js';;
                n.parentNode.insertBefore(e, n);
            }
            loadChartbeat();
          })();`,
          }}
        />
        <Script
          id="chartbeat_mab"
          async
          strategy="beforeInteractive"
          src="https://static.chartbeat.com/js/chartbeat_mab.js"
        />
        {/* end chartbat */}
        <Script
          id="firebase"
          strategy="beforeInteractive"
          async
          src="https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js"
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1206680832695337&ev=PageView&noscript=1" />`,
          }}
        ></noscript>
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PFQ54K7"  height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentProps> => {
  const originalRenderPage = ctx.renderPage;

  // Run the React rendering logic synchronously
  ctx.renderPage = () =>
    originalRenderPage({
      // Useful for wrapping the whole react tree
      enhanceApp: (App) => App,
      // Useful for wrapping in a per-page basis
      enhanceComponent: (Component) => Component,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const lang = 'id';
  const { pathname, query } = ctx;
  return {
    ...initialProps,
    lang,
    pathName: pathname,
    query,
  };
};

export default MyDocument;
