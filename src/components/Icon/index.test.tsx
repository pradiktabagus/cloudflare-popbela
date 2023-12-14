import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { render, screen } from '@testing-library/react';

import { Icon } from '@/components';

describe('Icon render correctly', () => {
  it('rendered', () => {
    render(
      <Icon url="https://twitter.com">
        <FontAwesomeIcon icon={faFacebook} />
      </Icon>
    );
    expect(screen.getByTestId('icon-box')).toBeInTheDocument();
  });
});
