export interface ResponseArticle {
  title: string;
  excerpt?: string;
  article_url: string;
  article_url_amp?: string;
  article_url_target?: string;
  release_date: number;
  flag?: string | null;
  type?: string;
  campaign?: string | null;
  category: ArticleResponseCategory;
  sub_category?: ArticleResponseCategory;
  author: Author;
  cover?: ArticleResponseCover;
}

interface Author {
  name: string;
  author_url: string;
  avatar?: string;
  period?: number;
  avatar2?: string;
}

interface ArticleResponseCategory {
  name: string;
  category_url: string;
}

interface ArticleResponseCover {
  image_url: string;
  image_url_hd?: string;
  image_url_md?: string;
  image_url_sd?: string;
  placeholder_image_url?: string;
  width?: number | null;
  height?: number | null;
  source_url?: string;
}
