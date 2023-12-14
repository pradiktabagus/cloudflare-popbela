# Modal

## Props
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `isOpen`     | `boolean`       |   `false`      | `Untuk menampilkan modal`					                 |
| `onClose`    | `function`      | `()=>{}`       | `Funtion yang tertrigger saat modal close`                                    |
| `content`    | `React.ReactNode`        | `-`      | `Konten isi modal`                              |
| `bgOverlay`  | `string`        | `blackAlpha.900`  | `Background overlay`                            |

## Example Usage 

```tsx
const [isOpen, setIsOpen] = useState(false);
// ...
<Box>
  <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
  <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    content={<SearchBar onSearch={() => {}} />}
  />
</Box>
```