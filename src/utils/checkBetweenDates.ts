export const checkBetweenDates = ({
  startDate,
  endDate,
  currentDate,
}: {
  startDate: string;
  endDate: string;
  currentDate: string;
}) => {
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  const d = Date.parse(currentDate);

  return d.valueOf() >= start.valueOf() && d.valueOf() <= end.valueOf();
};
