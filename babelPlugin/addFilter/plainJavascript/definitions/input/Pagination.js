import { Record } from "immutable";

export const makePagination = Record(
  {
    totalEntries: 0,
    currentPage: 1,
    perPageSize: 1,
  },
  "Pagination"
);
