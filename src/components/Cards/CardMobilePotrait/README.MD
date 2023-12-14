# CardMobilePotrait Documentation Template

> Gunakan komponen CardMobilePotrait untuk membuat komponen yang berbentuk potrait dan membutuhkan variabel **image, category, title, author dan date**

## Usage

```tsx
import { CardMobilePotrait } from '@/components';

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
		<CardMobilePotrait
        data={data}
    />
	);
}
```

### Props

Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `data`\*     | `object`        |   `-`          | `Data card yang akan ditampilkan` 									 |
| `heightimg`  | `number`  `string`        | `300px`        | `Height image`                                       |
| `widthimg`  | `number`  `string`        | `full`        | `Height image`                                       |
| `backgrounddesc` | `string`        |   `white`      | `background color pada deskripsi`                         |
| `titleProps` | `HeadingProps`        |   `-`      | `Tambahan props khusus untuk heading title`                         |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `src`\*      | `string`        |   `-`          | `Src image atau url`					                     |
| `title`\*    | `string`        | `-`            | `Judul artikel`                                    |
| `category`\* | `string`        |  `-`           | `Kategori artikel`                                 |
| `date`\*     | `string`        |   `-`          | `Tanggal artikel`                                  |
| `author`\*   | `string`        |   `-`          | `Author artikel`                                   |
| `url`\*      | `string`        |   `-`          | `Url artikel`                                   |