export interface Article {
  title: string;
  excerpt?: string;
  article_url: string;
  article_url_amp?: string;
  article_url_target?: string;
  release_date?: number;
  flag?: string | null;
  type?: string;
  campaign?: string | null;
  category?: SubCategoryClass;
  sub_category?: SubCategoryClass;
  author?: Author;
  cover?: ArticleCover;
}

export interface Author {
  name: string;
  author_url: string;
  avatar: string;
  period?: number;
}

export interface SubCategoryClass {
  name: string;
  category_url: string;
}

export interface ArticleCover {
  image_url: string;
  image_url_hd: string;
  image_url_md: string;
  image_url_sd: string;
  placeholder_image_url: string;
  width: number;
  height: number;
  source_url: string;
}

// export enum Flag {
//   Regular = 'regular',
// }

// export enum Type {
//   EditorialArticle = 'editorial-article',
//   PopcreatorArticle = 'popcreator-article',
// }
