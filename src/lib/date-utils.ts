export function differenceInDays(date1: Date, date2: Date): number {
  const ms = date1.getTime() - date2.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}
