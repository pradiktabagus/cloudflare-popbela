import { render, screen } from '@testing-library/react';

import { HeadingTitle } from '.';

describe('HeadingTitle', () => {
  it('rendered', () => {
    render(<HeadingTitle>Heading</HeadingTitle>);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('render correct level', () => {
    render(<HeadingTitle as="h1" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    render(<HeadingTitle as="h2" />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    render(<HeadingTitle as="h3" />);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    render(<HeadingTitle as="h4" />);
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    render(<HeadingTitle as="h5" />);
    expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
    render(<HeadingTitle as="h6" />);
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });
});
