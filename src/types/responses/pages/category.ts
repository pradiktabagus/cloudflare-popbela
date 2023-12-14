import type { ResponseArticle } from '@/types/responses/article';

export interface CategoryPageResponse {
  exclusive_interview?: ResponseArticle[];
  headline?: ResponseArticle[];
  latest?: ResponseArticle[];
  meta?: Meta;
  now_on_popbela?: NowOnPopbela[];
  popbela_ootd?: any[];
  popcreator_of_the_month?: ResponseArticle;
  sub_category?: ResponseCategory[];
  trending?: ResponseArticle[];
}

export interface Meta {
  name: string;
  slug: string;
  category_url: string;
  description: string;
  meta: string;
  cover: MetaCover;
  image_url: string;
  parent_category?: Meta | null;
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
