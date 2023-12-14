import { render, screen } from '@testing-library/react';

import type { ResponseNowOnPopbela } from '@/types/section/now-on-popbela';

import { SectionNowOnPopbela } from '.';

describe('section headline', () => {
  const data: ResponseNowOnPopbela[] = [
    {
      category: {
        name: 'Fashion',
        category_url: '/fashion',
        description: null,
        meta: null,
        cover: {
          image_url:
            'https://cdn.popbela.com/content-images/default/dummy-200x200_200x200.gif',
          placeholder_image_url:
            'https://cdn.popbela.com/content-images/default/dummy-200x200_200x200.gif',
          width: null,
          height: null,
        },
      },
      latest_posts: [
        {
          title:
            "Kolaborasi Off-White™ x Church's untuk Sepatu Oxford 'Meteor'",
          excerpt: 'Kombinasi klasik dan desain khas Virgil Abloh',
          article_url:
            '/fashion/style-trends/nancy-angel/kolaborasi-off-white-x-churchs-untuk-sepatu-oxford-meteor',
          article_url_amp:
            '/fashion/style-trends/amp/nancy-angel/kolaborasi-off-white-x-churchs-untuk-sepatu-oxford-meteor',
          article_url_target: '',
          release_date: 1657074600,
          flag: 'regular',
          type: 'editorial-article',
          campaign: null,
          category: {
            name: 'Fashion',
            category_url: '/fashion',
          },
          sub_category: {
            name: 'Style & Trends',
            category_url: '/fashion/style-trends',
          },
          author: {
            name: 'Nancy Angel',
            period: 1621270800,
            author_url: '/nancy-angel',
            avatar:
              'https://cdn.popbela.com/content-images/avatar/nancy-angel_20210518114930_200x200.JPG',
          },
          cover: {
            image_url:
              'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_750x500.jpg',
            image_url_hd:
              'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_750x500.jpg',
            image_url_md:
              'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_390x260.jpg',
            image_url_sd:
              'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_125x85.jpg',
            placeholder_image_url:
              'https://cdn.popbela.com/content-images/post/20220701/off-white-churchs-0-34aaae9756afa2d1e797216a8019018a_200x200.jpg',
            width: 1080,
            height: 720,
          },
        },
        {
          title: "Nike Rilis Dunk Low dalam Warna 'Sun Devils' yang Memikat",
          excerpt: 'Dijamin statement!',
          article_url:
            '/fashion/style-trends/nancy-angel/nike-rilis-dunk-low-dalam-warna-sun-devils-yang-memikat',
          article_url_amp:
            '/fashion/style-trends/amp/nancy-angel/nike-rilis-dunk-low-dalam-warna-sun-devils-yang-memikat',
          article_url_target: '',
          release_date: 1657071000,
          flag: 'regular',
          type: 'editorial-article',
          campaign: null,
          category: {
            name: 'Fashion',
            category_url: '/fashion',
          },
          sub_category: {
            name: 'Style & Trends',
            category_url: '/fashion/style-trends',
          },
          author: {
            name: 'Nancy Angel',
            period: 1621270800,
            author_url: '/nancy-angel',
            avatar:
              'https://cdn.popbela.com/content-images/avatar/nancy-angel_20210518114930_200x200.JPG',
          },
          cover: {
            image_url:
              'https://cdn.popbela.com/content-images/post/20220701/nike-dunk-low-sun-devil-0-dedebe1be46cac7ae9ae1b449299180a_750x500.jpg',
            image_url_hd:
              'https://cdn.popbela.com/content-images/post/20220701/nike-dunk-low-sun-devil-0-dedebe1be46cac7ae9ae1b449299180a_750x500.jpg',
            image_url_md:
              'https://cdn.popbela.com/content-images/post/20220701/nike-dunk-low-sun-devil-0-dedebe1be46cac7ae9ae1b449299180a_390x260.jpg',
            image_url_sd:
              'https://cdn.popbela.com/content-images/post/20220701/nike-dunk-low-sun-devil-0-dedebe1be46cac7ae9ae1b449299180a_125x85.jpg',
            placeholder_image_url:
              'https://cdn.popbela.com/content-images/post/20220701/nike-dunk-low-sun-devil-0-dedebe1be46cac7ae9ae1b449299180a_200x200.jpg',
            width: 1080,
            height: 720,
          },
        },
        {
          title: 'Deretan Artis Lokal yang Seksi pakai Tank Top',
          excerpt: 'Apakah artis favoritmu ada di dalam list ini?',
          article_url:
            '/fashion/style-trends/hafidhza-putri-andiza/artis-lokal-pakai-tank-top',
          article_url_amp:
            '/fashion/style-trends/amp/hafidhza-putri-andiza/artis-lokal-pakai-tank-top',
          article_url_target: '',
          release_date: 1657032600,
          flag: 'regular',
          type: 'editorial-article',
          campaign: null,
          category: {
            name: 'Fashion',
            category_url: '/fashion',
          },
          sub_category: {
            name: 'Style & Trends',
            category_url: '/fashion/style-trends',
          },
          author: {
            name: 'Hafidhza Putri Andiza',
            period: 1563382800,
            author_url: '/hafidhza-putri-andiza',
            avatar:
              'https://cdn.popbela.com/content-images/avatar/hafidhza-putri-andiza_20190718123624_200x200.jpg',
          },
          cover: {
            image_url:
              'https://cdn.popbela.com/content-images/post/20190815/0649bf502f0f0bc7b3a29b7ae393c67f_750x500.jpg',
            image_url_hd:
              'https://cdn.popbela.com/content-images/post/20190815/0649bf502f0f0bc7b3a29b7ae393c67f_750x500.jpg',
            image_url_md:
              'https://cdn.popbela.com/content-images/post/20190815/0649bf502f0f0bc7b3a29b7ae393c67f_390x260.jpg',
            image_url_sd:
              'https://cdn.popbela.com/content-images/post/20190815/0649bf502f0f0bc7b3a29b7ae393c67f_125x85.jpg',
            placeholder_image_url:
              'https://cdn.popbela.com/content-images/post/20190815/0649bf502f0f0bc7b3a29b7ae393c67f_200x200.jpg',
            width: 1071,
            height: 661,
          },
        },
        {
          title: 'Cara Mengenakan Stocking yang Seksi',
          excerpt: 'Tiru untuk outfit minggu depan ya, Bela!',
          article_url:
            '/fashion/style-trends/hafidhza-putri-andiza/cara-seksi-memakai-stocking-1',
          article_url_amp:
            '/fashion/style-trends/amp/hafidhza-putri-andiza/cara-seksi-memakai-stocking-1',
          article_url_target: '',
          release_date: 1657031400,
          flag: 'regular',
          type: 'editorial-article',
          campaign: null,
          category: {
            name: 'Fashion',
            category_url: '/fashion',
          },
          sub_category: {
            name: 'Style & Trends',
            category_url: '/fashion/style-trends',
          },
          author: {
            name: 'Hafidhza Putri Andiza',
            period: 1563382800,
            author_url: '/hafidhza-putri-andiza',
            avatar:
              'https://cdn.popbela.com/content-images/avatar/hafidhza-putri-andiza_20190718123624_200x200.jpg',
          },
          cover: {
            image_url:
              'https://cdn.popbela.com/content-images/post/20190819/039b665c7cfe5d9c89c6c3460c703361_750x500.jpg',
            image_url_hd:
              'https://cdn.popbela.com/content-images/post/20190819/039b665c7cfe5d9c89c6c3460c703361_750x500.jpg',
            image_url_md:
              'https://cdn.popbela.com/content-images/post/20190819/039b665c7cfe5d9c89c6c3460c703361_390x260.jpg',
            image_url_sd:
              'https://cdn.popbela.com/content-images/post/20190819/039b665c7cfe5d9c89c6c3460c703361_125x85.jpg',
            placeholder_image_url:
              'https://cdn.popbela.com/content-images/post/20190819/039b665c7cfe5d9c89c6c3460c703361_200x200.jpg',
            width: 750,
            height: 500,
          },
        },
        {
          title: 'Gaya Seksi Britney Spears yang Booming di Era 90an',
          excerpt:
            'Busana no. 4 pernah jadi ikon gaya busana "Britney" banget!',
          article_url:
            '/fashion/style-trends/hafidhza-putri-andiza/gaya-seksi-britney-spears-1',
          article_url_amp:
            '/fashion/style-trends/amp/hafidhza-putri-andiza/gaya-seksi-britney-spears-1',
          article_url_target: '',
          release_date: 1657027800,
          flag: 'regular',
          type: 'editorial-article',
          campaign: null,
          category: {
            name: 'Fashion',
            category_url: '/fashion',
          },
          sub_category: {
            name: 'Style & Trends',
            category_url: '/fashion/style-trends',
          },
          author: {
            name: 'Hafidhza Putri Andiza',
            period: 1563382800,
            author_url: '/hafidhza-putri-andiza',
            avatar:
              'https://cdn.popbela.com/content-images/avatar/hafidhza-putri-andiza_20190718123624_200x200.jpg',
          },
          cover: {
            image_url:
              'https://cdn.popbela.com/content-images/post/20190813/0cca0d3cd2cfc440b9c2aa231c32c9ce_750x500.jpg',
            image_url_hd:
              'https://cdn.popbela.com/content-images/post/20190813/0cca0d3cd2cfc440b9c2aa231c32c9ce_750x500.jpg',
            image_url_md:
              'https://cdn.popbela.com/content-images/post/20190813/0cca0d3cd2cfc440b9c2aa231c32c9ce_390x260.jpg',
            image_url_sd:
              'https://cdn.popbela.com/content-images/post/20190813/0cca0d3cd2cfc440b9c2aa231c32c9ce_125x85.jpg',
            placeholder_image_url:
              'https://cdn.popbela.com/content-images/post/20190813/0cca0d3cd2cfc440b9c2aa231c32c9ce_200x200.jpg',
            width: 750,
            height: 500,
          },
        },
      ],
    },
  ];

  it('should render correctly', async () => {
    render(<SectionNowOnPopbela data={data} />);
    expect(
      await screen.findByTestId('section-now-on-popbela')
    ).toBeInTheDocument();
  });

  it('headline render correctly', () => {
    render(<SectionNowOnPopbela data={data} />);
    expect(screen.getByTestId('headline-now-on-popbela')).toBeInTheDocument();
  });

  it('length list article should be 4', () => {
    render(<SectionNowOnPopbela data={data} />);
    expect(screen.getAllByTestId('list-article-now-on-popbela').length).toBe(4);
  });
});
