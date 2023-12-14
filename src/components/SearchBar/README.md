# SearchBar
Input search.
<br/>
<br/>

## PROPS
```ts
onSubmitSearch: function(query:string) // event saat button di click akan melakukan fetching search
placeholder?: string // placeholder input (optional)
baseColor?: string // color untuk button search dan border input (optional)
keyword: string // untuk menangkap keyword terakhir sebelum menekan button search
```

## Usage
```tsx
 <SearchBar onSubmitSearch={onSubmitSearching} keyword={keyword}/>
```