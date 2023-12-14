import type { IncomingMessage } from 'http';
import type { AppContext } from 'next/app';

import type { DeviceViewProps } from '@/types';

export const detectDevice = (userAgent: NavigatorID['userAgent']) => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindowsMobile = () => Boolean(userAgent.match(/IEMobile|WPDesktop/i));
  const isBB = () => Boolean(userAgent.match(/BlackBerry/i));
  const isSSR = () => Boolean(userAgent.match(/SSR/i));
  const isMobile = () =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindowsMobile() || isBB());
  const isDesktop = () => Boolean(!isMobile() && !isSSR());
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  };
};

export const getUaFromAppContext = (appContext: AppContext) => {
  const { ctx } = appContext;
  const ua = ctx.req?.headers['user-agent'] || navigator?.userAgent || '';
  return ua;
};

export const getUaFromReq = (req: IncomingMessage) => {
  const ua = req?.headers['user-agent'] || navigator?.userAgent || '';
  return ua;
};

export const getDeviceFromAppContext = (
  appContext: AppContext
): DeviceViewProps => {
  const ua = getUaFromAppContext(appContext);

  const deviceTypes = detectDevice(ua);

  const isMobile = deviceTypes.isMobile();
  const isDesktop = deviceTypes.isDesktop();

  return { isMobile, isDesktop };
};

export const getDeviceFromReq = (req: IncomingMessage) => {
  const ua = getUaFromReq(req);
  const deviceTypes = detectDevice(ua);

  const isMobile = deviceTypes.isMobile();
  const isDesktop = deviceTypes.isDesktop();

  return { isMobile, isDesktop };
};
