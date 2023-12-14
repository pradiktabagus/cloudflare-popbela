import { render, screen } from '@testing-library/react';

import { CommentFacebook } from './index';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      basePath: 'popbela.com',
    };
  },
}));

describe('Comment facebook Component', () => {
  it('render correctly', () => {
    render(
      <CommentFacebook article_url="/career/inspiration/niken-ari/film-dewasa-netflix/" />
    );
    expect(screen.getByTestId('section-comment')).toBeInTheDocument();
  });
});
