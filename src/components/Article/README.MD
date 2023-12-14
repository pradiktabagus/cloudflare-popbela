# Article Documentation Template

> Gunakan komponen Article untuk menampilkan description pada artikel dan horoscope
## Usage

```tsx
import { Article } from '@/components';

export const App = () => {
	return (
		<Article
        data={{
          sub_category: {
            name: 'style & trends',
            category_url: '/fashion/style-trends',
          },
          description:
            '<p>Masakan khas Tiongkok sangat populer di Indonesia karena cita rasanya yang luar biasa. Bahkan, sudah banyak restoran khas Tiongkok yang tersebar di berbagai wilayah di Indonesia.</p>',
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
| `data`\*     | `object`        |   `-`          | `Data artikel` 									 |
| `variant`    | `boolean`        |  `article`   | `tipe variant untuk di gunakan pada artikel atau horoscope`         |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `description`\*      | `string`        |   `-`          | `Nama avatar`					                     |
| `sub_category`\*    | `object`        | `-`            | `Sub kategory pada artikel`                                    |

**Props sub_category `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `name`\*      | `string`        |   `-`          | `Nama pada sub kategory`					                     |
| `category_url`\*    | `string`        | `-`            | `link pada sub kategory`                                    |