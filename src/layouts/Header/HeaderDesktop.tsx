import { Box, Container, Flex, Grid, HStack } from '@chakra-ui/layout';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { useScrollDirection } from '@/adapters/hooks';
import type { Category } from '@/types/category';
import type { LinkProps } from '@/types/customLink';
import type { TFlagValue } from '@/types/remoteConfig';
import { LIST_SOCIAL } from '@/utils/listSocial';

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const TrendingTag = dynamic<any>(() => import('./TrendingTags'));
const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const Channels = dynamic(() =>
  import('@/components/Channels').then((mod) => mod.Channels)
);
const Dropdown = dynamic(() =>
  import('@/components/Dropdown').then((mod) => mod.Dropdown)
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
const Profile = dynamic(() => import('./DropdownProfile'));
const iconStyle = {
  boxSize: '28px',
  color: 'primary',
  _hover: { color: '#911348' },
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const LiIcon = ({
  icon,
  href,
  name,
}: {
  icon: IconDefinition;
  href: string;
  name: string;
}) => {
  return (
    <Box as="li" px="5px" listStyleType="none" data-testid={`share-${name}`}>
      <Flex
        as={CustomLink}
        href={href}
        boxSize="28px"
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        bg="primary"
        color="white"
        _hover={{ bg: '#911348' }}
        aria-label={name}
      >
        <FontAwesomeIcon icon={icon} height="15px" />
      </Flex>
    </Box>
  );
};

const Login = ({
  name,
  isAuthenticated,
}: {
  name?: string;
  isAuthenticated?: boolean;
}) => {
  return (
    <Fragment>
      {isAuthenticated ? (
        <Profile name={name} />
      ) : (
        <Box as="li" listStyleType="none" data-testid="login-signup">
          <CustomLink
            className="rounded-md bg-primary px-2 py-1 font-bahijMitra text-white hover:bg-[#911348]"
            onClick={() => Auth.federatedSignIn()}
          >
            Log In or Sign up
          </CustomLink>
        </Box>
      )}
    </Fragment>
  );
};
const LinkSocialsSearchChannel = ({
  remoteLogin,
  isAuthenticated,
  name,
}: {
  remoteLogin: TFlagValue;
  isAuthenticated?: boolean;
  name?: string;
}) => (
  <Box as="nav">
    <HStack as="ul" justifyContent="flex-end">
      {remoteLogin.isLoadingFlag ? (
        <Box height="28px" width="120px" alignItems="center">
          <SkeletonBox className="h-full w-[120px] rounded leading-none" />
        </Box>
      ) : (
        !remoteLogin.result &&
        LIST_SOCIAL.map((item) => (
          <LiIcon
            key={item.href}
            icon={item.icon}
            href={item.href}
            name={item.name}
          />
        ))
      )}
      <Box as={CustomLink} {...iconStyle} href="/search">
        <Box
          data-testid="btn-search"
          as={FontAwesomeIcon}
          {...iconStyle}
          icon={faSearch}
          height="20px"
        />
      </Box>
      {remoteLogin.result && (
        <Login isAuthenticated={isAuthenticated} name={name} />
      )}
      <Box as="li" listStyleType="none" data-testid="btn-channel">
        <Dropdown
          trigger={
            <Box as="a" {...iconStyle} role="group">
              <IconGrid width={20} height={20} />
            </Box>
          }
          content={<Channels />}
          placement="bottom-end"
          contentProps={{
            width: '400px',
            py: '5px',
          }}
        />
      </Box>
    </HStack>
  </Box>
);

export const HeaderDesktop = ({
  categories,
  remoteLogin,
  isAuthenticated,
  name,
}: {
  categories: Category[];
  remoteLogin: TFlagValue;
  isAuthenticated?: boolean;
  name?: string;
}) => {
  const router = useRouter();
  const activeCategory = router.query.category;
  const { isScrollDown } = useScrollDirection();
  return (
    <Box
      as="header"
      bg="#f9f9f9"
      pos="fixed"
      top={isScrollDown ? '-40px' : '0'}
      zIndex={99}
      w="full"
      transition="top .5s"
      data-testid="header"
    >
      <Container maxW="1145px" pt="10px" bg="#f9f9f9">
        <LinkSocialsSearchChannel
          remoteLogin={remoteLogin}
          isAuthenticated={isAuthenticated}
          name={name}
        />
        <Grid
          as="nav"
          alignItems="flex-end"
          borderBottom="1px solid #d72772"
          templateColumns="auto 1fr"
        >
          <Box
            as={CustomLink}
            href="/"
            w={isScrollDown ? '180px' : '232px'}
            h={isScrollDown ? '42px' : '54px'}
            transition="all .5s"
            display="block"
          >
            <Image
              src="/v3/assets/images/global/logo.png"
              width={232}
              height={54}
              alt="popbela"
              priority
            />
          </Box>
          <HeaderNav
            categories={categories}
            marginLeft="auto"
            marginRight={{ base: 0 }}
            mb={isScrollDown ? '2px' : 0}
            transition="margin .5s"
            activeCategoryUrl={`/${activeCategory}`}
          />
        </Grid>
        <TrendingTag />
      </Container>
    </Box>
  );
};
