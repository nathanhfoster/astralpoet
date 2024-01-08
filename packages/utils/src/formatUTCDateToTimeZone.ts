import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const formatUTCDateToTimeZone = (
  dateValue: string | number | Date,
  formatStr: string,
  timeZone: string
): string => {
  const dateObject =
    dateValue instanceof Date ? dateValue : new Date(dateValue);

  const timeZoneDateObject = utcToZonedTime(dateObject, timeZone);

  return format(timeZoneDateObject, formatStr);
};

export default formatUTCDateToTimeZone;
