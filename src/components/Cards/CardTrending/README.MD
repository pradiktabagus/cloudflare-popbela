# CardTrending Documentation Template

> Gunakan komponen CardTrending untuk membuat komponen yang berbentuk potrait dan membutuhkan variabel **image,  title dan date**

## Usage

```tsx
import { CardTrending } from '@/components';

export const App = () => {
  const data = {
    src: 'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
    title:
      'Semua Orang Bisa Bergabung, Serial Squid Game Dijadikan Reality Show',
    date: '27 Feb 2022',
  };
	return (
		<CardTrending
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
| `heightimg`  | `number` `string`        | `92px`        | `Height image`                                       |
| `paddingdesc`    | `string`        |  `15px 30px`   | `Size padding pada container deskripsi card`         |
| `background` | `string`        |   `white`      | `background color pada card`                         |
| `titlecolor` | `string`        |   `black`      | `Text color pada title card`                         |
| `widthimg` | `number` `string`        |   `92px`      | `Width image`                         |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `src`\*      | `string`        |   `-`          | `Src image atau url`					                     |
| `title`\*    | `string`        | `-`            | `Judul artikel`                                    |
| `category`\* | `string`        |  `-`           | `Kategori artikel`                                 |
| `date`\*     | `string`        |   `-`          | `Tanggal artikel`                                  |
| `author`\*   | `string`        |   `-`          | `Author artikel`                                   |
| `url`\*      | `string`        |   `-`          | `Url artikel`                                   |