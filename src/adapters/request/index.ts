/* eslint-disable @typescript-eslint/naming-convention */

import axios from 'axios';

import { api } from '../xhr';
import { apiLambda } from '../xhr/apiLambda';
import { apinext } from '../xhr/apiNext';

type TRequest = {
  version?: string;
  end_point: string;
  params?: string[] | string;
};
type TRequestInfinity = {
  version?: string;
  url: string;
  page: number;
  keyword?: string;
  category?: string | string[];
  type?: string;
};
type TRequestPublisher = {
  publisher: string;
  type: string;
  category?: string;
  subCategory?: string;
};

export const getSection = async (payload: TRequest) => {
  const { version = 'v1', end_point } = payload;
  const res = await api.get<any>(`/${version}${end_point}`);
  return res.data;
};
export const getLatest = async (payload: TRequest) => {
  const res = await apiLambda.get<any>(payload.end_point);
  return res.data;
};

export const getPageDetail = async (payload: TRequest) => {
  const { version = 'v1', end_point } = payload;
  const res = await api.get<any>(`/${version}/${end_point}`, {
    headers: {
      'x-popbela-gw-version': version ?? '',
    },
  });
  return res.data;
};

export const getPromotionMarketing = async (payload: TRequest) => {
  const { version = 'v1', end_point, params } = payload;
  const res = await api.get<any>(`/${version}/component/${end_point}`, {
    params: {
      tags: params,
    },
  });
  return res.data;
};

export const getDefaultComponent = async (payload: TRequest) => {
  const { version = 'v1', end_point } = payload;
  const res = await api.get<any>(`/${version}/component${end_point}`);
  return res.data;
};

export const getInfinitySearch = async (payload: TRequestInfinity) => {
  const { url, page, keyword, version = 'v1' } = payload;
  if (!keyword) return [];
  const res = await api.get<any>(
    `/${version}${url}?page=${page}&keyword=${keyword}`
  );
  return res.data;
};

export const getIncrementChoice = async ({
  slug,
  end_point,
  version = 'v1',
}: {
  slug?: any;
  end_point: string;
  version?: string;
}) => {
  const res = await api.post(`/${version}/quiz/${end_point}/${slug}`);
  return res.data;
};

export const getResultQuiz = async ({
  slug,
  id,
  end_point,
  version = 'v1',
}: {
  slug?: any;
  id?: number;
  end_point: string;
  version?: string;
}) => {
  const res = await api.post(
    `/${version}/quiz/${end_point}/${slug}?final_result_id=${id}`
  );
  return res.data;
};

export const getDefaultSSRPages = async (payload: TRequest) => {
  const { version = 'v1', end_point } = payload;
  const res = await api.get<any>(`/${version}/${end_point}`);
  return res.data;
};

export const getRedirectionPages = async (payload: string) => {
  const res = await apinext.get<any>('/api/pages/default', {
    params: { payload },
  });
  return res.data;
};

export const getIncrementPage = async (payload: string) => {
  const res = await apinext.get<any>('/api/pub', {
    params: { payload },
  });
  return res.data;
};
export const getIncrementPageAmp = async (
  payload: string,
  version?: string
) => {
  const res = await apinext.get<any>('/api/pub-amp', {
    params: { payload, version },
  });
  return res.data;
};
export const getPublisher = async (payload: TRequestPublisher) => {
  const { publisher, category, subCategory = '', type } = payload;
  const isSub = subCategory ? { subcategory: subCategory } : {};
  const res = await axios.get<any>('/feed', {
    params: {
      max: 1,
      key: process.env.universalKey,
      format: 'json',
      publisher,
      hyperlocal: 'no',
      type,
      sortby: 'pubdate',
      category,
      ...isSub,
    },
    baseURL: process.env.apiUniversal,
  });
  return res.data;
};
