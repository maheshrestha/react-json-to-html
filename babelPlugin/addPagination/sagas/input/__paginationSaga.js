// @flow
import { takeEvery, put } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import { URL_REGEXP, URL_PREFIX } from "../constants";

function getStateReadyNumber(val: string): ?number {
  const n = parseInt(val, 10);
  return isNaN(n) ? undefined : n;
}

function* setPaginationFromUrlSaga(): Saga<void> {
  const url = window.location.pathname;
  const params = unescape(url.replace(URL_PREFIX, ""));
  const matches = params.match(URL_REGEXP);

  if (!matches) {
    return;
  }

  const [,] = matches;
} // ACTION CREATORS

const types = {
  SET_PAGINATION_FROM_URL: "sagas/pagination/SET_PAGINATION_FROM_URL",
};
export function setPaginationFromUrl(): {
  type: string,
} {
  return {
    type: types.SET_PAGINATION_FROM_URL,
  };
}
export const watches = [
  takeEvery(types.SET_PAGINATION_FROM_URL, setPaginationFromUrlSaga),
];
