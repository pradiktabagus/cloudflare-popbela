import { render, screen } from '@testing-library/react';

import type { Category } from '@/types/category';

import { SearchCategory } from '.';

describe('Search Bar', () => {
  const category: Category[] = [
    {
      name: 'fashin',
      slug: 'fashion',
      category_url: '/fashion',
      description: 'fashion',
      meta: 'fashion',
      active: false,
    },
    {
      name: 'fashin',
      slug: 'fashion',
      category_url: '/fashion',
      description: 'fashion',
      meta: 'fashion',
      active: false,
    },
    {
      name: 'fashin',
      slug: 'fashion',
      category_url: '/fashion',
      description: 'fashion',
      meta: 'fashion',
      active: false,
    },
    {
      name: 'fashin',
      slug: 'fashion',
      category_url: '/fashion',
      description: 'fashion',
      meta: 'fashion',
      active: false,
    },
    {
      name: 'fashin',
      slug: 'fashion',
      category_url: '/fashion',
      description: 'fashion',
      meta: 'fashion',
      active: false,
    },
  ];

  it('rendered correctly', () => {
    render(<SearchCategory listcategory={category} />);
    expect(screen.getByTestId('search-category')).toBeInTheDocument();
  });

  it('length element', () => {
    render(<SearchCategory listcategory={category} />);
    expect(screen.getAllByTestId('item-category').length).toBe(category.length);
  });
});
