# SectionHeadline
komponen section headline merupakan komponen headline yang terdiri dari 3 artikel teratas pada halaman homepage 

## PROPS
```ts
data?: HeadlineProps[] // default = []
imageHeight?: string | number
```

## Usage
```tsx
const SectionHeadline = dynamic<HeadlineProps>(() =>
    import('@/components').then((mod) => mod.SectionHeadline)
);

<SectionHeadline data={data.headline} />
```

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `article_url`     | `string`        |   `-`          | `-` 									 |
| `article_url_amp`  | `string`        | `-`        | `-`                                       |
| `author`  | `Author`        | `-`        | `Object author`                                       |
| `campaign` | `string`        |   `-`      | `-`                         |
| `category` | `Category`        |   `-`      | `Object category`                         |
| `cover` | `Cover`        |   `-`      | `Object cover`                         |
| `excerpt` | `string`        |   `-`      | `-`                         |
| `flag` | `string`        |   `-`      | `-`                         |
| `release_date` | `number`        |   `-`      | `-`                         |
| `sub_category` | `SubCategory`        |   `-`      | `Object sub_category`                         |
| `title` | `string`        |   `-`      | `-`                         |
| `type` | `string`        |   `-`      | `-`                         |