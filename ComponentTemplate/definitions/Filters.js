// @flow
import { Record, Set } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';
import { USER_TYPE_CLIENT, VIEW_MODE_CALENDAR } from '../constants';
import type Moment from 'moment';
import moment from 'moment';

export type FilterProps = {
  userType: string
};

export const makeFilters: RecordFactory<FilterProps> = Record(
  {
    userType: USER_TYPE_CLIENT
  },
  'Filters'
);

export type Filters = RecordOf<FilterProps>;
