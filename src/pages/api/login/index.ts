/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from '@/adapters/xhr';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { headers } = req;
  const { version, authorization } = headers;
  try {
    const result = await api.post<any>(`/${version}/idn-account/login`, null, {
      headers: {
        authorization: `${authorization}`,
      },
    });
    res.status(200).json(result.data);
  } catch (error: any) {
    const statusCode = error?.response?.status ?? 500;
    res.statusCode = statusCode;
    res.status(statusCode).json(error?.response?.data);
  }
};

export default handler;
