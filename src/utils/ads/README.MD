# Provider Ads dan penambahan ads

> Gunakan  AdsProvider untuk menggukanan ads
## Usage

```tsx
import { AdsProvider } from '@/utils/ads/AdsProvider';

export const App = () => {
	return (
      <AdsProvider DFPNetworkID={'253109699'} enableLazyload>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </AdsProvider>
    );
}
```
Ads Provider di tempatkan pada app atau HCO 
### Props AdsProvider

Props ditabel dibawah dengan Name, Type, Default, and Description sebagai judul.

**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `DFPNetworkID`    | `string` `number`        |  `-`   | `DFPNetworkID ads`         |
| `debug`    | `boolean`     |  `false`   | `debug mode untuk melihat hasil ads yang di tampilkan`         |
| `enableLazyload`    | `boolean`     |  `true`   | `lazy load pada ads yang akan di tampilkan`         |

> Untuk menambahkan ads pada page list ads harus ditambahkan terlebih dahulu di useSlotsFromPageuseSlotsFromPage

fungsi **useSlotsFromPage akan** membalikkan data list `ads` dan `pageTargetting`
### Props useSlotsFromPageuseSlotsFromPage
**Required props are ditandai dengan `*`.**

| Name         | Type            | Default        | Description                                          |
| ------------ | --------------- | -------------- | --------------------------------------------------   |
| `pahtName`    | `string`      |  `-`   | `pathname di dapatkan dari useRouter`         |