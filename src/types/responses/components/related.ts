import type { ResponseArticle } from '../article';

export interface ResponseRelated {
  status: number;
  message: string;
  data: ResponseArticle[];
}
