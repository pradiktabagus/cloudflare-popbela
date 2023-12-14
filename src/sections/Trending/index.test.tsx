import { render, screen } from '@testing-library/react';

import type { ResponseTrending } from '@/types/section/trending';
import { renderWithClient } from '@/utils/testing';

import { SectionTrending } from '.';

describe('section headline', () => {
  const data: ResponseTrending[] = [
    {
      title: '10 Seserahan Penuh Makna yang Ada Saat Lamaran dan Pernikahan',
      excerpt: 'Apa saja isi seserahan lamaran pernikahan, ya?',
      article_url:
        '/relationship/married/dinalathifa/isi-makna-seserahan-pernikahan',
      article_url_amp:
        '/relationship/married/amp/dinalathifa/isi-makna-seserahan-pernikahan',
      article_url_target: '',
      release_date: 1657014000,
      flag: 'regular',
      type: 'editorial-article',
      campaign: null,
      category: {
        name: 'Relationship',
        category_url: '/relationship',
      },
      sub_category: {
        name: 'Married',
        category_url: '/relationship/married',
      },
      author: {
        name: 'Dina Lathifa',
        author_url: '/dinalathifa',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/dinalathifa_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20170929/thebridedept-cc924abe013a049e38a99804cc1c75cc_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20170929/thebridedept-cc924abe013a049e38a99804cc1c75cc_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20170929/thebridedept-cc924abe013a049e38a99804cc1c75cc_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20170929/thebridedept-cc924abe013a049e38a99804cc1c75cc_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20170929/thebridedept-cc924abe013a049e38a99804cc1c75cc_200x200.jpg',
        width: null,
        height: null,
      },
    },
    {
      title: '5 Sikap Cewek yang Dianggap Tidak Menarik Di Mata Cowok',
      excerpt: 'Sorry, ladies....',
      article_url:
        '/relationship/single/dinalathifa/5-sikap-yang-dianggap-tidak-menarik-di-mata-pria',
      article_url_amp:
        '/relationship/single/amp/dinalathifa/5-sikap-yang-dianggap-tidak-menarik-di-mata-pria',
      article_url_target: '',
      release_date: 1657186800,
      flag: 'regular',
      type: 'editorial-article',
      campaign: null,
      category: {
        name: 'Relationship',
        category_url: '/relationship',
      },
      sub_category: {
        name: 'Single',
        category_url: '/relationship/single',
      },
      author: {
        name: 'Dina Lathifa',
        author_url: '/dinalathifa',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/dinalathifa_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20170629/reviewsentertainment-blogspot-734da8ceba1b3dd2dcb64a79e662ea2a_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20170629/reviewsentertainment-blogspot-734da8ceba1b3dd2dcb64a79e662ea2a_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20170629/reviewsentertainment-blogspot-734da8ceba1b3dd2dcb64a79e662ea2a_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20170629/reviewsentertainment-blogspot-734da8ceba1b3dd2dcb64a79e662ea2a_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20170629/reviewsentertainment-blogspot-734da8ceba1b3dd2dcb64a79e662ea2a_200x200.jpg',
        width: null,
        height: null,
      },
    },
  ];

  it('should render correctly', async () => {
    renderWithClient(<SectionTrending data={data} />);
    expect(await screen.findByTestId('section-trending')).toBeInTheDocument();
  });

  it("shouldn't render list-trending", () => {
    render(<SectionTrending data={data} />);
    expect(screen.getAllByTestId('item-trending').length).toEqual(data.length);
  });
});
