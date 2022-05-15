// @flow
import { takeEvery, put } from "redux-saga/effects";
import { setCurrentPage, setPerPageSize } from "../ducks/pagination";
import { getSlugsFromUrl } from "../helpers/slugs";

function getStateReadyNumber(val) {
  const n = parseInt(val, 10);
  return isNaN(n) ? undefined : n;
}

function* setPaginationFromUrlSaga({ urlRegexps }) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paginationFilters = urlParams.get(urlRegexps.filterParamsKey);

  if (!paginationFilters) {
    return;
  }

  const pathName = getSlugsFromUrl(urlRegexps, paginationFilters);
  const matches = pathName.pagination.match(urlRegexps.pagination);

  if (!matches) {
    return;
  }

  const [, perPageSize, currentPage] = matches;
  yield put(setPerPageSize(getStateReadyNumber(perPageSize)));
  yield put(setCurrentPage(getStateReadyNumber(currentPage)));
}

// ACTION CREATORS
const types = {
  SET_PAGINATION_FROM_URL: "sagas/pagination/SET_PAGINATION_FROM_URL",
};
export function setPaginationFromUrl(urlRegexps) {
  return {
    type: types.SET_PAGINATION_FROM_URL,
    urlRegexps,
  };
}
export const watches = [
  takeEvery(types.SET_PAGINATION_FROM_URL, setPaginationFromUrlSaga),
];
