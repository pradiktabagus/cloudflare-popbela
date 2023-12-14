# SectionPopCreator

## Example Usage

```tsx
const { data } = useDefaultPages('homepage');

// ...
<SectionPopCreator
  data={data?.popcreator_of_the_month}
  mb={{ base: '25px', md: '30px' }}    // boxProps
  mt={{ md: '40px' }}    // boxProps
/>
```

## Props
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `data`     | `PopCreatorResponse`       |   `-`      | `response data pop creator dari server (lihat dibawah)`		|
| `...boxProps`     | `BoxProps`       |   `-`      | `Props untuk wrapper (section)`		|

### Type PopCreatorResponse
```tsx
export interface PopCreatorResponse {
  title: string;
  excerpt?: string;
  article_url: string;
  article_url_amp?: string;
  release_date?: number;
  flag?: string | null;
  type?: string;
  campaign?: string | null;
  category?: Category;
  sub_category?: Category;
  author?: Author;
  cover?: Cover;
}
```
> lebih lengkap tentang type PopCreatorResponse bisa dilihat di /types/section/popcreator.ts