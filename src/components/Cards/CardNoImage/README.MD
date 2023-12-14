# CardNoImage Documentation Template

> Gunakan komponen CardNoImage untuk membuat komponen tanpa image

## Usage

```tsx
import { CardNoImage } from '@/components';

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
		<CardNoImage
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