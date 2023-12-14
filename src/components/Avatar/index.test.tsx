import { render, screen } from '@testing-library/react';

import { Avatar } from '@/components';

// eslint-disable-next-line react/display-name
jest.mock('next/image', () => ({ src, alt }: any) => (
  <img src={src} alt={alt} />
));

describe('Avatar Component', () => {
  it('render correctly', () => {
    render(
      <Avatar
        data-testid="avatar"
        data={{
          author_url: 'https://popbela.com',
          name: 'Steven',
          avatar:
            'https://cdn.popbela.com/content-images/avatar/vidya-tarigan_42x42.jpg',
        }}
      />
    );
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });
});
