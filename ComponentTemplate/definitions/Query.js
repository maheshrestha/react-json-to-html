// @flow
export type Query = {
  orderState: [string],
  dateFrom: ?Date,
  dateTo: ?Date,
  startMinuteFrom: ?number,
  startMinuteTo: ?number,
  sortBy: ?string,
  sortOrder: ?string,
  amountFrom: ?number,
  amountTo: ?number,
  page: number
};
