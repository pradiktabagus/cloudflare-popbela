export interface ResponseHoroscopes {
  horoscopes: Horoscope[];
}

interface Horoscope {
  name: string;
  slug: string;
  horoscope_url: string;
  icon: string;
  image?: string;
  start_date: string;
  end_date: string;
}

export interface ResponseCurrentHoroscope {
  horoscope: {
    name: string;
    slug: string;
    icon: string;
    horoscope_url: string;
    excerpt: string;
  };
}
