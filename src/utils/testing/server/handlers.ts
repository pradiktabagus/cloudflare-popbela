/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import categories from './json/categories.json';
import homepage from './json/homepage.json';
import latest from './json/latest.json';
import search from './json/search.json';

export const handlers = [
  rest.get('*/categories', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(categories));
  }),

  rest.get('*/components/horoscopes', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.get('*/component/latest-article', (req, res, ctx) => {
    const category = req.url.searchParams.get('category');
    const type = req.url.searchParams.get('type');
    const page = req.url.searchParams.get('page');
    return res(
      ctx.status(200),
      ctx.json({
        category,
        type,
        page,
      })
    );
  }),

  rest.get('*/components/infinity-general', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(latest));
  }),
  rest.get('*/pages/default', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(homepage));
  }),
  rest.get('*/components/search', (req, res, ctx) => {
    const category = req.url.searchParams.get('keyword');
    const page = req.url.searchParams.get('page');
    return res(
      ctx.status(200),
      ctx.json({
        category,
        page,
      })
    );
  }),
  rest.get('*/pages/general', (req, res, ctx) => {
    const url = req.url.searchParams.get('url');
    const limit = req.url.searchParams.get('limit');
    const page = req.url.searchParams.get('page');
    const keyword = req.url.searchParams.get('keyword');
    return res(
      ctx.status(200),
      ctx.json({
        url,
        page,
        limit,
        keyword,
      })
    );
  }),
  rest.get('*/components/search', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(search));
  }),
];
