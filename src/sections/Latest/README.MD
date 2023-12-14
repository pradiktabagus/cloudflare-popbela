# SectionLatest
> Section Latest terdiri dari 2 section, section pertama menampilkan 12 artikel dengan 2 grid. dan section ke dua menampilan 6 artikel dengan 3 grid

## PROPS
```ts
data: ResponseLatest[] // selengkapnya di types section latest
```

## Usage

```tsx
const { data } = useDefaultPages('homepage');

// ...
<SectionLatestTop data={data.latest} />
<SectionLatestBottom data={data.latest} />
```