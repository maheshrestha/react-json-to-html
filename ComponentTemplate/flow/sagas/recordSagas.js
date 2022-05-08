// @flow
import { takeEvery, put, call, select } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetch{{ toCamelCaseAndCapitalize recordsKey }}, sendRemove{{ toCamelCaseAndCapitalize recordsKey }}, sendCreate{{ toCamelCaseAndCapitalize recordsKey }} } from '../api/{{ toCamelCaseString recordsKey }}';
import { setLoadTimestamp, setIsLoading } from '../ducks/ui';

{{#schemas}}
import { add{{ toCamelCaseAndCapitalize name }}s } from '../ducks/{{ toCamelCaseString name }}';
{{/schemas}}

import { addIds } from '../ducks/listing';

//import { setFiltersFromUrl } from './filtersSagas';

function* initialLoad{{ toCamelCaseAndCapitalize recordsKey }}Saga(): Saga<void> {
  yield put(setIsLoading(true));
  yield call(load{{ toCamelCaseAndCapitalize recordsKey }}Saga);
  yield put(setIsLoading(false));
  yield put(setLoadTimestamp(Date.now()));
  // yield put(setFiltersFromUrl());
}

function* load{{ toCamelCaseAndCapitalize recordsKey }}Saga(): Saga<void> {
  const queryParams = [].join('&');
  var data: Normalized{{ toCamelCaseAndCapitalize recordsKey }}ApiCall = yield call(
    fetch{{ toCamelCaseAndCapitalize recordsKey }},
    queryParams
  );
  if (data) {
    const { result, entities } = data;
    const { 
    {{#schemas}}
      {{ toCamelCaseString name }} = {},
    {{/schemas}}
    } = entities;
    {{#schemas}}

    yield put(add{{ toCamelCaseAndCapitalize name }}s({{ toCamelCaseString name }}));
    {{/schemas}}
    //yield put(addUsers(users));
    const {
      {{ recordsKey }}: ids 
    } = result;
    yield put(addIds(ids));
  } else {
    throw new Error('Could not load the page.');
  }
}



// ACTION CREATORS
const types = {
  LOAD: 'sagas/{{ toCamelCaseString recordsKey }}/LOAD',
};

export function load{{ toCamelCaseAndCapitalize recordsKey }}s(): { type: string } {
  return { type: types.LOAD };
}

export const watches = [
  takeEvery(types.LOAD, initialLoad{{ toCamelCaseAndCapitalize recordsKey }}Saga),
];
