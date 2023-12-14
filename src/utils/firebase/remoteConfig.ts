import { useContext } from 'react';

import type { TFlagContext, TFlagValue } from '@/types/remoteConfig';

import { FlagContext } from './FlagsProvider';

function useGetToggleFlag(keyword: string): TFlagValue {
  let env: string = 'dev';
  switch (process.env.APP_ENV) {
    case 'production':
      env = 'prod';
      break;
    case 'staging':
      env = 'beta';
      break;
    case 'development':
      env = 'dev';
      break;
    default:
      env = 'dev';
      break;
  }
  const { flags, isLoadingFlag } = useContext<TFlagContext>(FlagContext);
  const getFlag: any = flags?.find(({ flag }) => flag === keyword);
  let result: any = 0;
  if (getFlag) {
    const parsing = JSON.parse(getFlag.value);
    switch (keyword) {
      case 'menu_navbar_ramadan':
        result = parsing.w[env];
        break;
      default: {
        result = parsing.w[env].e;
      }
    }
  }
  return {
    result,
    isLoadingFlag,
  };
}
export { useGetToggleFlag };
