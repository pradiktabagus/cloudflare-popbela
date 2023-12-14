import { render, screen } from '@testing-library/react';

import { CardCreator } from '@/components';

describe('CardCreator render correctly', () => {
  const data = {
    category: 'Fashion',
    src: 'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
    title:
      'Semua Orang Bisa Bergabung, Serial Squid Game Dijadikan Reality Show',
    author: 'Masaki',
    date: 1657179000,
    url: 'https://www.popbela.com',
    blurSrc:
      'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
  };

  it('Binding data correctly', () => {
    render(<CardCreator data={data} width="sm" />);

    expect(screen.getByTestId('author')).toHaveTextContent(data.author);
    expect(screen.getByTestId('time')).toHaveTextContent('Juli 2022');
  });
});
