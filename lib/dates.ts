export const dateAgo = (date: Date | string) => {
  const now = new Date();
  const past = new Date(date);
  const secondsAgo = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.34524, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let intervalIndex = 0;
  let count = secondsAgo;

  while (
    count >= intervals[intervalIndex][0] &&
    intervalIndex < intervals.length - 1
  ) {
    count /= intervals[intervalIndex][0];
    intervalIndex++;
  }

  count = Math.floor(count);
  const unit = intervals[intervalIndex][1];
  return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
};
