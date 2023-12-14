import { render, screen } from '@testing-library/react';

import { Labels } from '.';

describe('Label', () => {
  const paths = [
    { title: 'popbela news', path: 'popbela-news' },
    { title: 'viral', path: 'viral' },
  ];

  it('rendered', () => {
    render(<Labels paths={paths} />);

    expect(screen.getByTestId('label-container')).toBeInTheDocument();
  });

  it('render all path correctly', () => {
    render(<Labels paths={paths} />);
    expect(screen.getAllByTestId('label-item').length).toEqual(paths.length);
    paths.forEach((path) => {
      expect(screen.getByText(path.title)).toBeInTheDocument();
    });
  });
});
