# TabNavigation

## Example Usage
```tsx
<TabNavigation
  tabs={[
    { url: '/fashion', name: 'all', active: true },
    { url: '/fashion/style-trends', name: 'style & trends' },
    { url: '/fashion/look-for-less', name: 'look for less' },
  ]}
/>
// or
<TabNavigation
  tabs={[
    { url: '/fashion', name: 'all' },
    { url: '/fashion/style-trends', name: 'style & trends' },
    { url: '/fashion/look-for-less', name: 'look for less' },
  ]}
  activeTabName="all"
/>
```

## Props

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `tabs`\*     | `Tab[]`        |   `-`          | `Array yang berisi data Tab (lihat dibawah)` 									 |
| `activeTabName`     | `string`        |   `-`          | `Nama tab yang aktif` 									 |
| `className`   | `string`         |   `-`          | `class tambahan (bisa pakai tailwindcss juga)`                                   |

**typeof Tab**
```tsx
type Tab = {
  active?: boolean; // tab active atau tidak
  url: string; // url untuk href tab
  name: string; // nama tab
};
```
