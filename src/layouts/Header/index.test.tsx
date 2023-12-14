import { screen } from '@testing-library/react';

import { renderWithClient } from '@/utils/testing';

import { Header } from '.';

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

describe('Header', () => {
  it('should rendered', () => {
    renderWithClient(<Header />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should render categories', async () => {
    renderWithClient(<Header />);

    const categoryLen = (await screen.findAllByTestId('nav-category')).length;

    expect(categoryLen).toBeGreaterThan(0);
  });
});
