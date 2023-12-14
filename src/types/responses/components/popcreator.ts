import type { ResponseArticle } from '../article';

export interface ResponsePopcreator {
  status: number;
  message: string;
  data: ResponseArticle;
}
