import { getJSON } from './xhr';
import QueryParamsApiSchema from '../schema/QueryParamsApiSchema';
import { normalize } from 'normalizr';

export async function getNormalizedQueryParams(queryParams, totalEntries) {
  var queryParamsDenormalized = [
    {
      id: queryParams,
      query_params: queryParams,
      total_entries: totalEntries
    }
  ];
  return normalize(queryParamsDenormalized, QueryParamsApiSchema);
}
