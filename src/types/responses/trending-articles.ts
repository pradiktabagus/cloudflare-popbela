import type { ResponseArticle } from './article';

export interface TrendingArticles {
  pagination: {
    current_page: number;
    total_page: number;
    per_page: number;
    total_data: number;
  };
  trendings: ResponseArticle;
}
