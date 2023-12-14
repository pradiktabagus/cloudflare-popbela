# HeaderNavAmp
> navigation untuk halaman AMP

## Example Usage

```tsx
<HeaderNavAmp
  categories={[
    {
      name: 'fashion',
      slug: 'fashion',
      category_url: '/fashion',
      active: true, // not required
    },
    { name: 'beauty', slug: 'beauty', category_url: '/beauty' },
    { name: 'career', slug: 'career', category_url: '/career' },
    {
      name: 'lifestyle',
      slug: 'lifestyle',
      category_url: '/lifestyle',
    },
    {
      name: 'relationship',
      slug: 'relationship',
      category_url: '/relationship',
    },
  ]}
/>
```

## Props

## Props
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `categories`\*     | `Category[]`       |   `-`      | `list category (lihat dibawah)`		|
| `linkClassname`     | `string`       |   `-`      | `custom class untuk tag li`		|
| `variant`     | `mobile \| desktop`       |   `desktop`      | `desktop dan mobile memiliki style yang berbeda`		|
| `...stackProps`     | `StackProps`       |   `-`      | `Props untuk wrapper list (ul)`		|

> dengan stackProps akan mempermudah customisasi

### Type Category
```tsx
type Category = {
  name: string;
  category_url: string;
  active?: boolean;
  slug?: string;
};
```