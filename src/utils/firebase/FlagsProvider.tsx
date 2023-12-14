/* eslint-disable no-console */
import {
  fetchAndActivate,
  getAll,
  getRemoteConfig,
} from 'firebase/remote-config';
import { createContext, useEffect, useState } from 'react';

import type { TFlag, TFlagContext } from '@/types/remoteConfig';
// eslint-disable-next-line import/extensions
import { firebase } from '@/utils/firebase/firebase';
import defaultRemote from '@/utils/firebase/remote_config_defaults.json';

type AppWrapperProps = {
  children: React.ReactNode;
};

const intervalFetch = 3600000 * 12;
const FlagContext = createContext<TFlagContext>({});
const FlagsWrapper = ({ children }: AppWrapperProps) => {
  const [flags, setFlag] = useState<TFlag[]>([]);
  const [isLoadingFlag, setIsLoadingFlag] = useState<boolean>(true);
  useEffect(() => {
    const remoteConfig = getRemoteConfig(firebase.getApp());
    remoteConfig.settings.minimumFetchIntervalMillis = intervalFetch;
    remoteConfig.defaultConfig = defaultRemote;
    fetchAndActivate(remoteConfig)
      .then(() => getAll(remoteConfig))
      .then((remoteFlags) => {
        const newFlags: TFlag[] = [];
        const keys: string[] = Object.keys(remoteFlags);
        const values: string[] = Object.values(remoteFlags).map((flag) =>
          flag.asString()
        );
        // eslint-disable-next-line no-restricted-syntax, no-plusplus
        for (let index = 0; index < keys.length; index++) {
          newFlags.push({
            flag: keys[index],
            value: values[index],
          });
        }
        setFlag(newFlags);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingFlag(false);
      });
  }, []);
  return (
    <FlagContext.Provider value={{ flags, isLoadingFlag }}>
      {children}
    </FlagContext.Provider>
  );
};
export { FlagContext, FlagsWrapper };
