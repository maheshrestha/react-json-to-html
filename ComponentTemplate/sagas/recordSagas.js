// @flow
import { takeEvery, put, call, select } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetch{{ componentName }}, sendRemove{{ componentName }}, sendCreate{{ componentName }} } from '../api/{{ uncapitalizedComponentName }}';
import { setLoadTimestamp, setIsLoading } from '../ducks/ui';
import { add{{ componentName }}, deleteId } from '../ducks/{{ uncapitalizedComponentName }}';
import { addUsers } from '../ducks/users';

import { addIds } from '../ducks/listing';

import { setFiltersFromUrl } from './filtersSagas';

function* initialLoad{{ componentName }}Saga(): Saga<void> {
  console.log('mahesh');
  yield put(setIsLoading(true));
  yield call(load{{ componentName }}Saga);
  yield put(setIsLoading(false));
  yield put(setLoadTimestamp(Date.now()));
  yield put(setFiltersFromUrl());
}

function* load{{ componentName }}Saga(): Saga<void> {
  const queryParams = '';
  var data: Normalized{{ componentName }}ApiCall = yield call(
    fetch{{ componentName }},
    queryParams
  );
  if (data) {
    const { result, entities } = data;
    const { {{ recordKey }} = {} } = entities;
    yield put(add{{ componentName }}({{ recordKey}}));
    //yield put(addUsers(users));
    const {
      {{ recordKey }}: { results: ids }
    } = result;
    yield put(addIds(ids));
  } else {
    throw new Error('Could not load the page.');
  }
}

function* create{{ componentName }}Saga({ id, userType }: { id: string }): Saga<*> {
  yield call(sendCreate{{ componentName }}, id, userType);
}

function* sendRemove{{ componentName }}Saga({ id, userType }: { id: string }): Saga<*> {
  yield put(setIsLoading(true));
  yield call(sendRemove{{ componentName }}, id, userType);
  yield put(deleteId(id));
  yield put(setIsLoading(false));
}


// ACTION CREATORS
const types = {
  LOAD: 'sagas/{{ uncapitalizedComponentName }}/LOAD',
  CREATE: 'sagas/{{ uncapitalizedComponentName }}/CREATE',
  SEND_REMOVE: 'saga/{{ uncapitalizedComponentName }}/SEND_REMOVE'
};

export function load{{ componentName }}(): { type: string } {
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
  takeEvery(types.LOAD, initialLoad{{ componentName }}Saga),
  takeEvery(types.CREATE, create{{ componentName }}Saga),
  takeEvery(types.SEND_REMOVE, sendRemove{{ componentName }}Saga)
];
