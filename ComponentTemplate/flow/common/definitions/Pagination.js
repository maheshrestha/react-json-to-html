// @flow
import { Record } from "immutable";
import type { RecordFactory, RecordOf } from "immutable";
export type PaginationProps = {
  totalEntries: number,
  perPageSize: number,
  currentPage: number,
};
export const makePagination: RecordFactory<PaginationProps> = Record(
  {
    totalEntries: 0,
    currentPage: 1,
    perPageSize: 10,
  },
  "Pagination"
);
export type Pagination = RecordOf<PaginationProps>;
