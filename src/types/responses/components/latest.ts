export interface ILambdaLatest {
  status: number;
  message: string;
  data: TDataLatest;
}

export interface TDataLatest {
  title: string;
  article_url: string;
  release_date: number;
  flag: string;
  category: TCategory;
  sub_category: TSubCategory;
  author: TAuthor;
  cover: TCover;
}
interface TCategory {
  category_url: string;
  name: string;
}

interface TSubCategory {
  category_url: string;
  name: string;
}
interface TAuthor {
  author_url: string;
  name: string;
}
interface TCover {
  image_url: string;
  source_url: string;
}
