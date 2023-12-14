import type { ResponseArticle } from '@/types/responses/article';

export interface ICustom404 {
  exclusive_interview?: ResponseArticle[];
  latest?: ResponseArticle[];
  now_on_popbela?: NowOnPopbela[];
  popbela_ootd?: any[];
  popcreator_of_the_month?: ResponseArticle;
  trending?: ResponseArticle[];
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

interface ResponseCategory {
  name: string;
  category_url: string;
  description: null | string;
  meta: null | string;
  cover?: MetaCover;
  slug?: string;
}
