# HeadingVariant
Disini akan dijelaskan heading dengan props variant. By default teks akan diubah menjadi uppercase dan warna teks akan menjadi primary

## Example Usage
```tsx
<VStack>
  <HeadingVariant variant="section">latest</HeadingVariant>
  <HeadingVariant variant="category">style & trends</HeadingVariant>
  <CustomLink href="/" className="hover:text-white">
    <HeadingVariant
      variant="category"
      fontSize="14px"
      color="black"
      _hover={{ color: 'primary' }}
    >
      with link
    </HeadingVariant>
  </CustomLink>
</VStack>
```

## Props
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `variant`     | `section \| category`       |   `section`      | `untuk mengatur preset fontStyle`		|
| `_hover`     | `object`       |   `-`      | `set style saat heading dihover`		|

Selain itu juga disediakan props umum lainnya untuk styling, yaitu **fontSize, fontFamily, fontWeight, color, textTransform dan children**