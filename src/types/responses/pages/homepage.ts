import type { Horoscope } from '@/types/horoscopes';

import type { ResponseArticle } from '../article';
import type { ResponseCurrentHoroscope } from '../horoscope';

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
interface NowOnPopbela {
  category: ResponseCategory;
  latest_posts: ResponseArticle[];
}
export interface IHomepage {
  current_horoscope: ResponseCurrentHoroscope;
  exclusive_interview: ResponseArticle[];
  headline: ResponseArticle[];
  horoscopes: Horoscope[];
  latest: ResponseArticle[];
  now_on_popbela: NowOnPopbela[];
  popbela_ootd: any[];
  popcreator_of_the_month: ResponseArticle;
  trending: ResponseArticle[];
}
