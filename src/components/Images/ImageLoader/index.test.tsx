import { render, screen } from '@testing-library/react';

import { ImageLoader } from '@/components';

// eslint-disable-next-line react/display-name
jest.mock('next/image', () => ({ src, alt }: any) => (
  <img src={src} alt={alt} />
));

describe('Image Loader Component', () => {
  const src =
    'https://cdn.popbela.com/content-images/post/20220611/nnnj-5e791ce26adaa2f2d634e34ed0b87119_750x500.jpg';

  it('src correctly', () => {
    render(
      <ImageLoader
        data-testid="card-image"
        fill
        alt="headline"
        className="object-cover"
        src={src}
        priority={true}
      />
    );
    expect(screen.getByAltText('headline')).toHaveAttribute('src', src);
  });
});
