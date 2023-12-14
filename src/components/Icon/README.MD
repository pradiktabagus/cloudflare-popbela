# Icon Documentation Template

> Gunakan komponen Icon untuk membuat komponen Icon dan fontawesome

## Usage

```tsx
import { Icon } from '@/components';

export const App = () => {
	return (
	  <Icon url="https://twitter.com">
        <FontAwesomeIcon icon={faFacebook} />
    </Icon>
	);
}
```

### Props

Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `children`    | `React.ReactNode`        |  `-`   | `Children bisa menggunakan fontawesome`         |
| `sizeIcon`    | `string` `number`        |  `32px`   | `Size icon pada box`         |
| `boxSize`    | `string` `number`        |  `45px`   | `Size box pada komponen`         |
| `url`    | `string`        |  `-`   | `url icon`         |
| `BoxProps`   | `props`         |   `-`          | `Props bawaan pada component Box chakraui`                                   |
                               |