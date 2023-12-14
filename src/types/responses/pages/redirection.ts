export interface IRedirection {
  redirection: Redirection;
}
interface Redirection {
  status_code?: number | string;
  url?: string;
}
