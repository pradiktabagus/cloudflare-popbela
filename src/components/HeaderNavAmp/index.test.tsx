import { render, screen } from '@testing-library/react';

import { HeaderNavAmp } from '..';

describe('HeaderNav', () => {
  const categories = [
    {
      name: 'fashion',
      slug: 'fashion',
      category_url: '/fashion',
      active: true,
    },
    { name: 'beauty', slug: 'beauty', category_url: '/beauty' },
    { name: 'career', slug: 'career', category_url: '/career' },
    {
      name: 'lifestyle',
      slug: 'lifestyle',
      category_url: '/lifestyle',
    },
    {
      name: 'relationship',
      slug: 'relationship',
      category_url: '/relationship',
    },
  ];

  it('should render', () => {
    render(<HeaderNavAmp categories={categories} />);
    expect(screen.getByTestId('header-amp')).toBeInTheDocument();
  });

  it('should render all link', () => {
    render(<HeaderNavAmp categories={categories} />);
    expect(screen.getAllByRole('link').length).toEqual(categories.length);
  });
});
