# CardLandscape Documentation Template

> Gunakan komponen CardLandscape untuk membuat komponen yang berbentuk landscape dan membutuhkan variabel **image, category, title, author dan date**

## Usage

```tsx
import { CardLandscape, CardLandscapeAmp } from '@/components';

export const App = () => {
  const data = {
    category: 'Fashion',
    src: 'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
    title:
      'Semua Orang Bisa Bergabung, Serial Squid Game Dijadikan Reality Show',
    author: 'Masaki',
    date: '27 Feb 2022',
  };
	return (
    <>
      <CardLandscape
          data={data}
          width="full"
      />
      <CardLandscapeAmp
          data={data}
          width="full"
      />
    </>
	);
}
```

### Props Card landscape

Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `data`\*     | `object`        |   `-`          | `Data card yang akan ditampilkan` 									 |
| `heightimg`  | `number`        | `166px`        | `Height image`                                       |
| `paddingdesc`    | `string`        |  `15px 30px`   | `Size padding pada container deskripsi card`         |
| `background` | `string`        |   `white`      | `background color pada card`                         |
| `titlecolor` | `string`        |   `black`      | `Text color pada title card`                         |
| `widthimg`   | `number`        |   `133px`      | `Size width image`                                   |
| `BoxProps`   | `props`         |   `-`          | `Props bawaan pada component Box chakraui`                                   |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `cover`\*      | `string`        |   `-`          | `Src image atau url`					                     |
| `title`\*    | `string`        | `-`            | `Judul artikel`                                    |
| `sub_category`\* | `string`        |  `-`           | `Kategori artikel`                                 |
| `release_date`\*     | `string`        |   `-`          | `Tanggal artikel`                                  |
| `author`\*   | `string`        |   `-`          | `Author artikel`                                   |
| `article_url`\*      | `string`        |   `-`          | `Url artikel`                                      |

### Props Card landscape amp

Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `data`\*     | `object`        |   `-`          | `Data card yang akan ditampilkan` 									 |
| `heightimg`  | `number`        | `166px`        | `Height image`                                       |
| `paddingdesc`    | `string`        |  `15px 30px`   | `Size padding pada container deskripsi card`         |
| `background` | `string`        |   `white`      | `background color pada card`                         |
| `titlecolor` | `string`        |   `black`      | `Text color pada title card`                         |
| `widthimg`   | `number`        |   `133px`      | `Size width image`                                   |
| `BoxProps`   | `props`         |   `-`          | `Props bawaan pada component Box chakraui`                                   |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `cover`\*      | `string`        |   `-`          | `Src image atau url`					                     |
| `title`\*    | `string`        | `-`            | `Judul artikel`                                    |
| `sub_category`\* | `string`        |  `-`           | `Kategori artikel`                                 |
| `release_date`\*     | `string`        |   `-`          | `Tanggal artikel`                                  |
| `author`\*   | `string`        |   `-`          | `Author artikel`                                   |
| `article_url_amp`\*      | `string`        |   `-`          | `Url artikel`                                      |