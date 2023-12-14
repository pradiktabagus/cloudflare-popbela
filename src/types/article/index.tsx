import type { TScriptGA } from '@/containers/detail/Scripts';

import type { DeviceViewProps } from '../device';
import type { IArticleDetail, IBody } from '../responses/pages/detail-article';

type SubcategoryProps = {
  name?: string;
  category_url?: string;
};
export type DataArticleProps = {
  listicle?: IArticleDetail[];
  description?: string | undefined | null;
  sub_category?: SubcategoryProps;
  url?: string;
  read_more?: boolean;
  title?: string;
  excerpt?: string;
};
export type ArticleProps = {
  data: DataArticleProps;
  variant?: 'article' | 'horoscope' | 'glance' | 'quiz' | 'kaikai';
  classNames?: string;
  oem?: string;
  body?: IBody;
  article?: TScriptGA;
} & DeviceViewProps;

export type AuthorArticle = {
  author_url?: string | any;
  avatar?: string | any;
  name?: string | any;
  period?: number | any;
  avatar2?: string;
};

export type CoverArticle = {
  height?: number | any;
  image_url?: string | any;
  image_url_hd?: string | any;
  image_url_md?: string | any;
  image_url_sd?: string | any;
  placeholder_image_url?: string | any;
  width?: number | any;
  source_url?: any;
};

export type CategoryArticle = {
  category_url?: string | any;
  name?: string | any;
};

export type SubCategoryArticle = {
  category_url?: string;
  name?: string;
};
