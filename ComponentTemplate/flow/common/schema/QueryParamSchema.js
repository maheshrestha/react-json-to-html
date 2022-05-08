// @flow
import { schema } from 'normalizr';
import type { DenormalizedQueryParam } from '../types/denormalizedData';

function processStrategy(query: DenormalizedQueryParam): Object {
  const {
    id,
    query_params: queryParams,
    total_entries: totalEntries,
    ...rest
  } = query;

  return {
    ...rest,
    id: id + '',
    queryParams,
    totalEntries
  };
}

const QueryParamSchema = new schema.Entity(
  'queryParams',
  {},
  { processStrategy }
);

export default QueryParamSchema;
