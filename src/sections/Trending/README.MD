# SectionTrending
> Section Trending menampilkan data berjumlah 5 artikel

## PROPS
```ts
data: ResponseTrending[] // selengkapnya di types section latest
```

## Usage

```tsx
const { data } = useDefaultPages('homepage');

// ...
<SectionTrending data={data.latest} />
```