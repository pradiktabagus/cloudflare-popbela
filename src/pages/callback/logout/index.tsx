import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    window.localStorage.removeItem('user');
    router.push('/');
  }, [router]);
  return <div>Sedang memuat...</div>;
};
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Index;
