import type { NextPageContext } from 'next';
import dynamic from 'next/dynamic';

const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));
function Error({ statusCode }: { statusCode: number }) {
  return <>{statusCode === 404 ? <Custom404 /> : <Custom500 />}</>;
}
Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    statusCode,
  };
};
export default Error;
