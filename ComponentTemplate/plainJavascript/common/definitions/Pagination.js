// @flow
import { Record } from "immutable";
export const makePagination = Record(
  {
    totalEntries: 0,
    currentPage: 1,
    perPageSize: 10,
  },
  "Pagination"
);
