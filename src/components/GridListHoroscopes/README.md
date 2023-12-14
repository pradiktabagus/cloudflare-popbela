# GridListHoroscopes
> Untuk menampilkan horoscope dalam bentuk list dan grid

## Example Usage
```tsx
import {GridListHoroscopes} from '@/components';

// ---

<GridListHoroscopes as="grid" />
<GridListHoroscopes as="list" />
```

## Props
Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `as`     | `list | grid`        |   `grid`          | `Jika list maka akan berbentuk list horizontal dengan overflow auto. jika grid akan berupa 2 kolom grid` 									 |
| `initialData`   | `Horoscope[]`         |   `-`          | `Data list horoscope (lihat bawah)`                                   |
| `iconProps`   | `BoxProps`         |   `-`          | `Custom props untuk icon wrapper`                                   |
| `nameProps`   | `BoxProps`         |   `-`          | `Custom props untuk zodiac name`                                   |
| `gridProps`   | `BoxProps`         |   `-`          | `Custom props untuk grid wrapper, jika as grid`                                   |

### type Horoscope
```tsx
export type Horoscope = {
  name: string;
  icon: string;
  slug: string;
  horoscope_url: string;
  image: string;
  start_date: string;
  end_date: string;
};
```