import { screen } from '@testing-library/react';

import { renderWithClient } from '@/utils/testing';

import { SectionHoroscope } from '.';

const horoscopes = [
  {
    name: 'Aries',
    slug: 'zodiac-aries',
    horoscope_url: '/horoscope/zodiac-aries',
    icon: 'https://cdn.popbela.com/content-images/avatar/aries_20190513162259.svg',
    image: '',
    start_date: '21 March',
    end_date: '19 April',
  },
  {
    name: 'Taurus',
    slug: 'zodiac-taurus',
    horoscope_url: '/horoscope/zodiac-taurus',
    icon: 'https://cdn.popbela.com/content-images/avatar/taurus_20190513162536.svg',
    image: '',
    start_date: '20 April',
    end_date: '21 May',
  },
  {
    name: 'Gemini',
    slug: 'zodiac-gemini',
    horoscope_url: '/horoscope/zodiac-gemini',
    icon: 'https://cdn.popbela.com/content-images/avatar/gemini_20190513162546.svg',
    image: '',
    start_date: '21 May',
    end_date: '21 June',
  },
  {
    name: 'Cancer',
    slug: 'zodiac-cancer',
    horoscope_url: '/horoscope/zodiac-cancer',
    icon: 'https://cdn.popbela.com/content-images/avatar/cancer_20190513162554.svg',
    image: '',
    start_date: '22 June',
    end_date: '22 July',
  },
  {
    name: 'Leo',
    slug: 'zodiac-leo',
    horoscope_url: '/horoscope/zodiac-leo',
    icon: 'https://cdn.popbela.com/content-images/avatar/leo_20190513162602.svg',
    image: '',
    start_date: '23 July',
    end_date: '22 August',
  },
  {
    name: 'Virgo',
    slug: 'zodiac-virgo',
    horoscope_url: '/horoscope/zodiac-virgo',
    icon: 'https://cdn.popbela.com/content-images/avatar/virgo_20190513091359.svg',
    image: '',
    start_date: '23 August',
    end_date: '22 September',
  },
  {
    name: 'Libra',
    slug: 'zodiac-libra',
    horoscope_url: '/horoscope/zodiac-libra',
    icon: 'https://cdn.popbela.com/content-images/avatar/libra_20190513162609.svg',
    image: '',
    start_date: '23 September',
    end_date: '22 October',
  },
  {
    name: 'Scorpio',
    slug: 'zodiac-scorpio',
    horoscope_url: '/horoscope/zodiac-scorpio',
    icon: 'https://cdn.popbela.com/content-images/avatar/scorpio_20190513162635.svg',
    image: '',
    start_date: '23 October',
    end_date: '21 November',
  },
  {
    name: 'Sagitarius',
    slug: 'zodiac-sagitarius',
    horoscope_url: '/horoscope/zodiac-sagitarius',
    icon: 'https://cdn.popbela.com/content-images/avatar/sagitarius_20190513162615.svg',
    image: '',
    start_date: '22 November',
    end_date: '21 December',
  },
  {
    name: 'Capricorn',
    slug: 'zodiac-capricorn',
    horoscope_url: '/horoscope/zodiac-capricorn',
    icon: 'https://cdn.popbela.com/content-images/avatar/capricorn_20190513093407.svg',
    image: '',
    start_date: '22 December',
    end_date: '20 January',
  },
  {
    name: 'Aquarius',
    slug: 'zodiac-aquarius',
    horoscope_url: '/horoscope/zodiac-aquarius',
    icon: 'https://cdn.popbela.com/content-images/avatar/aquarius_20190513162625.svg',
    image: '',
    start_date: '21 January',
    end_date: '18 February',
  },
  {
    name: 'Pisces',
    slug: 'zodiac-pisces',
    horoscope_url: '/horoscope/zodiac-pisces',
    icon: 'https://cdn.popbela.com/content-images/avatar/pisces_20190513162630.svg',
    image: '',
    start_date: '19 February',
    end_date: '20 March',
  },
];

const currentHoroscope = {
  name: 'Cancer',
  slug: 'zodiac-cancer',
  icon: 'https://cdn.popbela.com/content-images/avatar/cancer_20190513162554.svg',
  horoscope_url: '/horoscope/zodiac-cancer',
  excerpt:
    'Ramalan Zodiak Cancer Hari Ini - Zodiak Cancer berasal dari konstelasi rasi bintang Cancer. Zodiak ini memiliki elemen air dan simbol zodiak Cancer adalah kepiting atau lobster. Orang yang lahir pada tanggal 21 Juni sampai 22 Juli memiliki zodiak Cancer.',
};

describe('SectionHoroscope', () => {
  it('rendered', async () => {
    renderWithClient(<SectionHoroscope />);
    expect(await screen.findByTestId('section-horoscope')).toBeInTheDocument();
  });

  it('rendered with data', () => {
    renderWithClient(
      <SectionHoroscope
        horoscopes={horoscopes}
        currentHoroscope={currentHoroscope}
      />
    );
    expect(screen.getByTestId('section-horoscope')).toBeInTheDocument();
  });
});
