import 'dayjs/locale/id';

import dayjs from 'dayjs';

dayjs.locale('id');
function toStringFromUnix(value: number, formatDate: string) {
  const dateString = dayjs(value * 1000).format(formatDate);
  return dateString;
}
function getCurrentDate(formatDate: string) {
  return dayjs(new Date()).format(formatDate);
}

function toDateFormat(date: number, format: string) {
  return dayjs.unix(date).format(format);
}
export { getCurrentDate, toDateFormat, toStringFromUnix };
