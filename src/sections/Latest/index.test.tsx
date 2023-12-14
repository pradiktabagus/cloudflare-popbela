import { render, screen } from '@testing-library/react';
import { rest } from 'msw';

import type { ResponseLatest } from '@/types/section/latest';
import {
  renderWithClient,
  renderWithRouterContext,
  server,
} from '@/utils/testing';
import latest from '@/utils/testing/server/json/latest.json';

import { SectionLatest } from '.';
import { SectionLatestAmp } from './amp';
import { SectionLatestBottom } from './bottom';
import { SectionLatestTop } from './top';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/[category]',
      pathname: '/[category]',
      query: { category: 'fashion' },
      asPath: '/fashion',
    };
  },
}));

describe('section latest', () => {
  const router = {
    route: '/[category]',
    pathname: '/[category]',
    query: { category: 'fashion' },
    asPath: '/fashion',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  };
  const data: ResponseLatest[] = [
    {
      title: 'Fakta Menarik Koleksi Balenciaga Couture ke-51',
      excerpt: 'Hadirkan deretan publik figur Hollywood di runway',
      article_url:
        '/fashion/style-trends/hafidhza-putri-andiza/fakta-menarik-koleksi-balenciaga-couture-ke',
      article_url_amp:
        '/fashion/style-trends/amp/hafidhza-putri-andiza/fakta-menarik-koleksi-balenciaga-couture-ke',
      article_url_target: '',
      release_date: 1657179000,
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
          'https://cdn.popbela.com/content-images/post/20220707/https-hypebeastcom-wp-content-blogsdir-6-files-2022-07-balenciaga-51-couture-look-57-naomi-campbell-copya-e1df9838d27f3cc169715b0f9f1aeffc_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220707/https-hypebeastcom-wp-content-blogsdir-6-files-2022-07-balenciaga-51-couture-look-57-naomi-campbell-copya-e1df9838d27f3cc169715b0f9f1aeffc_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220707/https-hypebeastcom-wp-content-blogsdir-6-files-2022-07-balenciaga-51-couture-look-57-naomi-campbell-copya-e1df9838d27f3cc169715b0f9f1aeffc_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220707/https-hypebeastcom-wp-content-blogsdir-6-files-2022-07-balenciaga-51-couture-look-57-naomi-campbell-copya-e1df9838d27f3cc169715b0f9f1aeffc_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220707/https-hypebeastcom-wp-content-blogsdir-6-files-2022-07-balenciaga-51-couture-look-57-naomi-campbell-copya-e1df9838d27f3cc169715b0f9f1aeffc_200x200.jpg',
        width: 853,
        height: 569,
      },
    },
    {
      title: 'Begini Cara Mudah Mengatasi Rambut Keriting dan Kusut ',
      excerpt: 'Bikin rambut halus sempurna!',
      article_url:
        '/beauty/hair/shavira-annisa-putri/begini-cara-mudah-mengatasi-rambut-keriting-dan-kusut',
      article_url_amp:
        '/beauty/hair/amp/shavira-annisa-putri/begini-cara-mudah-mengatasi-rambut-keriting-dan-kusut',
      article_url_target: '',
      release_date: 1657178700,
      flag: 'regular',
      type: 'editorial-article',
      campaign: null,
      category: {
        name: 'Beauty',
        category_url: '/beauty',
      },
      sub_category: {
        name: 'Hair',
        category_url: '/beauty/hair',
      },
      author: {
        name: 'Shavira Annisa Putri',
        period: 1572973200,
        author_url: '/shavira-annisa-putri',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/shavira-annisa-putri_200x200.JPG',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220707/1-0fe882ef04e4202503822d45c9d3bec7_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220707/1-0fe882ef04e4202503822d45c9d3bec7_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220707/1-0fe882ef04e4202503822d45c9d3bec7_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220707/1-0fe882ef04e4202503822d45c9d3bec7_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220707/1-0fe882ef04e4202503822d45c9d3bec7_200x200.jpg',
        width: 1000,
        height: 667,
      },
    },
  ];
  const articleAmp = [
    {
      title:
        'Profil Chef Vindy Lee, Queen of Slay si Kreator Konten Table Manner',
      excerpt: 'Biar makan nggak belepotan dan malu-maluin',
      article_url: '/career/inspiration/zikra-mulia-irawati/profil-vindy-lee',
      article_url_amp:
        '/career/inspiration/amp/zikra-mulia-irawati/profil-vindy-lee',
      article_url_target: '',
      release_date: 1660872900,
      flag: 'regular',
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
        name: 'Zikra Mulia Irawati',
        period: 1647882000,
        author_url: '/zikra-mulia-irawati',
        avatar: 'https://cdn.popbela.com/content-images/avatar/default.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220815/440e458fa4a286b61c4d7df38c45146b_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220815/440e458fa4a286b61c4d7df38c45146b_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220815/440e458fa4a286b61c4d7df38c45146b_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220815/440e458fa4a286b61c4d7df38c45146b_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220815/440e458fa4a286b61c4d7df38c45146b_200x200.jpg',
        width: 914,
        height: 604,
      },
    },
    {
      title:
        '20 Contoh Surat Lamaran Kerja yang Baik dan Benar, Bikin Dilirik HRD!',
      excerpt: 'Jangan hanya mengirimkan CV tanpa surat lamaran, ya!',
      article_url: '/career/inspiration/firly-fenti/contoh-surat-lamaran-kerja',
      article_url_amp:
        '/career/inspiration/amp/firly-fenti/contoh-surat-lamaran-kerja',
      article_url_target: '',
      release_date: 1660857300,
      flag: 'regular',
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
        name: 'Firly Fenti',
        period: 1582477200,
        author_url: '/firly-fenti',
        avatar: 'https://cdn.popbela.com/content-images/avatar/default.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220818/0c7cb5592c4f078f004c7f5439b5a3c3_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220818/0c7cb5592c4f078f004c7f5439b5a3c3_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220818/0c7cb5592c4f078f004c7f5439b5a3c3_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220818/0c7cb5592c4f078f004c7f5439b5a3c3_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220818/0c7cb5592c4f078f004c7f5439b5a3c3_200x200.png',
        width: 1000,
        height: 667,
      },
    },
    {
      title:
        'Review: Tetap Stylish di Jadwal Super Padat dengan realme Pad mini',
      excerpt: 'Ukurannya yang compact bikin kamu nggak repot!',
      article_url: '/career/inspiration/niken-ari/review-realme-pad-mini',
      article_url_amp:
        '/career/inspiration/amp/niken-ari/review-realme-pad-mini',
      article_url_target: '',
      release_date: 1660835700,
      flag: 'regular',
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
        name: 'Niken Ari Prayitno',
        author_url: '/niken-ari',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/Niken Ari_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220818/lifestyle-image1-82eaac8094b7a37032bb57ba5ecd96d9_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220818/lifestyle-image1-82eaac8094b7a37032bb57ba5ecd96d9_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220818/lifestyle-image1-82eaac8094b7a37032bb57ba5ecd96d9_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220818/lifestyle-image1-82eaac8094b7a37032bb57ba5ecd96d9_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220818/lifestyle-image1-82eaac8094b7a37032bb57ba5ecd96d9_200x200.jpg',
        width: 1000,
        height: 667,
      },
    },
    {
      title:
        'Lirik Lagu "Keeping Tabs" - NIKI, yang Kental dengan Rasa Kehilangan',
      excerpt: "Mencoba melupakan perasaan di album 'Nicole'",
      article_url:
        '/career/inspiration/cynthia-claudia/lirik-lagu-keeping-tabs-niki-yang-kental-dengan-rasa-kehilangan',
      article_url_amp:
        '/career/inspiration/amp/cynthia-claudia/lirik-lagu-keeping-tabs-niki-yang-kental-dengan-rasa-kehilangan',
      article_url_target: '',
      release_date: 1660829700,
      flag: 'regular',
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
        name: 'Cynthia Claudia',
        period: 1629046800,
        author_url: '/cynthia-claudia',
        avatar: 'https://cdn.popbela.com/content-images/avatar/default.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220808/niki-857017d6d7d9309548dcdc86b6473f24_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220808/niki-857017d6d7d9309548dcdc86b6473f24_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220808/niki-857017d6d7d9309548dcdc86b6473f24_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220808/niki-857017d6d7d9309548dcdc86b6473f24_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220808/niki-857017d6d7d9309548dcdc86b6473f24_200x200.png',
        width: 750,
        height: 500,
      },
    },
    {
      title: 'Kolaborasi Unik Hyundai Motors Indonesia yang Makin Kekinian',
      excerpt: 'Menggandeng Plana untuk unjuk gaya hidup berkelanjutan',
      article_url:
        '/career/inspiration/nurul-ayu-utami/kolaborasi-unik-hyundai-motors-indonesia-yang-makin-kekinian',
      article_url_amp:
        '/career/inspiration/amp/nurul-ayu-utami/kolaborasi-unik-hyundai-motors-indonesia-yang-makin-kekinian',
      article_url_target: '',
      release_date: 1660827300,
      flag: 'regular',
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
        name: 'Ayu Utami',
        period: 1581440400,
        author_url: '/nurul-ayu-utami',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/nurul-ayu-utami_200x200.JPG',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220815/4-sustainability-area-at-hyundai-booth-during-giias-2022-collaborating-with-plana-311a4091d196e8c118966f037016a602_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220815/4-sustainability-area-at-hyundai-booth-during-giias-2022-collaborating-with-plana-311a4091d196e8c118966f037016a602_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220815/4-sustainability-area-at-hyundai-booth-during-giias-2022-collaborating-with-plana-311a4091d196e8c118966f037016a602_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220815/4-sustainability-area-at-hyundai-booth-during-giias-2022-collaborating-with-plana-311a4091d196e8c118966f037016a602_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220815/4-sustainability-area-at-hyundai-booth-during-giias-2022-collaborating-with-plana-311a4091d196e8c118966f037016a602_200x200.jpg',
        width: 1000,
        height: 680,
      },
    },
    {
      title: "Bocoran Rencana 'Extraordinary Attorney Woo', Lanjut Season 2?",
      excerpt: 'Diproduksi dalam berbagi konten menarik',
      article_url:
        '/career/inspiration/ajenk-rama/bocoran-rencana-extraordinary-attorney-woo-lanjut-season',
      article_url_amp:
        '/career/inspiration/amp/ajenk-rama/bocoran-rencana-extraordinary-attorney-woo-lanjut-season',
      article_url_target: '',
      release_date: 1660824900,
      flag: 'regular',
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
        name: 'Ajenk Rama',
        period: 1584032400,
        author_url: '/ajenk-rama',
        avatar: 'https://cdn.popbela.com/content-images/avatar/default.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220817/fb22f25c845ad1485a6b2080be885dc6_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220817/fb22f25c845ad1485a6b2080be885dc6_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220817/fb22f25c845ad1485a6b2080be885dc6_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220817/fb22f25c845ad1485a6b2080be885dc6_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220817/fb22f25c845ad1485a6b2080be885dc6_200x200.jpg',
        width: 1000,
        height: 667,
      },
    },
    {
      title:
        '7 Fakta Kang Ki Young, Pemimpin Panutan di Extraordinary Attorney Woo ',
      excerpt: 'Juga aktif di berbagai variety show',
      article_url:
        '/career/inspiration/cynthia-claudia/7-fakta-kang-ki-young-pemimpin-panutan-di-extraordinary-attorney-woo',
      article_url_amp:
        '/career/inspiration/amp/cynthia-claudia/7-fakta-kang-ki-young-pemimpin-panutan-di-extraordinary-attorney-woo',
      article_url_target: '',
      release_date: 1660821300,
      flag: 'regular',
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
        name: 'Cynthia Claudia',
        period: 1629046800,
        author_url: '/cynthia-claudia',
        avatar: 'https://cdn.popbela.com/content-images/avatar/default.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220816/1a4a798760f4bb56fcf66ecfdb7cfa28_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220816/1a4a798760f4bb56fcf66ecfdb7cfa28_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220816/1a4a798760f4bb56fcf66ecfdb7cfa28_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220816/1a4a798760f4bb56fcf66ecfdb7cfa28_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220816/1a4a798760f4bb56fcf66ecfdb7cfa28_200x200.png',
        width: 1252,
        height: 702,
      },
    },
    {
      title: '10 Artis Hits Indonesia Ini Ternyata Berasal dari Papua',
      excerpt: 'Prestasi mereka tak perlu diragukan lagi!',
      article_url:
        '/career/inspiration/niken-ari/artis-hits-indonesia-yang-berasal-dari-papua',
      article_url_amp:
        '/career/inspiration/amp/niken-ari/artis-hits-indonesia-yang-berasal-dari-papua',
      article_url_target: '',
      release_date: 1660817700,
      flag: 'regular',
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
        name: 'Niken Ari Prayitno',
        author_url: '/niken-ari',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/Niken Ari_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20210818/back-to-new-normal-4-87bc4a4067f66487a5b0cd2e441ebf26_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20210818/back-to-new-normal-4-87bc4a4067f66487a5b0cd2e441ebf26_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20210818/back-to-new-normal-4-87bc4a4067f66487a5b0cd2e441ebf26_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20210818/back-to-new-normal-4-87bc4a4067f66487a5b0cd2e441ebf26_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20210818/back-to-new-normal-4-87bc4a4067f66487a5b0cd2e441ebf26_200x200.jpg',
        width: 1000,
        height: 667,
      },
    },
    {
      title: "'Serigala Terakhir 2', Lebih Elaboratif dan Kompleks",
      excerpt: 'Terdiri dari 8 episode di Vidio',
      article_url:
        '/career/inspiration/nindi-widya-wati/tayang-eksklusif-serigala-terakhir-2-bertabur-bintang-tanah-air',
      article_url_amp:
        '/career/inspiration/amp/nindi-widya-wati/tayang-eksklusif-serigala-terakhir-2-bertabur-bintang-tanah-air',
      article_url_target: '',
      release_date: 1660798500,
      flag: 'regular',
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
        name: 'Nindi Widya Wati',
        period: 1653843600,
        author_url: '/nindi-widya-wati',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/nindi-widya-wati_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220817/aace05bdddee3355e4dc49c8054b774f_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220817/aace05bdddee3355e4dc49c8054b774f_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220817/aace05bdddee3355e4dc49c8054b774f_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220817/aace05bdddee3355e4dc49c8054b774f_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220817/aace05bdddee3355e4dc49c8054b774f_200x200.png',
        width: 1000,
        height: 667,
      },
    },
    {
      title: '15 Fakta Kevin Oh, Solois yang Bakal Menikahi Gong Hye Jin',
      excerpt: 'Langganan mengisi soundtrack drama Korea',
      article_url:
        '/career/inspiration/ajenk-rama/15-fakta-kevin-oh-solois-yang-bakal-menikahi-gong-hye-jin',
      article_url_amp:
        '/career/inspiration/amp/ajenk-rama/15-fakta-kevin-oh-solois-yang-bakal-menikahi-gong-hye-jin',
      article_url_target: '',
      release_date: 1660792500,
      flag: 'regular',
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
        name: 'Ajenk Rama',
        period: 1584032400,
        author_url: '/ajenk-rama',
        avatar: 'https://cdn.popbela.com/content-images/avatar/default.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220817/226533da43f072ac2e51255b4293b64a_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220817/226533da43f072ac2e51255b4293b64a_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220817/226533da43f072ac2e51255b4293b64a_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220817/226533da43f072ac2e51255b4293b64a_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220817/226533da43f072ac2e51255b4293b64a_200x200.jpg',
        width: 1000,
        height: 662,
      },
    },
    {
      title:
        'Naura Ayu Tampil Epik dalam Upacara Penurunan Bendera Sang Merah Putih',
      excerpt: 'Kali pertama nyanyi di Istana Negara',
      article_url:
        '/career/inspiration/nindi-widya-wati/naura-ayu-tampil-epik-dalam-upacara-penurunan-bendera-sang-merah-putih',
      article_url_amp:
        '/career/inspiration/amp/nindi-widya-wati/naura-ayu-tampil-epik-dalam-upacara-penurunan-bendera-sang-merah-putih',
      article_url_target: '',
      release_date: 1660781700,
      flag: 'regular',
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
        name: 'Nindi Widya Wati',
        period: 1653843600,
        author_url: '/nindi-widya-wati',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/nindi-widya-wati_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220817/11a9fcad4645b321ec30d2badcac3974_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220817/11a9fcad4645b321ec30d2badcac3974_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220817/11a9fcad4645b321ec30d2badcac3974_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220817/11a9fcad4645b321ec30d2badcac3974_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220817/11a9fcad4645b321ec30d2badcac3974_200x200.png',
        width: 1000,
        height: 667,
      },
    },
    {
      title:
        'Inilah 13 Artis Indonesia yang Pernah Jadi Paskibraka, Bikin Bangga!',
      excerpt: 'Tak hanya jago berlakon, nih!',
      article_url:
        '/career/inspiration/nindi-widya-wati/inilah-13-artis-indonesia-yang-pernah-jadi-paskibraka-bikin-bangga',
      article_url_amp:
        '/career/inspiration/amp/nindi-widya-wati/inilah-13-artis-indonesia-yang-pernah-jadi-paskibraka-bikin-bangga',
      article_url_target: '',
      release_date: 1660779300,
      flag: 'regular',
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
        name: 'Nindi Widya Wati',
        period: 1653843600,
        author_url: '/nindi-widya-wati',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/nindi-widya-wati_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220817/951b036c765c921b5a32e67fd3b1631e_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220817/951b036c765c921b5a32e67fd3b1631e_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220817/951b036c765c921b5a32e67fd3b1631e_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220817/951b036c765c921b5a32e67fd3b1631e_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220817/951b036c765c921b5a32e67fd3b1631e_200x200.png',
        width: 1000,
        height: 667,
      },
    },
    {
      title: '10 Foto Soekarno Asli yang Langka dan Bersejarah',
      excerpt: 'Inilah foto Soekarno asli yang bersejarah!',
      article_url: '/career/inspiration/nafi-khoiriyah/foto-soekarno-asli-1',
      article_url_amp:
        '/career/inspiration/amp/nafi-khoiriyah/foto-soekarno-asli-1',
      article_url_target: '',
      release_date: 1660748100,
      flag: 'regular',
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
        name: "Nafi' Khoiriyah",
        period: 1659459600,
        author_url: '/nafi-khoiriyah',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/nafi-khoiriyah_20220803141522_200x200.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220816/d45a7a34d9d962c0f44e5ee734a2e1aa_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220816/d45a7a34d9d962c0f44e5ee734a2e1aa_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220816/d45a7a34d9d962c0f44e5ee734a2e1aa_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220816/d45a7a34d9d962c0f44e5ee734a2e1aa_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220816/d45a7a34d9d962c0f44e5ee734a2e1aa_200x200.png',
        width: 1000,
        height: 667,
      },
    },
    {
      title: 'Apa Itu Paskibra? Ini Arti, Sejarah, dan Visi Misinya',
      excerpt: 'Paskibra dan Paskibraka ternyata berbeda, lho!',
      article_url:
        '/career/inspiration/nafi-khoiriyah/apa-itu-paskibra-ini-arti-sejarah-dan-visi-misinya',
      article_url_amp:
        '/career/inspiration/amp/nafi-khoiriyah/apa-itu-paskibra-ini-arti-sejarah-dan-visi-misinya',
      article_url_target: '',
      release_date: 1660745700,
      flag: 'regular',
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
        name: "Nafi' Khoiriyah",
        period: 1659459600,
        author_url: '/nafi-khoiriyah',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/nafi-khoiriyah_20220803141522_200x200.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220816/2eed6801bb939078c0707157a0673e7b_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220816/2eed6801bb939078c0707157a0673e7b_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220816/2eed6801bb939078c0707157a0673e7b_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220816/2eed6801bb939078c0707157a0673e7b_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220816/2eed6801bb939078c0707157a0673e7b_200x200.png',
        width: 1000,
        height: 667,
      },
    },
    {
      title: 'Profil Petugas Upacara Penurunan Bendera di Istana Merdeka 2022 ',
      excerpt: 'Instagram salah satu petugasnya di-follow Raffi Ahmad, lho!',
      article_url:
        '/career/inspiration/zikra-mulia-irawati/profil-petugas-upacara-penurunan-bendera-di-istana-merdeka',
      article_url_amp:
        '/career/inspiration/amp/zikra-mulia-irawati/profil-petugas-upacara-penurunan-bendera-di-istana-merdeka',
      article_url_target: '',
      release_date: 1660742100,
      flag: 'regular',
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
        name: 'Zikra Mulia Irawati',
        period: 1647882000,
        author_url: '/zikra-mulia-irawati',
        avatar: 'https://cdn.popbela.com/content-images/avatar/default.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220817/dfeea622706375be311ca5505e90caa4_750x500.png',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220817/dfeea622706375be311ca5505e90caa4_750x500.png',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220817/dfeea622706375be311ca5505e90caa4_390x260.png',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220817/dfeea622706375be311ca5505e90caa4_125x85.png',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220817/dfeea622706375be311ca5505e90caa4_200x200.png',
        width: 1366,
        height: 768,
      },
    },
    {
      title:
        'Nostalgia Lomba Khas 17-an yang Justru Bikin Kita Tertawa Saat Nonton',
      excerpt: 'Siapa masih ikut lomba?',
      article_url:
        '/career/inspiration/titaflorita/nostalgia-lomba-17an-yang-bikin-pengin-ikutan',
      article_url_amp:
        '/career/inspiration/amp/titaflorita/nostalgia-lomba-17an-yang-bikin-pengin-ikutan',
      article_url_target: '',
      release_date: 1660738500,
      flag: 'regular',
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
        name: 'Tita Florita',
        author_url: '/titaflorita',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/titaflorita_200x200.jpg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20180813/dscf3706-1cbf97ab4991b5005632af7c5896467b_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20180813/dscf3706-1cbf97ab4991b5005632af7c5896467b_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20180813/dscf3706-1cbf97ab4991b5005632af7c5896467b_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20180813/dscf3706-1cbf97ab4991b5005632af7c5896467b_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20180813/dscf3706-1cbf97ab4991b5005632af7c5896467b_200x200.jpg',
        width: null,
        height: null,
      },
    },
    {
      title: '6 Film Bertema Kemerdekaan Indonesia yang Sarat Perjuangan!',
      excerpt: 'Sarat akan perjuangan dan nilai bangsa',
      article_url:
        '/career/inspiration/audia-natasha-putri/6-film-bertema-kemerdekaan-indonesia-yang-sarat-perjuangan',
      article_url_amp:
        '/career/inspiration/amp/audia-natasha-putri/6-film-bertema-kemerdekaan-indonesia-yang-sarat-perjuangan',
      article_url_target: '',
      release_date: 1660734900,
      flag: 'regular',
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
        name: 'Audia Natasha Putri',
        period: 1653843600,
        author_url: '/audia-natasha-putri',
        avatar: 'https://cdn.popbela.com/content-images/avatar/default.png',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220814/932ee018125efb2d751cde5f6e010cf2_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220814/932ee018125efb2d751cde5f6e010cf2_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220814/932ee018125efb2d751cde5f6e010cf2_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220814/932ee018125efb2d751cde5f6e010cf2_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220814/932ee018125efb2d751cde5f6e010cf2_200x200.jpg',
        width: 600,
        height: 400,
      },
    },
    {
      title:
        'Lirik Lagu “Ojo Dibandingke” - Farel Prayoga, Se-Istana Negara Goyang!',
      excerpt: 'Dari Ibu negara Iriana sampai Prabowo ikut joget',
      article_url:
        '/career/inspiration/natasha-cecilia-anandita/lirik-lagu-ojo-dibandingke-farel-prayoga-se-istana-negara-goyang',
      article_url_amp:
        '/career/inspiration/amp/natasha-cecilia-anandita/lirik-lagu-ojo-dibandingke-farel-prayoga-se-istana-negara-goyang',
      article_url_target: '',
      release_date: 1660721700,
      flag: 'regular',
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
        name: 'Natasha Cecilia Anandita',
        period: 1606755600,
        author_url: '/natasha-cecilia-anandita',
        avatar:
          'https://cdn.popbela.com/content-images/avatar/natasha-cecilia-anandita_200x200.jpeg',
      },
      cover: {
        image_url:
          'https://cdn.popbela.com/content-images/post/20220817/cover-6ee213fbcf6aafbd44fc76b30d8a4a74_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220817/cover-6ee213fbcf6aafbd44fc76b30d8a4a74_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220817/cover-6ee213fbcf6aafbd44fc76b30d8a4a74_390x260.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220817/cover-6ee213fbcf6aafbd44fc76b30d8a4a74_125x85.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220817/cover-6ee213fbcf6aafbd44fc76b30d8a4a74_200x200.jpg',
        width: 1000,
        height: 667,
      },
    },
  ];

  describe('Latest article versi non amp', () => {
    it('should render correctly SectionLatestTop', async () => {
      render(<SectionLatestTop data={data} />);
      expect(
        await screen.findByTestId('section-latest-top')
      ).toBeInTheDocument();
    });

    it("shouldn't render list-latest-bottom when data less than 13", () => {
      renderWithClient(<SectionLatestBottom data={data} />);
      expect(
        screen.queryByTestId('list-latest-bottom')
      ).not.toBeInTheDocument();
    });

    it("shouldn't render SectionLatestBottom when data less than 13", () => {
      render(
        <div>{data.length > 12 && <SectionLatestBottom data={data} />}</div>
      );
      expect(
        screen.queryByTestId('section-latest-bottom')
      ).not.toBeInTheDocument();
    });

    test('get data 6 article in section bottom', async () => {
      server.use(
        rest.get('*/components/infinity-general', (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(latest));
        })
      );

      renderWithRouterContext(<SectionLatestBottom data={data} />, router, {});
      expect(
        await screen.findByTestId('button-load-more-latest')
      ).toBeInTheDocument();
      expect(await screen.findAllByTestId('list-latest-bottom')).toHaveLength(
        6
      );
    });

    test('should render correctly Section latest', async () => {
      server.use(
        rest.get('*/components/infinity-general', (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(latest));
        })
      );

      renderWithRouterContext(
        <SectionLatest titleLatest="make-up" />,
        router,
        {}
      );
      expect(screen.getByTestId('section-latest')).toHaveTextContent(
        'Latest from make-up'
      );
      expect(await screen.findByTestId('section-latest')).toMatchSnapshot();
      expect(await screen.findAllByTestId('list-latest')).toHaveLength(18);
      expect(
        await screen.findByTestId('section-load-more-latest')
      ).toBeInTheDocument();
    });
  });

  describe('Latest article versi amp', () => {
    it('should render correctly latest', () => {
      render(<SectionLatestAmp data={data} />);
      expect(screen.getByTestId('section-latest-amp')).toBeInTheDocument();
    });

    it('title the latest', () => {
      render(<SectionLatestAmp data={data} titleLatest="News" />);
      expect(screen.getByTestId('title-latest-article-amp')).toHaveTextContent(
        'Latest from News'
      );
    });

    it('Length latest amp is 18', () => {
      render(<SectionLatestAmp data={articleAmp} titleLatest="News" />);
      expect(screen.getAllByTestId('list-latest-amp').length).toBe(18);
    });
  });
});
