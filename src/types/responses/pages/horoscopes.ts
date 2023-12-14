import type { ResponseArticle } from '../article';

export interface Horoscope {
  end_date: string;
  horoscope_url: string;
  icon: string;
  image?: string;
  name: string;
  slug: string;
  start_date: string;
}
interface ResponseCategory {
  name: string;
  category_url: string;
  description: null | string;
  meta: null | string;
  cover?: MetaCover;
  slug?: string;
}
interface MetaCover {
  image_url: string;
  placeholder_image_url: string;
  width: null;
  height: null;
}
interface NowOnPopbela {
  category: ResponseCategory;
  latest_posts: ResponseArticle[];
}
export interface ResponseHoroscopes {
  exclusive_interview: ResponseArticle[];
  horoscope: Horoscope[];
  latest: ResponseArticle[];
  now_on_popbela: NowOnPopbela[];
  popbela_ootd: any[];
  popcreator_of_the_month: ResponseArticle;
  trending: ResponseArticle[];
}
