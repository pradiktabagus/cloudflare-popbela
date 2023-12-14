import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from '@/adapters/xhr';

const PageGeneral = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { page = 1, limit = 10, keyword, url, version } = req.query;
  try {
    const result = await api.get<any>(`/${version}${url}`, {
      params: { page, limit, keyword },
    });
    res.status(200).json(result.data);
  } catch (error: any) {
    const statusCode = error?.response?.status ?? 500;
    res.statusCode = statusCode;
    res.status(statusCode).json(error?.response?.data);
  }
};

export default PageGeneral;
