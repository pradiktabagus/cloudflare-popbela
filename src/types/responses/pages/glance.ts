export interface ResponseGlance {
  data: Data;
}

interface Data {
  uuid: string;
  title: string;
  excerpt: string;
  slug: string;
  flag: string;
  type: string;
  release_date: number;
  updated_at: number;
  description: string;
  meta_title: string;
  cover: {
    image_url: string;
    placeholder_image_url: string;
    width: number;
    height: number;
    source_name: string;
    source_url: string;
  };
  author: {
    uuid: string;
    name: string;
    username: string;
    author_url: string;
    avatar: string;
  };
  category: {
    name: string;
    slug: string;
    category_url: string;
  };
  sub_category: {
    name: string;
    slug: string;
    category_url: string;
  };
  editorial: Editorial[];
  tags: Tag[];
  glanceUrl: string;
}
interface Editorial {
  name: string;
  username: string;
  author_url: string;
  avatar: string;
}
interface Tag {
  name: string;
  tag_url: string;
}
