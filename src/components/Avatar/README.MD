# Avatar Documentation Template

> Gunakan komponen Avatar untuk membuat avatar dengan badge atau tanpa badge

## Usage

```tsx
import { Avatar } from '@/components';

export const App = () => {
	return (
		<Avatar
        data={{
          name: 'Steven',
          image:
            'https://cdn.popbela.com/content-images/avatar/vidya-tarigan_42x42.jpg',
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
| `badge`    | `boolean`        |  `false`   | `Menggunakan badge avatar atau tidak`         |
| `AvatarProps`   | `props`         |   `-`          | `Props bawaan pada component Avatar chakraui`                                   |

**Props data `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `name`\*      | `string`        |   `-`          | `Nama avatar`					                     |
| `image`\*    | `string`        | `-`            | `Image yang akan di tampilkan`                                    |