import { screen } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import { renderWithClient, server } from '@/utils/testing';
import trending from '@/utils/testing/server/json/trending-article.json';

import { TrendingArticle } from '.';

describe('Trending Articles', () => {
  it('rendered correctly', () => {
    renderWithClient(<TrendingArticle isDesktop={true} limit={6} />);
    expect(screen.getByTestId('trending-article')).toBeInTheDocument();
  });

  it('see loadmore button & six article rendering', async () => {
    server.use(
      rest.get('*/pages/general', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(trending));
      })
    );

    renderWithClient(<TrendingArticle isDesktop={true} limit={6} />);
    expect(
      await screen.findByTestId('button-load-more-trending')
    ).toBeInTheDocument();
    const items = await screen.findAllByTestId('list-trending-article');
    expect(items).toHaveLength(6);
  });
});
