/* eslint-disable @typescript-eslint/naming-convention */
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';

import {
  getDefaultComponent,
  getInfinitySearch,
  getPromotionMarketing,
  getPublisher,
  getSection,
} from '@/adapters/request';
import type { ItemPublisher } from '@/types/crossPublisher';
import mapPublisher from '@/utils/cross-publisher.json';

type PayloadInfinityGeneral = {
  version?: string;
  url: string; // path api
  category?: string | string[]; // category, if not set will set as 'all'
  type?: string; // type, if not set will set as 'all'
};
type PayloadInfinitySearch = {
  url: string; // path api
  limit?: number;
  keyword?: string; // keyword
  version?: string;
};

type PayloadDefault = {
  end_point: string;
  params?: string | string[];
};
type PayloadRequest = {
  version?: string;
} & PayloadDefault;

export const useDefaultComponent = <R = any>(payload: PayloadRequest) => {
  const { end_point, version = 'v1' } = payload;
  return useQuery<R>(
    [`/component${end_point}`, version],
    () => getDefaultComponent(payload),
    {
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};
export const usePromotionMarketing = <R = any>(payload: PayloadDefault) => {
  const { params } = payload;
  return useQuery<R>([params], () => getPromotionMarketing(payload), {
    refetchOnWindowFocus: false,
    staleTime: 600000,
    cacheTime: 900000,
  });
};

export const useInfinityAuthor = (payload: PayloadInfinityGeneral) => {
  const { url, version = 'v1' } = payload;
  return useInfiniteQuery(
    [`${url}`, version],
    ({ pageParam = 1 }) =>
      getSection({
        end_point: `${url}&page=${pageParam}`,
        version,
      }),
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        if (lastPage.latest.articles.length > 8) return pages.length + 1;
        return false;
      },
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};

export const useInfinityTag = (payload: PayloadInfinityGeneral) => {
  const { url, version } = payload;
  return useInfiniteQuery(
    [`${url}`, version],
    ({ pageParam = 1 }) =>
      getSection({
        end_point: `${url}&page=${pageParam}`,
        version,
      }),
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        if (lastPage.data.articles.length > 9) return pages.length + 1;
        return false;
      },
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};

export const useInfinityPopCreator = (payload: PayloadInfinityGeneral) => {
  const { url, version } = payload;
  return useInfiniteQuery(
    [`${url}`, version],
    ({ pageParam = 1 }) =>
      getSection({
        end_point: `${url}&page=${pageParam}`,
        version,
      }),
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        if (lastPage.popcreators.length > 14) return pages.length + 1;
        return false;
      },
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};

export const useInfinitySearch = (payload: PayloadInfinitySearch) => {
  const { keyword = '', url, version = 'v1' } = payload;
  return useInfiniteQuery(
    [`${url}/${keyword}`, version],
    ({ pageParam = 1 }) =>
      getInfinitySearch({
        url,
        page: pageParam,
        keyword,
        version,
      }),
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        if (lastPage.length > 9) return pages.length + 1;
        return false;
      },
    }
  );
};

export const useGetExclusiveSection = <R = any>(payload: PayloadRequest) => {
  const { version = 'v1', end_point } = payload;
  return useQuery<R>(
    [end_point, version],
    () =>
      getSection({
        version,
        end_point,
      }),
    {
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};
export const useGetPopcreatorSection = <R = any>(payload: PayloadRequest) => {
  const { version = 'v1', end_point } = payload;
  return useQuery<R>(
    [end_point, version],
    () =>
      getSection({
        version,
        end_point,
      }),
    {
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};
export const useGetRelatedSection = <R = any>(payload: PayloadRequest) => {
  const { version = 'v1', end_point } = payload;
  return useQuery<R>(
    [`/article/related?${end_point}`, version],
    () =>
      getSection({
        version,
        end_point: `/article/related?${end_point}`,
      }),
    {
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};
export const useGetDetailArticle = <R = any>(payload: PayloadRequest) => {
  const { version = 'v1', end_point } = payload;
  return useQuery<R>(
    [`/articles/${payload.params}`, version],
    () =>
      getSection({
        version,
        end_point,
      }),
    {
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};
export const useGetTrending = <R = any>(payload: PayloadRequest) => {
  const { version = 'v1', end_point, params } = payload;
  return useQuery<R>(
    [`${end_point}?${params}`, version],
    () =>
      getSection({
        version,
        end_point,
      }),
    {
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};
export const useGetLatest = <R = any>(payload: PayloadRequest) => {
  const { version = 'v1', end_point } = payload;
  return useInfiniteQuery<R>(
    [`${payload.end_point}`, version],
    ({ pageParam = 1 }) =>
      getSection({
        end_point: `${end_point}&page=${pageParam}`,
        version,
      }),
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        if (lastPage[version === 'v1' ? 'latest' : 'data'].length > 5)
          return pages.length + 1;
        return false;
      },
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};
export const useGetLatestAmp = <R = any>(payload: PayloadRequest) => {
  const { version = 'v1', end_point } = payload;
  return useQuery<R>(
    [end_point, version],
    () =>
      getSection({
        version,
        end_point,
      }),
    {
      refetchOnWindowFocus: true,
      staleTime: 600000,
      cacheTime: 900000,
    }
  );
};

export const usePublisherAll = (category?: string | string[]) => {
  const mapByCategory: ItemPublisher[] =
    mapPublisher.category.find((cat) => cat.category === category)?.publisher ??
    [];

  return useQueries({
    queries: mapByCategory?.map((item: ItemPublisher, i: number) => {
      return {
        queryKey: [`/feed/${item.name}/${item.category}`, i],
        queryFn: () =>
          getPublisher({
            publisher: item.name,
            category: item.category,
            subCategory: item.subCategory,
            type: item.type,
          }),
        retry: false,
        refetchOnWindowFocus: false,
      };
    }),
  });
};
