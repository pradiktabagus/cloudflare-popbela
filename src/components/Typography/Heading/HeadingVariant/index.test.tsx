import { render, screen } from '@testing-library/react';

import { HeadingVariant } from '.';

describe('Heading', () => {
  it('rendered', () => {
    render(<HeadingVariant />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('render correct font family base on variant', () => {
    render(<HeadingVariant variant="section" />);
    const elem = screen.getByRole('heading');
    const style = window.getComputedStyle(elem);
    expect(style.fontFamily).toBe('futuraTemeed');
  });

  it('render correct font size base on variant', () => {
    render(<HeadingVariant variant="category" />);
    const elem = screen.getByRole('heading');
    const style = window.getComputedStyle(elem);
    expect(style.fontSize).toBe('18px');
  });
});
