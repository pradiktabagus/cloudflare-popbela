import { render, screen } from '@testing-library/react';

import { CardPopCreator } from '@/components';

describe('CardPopCreator render correctly', () => {
  const data = {
    title: 'Voice of Baceprot: Wujud Suar Lantang Kartini Masa Kini',
    text: 'Berani mematahkan bias dan stigma di usia muda',
    src: 'https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505.JPG',
    url: 'https://www.popbela.com/',
    blurSrc:
      'https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505.JPG',
  };

  it('Binding data correctly', () => {
    render(<CardPopCreator data={data} />);

    expect(screen.getByTestId('title-popcreator')).toHaveTextContent(
      data.title
    );
    expect(screen.getByTestId('text-popcreator')).toHaveTextContent(data.text);
  });
});
