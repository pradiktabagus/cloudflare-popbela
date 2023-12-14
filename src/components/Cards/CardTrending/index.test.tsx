import { render, screen } from '@testing-library/react';

import { CardTrending } from '@/components';

describe('CardTrending render correctly', () => {
  const data = {
    sub_category: {
      category_url: '',
      name: 'Fashion',
    },
    title:
      'Semua Orang Bisa Bergabung, Serial Squid Game Dijadikan Reality Show',
    author: {
      author: 'VoB (Voice of Baceprot)',
      avatar:
        'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
      name: 'VoB (Voice of Baceprot)',
    },
    release_date: 1657179000,
    excerpt: 'Khusus pejalan kaki',
    cover: {
      placeholder_image_url:
        'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
      image_url:
        'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
    },
  };

  it('Binding data correctly', () => {
    render(<CardTrending data={data} />);

    expect(screen.getByTestId('title')).toHaveTextContent(data.title);
    expect(screen.getByTestId('time')).toHaveTextContent('7 Juli 2022');
  });
});
