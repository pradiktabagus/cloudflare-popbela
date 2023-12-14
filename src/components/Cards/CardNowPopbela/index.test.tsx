import { render, screen } from '@testing-library/react';

import type { DataCardNowOnPopbela } from '@/components';
import { CardNowOnPopbela } from '@/components';

describe('CardNowOnPopbela render correctly', () => {
  const data: DataCardNowOnPopbela = {
    name: 'Fashion',
    category_url: '/fashion',
    description: null,
    meta: null,
    cover: {
      image_url:
        'https://cdn.popbela.com/content-images/default/dummy-200x200_200x200.gif',
      placeholder_image_url:
        'https://cdn.popbela.com/content-images/default/dummy-200x200_200x200.gif',
      width: null,
      height: null,
    },
    title: 'Kolaborasi',
    article_url:
      '/fashion/style-trends/nancy-angel/kolaborasi-off-white-x-churchs-untuk-sepatu-oxford-meteor',
    release_date: 1657074600,
    cover_article: {
      image_url:
        'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_750x500.jpg',
      image_url_hd:
        'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_750x500.jpg',
      image_url_md:
        'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_390x260.jpg',
      image_url_sd:
        'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_125x85.jpg',
      placeholder_image_url:
        'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_200x200.jpg',
      width: 1080,
      height: 720,
    },
    excerpt: 'Kombinasi klasik dan desain khas Virgil Abloh',
    author: {
      name: 'Nancy Angel',
      period: 1621270800,
      author_url: '/nancy-angel',
      avatar:
        'https://cdn.popbela.com/content-images/avatar/nancy-angel_20210518114930_200x200.JPG',
    },
  };

  it('Binding data correctly', () => {
    render(<CardNowOnPopbela data={data} heightimg={436} />);

    expect(screen.getByTestId('category')).toHaveTextContent(data.name);
    expect(screen.getByTestId('title')).toHaveTextContent(data.title);
    expect(screen.getByTestId('author')).toHaveTextContent(data.author?.name);
    expect(screen.getByTestId('text')).toHaveTextContent(data.excerpt);
  });
});
