export type NormalizedQueryParams = {
  id: string,
  queryParams: string,
  totalResults: string
};
export type NormalizedQueryParamsApiCall = {
  entities: {
    queryParams?: { [string]: NormalizedQueryParams }
  },
  result: {
    queryParams: {
      results: Array<string>
    }
  }
};
