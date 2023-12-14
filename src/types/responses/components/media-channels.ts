export interface ModalChannelsResponse {
  status: number;
  message: string;
  data: DataPublisher;
}
interface Image {
  title: string;
  link: string;
  url: string;
  width: number;
  height: number;
  description: string;
}
interface Author {
  name: string;
  avatar: string;
}
interface Publisher {
  uuid: string;
  name: string;
  slug: string;
  image_url: string;
  image_dark_url: string;
  backgrund_url: string;
}
export interface ArticleCrossPublisher {
  title: string;
  link: string;
  uuid: string;
  description: string;
  pubDate: number;
  reldate: string;
  release_date: string;
  author: Author;
  editorial_teams: Array<Author>;
  is_adult: boolean;
  category: string;
  subcategory: string;
  summary: string;
  coverImages: string;
  tags: Array<String>;
  visited_count: number;
  publisher: Publisher;
}
interface DataPublisher {
  title: string;
  link: string;
  description: string;
  image: Image;
  item: Array<ArticleCrossPublisher>;
}
