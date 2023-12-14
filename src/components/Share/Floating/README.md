# ShareSocial
> Komponent buton share yang berisi link untuk share ke sosmed facebook, linkdin, teitter, whatsapp, telegram dan line

## Example Usage

```tsx
const article = {
  category: 'Fashion',
  title:
    'Semua Orang Bisa Bergabung, Serial Squid Game Dijadikan Reality Show',
  url: 'https://www.popbela.com/',
  excerpt: 'Lorem Ipsum Excerpt',
}

<ShareSocial article={article} />
```
## Props
| Name         | Type            | Default        | Description                                        |
| ------------ | --------------- | -------------- | -------------------------------------------------- |
| `article`\*      | `Article`        |   `-`          | `Object article (lihat di bawah)`					                     |
| `iconSize`    | `LayoutProps['boxSize]`        | `-`            | `width icon, canbe responsive`                                    |
| `linkClassname`    | `string`        | `-`            | `Custom class untuk item link`                                    |
| `boxProps`    | `BoxProps`        | `-`            | `Style untuk wrapper`                                    |


### type Article
```tsx
type Article = {
  title: string;
  excerpt: string;
  url: string;
};
```
