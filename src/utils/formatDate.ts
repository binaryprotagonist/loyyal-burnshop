import { format } from "date-fns";

export function fDate(date: string, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}
