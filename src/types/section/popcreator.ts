export interface PopCreatorResponse {
  title: string;
  excerpt?: string;
  article_url: string;
  article_url_amp?: string;
  release_date?: number;
  flag?: string | null;
  type?: string;
  campaign?: string | null;
  category?: Category;
  sub_category?: Category;
  author?: Author;
  cover?: Cover;
}

interface Author {
  name: string;
  period: number;
  author_url: string;
  avatar: string;
}

interface Category {
  name: string;
  category_url: string;
}

interface Cover {
  image_url: string;
  image_url_hd: string;
  image_url_md: string;
  image_url_sd: string;
  placeholder_image_url: string;
  width: number;
  height: number;
  source_url: string;
}
