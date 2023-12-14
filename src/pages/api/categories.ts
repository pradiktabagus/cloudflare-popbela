import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from '@/adapters/xhr';
import type { Categories } from '@/types/category';

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const result = await api.get<Categories>('/component/categories');
    res.status(200).json(result.data.categories);
  } catch (error: any) {
    const statusCode = error?.response?.status ?? 500;
    res.statusCode = statusCode;
    res.status(statusCode).json(error?.response?.data);
  }
};

export default handler;
