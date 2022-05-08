import { getJSON } from "../../common/api/xhr";
import { DATA_READ_ENDPOINT_GET } from "../constants";
import { normalize } from "normalizr";


import {{ capitalize componentName }}ApiSchema from "../schemas/{{ capitalize componentName }}ApiSchema";


export async function fetch{{ capitalize componentName }}(queryParams) {
  const url = `${DATA_READ_ENDPOINT_GET}?${queryParams}`;
  const response = await getJSON(url);
  if (response.status < 500 && typeof response.data === "object") {
    return normalize(response.data, {{ capitalize componentName }}ApiSchema);
  }
  return false;
}
