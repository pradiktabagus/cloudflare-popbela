import { render, screen } from '@testing-library/react';

import { CardZodiac } from '@/components';

describe('CardZodiac render correctly', () => {
  const data = {
    name: 'Aries',
    slug: 'zodiac-aries',
    horoscope_url: '/horoscope/zodiac-aries',
    icon: 'https://cdn.popbela.com/content-images/avatar/aries_20190513162259.svg',
    image: '',
    start_date: '21 March',
    end_date: '19 April',
  };

  it('Binding data correctly', () => {
    render(<CardZodiac data={data} />);

    expect(screen.getByTestId('name-zodiac')).toHaveTextContent(data.name);
    expect(screen.getByTestId('range-time')).toHaveTextContent(
      `${data.start_date} - ${data.end_date}`
    );
  });
});
