import { render, screen } from '@testing-library/react';

import { HeadingAuthor } from '.';

describe('HeadingAuthor', () => {
  it('rendered', () => {
    render(<HeadingAuthor path="/heading">Heading</HeadingAuthor>);
    expect(screen.getByTestId('author')).toBeInTheDocument();
  });
});
