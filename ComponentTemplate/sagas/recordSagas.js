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
  const queryParams = '';
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

function* create{{ toCamelCaseAndCapitalize recordsKey }}Saga({ id, userType }: { id: string }): Saga<*> {
  yield call(sendCreate{{ toCamelCaseAndCapitalize recordsKey }}, id, userType);
}

function* sendRemove{{ toCamelCaseAndCapitalize recordsKey }}Saga({ id, userType }: { id: string }): Saga<*> {
  yield put(setIsLoading(true));
  yield call(sendRemove{{ toCamelCaseAndCapitalize recordsKey }}, id, userType);
  yield put(deleteId(id));
  yield put(setIsLoading(false));
}


// ACTION CREATORS
const types = {
  LOAD: 'sagas/{{ toCamelCaseString recordsKey }}/LOAD',
  CREATE: 'sagas/{{ toCamelCaseString recordsKey }}/CREATE',
  SEND_REMOVE: 'saga/{{ toCamelCaseString recordsKey }}/SEND_REMOVE'
};

export function load{{ toCamelCaseAndCapitalize recordsKey }}s(): { type: string } {
  return { type: types.LOAD };
}
export function addToMyTeam(
  id: string,
  userType: string
): { type: string, id: string, userType: string } {
  return { type: types.CREATE, id, userType };
}
export function removeFromMyTeam(id: string): { type: string, id: string } {
  return { type: types.SEND_REMOVE, id };
}

export const watches = [
  takeEvery(types.LOAD, initialLoad{{ toCamelCaseAndCapitalize recordsKey }}Saga),
  takeEvery(types.CREATE, create{{ toCamelCaseAndCapitalize recordsKey }}Saga),
  takeEvery(types.SEND_REMOVE, sendRemove{{ toCamelCaseAndCapitalize recordsKey }}Saga)
];
