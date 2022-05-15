// @flow
import { takeEvery, put } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import moment from "moment";
import { URL_NULL_PLACEHOLDER, URL_REGEXPS } from "../constants";
import { getSlugsFromUrl } from "../../common/helpers/slugs";

function getStateReadyString(val: string): ?string {
  return val === URL_NULL_PLACEHOLDER ? undefined : val;
}

function getStateReadyNumber(val: string): ?number {
  const n = parseInt(val, 10);
  return isNaN(n) ? undefined : n;
}

function getStateReadyDate(val: string, format: string = "YYYYMMDD"): ?Moment {
  if (val === URL_NULL_PLACEHOLDER) {
    return;
  }

  const m = moment(val, format);
  return m.isValid() ? m : undefined;
}

function* setFiltersFromUrlSaga(): Saga<void> {
  const filterQueries = window.location.search;
  const urlParams = new URLSearchParams(filterQueries);
  const myFilter = urlParams.get(URL_REGEXPS.filterParamsKey);
  if (!myFilter) {
    return;
  }
  const pathName = getSlugsFromUrl(URL_REGEXPS, myFilter);
  const filterRegExp = new RegExp(["^", URL_REGEXPS.filter].join(""));
  const matches = pathName.filter.match(filterRegExp);
  if (!matches) {
    return;
  }
  let [,] = matches;
}

// ACTION CREATORS
const types = {
  SET_FILTERS_FROM_URL: "sagas/filters/SET_FILTERS_FROM_URL",
};

export function setFiltersFromUrl(): { type: string } {
  return { type: types.SET_FILTERS_FROM_URL };
}

export const watches = [
  takeEvery(types.SET_FILTERS_FROM_URL, setFiltersFromUrlSaga),
];
