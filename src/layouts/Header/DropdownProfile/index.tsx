import { Box } from '@chakra-ui/layout';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import type { DropdownProps } from '@/components';

const Dropdown = dynamic<DropdownProps>(() =>
  import('@/components/Dropdown').then((mod) => mod.Dropdown)
);
const CustomLink = dynamic(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);

const DropdownMenu = ({ handleLogout }: { handleLogout: () => void }) => (
  <ul className="list-style-none px-2">
    <li
      className="border-b-2 border-solid border-[#e9e9e9] py-2 "
      data-testid="btn-edit-profile"
    >
      <CustomLink
        href={process.env.COGNITO_EDIT_PROFILE_URI}
        className="text-base font-semibold text-black hover:text-primary"
      >
        Edit Profile
      </CustomLink>
    </li>
    <li
      className="border-b-2 border-solid border-[#e9e9e9] py-2 "
      data-testid="btn-idn-dashboard"
    >
      <CustomLink
        href={process.env.COGNITO_DASHBOARD_URI}
        className="text-base font-semibold text-black hover:text-primary"
      >
        IDN Dashboard
      </CustomLink>
    </li>
    <li className="py-2 " data-testid="btn-signout">
      <CustomLink
        className="text-base font-semibold text-black hover:text-primary"
        onClick={() => handleLogout()}
      >
        Log Out
      </CustomLink>
    </li>
  </ul>
);

const DropdownProfile = ({ name }: { name?: string }) => {
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
    <div className="list-none" data-testid="profile-name">
      <Dropdown
        trigger={
          <a className="flex cursor-pointer items-center gap-3 font-bahijMitra text-lg font-bold text-primary">
            Hi, {name}{' '}
            <Box
              width="14px"
              height="14px"
              color="primary"
              display="flex"
              alignItems="center"
              justifyContent="center"
              data-testid="dropdown-menu-profile"
            >
              <FontAwesomeIcon
                fontSize="12px"
                fontWeight="600"
                icon={faChevronDown}
              />
            </Box>
          </a>
        }
        content={<DropdownMenu handleLogout={handleLogout} />}
        placement="bottom-end"
        contentProps={{
          width: '200px',
          py: '5px',
        }}
      />
    </div>
  );
};

export default DropdownProfile;
