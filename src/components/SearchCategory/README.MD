# SearchCategory Documentation Template

> Gunakan komponen SearchCategory untuk membuat komponen list category pada search mobile

## Usage

```tsx
import { SearchCategory } from '@/components';

export const App = () => {
  const category = [
  { name: 'Fashion', path: '/fashion' },
  { name: 'Beauty', path: '/beauty' },
  { name: 'Lifestyle', path: '/lifestyle' },
  { name: 'Career', path: '/career' },
  { name: 'Relationship', path: '/relationship' },
];
	return (
	  <SearchCategory listcategory={category} />
	);
}
```

### Props

Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `listcategory`\*     | `array`        |   `-`          | `List category` 									 |