import { Box, HStack } from '@chakra-ui/layout';
import { faBars, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { Category } from '@/types/category';
import type { LinkProps } from '@/types/customLink';
import type { TFlagValue } from '@/types/remoteConfig';
import type { IDataLogin } from '@/types/responses/pages/login';

import { Footer } from '../Footer';

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const Channels = dynamic(() =>
  import('@/components/Channels').then((mod) => mod.Channels)
);
const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const HeaderNav = dynamic(() =>
  import('@/components/HeaderNav').then((mod) => mod.HeaderNav)
);
const IconGrid = dynamic(() =>
  import('@/components/Icon/IconGrid').then((mod) => mod.IconGrid)
);
const SkeletonBox = dynamic(() =>
  import('@/components/Skeleton/SkeletonBox').then((mod) => mod.SkeletonBox)
);
const iconStyle = {
  boxSize: '28px',
  color: 'primary',
  _hover: { color: '#911348' },
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const TrendingTag = dynamic<any>(() => import('./TrendingTags'));
const SidebarMenu = dynamic(() => import('./Sidebar'));
export const HeaderMobile = ({
  categories,
  isSearch,
  isAuthenticated,
  user,
  remoteLogin,
}: {
  categories: Category[];
  isSearch: boolean;
  isAuthenticated?: boolean;
  user?: IDataLogin;
  remoteLogin?: TFlagValue;
}) => {
  const router = useRouter();
  const activeCategory = router.query.category;
  const [isOnTop, setIsOnTop] = useState(true);
  const [visibleChannel, setVisibleChannel] = useState(false);
  const [visibleSidebar, setVisibleSidebar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsOnTop(window.scrollY === 0);
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (visibleChannel || visibleSidebar) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [visibleChannel, visibleSidebar]);

  useEffect(() => {
    if (isSearch) {
      setVisibleChannel(false);
    }
    const position = isSearch || visibleSidebar ? 'fixed' : 'sticky';
    const header = document.getElementById('header');
    if (header) {
      header.style.position = position;
    }
  }, [isSearch, visibleSidebar]);

  const handleOpenChannel = () => {
    setVisibleChannel((prev) => !prev);
    const position = visibleChannel ? 'sticky' : 'fixed';
    const header = document.getElementById('header');
    if (header) {
      header.style.position = position;
    }
  };
  const handleOpenSidebar = () => {
    setVisibleSidebar((prev) => !prev);
    const position = visibleSidebar ? 'sticky' : 'fixed';
    const header = document.getElementById('header');
    if (header) {
      header.style.position = position;
    }
  };
  return (
    <Box
      id="header"
      as="header"
      bg="#fff"
      pos="sticky"
      zIndex={1000}
      top={0}
      w="full"
      transition="all .5s"
      h={visibleChannel ? '100vh' : undefined}
      data-testid="header"
    >
      <HStack justifyContent="space-between" transition="all .5s" px="15px">
        {remoteLogin?.isLoadingFlag ? (
          <Box height="20px" width="20px" alignItems="center">
            <SkeletonBox className="h-full w-full rounded leading-none" />
          </Box>
        ) : (
          remoteLogin?.result && (
            <button
              data-testid="btn-sidebar"
              type="button"
              onClick={handleOpenSidebar}
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              aria-label="sidebar"
            >
              <FontAwesomeIcon
                icon={visibleSidebar ? faTimes : faBars}
                height="20px"
                color={visibleSidebar ? '#555' : '#d51c6a'}
              />
            </button>
          )
        )}

        <Box py={isOnTop ? '10px' : '5px'}>
          <Box
            as={CustomLink}
            href="/"
            w={!isOnTop ? '150px' : '163px'}
            h={!isOnTop ? '35px' : '38px'}
            display="block"
            pos="relative"
          >
            <Image
              src="/v3/assets/images/global/logo.png"
              width={!isOnTop ? 150 : 163}
              height={!isOnTop ? 35 : 38}
              alt="Popbela.com"
              priority
            />
          </Box>
        </Box>
        <HStack spacing="10px">
          <Box as={CustomLink} href="/search" {...iconStyle}>
            <FontAwesomeIcon
              data-testid="btn-search"
              icon={faSearch}
              height="20px"
              color={'primary'}
            />
          </Box>
          {!visibleSidebar && (
            <Box
              data-testid="btn-channel"
              as="button"
              {...iconStyle}
              role="group"
              mr="-4px"
              onClick={handleOpenChannel}
              color={visibleChannel ? '#555' : 'primary'}
              bgColor={visibleChannel ? '#eee' : 'transparent'}
            >
              {visibleChannel ? (
                <FontAwesomeIcon icon={faTimes} width={24} height={24} />
              ) : (
                <IconGrid width={20} height={20} />
              )}
            </Box>
          )}
        </HStack>
      </HStack>
      <Box>
        <Box
          as="nav"
          w="full"
          overflowX="auto"
          sx={{
            '::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none' /* IE and Edge */,
            'scrollbar-width': 'none' /* Firefox */,
          }}
        >
          <HeaderNav
            categories={categories}
            variant="mobile"
            marginLeft="-7px"
            paddingLeft="15px"
            paddingRight="7px"
            activeCategoryUrl={`/${activeCategory}`}
          />
        </Box>
      </Box>
      <TrendingTag isMobile={true} />
      {visibleChannel && (
        <Box
          h={{ base: '100%', lg: '94%' }}
          pos="absolute"
          width="100%"
          top="48px"
          background="white"
        >
          <Channels />
          <Box pos="absolute" bottom="0" left="0" right="0">
            <Footer />
          </Box>
        </Box>
      )}
      {visibleSidebar && (
        <SidebarMenu isAuthenticated={isAuthenticated} user={user} />
      )}
    </Box>
  );
};
