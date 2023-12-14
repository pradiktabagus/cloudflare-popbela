import { render, screen } from '@testing-library/react';

import { ContainerSearchDefault, ContainerSearchNotFound } from '.';

describe('Container Search', () => {
  it('should rendered container-search-default', () => {
    render(<ContainerSearchDefault />);
    expect(screen.getByTestId('container-search-default')).toBeInTheDocument();

    expect(screen.getAllByRole('img').length).toBe(2);
  });

  it('should rendered container-search-not-found', () => {
    render(<ContainerSearchNotFound />);
    expect(
      screen.getByTestId('container-search-not-found')
    ).toBeInTheDocument();

    expect(screen.getAllByRole('img').length).toBe(2);
    expect(screen.getByText(/please try another/i)).toBeInTheDocument();
  });
});
