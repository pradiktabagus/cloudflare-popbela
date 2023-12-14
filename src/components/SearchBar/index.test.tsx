import { render, screen } from '@testing-library/react';

import { SearchBar } from '.';

describe('Search Bar', () => {
  it('rendered', () => {
    render(<SearchBar onSubmitSearch={() => {}} keyword="tes" />);
    const elem = screen.getByTestId('search-bar');
    expect(elem).toBeInTheDocument();
  });

  it('element should have input and button', () => {
    render(<SearchBar onSubmitSearch={() => {}} keyword="tes" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
