import clsx from 'clsx';
import { Router } from 'next/router';
import { useState } from 'react';

import type { TAdProps } from '@/types/ads';
import { Ad } from '@/utils/ads/Ad';

import { PredefinedSpaceAd } from '../Predefine';

export const AdsMegabillboard = (_: TAdProps) => {
  const [show, setShow] = useState<boolean>(true);
  const onClose = () => {
    setShow(false);
  };
  Router.events.on('routeChangeComplete', () => {
    setShow(true);
  });
  return (
    <div
      data-testid="ads-megabillboard"
      className={clsx(
        show ? 'h-[504px]' : 'h-0',
        'relative overflow-hidden text-center',
        'transition-all duration-300'
      )}
    >
      <button
        type="button"
        className={clsx(
          'absolute right-1 top-1',
          'z-[1] h-7 w-11 px-2 py-1',
          'bg-primary text-xs font-bold text-white',
          'rounded-none border-none uppercase outline-none'
        )}
        onClick={onClose}
      >
        Tutup
      </button>
      <div className="absolute inset-x-0 bottom-0 z-[1] h-[24.5] bg-primary p-1 text-center text-[11px] font-bold text-white">
        SCROLL UNTUK MELANJUTKAN MEMBACA
      </div>
      <div className="fixed top-0 min-h-[480px] w-full">
        <PredefinedSpaceAd classNames="min-h-[480px] w-full top-0 fixed bg-[#e5e9ec]">
          <Ad id="div-gpt-ad-mega_billboard" classNameUnits="h-[480px]" />
        </PredefinedSpaceAd>
      </div>
    </div>
  );
};
