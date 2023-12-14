import type { ResponseArticle } from '@/types/responses/article';

export interface TagPageResponse {
  status?: number;
  message?: string;
  data?: ITagData;
}

export interface ITagData {
  title?: string;
  slug?: string;
  description?: string;
  meta_title?: string;
  articles?: ResponseArticle[];
}
