// @flow
import { takeEvery, put, select } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import { getUserType } from '../ducks/filters';

import {
  URL_NULL_PLACEHOLDER,
  URL_PREFIX,
  USER_TYPE_CLIENT,
  USER_TYPE_CARER
} from '../constants';
const URL_REGEXP = /^([\w|]+)\/([\d-]+)\/([\d-]+)\/([\d-]+)\/(\d{8}|-)\/(\d{8}|-)\/(\d{4}|-)\/(\w+|-)\/(\w+)/;

function getStateReadyString(val: string): ?string {
  return val === URL_NULL_PLACEHOLDER ? undefined : val;
}

function* setFiltersFromUrlSaga(): Saga<void> {
  const url = window.location.pathname;
  const params = unescape(url.replace(URL_PREFIX, ''));

  const matches = params.match(URL_REGEXP);

  if (!matches) {
    return;
  }

  let [, userId] = matches;

  const userType = yield select(getUserType);

  if (userType === USER_TYPE_CLIENT) {
    yield put(setCarerId(getStateReadyString(userId)));
  } else if (userType === USER_TYPE_CARER) {
    yield put(setClientId(getStateReadyString(userId)));
  }
}

// ACTION CREATORS
const types = {
  SET_FILTERS_FROM_URL: 'sagas/filters/SET_FILTERS_FROM_URL'
};

export function setFiltersFromUrl(): { type: string } {
  return { type: types.SET_FILTERS_FROM_URL };
}

export const watches = [
  takeEvery(types.SET_FILTERS_FROM_URL, setFiltersFromUrlSaga)
];
