# Breadcrumb

## Example Usage

```jsx
<Breadcrumb
  paths={[
    { title: 'Home', link: '/' },
    { title: 'Fashion', link: '/fashion' },
    {
      title: 'Style & Trends',
      link: '/fashion/style-trends',
    },
    {
      title: 'Debut Hailey Bieber Sebagai Wajah Baru Tiffany & Co.',
      isCurrentPage: true,
    },
  ]}
/>
```
## Props
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `paths`\*      | `object`        |   `-`          | `Object path`					                     |
| `activeColor`\*    | `string`        | `primary`            | `Font color untuk hover dan current active page`                                    |
<br/>Note: Ada tambahan breadcrumb props untuk mengatur style breadcrumb


**Path \***
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `title`\*      | `string`        |   `-`          | `Teks title path`					                     |
| `link?`\*    | `string`        | `-`            | `Link path untuk navigasi ex : /style/dating`        
| `isCurrentPage?`\*    | `boolean`        | `-`            | `Jika true maka teks akan diberi warna sesuai dengan activeColor`

Note: jangan menggunakan link dan isCurrentPage bersamaan, pilih salah satu, karena currentpage tidak perlu link


# ArticleBreadcrumb
Breadcrumb khusus untuk artikel.

## Example Usage
```jsx
<ArticleBreadcrumb
  article={{
    title: '13 Hal yang Kamu Harus Tahu Soal Kisah Cinta Harry Styles-Olivia Wilde',
    category: { name: 'Relationship', categoryUrl: '/relationship' },
    subCategory: {
      name: 'Dating',
      categoryUrl: '/relationship/dating',
    },
  }}
/>
```