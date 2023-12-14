import { Base64 } from 'js-base64';
import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from '@/adapters/xhr';

const PageDefault = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { payload } = req.query;
  const decodePaylod = Base64.atob(payload?.toString() ?? '');
  try {
    const result = await api.get<any>(`/${encodeURI(decodePaylod)}`);
    res.status(200).json(result.data);
  } catch (error: any) {
    const statusCode = error?.response?.status ?? 500;
    res.statusCode = statusCode;
    res.status(statusCode).json(error?.response?.data);
  }
};

export default PageDefault;
