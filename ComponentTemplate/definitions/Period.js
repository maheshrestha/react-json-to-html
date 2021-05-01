// @flow
import { Record, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';
import type Moment from 'moment';

export type PeriodProps = {
  id: string,
  startDate: ?Moment,
  endDate: ?Moment
};

export const makePeriod: RecordFactory<PeriodProps> = Record(
  {
    id: '',
    startDate: undefined,
    endDate: undefined
  },
  'Period'
);

export type Period = RecordOf<PeriodProps>;

export function makePeriods(payload: {
  [string]: PeriodProps
}): Map<string, Period> {
  return Map(payload).map((props: PeriodProps): Period => makePeriod(props));
}
