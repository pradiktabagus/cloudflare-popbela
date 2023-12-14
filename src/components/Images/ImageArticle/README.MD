# ImageArticle Documentation Template

> Gunakan komponen ImageArticle untuk membuat komponen image dengan source image

## Usage

```tsx
import { ImageArticle } from '@/components';

export const App = () => {
  const data = {
    category: 'Fashion',
    src: 'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
    title:
      'Semua Orang Bisa Bergabung, Serial Squid Game Dijadikan Reality Show',
    author: 'VoB (Voice of Baceprot)',
    date: '27 Feb 2022',
    url: 'https://www.popbela.com/',
    text: 'Khusus pejalan kaki',
    picsource: 'popbela',
  };
	return (
		<ImageArticle
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
| `heightimg`  | `number` `string`        | `auto`        | `Height image`                                       |
| `widthimg` | `number` `string`        |   `full`      | `Width image`                         |
| `sourcepotition` | `string`        |   `bottomRight`      | `posisi source image`                         |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `src`\*      | `string`        |   `-`          | `Src image atau url`					                     |
| `url`\*      | `string`        |   `-`          | `Url artikel`                                   |
| `picsource`      | `string`        |   `-`          | `Source image artikel`                                   |