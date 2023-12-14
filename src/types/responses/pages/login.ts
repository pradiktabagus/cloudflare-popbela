export interface ResponseLogin {
  status: number;
  message: string;
  data: IDataLogin;
}
export interface IDataLogin {
  name: string;
  username: string;
  avatar: string;
  banner: string;
  email: string;
  gender: string;
  city: ICity;
  description: string;
  period: string;
}
interface ICity {
  name: string;
  slug: string;
}
