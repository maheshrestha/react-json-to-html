import QueryParamSchema from '../schemas/QueryParamSchema';
export async function getNormalizedQueryParams(queryParams, totalEntries) {
  var queryParamsDenormalized = [
    {
      id: queryParams,
      query_params: queryParams,
      total_entries: totalEntries
    }
  ];
  return normalize(queryParamsDenormalized, [QueryParamSchema]);
}