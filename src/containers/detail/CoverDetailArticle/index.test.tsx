import { render, screen } from '@testing-library/react';

import { CoverDetailArticle } from '.';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/[category]/[subCategory]/[author]/[slug]',
      pathname: '/[category]/[subCategory]/[author]/[slug]',
      query: {
        category: 'fashion',
        subCategory: 'style-trends',
        author: 'nancy-angel',
        slug: 'adu-gaya-seleb-pakai-baju-tie-dye-yang-ekstra-banget',
      },
      asPath: '/fashion',
    };
  },
}));

const article = {
  title: 'Begini Cara Mudah Mengatasi Rambut Keriting dan Kusut',
  sub_category: {
    name: 'Hair',
    category_url: '/beauty/hair',
  },
  excerpt: 'Bikin rambut halus sempurna!',
  release_date: 1657178700,
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
  author: {
    name: 'Shavira Annisa Putri',
    period: 1572973200,
    author_url: '/shavira-annisa-putri',
    avatar:
      'https://cdn.popbela.com/content-images/avatar/shavira-annisa-putri_200x200.JPG',
  },
  article_url:
    '/beauty/hair/shavira-annisa-putri/begini-cara-mudah-mengatasi-rambut-keriting-dan-kusut',
};

describe('CoverDetail component', () => {
  describe('cover detail article', () => {
    it('should render correctly CoverDetailArticle', () => {
      render(<CoverDetailArticle {...article} />);
      expect(screen.getByTestId('cover-detail-article')).toBeInTheDocument();
    });

    it('title should render correctly', () => {
      render(<CoverDetailArticle {...article} />);
      expect(screen.getByTestId('title-article')).toHaveTextContent(
        article.title
      );
    });

    it('excerpt should render correctly', () => {
      render(<CoverDetailArticle {...article} />);
      expect(screen.getByTestId('excerpt-article')).toHaveTextContent(
        article.excerpt
      );
    });

    it('sub category should render correctly', () => {
      render(<CoverDetailArticle {...article} />);
      expect(screen.getByTestId('sub-category-article')).toHaveTextContent(
        article.sub_category.name
      );
    });

    it('author should render correctly', () => {
      render(<CoverDetailArticle {...article} />);
      expect(screen.getByTestId('author-article')).toHaveTextContent(
        article.author.name
      );
    });
  });
});
