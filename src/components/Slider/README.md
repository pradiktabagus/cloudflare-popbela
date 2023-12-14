# Slider
> Wrapper react-slick slider dengan beberapa default value

## Example Usage
```tsx
import {CustomSlider} from '@/component';

// ...

<VStack w="full">
  <CustomSlider arrows>
    <CardNowOnPopbela data={data} />
    <CardNowOnPopbela data={data} />
  </CustomSlider>
  <CustomSlider
    slidesToShow={3}
    slidesToScroll={1}
    responsive={defaultResponsive}
    dots
    withMargin
  >
    <Box>
      <CardMobilePotrait data={data} />
    </Box>
    <Box>
      <CardMobilePotrait data={data} />
    </Box>
    <Box>
      <CardMobilePotrait data={data} />
    </Box>
    <Box>
      <CardMobilePotrait data={data} />
    </Box>
  </CustomSlider>
</VStack>
```

## Props
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `...reactSlickProps`     | `Settings`       |   `-`      | `Semua props dari react-slick`		|
| `...boxProps`     | `LayoutProps & SpaceProps`       |   `-`      | `Style untuk box wrapper`		|
| `withMargin`     | `boolean`       |   `-`      | `menambah margin diantara slides senilai 10px`		|
| `withDefaultResponsive`     | `boolean`       |   `-`      | `untuk menggunakan nilai responsive default yang disediakan`		|

Selain itu juga disediakan props heading lainnya untuk styling, termasuk didalamnya **fontSize, fontFamily, fontWeight, color, textTransform dan children**, dll

> Untuk sekarang library react-slick belum support untuk set margin seperti di react-owl-carousel jadi perlu dihardcode, sementara untuk library react-owl-carousel masih terdapat issue untuk next js karena jquery, jadi masih perlu riset lagi