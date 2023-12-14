export interface SearchResponse {
  title: string;
  excerpt: string;
  article_url: string;
  article_url_amp: string;
  article_url_target: string;
  release_date: number;
  flag: string;
  type: string;
  campaign: string | null;
  category: ArticleResponseCategory;
  sub_category: ArticleResponseCategory;
  author: Author;
  cover: ArticleResponseCover;
}

export interface SearchPagination {
  pagination: {
    current_page: number;
    per_page: number;
    total_data: number;
    total_page: number;
  };
  articles: Array<SearchResponse>;
}

interface Author {
  name: string;
  author_url: string;
  avatar?: string;
  period?: number;
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
  source_url: string;
}
