import type { DehydratedState } from '@tanstack/react-query';

export function isPageFound(
  key: string,
  keyName: string | 'empty',
  query?: DehydratedState
) {
  let isNotAvail = false;
  // find data from query key
  const dataQuery = query?.queries.find(({ queryKey }) => queryKey);
  dataQuery?.queryKey.find((queryKey) => queryKey === key);
  const data: any = dataQuery?.state.data;
  // if response is empty object, page should not found
  if (JSON.stringify(data) === '{}') return true;
  // detect data by keyName
  if (data) {
    isNotAvail = Array.isArray(data[keyName]) || data[keyName] === null;
  }
  return isNotAvail;
}
