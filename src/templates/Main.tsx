/* eslint-disable tailwindcss/no-custom-classname */
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { Footer } from '@/layouts/Footer';
import { Header } from '@/layouts/Header';
import type { AdsProps, TAdProps } from '@/types/ads';
import type { DeviceViewProps } from '@/types/device';

export type IMainProps = {
  meta?: ReactNode;
  script?: ReactNode;
  children: ReactNode;
  ads?: Omit<AdsProps, 'classNames'>;
} & DeviceViewProps;
const AdsCustom1 = dynamic<TAdProps>(() =>
  import('@/components/Ads/Custom/custom1').then((mod) => mod.AdsCustom1)
);
const AdsCustom2 = dynamic<TAdProps>(() =>
  import('@/components/Ads/Custom/custom2').then((mod) => mod.AdsCustom2)
);
const AdsOop1 = dynamic<TAdProps>(() =>
  import('@/components/Ads/Oop/index').then((mod) => mod.AdsOop1)
);
const AdsMegabillboard = dynamic<TAdProps>(() =>
  import('@/components/Ads/Megabillboard/index').then(
    (mod) => mod.AdsMegabillboard
  )
);
const Main = ({ isMobile, isDesktop, ...props }: IMainProps) => (
  <Fragment>
    {props.meta}
    {props.script}
    {isMobile && (
      <AdsMegabillboard key={`${props.ads?.adUnit}-megabillboard`} />
    )}
    <Header isMobile={isMobile} isDesktop={isDesktop} />
    {props.ads && (
      <>
        <AdsCustom1 key={`${props.ads?.adUnit}-custom-1`} />
        <AdsCustom2 key={`${props.ads?.adUnit}-custom-2`} />
        <AdsOop1 key={`${props.ads?.adUnit}-oop-1`} />
      </>
    )}
    <main
      className={`relative w-full ${
        isDesktop ? 'min-h-[calc(100vh_-_265px)]' : 'min-h-full'
      } ${isMobile && 'bg-white'}`}
    >
      {props.children}
    </main>
    <Footer />
  </Fragment>
);

export default Main;
