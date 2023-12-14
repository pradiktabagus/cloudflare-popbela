import type { ResponseArticle } from '../article';

interface NowOnPopbela {
  category: ResponseCategory;
  latest_posts: ResponseArticle[];
}
interface MetaCover {
  image_url: string;
  placeholder_image_url: string;
  width: null;
  height: null;
}
interface ResponseCategory {
  name: string;
  category_url: string;
  description: null | string;
  meta: null | string;
  cover?: MetaCover;
  slug?: string;
}
interface Horoscope {
  name?: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  horoscope_url?: string;
  icon?: string;
  image?: string;
  start_date?: string;
  end_date?: string;
  meta_title?: string;
  meta_description?: string;
}
export interface IHoroscopeDetail {
  exclusive_interview?: ResponseArticle[];
  horoscope?: Horoscope;
  latest?: ResponseArticle[];
  now_on_popbela?: NowOnPopbela[];
  popbela_ootd?: any[];
  popcreator_of_the_month?: ResponseArticle;
  trending?: ResponseArticle[];
}
