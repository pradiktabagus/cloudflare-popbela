import type { ResponseArticle } from '../article';

export interface ResponseDetailArticlePageAmp {
  status: number;
  message: string;
  data: ResponseDetailArticleAmp;
}

export interface ResponseDataArticle {
  status: number;
  message: string;
  data: ResponseDetailArticleSplit;
}

export interface ResponseDetailArticleKaikai {
  status: number;
  message: string;
  data: IDataDetailArticleKaikai;
}

export interface IDataDetailArticleKaikai extends ResponseDetailArticleSplit {
  url?: string;
}

export interface IDataDetailArticleAmp {
  article: ResponseDetailArticleAmp;
  exclusive_interview: ResponseArticle[];
  latest: ResponseArticle[];
  popbela_ootd: any[];
  popcreator_of_the_month: ResponseArticle;
  trending: ResponseArticle[];
}
export interface IDataDetailArticle {
  article: ResponseDetailArticleSplit;
  exclusive_interview: ResponseArticle[];
  latest: ResponseArticle[];
  popbela_ootd: any[];
  popcreator_of_the_month: ResponseArticle;
  trending: ResponseArticle[];
}

interface ResponseDetailArticleAmp extends ResponseDetailArticle {
  has_read_more?: boolean;
}
export interface ResponseDetailArticleSplit extends ResponseDetailArticle {
  uuid?: string;
  article_details: IArticleDetail[];
  has_read_more?: boolean;
}
export interface IArticleDetail {
  type:
    | string
    | 'title'
    | 'excerpt'
    | 'cover'
    | 'content'
    | 'image'
    | 'readmore'
    | 'instagram'
    | 'twitter';
  value_type: string | 'p' | 'h1' | 'h2';
  order_no: number;
  value: string;
  cover?: ArticleCover;
  ads?: string;
  listicle_no?: number;
}
export interface ResponseDetailArticle {
  title: string;
  excerpt?: string;
  slug: string;
  flag?: string;
  type?: string;
  release_date: number;
  updated_at: number;
  is_trending: boolean;
  trending_number: number;
  adult_content: boolean;
  campaign?: string | null;
  meta_title?: string;
  meta_description?: string;
  og_caption?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_media_id?: number;
  article_url: string;
  article_url_amp: string;
  cover?: ArticleCover;
  description: null | string;
  description_word_count: number;
  author: EditorialClass;
  category: Category;
  sub_category: Category;
  body: IBody;
  editorial?: EditorialClass[];
  tags?: Tag[];
  content_insights_tags?: string;
  additionals?: any[];
  related_article?: ResponseArticle[];
  article_details: IArticleDetail[];
}

export interface IBody {
  type: string | 'frequency-of-personality' | 'personality' | 'trivia';
  data: IDataBody;
}

export interface IDataBody {
  total_questions?: number;
  questions?: IDataQuetion[];
  total_choices?: number;
  final_result?: IDataFinalResult[];
}
export interface IDataFinalResult {
  id?: number;
  image?: string;
  description?: string;
}
interface IDataQuetion {
  image?: string;
  choices?: IDataChoice[];
  choice_type?: string;
}
interface IDataChoice {
  label?: string;
}
export interface ArticleDetail {
  type: string | 'title' | 'content' | 'excerpt' | 'cover' | 'image';
  value_type: string | null | undefined;
  order_no: number;
  cover: ArticleCover;
  value: null | string;
}
interface EditorialClass {
  uuid?: string;
  name?: string;
  username?: string;
  author_url?: string;
  avatar?: string;
  description?: string;
  is_following?: boolean;
}

interface Category {
  name: string;
  category_url: string;
  slug?: string;
}

export interface ArticleCover {
  image_url: string;
  image_url_hd: string;
  image_url_md: string;
  image_url_sd: string;
  placeholder_image_url: string;
  source_name: string;
  source_url: string;
  og_image_url: string;
}

export interface Tag {
  name: string;
  tag_url: string;
  tag_slug: string;
}
