# CardZodiac Documentation Template

> Gunakan komponen CardZodiac untuk membuat komponen card zodiac

## Usage

```tsx
import { CardZodiac } from '@/components';

export const App = () => {
	return (
		<CardZodiac
        data={{
            imgsrc:
              'https://cdn.popbela.com/content-images/avatar/aries_20190513162259.svg',
            name: 'Aries',
            rangetime: '21 March - 19 April',
            url: '/zodiac-aries',
          }}
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
| `namecolor`   | `string`         |   `#616161`          | `Warna pada nama zodiac`                                   |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `imgsrc`\*      | `string`        |   `-`          | `Src image zodiac`					                     |
| `name`\*    | `string`        | `-`            | `Nama zodiac`                                    |
| `rangetime`\* | `string`        |  `-`           | `Range time zodiac`                                 |
| `url`\*     | `string`        |   `-`          | `Url zodiac`                                  |