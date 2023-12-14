import { IconButton } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { render, screen } from '@testing-library/react';

import { Dropdown } from '..';

describe('Dropdown', () => {
  it('should rendered', () => {
    render(
      <Dropdown
        placement="bottom-end"
        trigger={
          <IconButton
            variant="ghost"
            aria-label="tigger"
            size="sm"
            color="primary"
            icon={<FontAwesomeIcon icon={faHamburger} />}
          />
        }
        content={<Box>Content</Box>}
        contentProps={{ padding: '10px 15px', w: '200px' }}
      />
    );

    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();
  });
});
