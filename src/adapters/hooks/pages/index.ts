/* eslint-disable @typescript-eslint/naming-convention */
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Base64 } from 'js-base64';

import {
  getDefaultSSRPages,
  getIncrementPage,
  getPageDetail,
} from '@/adapters/request';
import { api } from '@/adapters/xhr';

type TRequest = {
  version?: string;
  end_point: string;
  params?: string[] | string;
};

type UseInfinityGeneralPageProps = {
  url: string; // path api
  keyword?: string; // keyword
  limit: number; // limit
  type: string; // type
  retry?: boolean; // retry if request network is error;
  keywordCheck?: boolean; // Check Keyword
  version?: string;
};
type PayloadInfinityGeneralPageProps = {
  page: number;
  limit: number;
  url: string;
  type: string;
  keyword?: string;
  keywordCheck?: boolean;
  version?: string;
};

export const useIncrementPage = async (payload: string) => {
  const encodePayload = Base64.btoa(payload);
  return useQuery([payload], () => getIncrementPage(encodePayload), {
    cacheTime: undefined,
    refetchOnWindowFocus: false,
  });
};

// For fetching infinity loading for search & trending articles
const getInfinityGeneralPages = async (
  payload: PayloadInfinityGeneralPageProps
) => {
  const { page, limit, keyword, url, keywordCheck, version } = payload;
  if ((!keyword || keyword?.length < 3) && keywordCheck) return [];
  const res = await api.get<any>(
    `/${version}${url}?keyword=${keyword}&page=${page}&limit=${limit}`
  );
  const { data } = res.data;

  return data;
};

export const useInfinityGeneralPages = (
  payload: UseInfinityGeneralPageProps
) => {
  const {
    url,
    keyword = '',
    limit = 6,
    type,
    keywordCheck = false,
    retry = true,
    version = 'v1',
  } = payload;
  return useInfiniteQuery(
    [`${url}`, version],
    ({ pageParam = 1 }) =>
      getInfinityGeneralPages({
        page: pageParam,
        limit,
        url,
        type,
        keyword,
        keywordCheck,
        version,
      }),
    {
      staleTime: 600000,
      cacheTime: 900000,
      retry,
      getNextPageParam: (lastPage: any) => {
        const { pagination } = lastPage ?? {
          current_page: 1,
          total_page: 1,
          per_page: 6,
          total_data: 0,
        };
        if (pagination?.current_page < pagination?.total_page)
          return pagination.current_page + 1;
        return false;
      },
    }
  );
};

export const useDefaultPages = <R = any>(
  payload: TRequest,
  options?:
    | Omit<UseQueryOptions<R, unknown, R, QueryKey>, 'queryKey' | 'queryFn'>
    | undefined
) => {
  const { end_point, version = 'v1' } = payload;
  return useQuery<R>(
    [end_point, version],
    () => getDefaultSSRPages({ end_point, version }),
    {
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
      ...options,
    }
  );
};
export const usePageDetail = <R = any>(payload: TRequest, key: string) => {
  const { end_point, version = 'v1' } = payload;

  return useQuery<R>([key], () => getPageDetail({ end_point, version }), {
    refetchOnWindowFocus: true,
    staleTime: 600000,
    cacheTime: 900000,
  });
};
