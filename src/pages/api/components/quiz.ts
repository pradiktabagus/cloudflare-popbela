/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from '@/adapters/xhr';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { params } = req.body;
  const { slug, end_point } = params;
  try {
    const result = await api.post<any>(`/quiz/${end_point}/${slug}`);
    res.status(200).json(result.data);
  } catch (error: any) {
    const statusCode = error?.response?.status ?? 500;
    res.statusCode = statusCode;
    res.status(statusCode).json(error?.response?.data);
  }
};

export default handler;
