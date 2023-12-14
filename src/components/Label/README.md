# Label and Labels

> Labels akan mereturn list Label. Label mirip dengan button link

## Usage

```tsx
<Labels
  paths={[
    { title: 'popbela news', path: 'popbela-news' },
    { title: 'viral', path: 'viral' },
  ]}
/>
```

### Props

Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `paths`\*     | `array`        |   `-`          | `List path` 									 |
| `spacing`  | `number\|string`        | `-`        | `Space antara Label`                                       |
| `labelBgColor`    | `string`        |  `-`   | `BackgroundColor untuk label`         |
| `color` | `string`        |   `-`      | `Warna teks di label`       |                              |
| `_hover` | `object`        |   `-`      | `Style saat label dihover`       |                              |
| `labelProps` | `BoxProps`        |   `-`      | `Props untuk modifikasi label`       |                              |
| `...wrapperProps` | `WrapperProps`        |   `-`      | `Props untuk modifikasi wrapper labels`       |                              |

**Props Path `*`.**

| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `title`\*      | `string`        |   `-`          | `Title label`					                     |
| `path`    | `string`        | `-`            | `Source href label`   |