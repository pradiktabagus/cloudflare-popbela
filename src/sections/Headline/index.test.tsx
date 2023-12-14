import { render, screen } from '@testing-library/react';

import { SectionHeadline } from '.';

describe('section headline', () => {
  const data = [
    {
      article_url: 'https://www.popbela.com',
      article_url_amp: 'https://www.popbela.com',
      author: {
        author_url: 'https://www.popbela.com',
        avatar: 'string',
        name: 'string',
        period: 1612112400,
      },
      campaign: 'string',
      category: {
        category_url: 'https://www.popbela.com',
        name: 'string',
      },
      cover: {
        height: 700,
        image_url:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        width: 400,
      },
      excerpt: 'string',
      flag: 'string',
      release_date: 1656944100,
      sub_category: {
        category_url: 'https://www.popbela.com',
        name: 'string',
      },
      title: 'string',
      type: 'string',
    },
    {
      article_url: 'https://www.popbela.com',
      article_url_amp: 'https://www.popbela.com',
      author: {
        author_url: 'https://www.popbela.com',
        avatar: 'string',
        name: 'string',
        period: 1612112400,
      },
      campaign: 'string',
      category: {
        category_url: 'https://www.popbela.com',
        name: 'string',
      },
      cover: {
        height: 700,
        image_url:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        image_url_hd:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        image_url_md:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        image_url_sd:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        placeholder_image_url:
          'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        width: 400,
      },
      excerpt: 'string',
      flag: 'string',
      release_date: 1656944100,
      sub_category: {
        category_url: 'https://www.popbela.com',
        name: 'string',
      },
      title: 'string',
      type: 'string',
    },
  ];

  it('should render correctly', async () => {
    render(<SectionHeadline data={data} />);
    expect(await screen.findByTestId('section-headline')).toBeInTheDocument();
  });

  it('length should be correct', async () => {
    render(<SectionHeadline data={data} isDesktop={true} />);
    expect(screen.getAllByTestId('section-headline').length).toBe(1);
    expect((await screen.findAllByTestId('card-potrait')).length).toBe(2);
  });
});
