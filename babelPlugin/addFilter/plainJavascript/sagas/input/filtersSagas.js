import { takeEvery, put } from "redux-saga/effects";
import moment from "moment";
import {
  URL_NULL_PLACEHOLDER,
  URL_REGEXPS,
  FILTER_PARAM_NAME,
} from "../constants";
import { getSlugsFromUrl } from "../../common/helpers/slugs";

function getStateReadyString(val) {
  return val === URL_NULL_PLACEHOLDER ? undefined : val;
}

function getStateReadyNumber(val) {
  const n = parseInt(val, 10);
  return isNaN(n) ? undefined : n;
}

function getStateReadyDate(val, format) {
  if (val === URL_NULL_PLACEHOLDER) {
    return;
  }

  const m = moment(val, format);
  return m.isValid() ? m : undefined;
}

function* setFiltersFromUrlSaga() {
  const filterQueries = window.location.search;
  const urlParams = new URLSearchParams(filterQueries);
  const myFilter = urlParams.get(FILTER_PARAM_NAME);
  if (!myFilter) {
    return;
  }
  const pathName = getSlugsFromUrl(URL_REGEXPS, myFilter);
  const matches = pathName.filter.match(URL_REGEXPS.filter);
  if (!matches) {
    return;
  }
  let [,] = matches;
}

// ACTION CREATORS
const types = {
  SET_FILTERS_FROM_URL: "sagas/filters/SET_FILTERS_FROM_URL",
};

export function setFiltersFromUrl() {
  return { type: types.SET_FILTERS_FROM_URL };
}

export const watches = [
  takeEvery(types.SET_FILTERS_FROM_URL, setFiltersFromUrlSaga),
];
