import { render, screen } from '@testing-library/react';

import { ShareSocial } from '.';

describe('ShareSocial', () => {
  const data = {
    category: 'Fashion',
    title:
      'Semua Orang Bisa Bergabung, Serial Squid Game Dijadikan Reality Show',
    url: 'https://www.popbela.com/',
    excerpt: 'Lorem Ipsum Excerpt',
  };

  it('rendered correctly', () => {
    render(<ShareSocial article={data} />);
    expect(screen.getByTestId('share-social')).toBeInTheDocument();
    // in mobile only show 5
    expect(screen.getAllByRole('link').length).toEqual(5);
  });
});
