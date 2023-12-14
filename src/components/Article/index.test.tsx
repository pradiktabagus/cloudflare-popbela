import { render, screen } from '@testing-library/react';

import { Article } from '.';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/[category]/[subCategory]/[author]/[slug]',
      pathname: '/career/inspiration/niken-ari/film-dewasa-netflix',
      query: {
        category: 'career',
        subCategory: 'inspiration',
        author: 'niken-ari',
        slug: 'film-dewasa-netflix',
      },
      asPath: '/career/inspiration/niken-ari/film-dewasa-netflix/',
    };
  },
}));

describe('Avatar Component', () => {
  const data = {
    sub_category: {
      name: 'style & trends',
      category_url: '/fashion/style-trends',
    },
    description:
      '<p>Masakan khas Tiongkok sangat populer di Indonesia karena cita rasanya yang luar biasa. Bahkan, sudah banyak restoran khas Tiongkok yang tersebar di berbagai wilayah di Indonesia.</p>',
  };

  it('render correctly', async () => {
    render(<Article data={data} />);
    expect(await screen.findByTestId('content')).toHaveTextContent(
      'Masakan khas Tiongkok sangat populer di Indonesia karena cita rasanya yang luar biasa. Bahkan, sudah banyak restoran khas Tiongkok yang tersebar di berbagai wilayah di Indonesia.'
    );
    expect(screen.queryByTestId('section-yummy-app')).not.toBeInTheDocument();
  });

  it('yummy app when subcategory is food', () => {
    render(
      <Article
        data={{
          sub_category: {
            name: 'food',
            category_url: '/fashion/style-trends',
          },
          description:
            '<p>Masakan khas Tiongkok sangat populer di Indonesia karena cita rasanya yang luar biasa. Bahkan, sudah banyak restoran khas Tiongkok yang tersebar di berbagai wilayah di Indonesia.</p>',
        }}
      />
    );
    expect(screen.getByTestId('section-yummy-app')).toBeInTheDocument();
  });

  it('description null', () => {
    render(
      <Article
        data={{
          sub_category: {
            name: 'food',
            category_url: '/fashion/style-trends',
          },
        }}
      />
    );
    expect(screen.getByTestId('content')).toHaveTextContent('');
  });
});
