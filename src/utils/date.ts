export const getCurrentMonthFirstLastDayInUnix = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();

  const firstDay = new Date(y, m, 1).getTime();
  const lastDay = new Date(y, m + 1, 0, 23, 59, 59, 999).getTime();
  return {firstDay, lastDay};
};
