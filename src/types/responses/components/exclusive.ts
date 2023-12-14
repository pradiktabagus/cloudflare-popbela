import type { ResponseArticle } from '../article';

export interface ResponseExclusive {
  status: number;
  message: string;
  data: ResponseArticle[];
}
