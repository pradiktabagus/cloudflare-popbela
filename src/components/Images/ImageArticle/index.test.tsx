import { render, screen } from '@testing-library/react';

import { ImageArticle } from '@/components';

describe('ImageArticle render correctly', () => {
  it('Binding data correctly', () => {
    render(
      <ImageArticle
        data={{
          title: 'Popbela',
          source_name: 'popbela',
          image_url:
            'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg',
        }}
      />
    );

    expect(screen.getByTestId('card-image-article')).toBeInTheDocument();
    expect(screen.getByTestId('card-image-source')).toHaveTextContent(
      'popbela'
    );
  });
});
