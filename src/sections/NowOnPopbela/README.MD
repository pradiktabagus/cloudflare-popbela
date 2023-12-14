# SectionNowOnPopbela
komponen section now on popbela merupakan komponen headline dari masing-masing kategori

## PROPS
```ts
data: ResponseNowOnPopbela[]
```

## Usage
```tsx
const SectionNowOnPopbela = dynamic<NowOnPopbelaProps>(() =>
    import('@/components').then((mod) => mod.SectionNowOnPopbela)
);

<SectionNowOnPopbela data={data.now_on_popbela} />
```
