# CardPopCreator Documentation Template

> Gunakan komponen CardPopCreator untuk membuat komponen card popcreator mobile dan desktop

## Usage

```tsx
import { CardPopCreator } from '@/components';

export const App = () => {
  const data = {
    title: 'Voice of Baceprot: Wujud Suar Lantang Kartini Masa Kini',
    text: 'Berani mematahkan bias dan stigma di usia muda',
    src: 'https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505.JPG',
    url: 'https://www.popbela.com/',
  };
	return (
		<CardPopCreator
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
| `BoxProps`   | `props`         |   `-`          | `Props bawaan pada component Box chakraui`                                   |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `src`\*      | `string`        |   `-`          | `Src image atau url`					                     |
| `title`\*    | `string`        | `-`            | `Judul artikel`                                    |
| `url`\*      | `string`        |   `-`          | `Url artikel`                                      |
| `text`\*      | `string`        |   `-`          | `Text artikel`                                      |