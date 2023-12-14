/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from 'aws-amplify';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { apinext } from '@/adapters/xhr/apiNext';
import type { ResponseLogin } from '@/types/responses/pages/login';
import type { TAppContext } from '@/utils/State';
import { AppContext } from '@/utils/State';

const Index = () => {
  const router = useRouter();
  const { setUser } = useContext<TAppContext>(AppContext);
  const handleSync = async () => {
    const jwtToken: string = (await Auth.currentSession())
      .getAccessToken()
      .getJwtToken();
    try {
      const { data, status } = await apinext.post<ResponseLogin>(
        'api/login',
        null,
        {
          headers: {
            version: 'v1',
            authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (status === 200) {
        setUser(data?.data);
        window.localStorage.setItem('user', JSON.stringify(data?.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      router.push('/');
    }
  };
  useEffect(() => {
    handleSync();
  }, []);
  return <div>Sedang memuat...</div>;
};
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Index;
