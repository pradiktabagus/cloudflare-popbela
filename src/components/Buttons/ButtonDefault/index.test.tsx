import { render, screen } from '@testing-library/react';

import { Button } from '@/components';

describe('Button Component', () => {
  it('render correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });
});
