# HeadingTitle
> Heading Title merupakan heading dari chakra ui dengan default props as dan fontFamily dari brand

## Example Usage
```tsx
<HeadingTitle as="h1">Heading H1</HeadingTitle>
<HeadingTitle as="h2">Heading H2</HeadingTitle>
<HeadingTitle as="h3">Heading H3</HeadingTitle>
<HeadingTitle as="h4" size="lg">
  Heading H4
</HeadingTitle>
<HeadingTitle as="h5" size="md">
  Heading H5
</HeadingTitle>
<HeadingTitle as="h1" size="sm">
  Heading H6
</HeadingTitle>
<HeadingTitle as="h1" fontFamily="futuraBook">
  Futura Book
</HeadingTitle>
<HeadingTitle as="h1" fontFamily="futuraTemeed" size="lg">
  Futura Temeed
</HeadingTitle>
```

## Props
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `as`     | `HeadingLevel`       |   `h2`      | `Level heading (lihat bawah)`		|
| `fontFamily`     | `BrandFontFamily`       |   `limerick`      | `font family dari brand (lihat bawah)`		|

Selain itu juga disediakan props heading lainnya untuk styling, termasuk didalamnya **fontSize, fontFamily, fontWeight, color, textTransform dan children**, dll

### type HeadingLevel
```tsx
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
```

### type BrandFontFamily
```tsx
export type BrandFontFamily =
  | 'limerick'
  | 'futuraBook'
  | 'futuraTemeed'
  | 'bahijMitra';
```
> Bisa ditambah lagi, jangan lupa untuk mendaftarkan font dahulu di chakra theme (/style/theme)