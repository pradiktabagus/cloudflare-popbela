import { render, screen } from '@testing-library/react';

import { Breadcrumb } from '.';

describe('Breadcrumb', () => {
  const paths = [
    { title: 'Home', link: '/' },
    { title: 'Fashion', link: '/fashion' },
    {
      title: 'Style & Trends',
      link: '/fashion/style-trends',
    },
    {
      title: 'Debut Hailey Bieber Sebagai Wajah Baru Tiffany & Co.',
      isCurrentPage: true,
    },
  ];

  it('rendered', () => {
    render(<Breadcrumb paths={paths} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/style & trends/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Debut Hailey Bieber Sebagai Wajah Baru Tiffany & Co\./i)
    ).toBeInTheDocument();
  });

  it('count li tag should same as props path', () => {
    render(<Breadcrumb paths={paths} />);
    expect(screen.getAllByRole('listitem').length).toEqual(4);
  });

  it('last li not a link', () => {
    render(<Breadcrumb paths={paths} />);
    const elems = screen.getAllByRole('listitem');
    const last = elems[elems.length - 1];
    // eslint-disable-next-line testing-library/no-node-access
    expect(last?.firstChild).not.toHaveAttribute('href');
  });
});
