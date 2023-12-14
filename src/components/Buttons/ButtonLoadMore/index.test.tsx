import { render, screen } from '@testing-library/react';

import { ButtonLoadMore } from '.';

describe('Testing Button Load More', () => {
  it('can see button load more', () => {
    render(<ButtonLoadMore />);
    const btn = screen.getByRole('button', { name: /load more/i });
    expect(btn).toBeInTheDocument();
  });

  it('should have loading text when isLoading=true', () => {
    render(<ButtonLoadMore isLoading />);
    const btn = screen.getByRole('button', { name: /loading/i });
    expect(btn).toBeInTheDocument();
  });
});
