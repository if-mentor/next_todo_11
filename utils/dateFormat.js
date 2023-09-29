import { format } from "date-fns";

export const dateFormat = (date) => {
  const formattedDate = format(date.toDate(), "yyyy-MM-dd HH:mm");

  return formattedDate;
};
