import { render, screen } from '@testing-library/react';

import { SearchBar } from '../SearchBar';
import { Modal } from '.';

describe('Modal', () => {
  it('rendered', () => {
    render(<Modal isOpen />);

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('render content', () => {
    render(
      <Modal
        isOpen
        content={<SearchBar keyword="" onSubmitSearch={() => {}} />}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
