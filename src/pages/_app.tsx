/* eslint-disable no-param-reassign */
/* eslint-disable @next/next/next-script-for-ga */
import '../styles/global.scss';

import { Partytown } from '@builder.io/partytown/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ChakraProvider } from '@chakra-ui/provider';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Amplify } from 'aws-amplify';
import { useAmp } from 'next/amp';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';
import { useState } from 'react';

import theme from '@/styles/theme';
import { AdsProvider } from '@/utils/ads/AdsProvider';
import { AppWrapper } from '@/utils/State';

Amplify.configure({
  userPoolId: process.env.COGNITO_USER_POOL_ID, // This won"t be used but region should be correct
  userPoolWebClientId: process.env.COGNITO_WEB_CLIENT_ID,
  authenticationFlowType: process.env.COGNITO_FLOW_TYPE,
  oauth: {
    domain: process.env.OAUTH_DOMAIN,
    scope: ['email', 'profile', 'openid'],
    redirectSignIn: process.env.OAUTH_CALLBACK_LOGIN,
    redirectSignOut: process.env.OAUTH_CALLBACK_LOGOUT,
    responseType: 'code',
  },
});
const MyApp = ({ Component, pageProps }: AppProps<any>) => {
  const isAmp = useAmp();
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        {/* Required meta tags SEO */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {!isAmp && (
          <>
            <meta
              name="viewport"
              content="width=device-width, minimum-scale=1, initial-scale=1"
            />
            <Partytown
              forward={['fbq']}
              resolveUrl={(url: URL, _: Location, type: any) => {
                const hostname = url.hostname.toString();
                if (type === 'script' && hostname === 'connect.facebook.net') {
                  const proxyUrl = new URL(
                    'https://d1syius523w5tk.cloudfront.net'
                  );
                  proxyUrl.pathname = url.pathname;
                  return proxyUrl;
                }
                return url;
              }}
            />
          </>
        )}
      </Head>
      <Script
        async
        id="facebook-pixel-code"
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','//connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1206680832695337');
          fbq('track', "PageView");
          fbq('track', 'ViewContent');
          fbq('track', 'Search');`,
        }}
      />
      <AppWrapper>
        <QueryClientProvider client={queryClient}>
          {isAmp ? (
            <AdsProvider
              DFPNetworkID={process.env.dfp_network_id}
              enableLazyload
            >
              <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
              </Hydrate>
            </AdsProvider>
          ) : (
            <ChakraProvider theme={theme}>
              <AdsProvider
                DFPNetworkID={process.env.dfp_network_id}
                enableLazyload
              >
                <Hydrate state={pageProps.dehydratedState}>
                  <NextNProgress color="#d51c6a" height={2} />
                  <Component {...pageProps} />
                </Hydrate>
              </AdsProvider>
            </ChakraProvider>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppWrapper>
    </>
  );
};

export default MyApp;
