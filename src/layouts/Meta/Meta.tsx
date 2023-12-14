import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { hostNameOrigin } from '@/utils/hostnameOrigin';

type TMeta = {
  otherMeta?: React.ReactNode;
  title?: string;
  slug?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  url?: string;
  img_cover?: string;
  author?: string;
  alt_image?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

export const whiteListURL = [
  'https://www.sotogubeng.com',
  'https://zeus-www.sotogubeng.com',
  'https://zeus-www.popbela.com',
];
export const Meta = ({
  otherMeta,
  noIndex = false,
  noFollow = false,
  ...props
}: TMeta) => {
  return (
    <>
      <Head>
        <title itemProp="name">
          {props?.meta_title ? props?.meta_title : props.title}
        </title>
        <meta name="author" content={props?.author ?? 'POPBELA.com'} />
        <link
          rel="image_src"
          type="image/png"
          href={
            props.img_cover ??
            `${hostNameOrigin()}/v3/assets/images/global/popbela.png`
          }
        />
        <meta name="twitter:title" content={props?.title ?? '-'} />
        <meta name="twitter:description" content={props?.description ?? '-'} />
        <meta
          name="twitter:image"
          content={
            props.img_cover ??
            `${hostNameOrigin()}/v3/assets/images/global/logo-square.jpg`
          }
        />
        <link rel="canonical" href={props.url ?? '-'} itemProp="url"></link>
      </Head>
      <NextSeo
        robotsProps={{
          maxImagePreview:
            noIndex || whiteListURL.includes(hostNameOrigin())
              ? undefined
              : 'large',
          maxSnippet:
            noIndex || whiteListURL.includes(hostNameOrigin()) ? undefined : -1,
          maxVideoPreview:
            noIndex || whiteListURL.includes(hostNameOrigin()) ? undefined : -1,
        }}
        noindex={noIndex || whiteListURL.includes(hostNameOrigin())}
        nofollow={noFollow || whiteListURL.includes(hostNameOrigin())}
        description={
          props?.meta_description ? props?.meta_description : props?.description
        }
        facebook={{
          appId: `${process.env.facebook_app_id}`,
        }}
        openGraph={{
          url: props.url ?? '-',
          type: 'article',
          title: props.title ?? '-',
          description: props.description ?? '-',
          site_name: 'POPBELA.com',
          images: [
            {
              url:
                props.img_cover ??
                `${hostNameOrigin()}/v3/assets/images/global/logo-square.jpg`,
              alt: props.alt_image ?? props.title,
              width: 750,
              height: 500,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@popbela_com',
        }}
      />
      {otherMeta}
    </>
  );
};
