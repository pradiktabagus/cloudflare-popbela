export interface ResponseTrendingTags {
  status: number;
  message: string;
  data: ITrendingTags[];
}
export interface ITrendingTags {
  order_num: number;
  url: string;
  tag: {
    name: string;
    slug: string;
  };
}
