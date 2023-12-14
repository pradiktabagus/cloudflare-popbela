import { screen } from '@testing-library/react';

import { renderWithClient } from '@/utils/testing';

import { GridListHoroscopes } from '.';

describe('GridListHoroscopes', () => {
  it('rendered grid', () => {
    renderWithClient(<GridListHoroscopes as="grid" />);
    expect(screen.getByTestId('grid-horoscopes')).toBeInTheDocument();
  });

  it('rendered list', () => {
    renderWithClient(<GridListHoroscopes as="list" />);
    expect(screen.getByTestId('list-horoscopes')).toBeInTheDocument();
  });
});
