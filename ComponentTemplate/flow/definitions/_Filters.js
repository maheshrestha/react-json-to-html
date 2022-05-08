// @flow
import { Record, Set } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';
import { USER_TYPE_CLIENT, VIEW_MODE_CALENDAR } from '../constants';
import type Moment from 'moment';
import moment from 'moment';

export type FilterProps = {
  activeStates: Set<string>,
  minimumAmount: number,
  maximumAmount: number,
  carerId: ?string,
  clientId: ?string,
  managerId: ?string,
  serviceToName: ?string,
  reference: ?string,
  startDate: ?Moment,
  startTime: ?Moment,
  endDate: ?Moment,
  sortOrder: string,
  userType: string,
  viewMode: string,
  dataFor: string
};

export const makeFilters: RecordFactory<FilterProps> = Record(
  {
    activeStates: Set(['unconfirmed', 'confirmed']),
    minimumAmount: 0,
    maximumAmount: undefined,
    carerId: undefined,
    clientId: undefined,
    managerId: undefined,
    serviceToName: undefined,
    reference: undefined,
    startDate: moment()
      .startOf('month')
      .startOf('week'),
    endDate: moment()
      .endOf('month')
      .endOf('week'),
    startTime: undefined,
    sortOrder: 'date_desc',
    userType: USER_TYPE_CLIENT,
    viewMode: VIEW_MODE_CALENDAR,
    currentPage: 1,
    perPageSize: 10,
    dataFor: undefined
  },
  'Filters'
);

export type Filters = RecordOf<FilterProps>;
