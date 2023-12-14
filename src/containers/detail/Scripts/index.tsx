import Script from 'next/script';

import { hostNameOrigin } from '@/utils/hostnameOrigin';
import { toSafetyStringSEO } from '@/utils/TextTransform';
import { toStringFromUnix } from '@/utils/toDateFromUnix';

interface Tag {
  name: string;
  tag_url: string;
  tag_slug: string;
}
export type TScriptGA = {
  uuid?: string;
  title?: string;
  slug?: string;
  category_url?: string;
  category_name?: string;
  category_slug?: string;
  sub_category_name?: string;
  sub_category_url?: string;
  sub_category_slug?: string;
  author?: string;
  author_slug?: string;
  release_date: number;
  updated_at: number;
  tags?: Tag[];
  article_url?: string;
  device?: string;
  isFull?: boolean;
  type?: string;
};
declare global {
  interface Window {
    dataLayer: any;
  }
}
export type TTracker = {
  article: TScriptGA | undefined;
  position?: number | string;
  destination: string;
  section: string;
};
export function trackerArticles({
  article,
  position,
  destination,
  section,
}: TTracker) {
  window.dataLayer = window.dataLayer || {};
  window.dataLayer.push({
    event: 'click_article',
    section: `${section}`,
    position,
    content_title: `${toSafetyStringSEO(article?.title)}`,
    content_id: `${article?.slug}`,
    content_category: `${article?.category_url}`,
    content_subcategory: `${article?.sub_category_url}`,
    content_author: `${article?.author}`,
    content_published_date: `${
      article?.release_date &&
      toStringFromUnix(article?.release_date, 'YYYY-MM-DD')
    }`,
    content_updated_date: `${
      article?.updated_at && toStringFromUnix(article?.updated_at, 'YYYY-MM-DD')
    }`,
    content_tag: `${article?.tags?.map(({ name }) => name).join(',')}`,
    page_type: 'detail_content',
    enter_from_url: `${hostNameOrigin()}${article?.article_url}`,
    destination_url: hostNameOrigin() + destination,
    page_path: `${article?.article_url}`,
    is_login: 'false',
    uuid: 'none',
  });
}
const Index = (article: TScriptGA) => {
  return (
    <>
      <Script
        id="hostname-origin"
        dangerouslySetInnerHTML={{
          __html: `
            function hostNameOrigin() {
              const origin =
                typeof window !== 'undefined' && window.location.origin
                  ? window.location.origin
                  : '';
              return origin;
            }
          `,
        }}
      />
      <Script
        id="GA-detail"
        dangerouslySetInnerHTML={{
          __html: `
          let eleBtnReadMore = document.getElementById('btn_read-more')
          if(eleBtnReadMore){
            eleBtnReadMore.onclick = function() {          
              window.dataLayer = window.dataLayer || [];
              var topics = [] 
              window.dataLayer.push({
                'event': 'click_article',
                'section':'Baca Artikel Selengkapnya',
                'position':'',
                'content_title':"${toSafetyStringSEO(article?.title)}",
                'content_id':'${article?.slug}',
                'content_category':'${article?.category_url}',
                'content_subcategory':'${article?.category_url}',
                'content_author':"${article?.author}",
                'content_published_date': '${toStringFromUnix(
                  article?.release_date,
                  'YYYY-MM-DD'
                )}',
                'content_updated_date': '${toStringFromUnix(
                  article?.updated_at,
                  'YYYY-MM-DD'
                )}',
                'content_tag': '${article?.tags
                  ?.map(({ name }) => name)
                  .join(',')}',
                'page_type':'detail_content',
                'enter_from_url':'${hostNameOrigin()}${article?.article_url}',
                'destination_url':'${hostNameOrigin()}${
            article?.article_url
          }?page=all',
                'page_path':'${article?.article_url}',
                'is_login':'false',
                'uuid':'none'
              });
            }
          }
          `,
        }}
      />
    </>
  );
};
export default Index;
