import { render, screen } from '@testing-library/react';
import { isMobile } from 'react-device-detect';

import {
  AdsCustom1,
  AdsCustom2,
  AdsInfeed1,
  AdsInfeed2,
  AdsInfeed3,
  AdsLeaderboard,
  AdsMegabillboard,
  AdsMr1,
  AdsMr2,
  AdsOop1,
  AdsSkinLeft,
  AdsSkinRight,
  AdsSticky,
} from '@/components';

describe('Ads slot', () => {
  it('render AdsCustom1', () => {
    render(<AdsCustom1 />);
    expect(screen.getByTestId('ads-custom-1')).toBeInTheDocument();
  });

  it('render AdsCustom2', () => {
    render(<AdsCustom2 />);
    expect(screen.getByTestId('ads-custom-2')).toBeInTheDocument();
  });

  it('render AdsInfeed1', () => {
    render(<AdsInfeed1 />);
    expect(screen.getByTestId('ads-infeed-1')).toBeInTheDocument();
  });

  it('render AdsInfeed2', () => {
    render(<AdsInfeed2 />);
    expect(screen.getByTestId('ads-infeed-2')).toBeInTheDocument();
  });

  it('render AdsInfeed3', () => {
    render(<AdsInfeed3 />);
    expect(screen.getByTestId('ads-infeed-3')).toBeInTheDocument();
  });

  it('render AdsLeaderboard', () => {
    render(<AdsLeaderboard />);
    expect(screen.getByTestId('ads-leaderboard')).toBeInTheDocument();
  });

  it('render AdsMegabillboard', () => {
    render(<div>{isMobile ? <AdsMegabillboard /> : <></>}</div>);
    expect(screen.queryByTestId('ads-megabillboard')).not.toBeInTheDocument();
  });

  it('render AdsMr1', () => {
    render(<AdsMr1 />);
    expect(screen.getByTestId('ads-mr-1')).toBeInTheDocument();
  });

  it('render AdsMr2', () => {
    render(<AdsMr2 />);
    expect(screen.getByTestId('ads-mr-2')).toBeInTheDocument();
  });

  it('render AdsOop1', () => {
    render(<AdsOop1 />);
    expect(screen.getByTestId('ads-oop-1')).toBeInTheDocument();
  });

  it('render AdsSkinLeft', () => {
    render(<AdsSkinLeft />);
    expect(screen.getByTestId('ads-skin-left')).toBeInTheDocument();
  });

  it('render AdsSkinRight', () => {
    render(<AdsSkinRight />);
    expect(screen.getByTestId('ads-skin-right')).toBeInTheDocument();
  });

  it('render AdsSticky', () => {
    render(<AdsSticky />);
    expect(screen.getByTestId('ads-sticky')).toBeInTheDocument();
  });
});
