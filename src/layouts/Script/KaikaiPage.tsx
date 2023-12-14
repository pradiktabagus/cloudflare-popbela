/* eslint-disable @next/next/next-script-for-ga */
import Head from 'next/head';

export const KaikaiPageScript = () => {
  return (
    <Head>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <script
        async
        id="kaikai-analytics"
        src="https://www.googletagmanager.com/gtag/js?id=UA-71648888-1"
      />
      <script
        id="kaikai-gtm"
        async
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-71648888-1');`,
        }}
      />
    </Head>
  );
};
