import type {
  ArticleCover,
  IArticleDetail,
  Tag,
} from '../responses/pages/detail-article';

export type TSchemaRecipeScript = {
  data: TSchemaData;
  type?: string | 'single' | 'multiple';
};

type TSchemaData = {
  listicle: IArticleDetail[];
  cover?: ArticleCover;
  meta_description?: string;
  tags?: Tag[];
  author_name?: string;
  release_date: number;
};

export type TDataRecipe = {
  ingredients: string[];
  instruction: string[];
  title: string;
};
export type TUseDataRecipe = {
  listicle: IArticleDetail[];
  isRecipes: boolean;
  typeRecipe: string;
};
