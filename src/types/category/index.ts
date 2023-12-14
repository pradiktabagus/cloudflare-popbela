export interface Categories {
  categories: Category[];
}

export interface Category {
  name: string;
  slug?: string;
  category_url: string;
  description?: string;
  meta?: string;
  sub_category?: Category[];
  active?: boolean;
}
