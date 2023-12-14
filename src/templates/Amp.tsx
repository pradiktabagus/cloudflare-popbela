/* eslint-disable tailwindcss/no-custom-classname */
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

import { HeaderAMP } from '@/layouts/Header/HeaderAmp';
import type { AdsProps } from '@/types/ads';

export type IAMPProps = {
  category?: string;
  meta?: ReactNode;
  script?: ReactNode;
  children?: ReactNode;
  ads?: Omit<AdsProps, 'classNames'>;
};
const AdsMegabillboardAMP = dynamic(() =>
  import('@/components/Ads/Megabillboard/amp').then(
    (mod) => mod.AdsMegabillboardAMP
  )
);
const AMP = (props: IAMPProps) => (
  <>
    {props.meta}
    {props.script}
    <AdsMegabillboardAMP category={props.category} />
    <HeaderAMP />
    <main>
      {/* AMP ANALYTICS COMSCORE */}
      <amp-analytics type="gtag" data-credentials="include">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: `{
  "vars" : {
    "gtag_id": "UA-71648888-1",
    "config" : {
      "UA-71648888-1": { "groups": "default" }
    }
  }
}`,
          }}
        ></script>
      </amp-analytics>
      {props.children}
    </main>
    <style jsx>{`
      @font-face {
        font-family: BahijMitra;
        src: url(/v3/assets/fonts/BahijMitraRegular.eot);
        src: url(/v3/assets/fonts/BahijMitraRegular.eot#iefix)
            format('embedded-opentype'),
          url(/v3/assets/fonts/BahijMitraRegular.woff2) format('woff2'),
          url(/v3/assets/fonts/BahijMitraRegular.woff) format('woff'),
          url(/v3/assets/fonts/BahijMitraRegular.ttf) format('truetype'),
          url(/v3/assets/fonts/BahijMitraRegular.svg#BahijMitraRegular)
            format('svg');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: FuturaBook;
        src: url(/v3/assets/fonts/Futura_BookBoldRegular.eot);
        src: url(/v3/assets/fonts/Futura_BookBoldRegular.eot)
            format('embedded-opentype'),
          url(/v3/assets/fonts/Futura_BookBoldRegular.woff2) format('woff2'),
          url(/v3/assets/fonts/Futura_BookBoldRegular.woff) format('woff'),
          url(/v3/assets/fonts/Futura_BookBoldRegular.ttf) format('truetype'),
          url(/v3/assets/fonts/Futura_BookBoldRegular.svg#Futura_BookBoldRegular)
            format('svg');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: Limerick;
        src: url(/v3/assets/fonts/limerickregular.eot);
        src: url(/v3/assets/fonts/limerickregular.eot)
            format('embedded-opentype'),
          url(/v3/assets/fonts/limerickregular.woff2) format('woff2'),
          url(/v3/assets/fonts/limerickregular.woff) format('woff'),
          url(/v3/assets/fonts/limerickregular.ttf) format('truetype'),
          url(/v3/assets/fonts/limerickregular.svg#LimerickMedium) format('svg');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: LimerickMedium;
        src: url(/v3/assets/fonts/LimerickMedium.eot);
        src: url(/v3/assets/fonts/LimerickMedium.eot)
            format('embedded-opentype'),
          url(/v3/assets/fonts/LimerickMedium.woff2) format('woff2'),
          url(/v3/assets/fonts/LimerickMedium.woff) format('woff'),
          url(/v3/assets/fonts/LimerickMedium.ttf) format('truetype'),
          url(/v3/assets/fonts/LimerickMedium.svg#LimerickMedium) format('svg');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: FuturaTemeed;
        src: url(/v3/assets/fonts/FE11004T.eot);
        src: url(/v3/assets/fonts/FE11004T.eot) format('embedded-opentype'),
          url(/v3/assets/fonts/FE11004T.woff2) format('woff2'),
          url(/v3/assets/fonts/FE11004T.woff) format('woff'),
          url(/v3/assets/fonts/FE11004T.ttf) format('truetype'),
          url(/v3/assets/fonts/FE11004T.svg#FE11004T) format('svg');
        font-display: swap;
      }
      body {
        background: white;
        font-family: BahijMitra, sans-serif;
      }
      main {
        margin-bottom: 40px;
        position: relative;
        min-height: 100vh;
        background: #fff;
        font-family: BahijMitra, sans-serif;
        padding: 15px;
      }
    `}</style>
  </>
);

export { AMP };
