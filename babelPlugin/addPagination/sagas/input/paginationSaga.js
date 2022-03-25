// @flow
import { takeEvery, put } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import { setCurrentPage, setPerPageSize } from "../ducks/pagination";
import { getSlugsFromUrl } from "../helpers/slugs";

function getStateReadyNumber(val: string): ?number {
  const n = parseInt(val, 10);
  return isNaN(n) ? undefined : n;
}

function* setPaginationFromUrlSaga({
  urlRegexps,
}: {
  prefix: string,
  pagination: string,
  filter: string,
}): Saga<void> {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paginationFilters = urlParams.get(FILTER_PARAM_NAME);
  if (!paginationFilters) {
    return;
  }
  const pathName = getSlugsFromUrl(urlRegexps, paginationFilters);
  const paginationRegExp = new RegExp(["^", urlRegexps.pagination].join(""));
  const matches = pathName.pagination.match(paginationRegExp);
  if (!matches) {
    return;
  }

  const [, perPageSize, currentPage] = matches;
  yield put(setPerPageSize(getStateReadyNumber(perPageSize)));
  yield put(setCurrentPage(getStateReadyNumber(currentPage)));
} // ACTION CREATORS

const types = {
  SET_PAGINATION_FROM_URL: "sagas/pagination/SET_PAGINATION_FROM_URL",
};
export function setPaginationFromUrl(urlRegexps: {
  prefix: string,
  pagination: string,
  filter: string,
}): {
  type: string,
} {
  return {
    type: types.SET_PAGINATION_FROM_URL,
    urlRegexps,
  };
}
export const watches = [
  takeEvery(types.SET_PAGINATION_FROM_URL, setPaginationFromUrlSaga),
];
