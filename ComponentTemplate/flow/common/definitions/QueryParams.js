// @flow
import { Record, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

export type QueryParamProps = {
  id: string,
  queryString: string,
  totalEntries: number
};

export const makeQueryParam: RecordFactory<QueryParamProps> = Record({
  id: '',
  queryString: '',
  totalEntries: 0
});

export type QueryParam = RecordOf<QueryParamProps>;

export function makeQueryParams(payload: {
  [string]: QueryParamProps
}): Map<string, QueryParam> {
  return Map(payload).map((props: QueryParamProps): QueryParam =>
    makeQueryParam(props)
  );
}
