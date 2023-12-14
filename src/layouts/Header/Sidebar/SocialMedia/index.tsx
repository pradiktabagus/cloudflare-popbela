import { Box, Heading, HStack, Stack } from '@chakra-ui/layout';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { LIST_SOCIAL } from '@/utils/listSocial';

const CustomLink = dynamic(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const iconStyle = {
  boxSize: '45px',
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
    <Box {...iconStyle} as="li" listStyleType="none" data-testid={name}>
      <CustomLink
        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white"
        href={href}
      >
        <FontAwesomeIcon icon={icon} height="24px" />
      </CustomLink>
    </Box>
  );
};
const SocialMedia = ({ isAuthenticated }: { isAuthenticated?: boolean }) => {
  const router = useRouter();
  const handleLogout = async () => {
    // handle global signout
    try {
      localStorage.removeItem('user');
      await Auth.signOut({
        global: true,
      });
    } catch (error: any) {
      // when other client has been logged out / access token has ben revoked, do regular signOut
      if (error.code === 'NotAuthorizedException') {
        localStorage.removeItem('user');
        await Auth.signOut();
      }
    }
    router.push('/');
  };
  return (
    <Stack
      direction="column"
      alignItems="baseline"
      className="mt-4 h-full bg-white px-4"
    >
      {isAuthenticated && (
        <div className="mb-4 py-2" data-testid="btn-signout">
          <CustomLink
            onClick={() => handleLogout()}
            className="text-2xl font-semibold text-black hover:text-primary"
          >
            Log Out
          </CustomLink>
        </div>
      )}
      <Heading as="h3" fontSize="14px">
        Follow Us :
      </Heading>
      <Box as="nav">
        <HStack as="ul" data-testid="section-social-media">
          {LIST_SOCIAL.map((item) => (
            <LiIcon
              key={item.href}
              icon={item.icon}
              href={item.href}
              name={item.name}
            />
          ))}
        </HStack>
      </Box>
    </Stack>
  );
};
export default SocialMedia;
