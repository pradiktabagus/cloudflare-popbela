import { screen } from '@testing-library/react';
import { rest } from 'msw';

import type { Category } from '@/types/category';
import { renderWithClient, server } from '@/utils/testing';
import search from '@/utils/testing/server/json/search.json';

import { SearchContainer } from '.';

describe('Search Container', () => {
  const category: Category[] = [
    {
      name: 'Fashion',
      category_url: '/fashion',
      slug: 'fashion',
    },
    {
      name: 'Beauty',
      category_url: '/beauty',
      slug: 'fashion',
    },
    {
      name: 'Lifestyle',
      category_url: '/lifestyle',
      slug: 'fashion',
    },
    {
      name: 'Career',
      category_url: '/career',
      slug: 'fashion',
    },
    {
      name: 'Relationship',
      category_url: '/relationship',
      slug: 'fashion',
    },
  ];

  it('rendered correctly', () => {
    renderWithClient(
      <SearchContainer isMobile={true} categories={category ?? []} />
    );
    expect(screen.getByTestId('search-container')).toBeInTheDocument();
  });

  it('rendered correctly mobile version', () => {
    renderWithClient(
      <SearchContainer isMobile={true} categories={category ?? []} />
    );
    expect(screen.getByTestId('search-mobile')).toBeInTheDocument();
  });

  it('rendered correctly desktop version', () => {
    renderWithClient(
      <SearchContainer isMobile={false} categories={category} />
    );
    expect(screen.getByTestId('search-desktop')).toBeInTheDocument();
  });

  it('loadmore button desktop version', async () => {
    server.use(
      rest.get('*/components/search', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(search));
      })
    );

    renderWithClient(
      <SearchContainer isMobile={false} categories={category} />
    );
    expect(
      await screen.findByTestId('button-load-more-search')
    ).toBeInTheDocument();
    const items = await screen.findAllByTestId('list-search');
    expect(items).toHaveLength(10);
  });

  it('loadmore button mobile version', async () => {
    server.use(
      rest.get('*/components/search', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(search));
      })
    );

    renderWithClient(<SearchContainer isMobile={true} categories={category} />);
    expect(
      await screen.findByTestId('button-load-more-search')
    ).toBeInTheDocument();
    const items = await screen.findAllByTestId('list-search');
    expect(items).toHaveLength(10);
  });
});
