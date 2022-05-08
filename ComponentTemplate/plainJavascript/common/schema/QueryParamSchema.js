import { schema } from "normalizr";

function processStrategy(query) {
  const {
    id,
    query_params: queryParams,
    total_entries: totalEntries,
    ...rest
  } = query;

  return {
    ...rest,
    id: id + "",
    queryParams,
    totalEntries,
  };
}

const QueryParamSchema = new schema.Entity(
  "queryParams",
  {},
  { processStrategy }
);

export default QueryParamSchema;
