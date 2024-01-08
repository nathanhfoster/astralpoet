import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const formatDateFn = (
  dateValue: string | number | Date,
  formatStr: string,
  utc?: boolean
): string => {
  const dateObject =
    dateValue instanceof Date ? dateValue : new Date(dateValue);

  return utc
    ? formatInTimeZone(dateObject, "UTC", formatStr)
    : format(dateObject, formatStr);
};

export default formatDateFn;
