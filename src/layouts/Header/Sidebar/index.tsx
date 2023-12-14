import dynamic from 'next/dynamic';

import type { IDataLogin } from '@/types/responses/pages/login';

const Profile = dynamic(() => import('./Profile'));
const Information = dynamic(() => import('./Information'));
const SocialMedia = dynamic(() => import('./SocialMedia'));
const Sidebar = ({
  isAuthenticated,
  user,
}: {
  isAuthenticated?: boolean;
  user?: IDataLogin;
}) => {
  return (
    <aside
      id="default-sidebar"
      data-testid="section-sidebar"
      className="fixed left-0 top-12 z-40 h-[calc(100vh_-_48px)] w-full bg-[#efefef] transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <Profile
        isAuthenticated={isAuthenticated}
        name={user?.name}
        avatar={user?.avatar}
      />
      <Information />
      <SocialMedia isAuthenticated={isAuthenticated} />
      <div className="absolute bottom-[15px] block w-full text-center">
        <h3 className="text-2xl font-semibold">
          © 2023 Popbela.com by IDN Media
        </h3>
      </div>
    </aside>
  );
};
export default Sidebar;
