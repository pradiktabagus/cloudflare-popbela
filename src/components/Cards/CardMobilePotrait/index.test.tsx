import { render, screen } from '@testing-library/react';

import { CardMobilePotrait } from '@/components';

describe('CardMobilePotrait render correctly', () => {
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
    release_date: 11111111,
    excerpt: 'Khusus pejalan kaki',
    cover: {
      image_url:
        'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
    },
  };

  it('Binding data correctly', () => {
    render(<CardMobilePotrait data={data} />);

    expect(screen.getByTestId('category')).toHaveTextContent(
      data.sub_category.name
    );
    expect(screen.getByTestId('title')).toHaveTextContent(data.title);
    // expect(screen.getByTestId('time')).toHaveTextContent(data.release_date);
  });
});
