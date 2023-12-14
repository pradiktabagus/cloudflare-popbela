import type {
  AuthorArticle,
  CategoryArticle,
  CoverArticle,
  SubCategoryArticle,
} from '@/types/article';

export type CategoryNowOnPopbela = {
  name?: string | any;
  category_url?: string | any;
  description?: string | any;
  meta?: string | any;
  cover?: Cover;
};
type Cover = {
  image_url?: string | any;
  placeholder_image_url?: string;
  width?: number | string | any;
  height?: number | string | any;
};
type LatesPosts = {
  title?: string | any;
  excerpt?: string | any;
  article_url?: string | any;
  article_url_amp?: string | any;
  article_url_target?: string | any;
  release_date?: number | any;
  flag?: string | any;
  type?: string | any;
  campaign?: string | any;
  category?: CategoryArticle;
  sub_category?: SubCategoryArticle;
  author?: AuthorArticle;
  cover?: CoverArticle;
};
export type ResponseNowOnPopbela = {
  category: CategoryNowOnPopbela;
  latest_posts: LatesPosts[];
};
