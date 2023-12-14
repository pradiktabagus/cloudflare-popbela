# Button Documentation Template

> Gunakan komponen Button untuk membuat button biasa

## Usage

```tsx
import { Button } from '@/components';

export const App = () => {
	return (
		<Button>Click Me</Button>
	);
}
```

### Props

Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `buttonlink`    | `boolean`        |  `false`   | `Tipe button dengan link`         |
| `children`    | `ReactNode`        |  `-`   | `Children/komponen yang akan di tampilkan`         |
| `ButtonProps`   | `props`         |   `-`          | `Props bawaan pada component Button chakraui`       |