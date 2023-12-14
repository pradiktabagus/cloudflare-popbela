import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from '@/adapters/xhr';

const Section = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { url, page, keyword = '' } = req.query;
  try {
    const result = await api.get<any>(
      `/${url}?page=${page}&keyword=${keyword}`
    );
    res.status(200).json(result.data.articles);
  } catch (error: any) {
    const statusCode = error?.response?.status ?? 500;
    res.statusCode = statusCode;
    res.status(statusCode).json(error?.response?.data);
  }
};
export default Section;
