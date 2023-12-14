# HeaderArticleZodiac

> Gunakan komponen CardLandscape untuk membuat komponen yang berbentuk landscape dan membutuhkan variabel **image, category, title, author dan date**

## Usage

```tsx
import { HeaderArticleZodiac } from '@/components';

<HeaderArticleZodiac
  data={{
    iconSrc:
      'https://cdn.popbela.com/content-images/avatar/aries_20190513162259.svg',

    name: 'Aries',
    rangeTime: '21 March - 19 April',
    
    excerpt:
      'Ramalan Zodiak Aries Hari Ini - Zodiak Aries berasal dari konstelasi rasi bintang Aries. Zodiak ini memiliki elemen api dan simbol zodiak Aries adalah domba. Orang yang lahir pada tanggal 21 Maret sampai 19 April memiliki zodiak Aries.',
  }}
/>
```

## Props

Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `data`\*     | `HeaderArticleZodiacData`        |   `-`          | `Data card yang akan ditampilkan (lihat detail di bawah)` 									 |
| `iconSize`  | `string \| number`        | `60px`        | `Height & Width icon zodiac`                                       |
| `titleClassname`    | `string`        |  ``   | `Custom class untuk tittle (icon, name, daterange)`         |
| `excerptClassname` | `string`        |   ``      | `Custom class untuk excerpt`                         |
| `mobileIconSize` | `string \| number`        |   `40px`      | `Height & Width icon zodiac mobile`                         |


### type HeaderArticleZodiacData
```tsx
type HeaderArticleZodiacData = {
  iconSrc: string; // url image
  name: string; // nama zodiac
  rangeTime: string;
  excerpt: string;
};
```
