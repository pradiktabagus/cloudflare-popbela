import { render, screen } from '@testing-library/react';

import HeaderArticleZodiac from '.';

describe('HeaderArticleZodiac', () => {
  it('rendered', () => {
    render(
      <HeaderArticleZodiac
        data={{
          iconSrc:
            'https://cdn.popbela.com/content-images/avatar/aries_20190513162259.svg',
          name: 'Aries',
          rangeTime: '21 March - 19 April',
          excerpt:
            'Ramalan Zodiak Aries Hari Ini - Zodiak Aries berasal dari konstelasi rasi bintang Aries. Zodiak ini memiliki elemen api dan simbol zodiak Aries adalah domba. Orang yang lahir pada tanggal 21 Maret sampai 19 April memiliki zodiak Aries.',
        }}
      />
    );
    expect(screen.getByTestId('header-article-zodiac')).toBeInTheDocument();
    // render icon
    expect(screen.getByTestId('img-zodiac')).toBeInTheDocument();
    // render name
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
