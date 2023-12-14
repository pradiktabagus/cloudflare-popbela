import { render, screen } from '@testing-library/react';

import { Footer } from '.';

describe('Footer', () => {
  it('should render', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('render all static page link', () => {
    const listStaticPage = [
      { name: 'About', href: '/about-us' },
      { name: 'Career', href: 'https://www.idn.media/career#hire' },
      { name: 'Policy', href: '/kebijakan-privacy' },
      { name: 'Cyber Guidlines', href: '/cyber-media-guidelines' },
      { name: 'Contact', href: '/hubungi-kami' },
    ];

    render(<Footer />);

    listStaticPage.forEach(({ name }) => {
      // 2 karena ada 2 elemen (mobile dan desktop)
      expect(screen.getAllByRole('link', { name }).length).toEqual(2);
    });
  });
});
