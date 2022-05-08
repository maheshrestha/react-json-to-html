import { getJSON } from "../../common/api/xhr";
import { DATA_READ_ENDPOINT_GET } from "../constants";
import { normalize } from "normalizr";


import {{ componentName }}ApiSchema from "../schemas/{{ componentName }}ApiSchema";


export async function fetch{{ componentName }}(queryParams: String = ""): Promise<*> {
  const url = `${DATA_READ_ENDPOINT_GET}?${queryParams}`;
  const response = await getJSON(url);
  if (response.status < 500 && typeof response.data === "object") {
    return normalize(response.data, {{ componentName }}ApiSchema);
  }
  return false;
}
