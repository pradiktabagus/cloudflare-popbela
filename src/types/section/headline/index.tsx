import type {
  AuthorArticle,
  CategoryArticle,
  CoverArticle,
  SubCategoryArticle,
} from '@/types/article';

export type ResponseHeadline = {
  article_url?: string;
  article_url_amp?: string;
  author?: AuthorArticle;
  campaign?: string | null;
  category?: CategoryArticle;
  cover?: CoverArticle;
  excerpt?: string;
  flag?: string | null;
  release_date: number;
  sub_category?: SubCategoryArticle;
  title: string;
  type?: string;
};
