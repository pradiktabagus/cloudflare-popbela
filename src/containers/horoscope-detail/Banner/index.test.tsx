import { screen } from '@testing-library/react';

import { renderWithClient } from '@/utils/testing';

import Banner from '.';

describe('Banner', () => {
  it('should render', async () => {
    renderWithClient(<Banner srcBg="" />);

    expect(await screen.findByTestId('banner')).toBeInTheDocument();
  });

  it('should render children', async () => {
    renderWithClient(<Banner srcBg="" />);

    expect(await screen.findByRole('button')).toBeInTheDocument();
  });
});
