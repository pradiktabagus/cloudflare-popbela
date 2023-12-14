# CardNowPopbela Documentation Template

> Gunakan komponen CardNowPopbela untuk membuat komponen card on popbela

## Usage

```tsx
import { CardNowPopbela } from '@/components';

export const App = () => {
  const data = {
    category: 'Fashion',
    src: 'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
    title:
      'Semua Orang Bisa Bergabung, Serial Squid Game Dijadikan Reality Show',
    author: 'Masaki',
    date: '27 Feb 2022',
    text: "jalan-jalan"
  };
	return (
		<CardNowPopbela
        data={data}
        width="full"
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
| `heightimg`  | `number`        | `398`        | `Height image`                                       |
| `paddingdesc`    | `string`        |  `40px`   | `Size padding pada container deskripsi card`         |
| `background` | `string`        |   `white`      | `background color pada card`                         |
| `widthimg`   | `number`        |   `336`      | `Size width image`                                   |
| `BoxProps`   | `props`         |   `-`          | `Props bawaan pada component Box chakraui`                                   |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `src`\*      | `string`        |   `-`          | `Src image atau url`					                     |
| `title`\*    | `string`        | `-`            | `Judul artikel`                                    |
| `category`\* | `string`        |  `-`           | `Kategori artikel`                                 |
| `date`\*     | `string`        |   `-`          | `Tanggal artikel`                                  |
| `author`\*   | `string`        |   `-`          | `Author artikel`                                   |
| `url`\*      | `string`        |   `-`          | `Url artikel`                                      |
| `text`\*      | `string`        |   `-`          | `Text artikel`                                      |