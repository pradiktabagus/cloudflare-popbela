import { screen } from '@testing-library/react';

import { renderWithClient } from '@/utils/testing';

import Main from './Main';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/[category]',
      pathname: '/[category]',
      query: { category: 'fashion' },
      asPath: '/fashion',
    };
  },
}));

describe('Main template', () => {
  it('should have footer and header', async () => {
    renderWithClient(<Main meta={null}>{null}</Main>);
    expect(await screen.findByTestId('footer')).toBeInTheDocument();
    expect(await screen.findByTestId('header')).toBeInTheDocument();
  });
});
