import { render, screen } from '@testing-library/react';

import { Channels, ChannelsAmp } from '.';

describe('Channels', () => {
  const IMAGE_COUNT = 20;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('rendered', () => {
    render(<Channels />);

    expect(screen.getByTestId('channels')).toBeInTheDocument();
  });

  it('rendered all channels', () => {
    render(<Channels />);
    expect(screen.getAllByRole('img').length).toEqual(IMAGE_COUNT);
  });
});

describe('Channels Amp', () => {
  const IMAGE_COUNT = 20;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('rendered amp', () => {
    render(<ChannelsAmp />);

    expect(screen.getByTestId('channels-amp')).toBeInTheDocument();
  });

  it('rendered all channels amp', () => {
    render(<ChannelsAmp />);
    expect(screen.getAllByRole('link > img').length).toEqual(IMAGE_COUNT);
  });
});
