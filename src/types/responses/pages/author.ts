import type { User } from '@/types/user';

import type { ResponseArticle } from '../article';

export interface AuthorPageResponse {
  user?: User;
  latest?: Articles;
  popcreator_of_the_month?: ResponseArticle;
}

interface Articles {
  articles: ResponseArticle[];
}
