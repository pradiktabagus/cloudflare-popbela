# Banner
> Container dengan background image

## Example Usage
```tsx
<Banner
  srcBg="/v3/assets/images/desktop/background-detail-horoscope-select.png"
  srcBgMobile="/v3/assets/images/mobile/background-detail-horoscope-select.png"
  w="716px" // boxProps
  h="120px" // also boxProps
>
  <ButtonLoadMore />
</Banner>
```

## Props
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `children`\*   | `ReactNode`     |   `-`          | `Element react`					                           |
| `srcBg`\*    | `string`   | ``             | `Image source untuk background`                       |
| `srcBgMobile` | `string`   | ``             | `Image source untuk mobile`                       |
| `...boxProps` | `BoxProps`        | `-`      | `Custom props untuk container`                              |

> Note: jika srcBgMobile tersedia maka di tampilan mobile akan diganti dengan srcBgMobile secara otomatis