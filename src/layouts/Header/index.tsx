import { Box } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { useDefaultComponent } from '@/adapters/hooks/components';
import type { ModalProps, SearchContainerPopupProps } from '@/components';
import type { Categories } from '@/types/category';
import type { DeviceViewProps } from '@/types/device';
import type { IDataLogin } from '@/types/responses/pages/login';
import { useGetToggleFlag } from '@/utils/firebase/remoteConfig';
import type { TAppContext } from '@/utils/State';
import { AppContext } from '@/utils/State';

const ModalSearch = dynamic<ModalProps>(() =>
  import('@/components/Modal').then((mod) => mod.Modal)
);
const SearchContainerPopUp = dynamic<SearchContainerPopupProps>(() =>
  import('@/components/SearchContainerPopup').then(
    (mod) => mod.SearchContainerPopUp
  )
);
const HeaderDesktop = dynamic(() =>
  import('./HeaderDesktop').then((mod) => mod.HeaderDesktop)
);
const HeaderMobile = dynamic(() =>
  import('./HeaderMobile').then((mod) => mod.HeaderMobile)
);
export const Header = ({ isMobile, isDesktop }: DeviceViewProps) => {
  const [isSearchVisible, setSearch] = useState<boolean>(false);
  const { isAuthenticated = false } = useContext<TAppContext>(AppContext);
  const [user, setUser] = useState<IDataLogin>();
  const router = useRouter();
  const { data } = useDefaultComponent<Categories>({
    end_point: '/categories',
  });
  const remoteLogin = useGetToggleFlag('login_idn_account');
  useEffect(() => {
    setSearch(false);
  }, [router.query]);
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('user') ?? '{}');
    setUser(item);
  }, []);
  return (
    <>
      {isMobile ? (
        <HeaderMobile
          remoteLogin={remoteLogin}
          categories={data?.categories ?? []}
          isSearch={isSearchVisible}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      ) : (
        <HeaderDesktop
          remoteLogin={remoteLogin}
          categories={data?.categories ?? []}
          isAuthenticated={isAuthenticated}
          name={user?.name}
        />
      )}
      {isDesktop && <Box h="141px" />}

      <ModalSearch
        bgOverlay={isMobile ? 'white' : 'blackAlpha.900'}
        isOpen={isSearchVisible}
        onClose={() => setSearch(false)}
        content={
          <SearchContainerPopUp
            isMobile={isMobile}
            categories={data?.categories ?? []}
          />
        }
        marginTop={isMobile ? '48px' : 0}
        center={!isMobile}
        isMobile={isMobile}
      />
    </>
  );
};
