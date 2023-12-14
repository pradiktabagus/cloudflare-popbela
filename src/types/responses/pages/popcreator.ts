import type { ResponseArticle } from '@/types/responses/article';
import type { ResponsePopcreators } from '@/types/section/popcreators';

export interface PopCreatorPageResponse {
  popcreator_of_the_month?: ResponseArticle;
  popcreators?: ResponsePopcreators[];
}
