import { Box } from '@chakra-ui/layout';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import type { AvatarProps } from '@/types/avatar';

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const Avatar = dynamic<AvatarProps>(() =>
  import('@/components/Avatar').then((mod) => mod.Avatar)
);
const CustomLink = dynamic(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const Profile = ({
  isAuthenticated,
  name,
  avatar,
}: {
  isAuthenticated?: boolean;
  name?: string;
  avatar?: string;
}) => {
  return (
    <section className="mt-3 flex w-full flex-col bg-white px-4 py-2">
      <div className="flex w-full">
        {isAuthenticated ? (
          <Fragment>
            <Avatar
              boxSize="45px"
              data={{
                name: name ?? 'user',
                avatar: avatar ?? '',
                author_url: '/',
              }}
            />
            <div className="ml-3 flex-1" data-testid="profile">
              <div className="flex items-center text-primary">
                <div className="h-14px w-[14px] text-primary">
                  <FontAwesomeIcon icon={faStar} fontSize="14px" />
                </div>
                <h4 className="ml-2 font-bahijMitra text-sm">Member</h4>
              </div>
              <h4 className="font-bahijMitra text-2xl font-bold text-black">
                Hi, {name}
              </h4>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Box
              boxSize="45px"
              as={FontAwesomeIcon}
              icon={faUser}
              color={'white'}
              backgroundColor={'primary'}
              rounded="full"
              padding={'5px'}
              data-testid="avatar"
            />
            <div className="ml-3 flex w-full flex-1 items-center justify-between gap-4">
              <button
                data-testid="btn-login"
                onClick={() => Auth.federatedSignIn()}
                type="button"
                className="h-9 min-w-[100px] flex-1 rounded-md border-[1px] border-solid border-primary bg-white px-1 py-2 text-primary"
              >
                Log In
              </button>

              <button
                data-testid="btn-signup"
                onClick={() => Auth.federatedSignIn()}
                type="button"
                className="h-9 min-w-[100px] flex-1 rounded-md border-[1px] border-solid border-primary bg-primary px-1 py-2 text-white"
              >
                Sign Up
              </button>
            </div>
          </Fragment>
        )}
      </div>
      {isAuthenticated && (
        <ul className="list-style-none">
          <li
            className="border-b-2 border-solid border-[#e9e9e9] py-2 "
            data-testid="btn-edit-profile"
          >
            <CustomLink
              href={process.env.COGNITO_EDIT_PROFILE_URI}
              className="text-2xl font-semibold text-black hover:text-primary"
            >
              Edit Profile
            </CustomLink>
          </li>
          <li className="py-2" data-testid="btn-idn-dashboard">
            <CustomLink
              href={process.env.COGNITO_DASHBOARD_URI}
              className="text-2xl font-semibold text-black hover:text-primary"
            >
              IDN Dashboard
            </CustomLink>
          </li>
        </ul>
      )}
    </section>
  );
};
export default Profile;
