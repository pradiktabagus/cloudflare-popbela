/* eslint-disable @typescript-eslint/naming-convention */
import type { GetServerSideProps } from 'next';

import { getRedirectionPages } from '@/adapters/request';
import type { IRedirection } from '@/types/responses/pages/redirection';

export default function Index() {}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { category, subCategory, authorAmp } = query;
  const { redirection }: IRedirection = await getRedirectionPages(
    `v1/redirection?url=/${category}/${subCategory}/${authorAmp}`
  );
  if (redirection?.status_code !== 404) {
    return {
      props: {},
      redirect: {
        destination: redirection?.url,
        statusCode: Number(redirection?.status_code),
      },
    };
  }
  return {
    props: {},
    notFound: true,
  };
};
