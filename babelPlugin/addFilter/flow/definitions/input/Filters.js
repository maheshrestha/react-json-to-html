// @flow
import { Record, Set } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

export type FilterProps = {
  query: ?string
};

export const makeFilters: RecordFactory<FilterProps> = Record(
  {
    query: undefined
  },
  'Filters'
);

export type Filters = RecordOf<FilterProps>;
