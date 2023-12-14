# SectionHoroscope
> pada desktop akan menampilkan current horoscope beserta deskripsinya dan pilihan horoscope dalam bentuk grid. pada mobile akan menampilkan list horoscope


#Usage
```tsx
<SectionHoroscope
    horoscopes={data?.horoscopes} // list horoscope
    currentHoroscope={data?.current_horoscope} // current horoscope
  />
```

#Props

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `horoscopes`     | `ResponseHoroscope[]`        |   `-`          | `Data list horoscope (di bawah)` 									 |
| `currentHooroscope?`   | `ResponseCurrentHoroscope`         |   `-`          | `Data object current horoscope (lihat bawah)`                                   |

### type ResponseHoroscope dan ResponseCurrentHoroscope
```tsx
export interface ResponseHoroscope {
  name: string;
  slug: string;
  horoscope_url: string;
  icon: string;
  image?: string;
  start_date: string;
  end_date: string;
}

export interface ResponseCurrentHoroscope {
  name: string;
  slug: string;
  icon: string;
  horoscope_url: string;
  excerpt: string;
}
```