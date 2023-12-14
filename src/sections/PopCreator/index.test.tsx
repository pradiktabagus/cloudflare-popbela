import { render, screen } from '@testing-library/react';

import { SectionPopCreator } from '.';

describe('SectionPopCreator', () => {
  it('rendered', async () => {
    render(<SectionPopCreator />);

    expect(
      await screen.findByTestId('section-pop-creator')
    ).toBeInTheDocument();

    // popcreator logo
    expect((await screen.findAllByRole('img')).length).toEqual(1);
  });

  const data = {
    title: 'Voice of Baceprot: Wujud Suar Lantang Kartini Masa Kini',
    excerpt: 'Berani mematahkan bias dan stigma di usia muda',
    article_url:
      '/career/inspiration/vob-voice-of-baceprot/voice-of-baceprot-wujud-suar-lantang-kartini-masa-kini',
    article_url_amp:
      '/career/inspiration/amp/vob-voice-of-baceprot/voice-of-baceprot-wujud-suar-lantang-kartini-masa-kini',
    release_date: 1650534600,
    flag: 'regular',
    type: 'popcreator-article',
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
      name: 'VoB (Voice of Baceprot)',
      period: 1648746000,
      author_url: '/vob-voice-of-baceprot',
      avatar:
        'https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505_200x200.JPG',
    },
    cover: {
      image_url:
        'https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505.JPG',
      image_url_hd:
        'https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505.JPG',
      image_url_md:
        'https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505.JPG',
      image_url_sd:
        'https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505.JPG',
      placeholder_image_url:
        'https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505_200x200.JPG',
      width: 750,
      height: 500,
    },
  };

  it('rendered with data', () => {
    render(<SectionPopCreator data={data} />);

    expect(screen.getByTestId('section-pop-creator')).toBeInTheDocument();

    // bg, cover, and logo
    expect(screen.getAllByRole('img').length).toEqual(3);

    expect(screen.getByText(data.excerpt)).toBeInTheDocument();
    expect(screen.getByText(data.title)).toBeInTheDocument();
  });
});
