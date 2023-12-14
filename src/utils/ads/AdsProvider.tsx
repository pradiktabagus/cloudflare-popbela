/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { AdsProviderComponent } from '@/types/ads';

import { AdsContext } from './AdsContext';
import { dfp } from './dfp';
import { useSlotsFromPage } from './GetSlots';

export const AdsProvider: AdsProviderComponent = ({
  DFPNetworkID,
  children,
  debug = false,
  enableLazyload = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { category } = router.query;
  const { ads, pageTargetting } = useSlotsFromPage(router.pathname, category);
  // Create ad slots
  useEffect(() => {
    if (ads.length > 0) {
      dfp.removeSlots();
      setIsLoading(true);
      dfp.createSlots(ads, enableLazyload, DFPNetworkID, pageTargetting);

      setIsLoading(false);
    }

    const handleRouteChangeStart = (url: string) => {
      if (window.location.pathname !== url) {
        dfp.removeSlots();
        setIsLoading(true);
        dfp.createSlots(ads, enableLazyload, DFPNetworkID, pageTargetting);
      }
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.query, router.events]);

  // Enable debug console if possible
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (!!debug && !searchParams.has('google_console')) {
      searchParams.append('google_console', '1');
      window.location = `${window.location.pathname}?${searchParams}` as any;
    }

    if (!debug && searchParams.has('google_console')) {
      searchParams.delete('google_console');

      const search = `${searchParams}`.length > 0 ? `?${searchParams}` : '';
      window.location = `${window.location.pathname}${search}` as any;
    }
  }, [debug]);

  return (
    <AdsContext.Provider value={{ isLoading }}>{children}</AdsContext.Provider>
  );
};
