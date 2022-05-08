// @flow
import { Record, Map } from "immutable";

export const makeQueryParam = Record({
  id: "",
  queryString: "",
  totalEntries: 0,
});

export function makeQueryParams(payload) {
  return Map(payload).map((props) => makeQueryParam(props));
}
