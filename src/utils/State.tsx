/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from 'aws-amplify';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { createContext, useCallback, useEffect, useState } from 'react';

type AppWrapperProps = {
  children: React.ReactNode;
};
const FlagsWrapper = dynamic(() =>
  import('@/utils/firebase/FlagsProvider').then((mod) => mod.FlagsWrapper)
);
export type TAppContext = {
  isAuthenticated?: boolean;
  user?: any;
  cognitoData?: any;
  setUser?: any;
};
const AppContext = createContext<TAppContext>({
  isAuthenticated: false,
  user: null,
  cognitoData: null,
});
export const AppWrapper = ({ children }: AppWrapperProps) => {
  const router = useRouter();
  const [cognitoData, setCognitoData] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  const isAuthenticatedUser = (authUser: any) => {
    if (
      !authUser ||
      !authUser.getSignInUserSession() ||
      !authUser.getSignInUserSession().isValid() // isValid() also verified the Token Signature
    ) {
      return false;
    }
    return true;
  };
  const handleAuth = useCallback(async () => {
    const authState = {
      isAuthenticated: false,
      cognitoData: null,
    };
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      const getUSerInfo = await Auth.currentUserInfo();
      // user will be logout when not authorized
      if (Object.keys(getUSerInfo).length === 0) {
        handleLogout();
      }
      authState.isAuthenticated = isAuthenticatedUser(authUser);
      authState.cognitoData = authUser;
    } catch (err) {
      console.error('Error: ', err);
    }
    setIsAuthenticated(authState.isAuthenticated);
    setCognitoData(authState.cognitoData);
  }, [cognitoData]);
  useEffect(() => {
    handleAuth();
    // add router.asPath for run handleAuth when user change page using useRouter().push
  }, [router.asPath]);
  return (
    <FlagsWrapper>
      <AppContext.Provider
        value={{
          cognitoData,
          isAuthenticated,
          user,
          setUser,
        }}
      >
        {children}
      </AppContext.Provider>
    </FlagsWrapper>
  );
};
export { AppContext };
