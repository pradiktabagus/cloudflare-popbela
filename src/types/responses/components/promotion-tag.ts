export interface ResponsePromotionTag {
  status: number;
  message: string;
  data: IPromotionTag[];
}
export interface IPromotionTag {
  name: string;
  slug: string;
  products: IProduct[];
}
export interface IProduct {
  title: string;
  url: string;
  order_num: number;
  partner: IPartner;
}
interface IPartner {
  name: string;
  slug: string;
  color: string;
  icon_url: string | null;
}
