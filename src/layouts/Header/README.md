# Header
- Header popbela yang akan muncul di semua halaman
- categories didapat dari api
- logo popbela dari assets
- tampilan channel berbeda mobile dan desktop
- link-link social popbela akan hilang saat mobile

## Usage
> Silahkan dipanggil di template
ex:

```tsx
const Main = (props: IMainProps) => (
  <>
    <Header />
    // other codes
  </>
);
```

> Pastikan ditaruh diatas sendiri karena ada container spacer