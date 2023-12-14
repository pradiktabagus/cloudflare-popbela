# Dropdown

## Example Usage
```tsx
<Dropdown
  placement="bottom-end"
  trigger={
    <IconButton
      variant="ghost"
      aria-label="tigger"
      size="sm"
      color="primary"
      icon={<FontAwesomeIcon icon={faHamburger} />}
    />
  }
  content={<Box>Content</Box>}
  contentProps={{ padding: '10px 15px', w: '200px' }}
/>
```

## Props

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `trigger`    | `ReactNode`        |  `-`   | `Trigger show/hide dropdown`         |
| `content`    | `ReactNode`        |  `-`   | `Children/komponen yang akan di tampilkan di dropdown`         |
| `placement`   | `PlacementWithLogical`         |   `bottom`          | `penempatan dropdown (lihat bawah)`       |
| `contentProps`   | `props`         |   `-`          | `Props pada content dropdown`       |

### type PlacementWithLogical
```tsx
type PlacementWithLogical = "start-start" | "start-end" | "end-start" | "end-end" | "start" | "end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end" | "top" | "bottom" | "left" | "right"
```