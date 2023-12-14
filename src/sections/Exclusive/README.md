# SectionExclusive
> Section Exclusive terdiri dari 4 artikel, saat di mobile akn dihide

## PROPS
```ts
aricles?: Article[] // selengkapnya di types section exclusive
...boxProps?: BoxProps // props untuk wrapper
```

## Usage

```tsx
const { data } = useDefaultPages('homepage');

// ...
<SectionExclusive articles={data.exclusive_interview} />
```