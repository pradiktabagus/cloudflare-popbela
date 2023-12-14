import type {
  AuthorArticle,
  CategoryArticle,
  CoverArticle,
  SubCategoryArticle,
} from '@/types/article';

export type ResponseLatest = {
  uuid?: string;
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
