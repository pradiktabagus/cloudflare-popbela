import { createContext, useContext } from 'react';

import type { AdsContextValue } from '@/types/ads';

export const AdsContext = createContext<AdsContextValue>({
  isLoading: false,
});

export const useAdsContext = (): AdsContextValue => {
  const context = useContext(AdsContext);

  if (!context) {
    throw new Error(
      `[AdsContext]: You forgot to wrap your component with AdsProvider`
    );
  }

  return context;
};
