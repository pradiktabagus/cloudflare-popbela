import { render, screen } from '@testing-library/react';

import type { ResponseArticle } from '@/types/responses/article';

import { SectionExclusive } from '.';

describe('SectionExclusive', () => {
  it('should rendered', async () => {
    render(<SectionExclusive />);
    expect(await screen.findByTestId('section-exclusive')).toBeInTheDocument();
  });

  const articles: ResponseArticle[] = [
    {
      title: 'Trending, 12 Pasal Draf RKUHP yang Jadi Sorotan Publik',
      excerpt: 'Kita wajib tahu, nih!',
      article_url:
        '/lifestyle/news/niken-ari/trending-12-pasal-draf-rkuhp-yang-jadi-sorotan-publik',
      article_url_amp:
        '/lifestyle/news/amp/niken-ari/trending-12-pasal-draf-rkuhp-yang-jadi-sorotan-publik',
      article_url_target: '',
      release_date: 1656598500,
      flag: null,
      type: 'editorial-article',
      campaign: null,
      category: {
        name: 'Lifestyle',
        category_url: '/lifestyle',
      },
      sub_category: {
        name: 'News',
        category_url: '/lifestyle/news',
      },
      author: {
        name: 'Niken Ari Prayitno',
        author_url: '/niken-ari',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/Niken Ari_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220630/tingey-injury-law-firm-ycdpu73kgsc-unsplash-5306f8f924ee455d153d4a0623703a9f_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220630/tingey-injury-law-firm-ycdpu73kgsc-unsplash-5306f8f924ee455d153d4a0623703a9f_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220630/tingey-injury-law-firm-ycdpu73kgsc-unsplash-5306f8f924ee455d153d4a0623703a9f_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220630/tingey-injury-law-firm-ycdpu73kgsc-unsplash-5306f8f924ee455d153d4a0623703a9f_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220630/tingey-injury-law-firm-ycdpu73kgsc-unsplash-5306f8f924ee455d153d4a0623703a9f_200x200.jpg',
        width: 1920,
        height: 1280,
      },
    },
    {
      title:
        "Bedanya Gaya Pemain 'Money Heist' Korea di Serial dan Kehidupan Nyata",
      excerpt: 'Banyak senyum kalau di kehidupan nyata',
      article_url: '/beauty/make-up/maria-advensiani/pemeran-money-heist-korea',
      article_url_amp:
        '/beauty/make-up/amp/maria-advensiani/pemeran-money-heist-korea',
      article_url_target: '',
      release_date: 1656983100,
      flag: null,
      type: 'editorial-article',
      campaign: null,
      category: {
        name: 'Beauty',
        category_url: '/beauty',
      },
      sub_category: {
        name: 'Make Up',
        category_url: '/beauty/make-up',
      },
      author: {
        name: 'Maria Advensiani',
        period: 1655226000,
        author_url: '/maria-advensiani',
        avatar: 'https://cdn.popbela.com/content-images/avatar/default.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220701/money-heist-korea-e649e7eb18165d0d0dd1cabc772961f1_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220701/money-heist-korea-e649e7eb18165d0d0dd1cabc772961f1_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220701/money-heist-korea-e649e7eb18165d0d0dd1cabc772961f1_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220701/money-heist-korea-e649e7eb18165d0d0dd1cabc772961f1_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220701/money-heist-korea-e649e7eb18165d0d0dd1cabc772961f1_200x200.png',
        width: 750,
        height: 500,
      },
    },
    {
      title: "Koleksi Sneaker Salomon x Kar L'Art de L'Automobile yang Bold!",
      excerpt: 'Terinspirasi dari otomotif',
      article_url:
        '/fashion/style-trends/nancy-angel/koleksi-sneaker-salomon-x-kar-lart-de-lautomobile-yang-bold',
      article_url_amp:
        '/fashion/style-trends/amp/nancy-angel/koleksi-sneaker-salomon-x-kar-lart-de-lautomobile-yang-bold',
      article_url_target: '',
      release_date: 1656991800,
      flag: null,
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
          'https://cdn.popbela.com/content-images/post/20220630/salomon-kar-0-ff7b7cbfeff4befb792d2db204935444_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220630/salomon-kar-0-ff7b7cbfeff4befb792d2db204935444_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220630/salomon-kar-0-ff7b7cbfeff4befb792d2db204935444_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220630/salomon-kar-0-ff7b7cbfeff4befb792d2db204935444_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220630/salomon-kar-0-ff7b7cbfeff4befb792d2db204935444_200x200.jpg',
        width: 1080,
        height: 720,
      },
    },
    {
      title: 'Kejar Passion Ala Tiara Andini, 4 Hal Ini Bisa Jadi Inspirasimu',
      excerpt: 'Sekarang Tiara jadi brand ambassador Lazada lho',
      article_url:
        '/career/inspiration/cynthia-kirana/kejar-passion-tiara-andini-csc',
      article_url_amp:
        '/career/inspiration/amp/cynthia-kirana/kejar-passion-tiara-andini-csc',
      article_url_target: '',
      release_date: 1656990300,
      flag: null,
      type: 'editorial-article',
      campaign: null,
      category: {
        name: 'Career',
        category_url: '/career',
      },
      sub_category: {
        name: 'Inspiration',
        category_url: '/career/inspiration',
      },
      author: {
        name: 'Cynthia Kirana',
        period: 1603299600,
        author_url: '/cynthia-kirana',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/cynthia-kirana_20201022124734_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220705/tiara3-9f5ae6cc02284396e35c933917469087_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220705/tiara3-9f5ae6cc02284396e35c933917469087_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220705/tiara3-9f5ae6cc02284396e35c933917469087_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220705/tiara3-9f5ae6cc02284396e35c933917469087_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220705/tiara3-9f5ae6cc02284396e35c933917469087_200x200.jpg',
        width: 600,
        height: 400,
      },
    },
  ];

  it('should all articles', async () => {
    render(<SectionExclusive articles={articles} />);

    expect((await screen.findAllByTestId('card-potrait')).length).toEqual(
      articles.length
    );

    articles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });
});
