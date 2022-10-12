import { Car } from "@prisma/client";

export type CarRows = {
  count: number;
  rows: Car[];
  pageSize: number;
  page: number;
};
