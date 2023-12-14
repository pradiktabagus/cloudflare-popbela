export interface ResponsePreviewArticlePage {
  title: string;
  excerpt?: string;
  flag?: string;
  type?: string;
  release_date: number;
  updated_at: number;
  description: string;
  published_at: number;
  editorial?: Author[];
  tags?: Tag[];
  author?: Author;
  category: Category;
  sub_category: Category;
  cover?: Cover;
  body: IBody;
}
export interface IBody {
  type: string | 'frequency-of-personality' | 'personality' | 'trivia';
  data: IDataBody;
}

export interface IDataBody {
  total_questions?: number;
  questions?: IDataQuetion[];
  total_choices?: number;
  final_result?: IDataFinalResult[];
}
export interface IDataFinalResult {
  id?: number;
  image?: string;
  description?: string;
}
interface IDataQuetion {
  image?: string;
  choices?: IDataChoice[];
  choice_type?: string;
}
interface IDataChoice {
  label?: string;
}
interface Author {
  name: string;
  username: string;
  author_url: string;
  avatar: string;
  is_following?: boolean;
}

interface Category {
  name: string;
  category_url: string;
}

interface Cover {
  image_url: string;
  placeholder_image_url: string;
  width: number;
  height: number;
  image_url_hd: string;
  image_url_md: string;
  image_url_sd: string;
  source_name: string;
  source_url: string;
}

interface Tag {
  name: string;
  tag_url: string;
  tag_slug: string;
}
