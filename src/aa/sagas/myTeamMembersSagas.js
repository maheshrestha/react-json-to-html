// @flow
import { takeEvery, put, call, select } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetchMyTeamMembers, sendRemoveMyTeamMembers, sendCreateMyTeamMembers } from '../api/myTeamMembers';
import { setLoadTimestamp, setIsLoading } from '../ducks/ui';
import { addMyTeamMembers, deleteId } from '../ducks/myTeamMembers';
import { addUsers } from '../ducks/users';

import { addIds } from '../ducks/listing';

import { setFiltersFromUrl } from './filtersSagas';

function* initialLoadMyTeamMembersSaga(): Saga<void> {
  console.log('mahesh');
  yield put(setIsLoading(true));
  yield call(loadMyTeamMembersSaga);
  yield put(setIsLoading(false));
  yield put(setLoadTimestamp(Date.now()));
  yield put(setFiltersFromUrl());
}

function* loadMyTeamMembersSaga(): Saga<void> {
  const queryParams = '';
  var data: NormalizedMyTeamMembersApiCall = yield call(
    fetchMyTeamMembers,
    queryParams
  );
  if (data) {
    const { result, entities } = data;
    const { my_team_members = {}, users = {} } = entities;
    yield put(addMyTeamMembers(my_team_members));
    yield put(addUsers(users));
    const {
      my_team_members: { results: ids }
    } = result;
    yield put(addIds(ids));
  } else {
    throw new Error('Could not load the page.');
  }
}

function* createMyTeamMembersSaga({ id, userType }: { id: string }): Saga<*> {
  yield call(sendCreateMyTeamMembers, id, userType);
}

function* sendRemoveMyTeamMembersSaga({ id, userType }: { id: string }): Saga<*> {
  yield put(setIsLoading(true));
  yield call(sendRemoveMyTeamMembers, id, userType);
  yield put(deleteId(id));
  yield put(setIsLoading(false));
}


// ACTION CREATORS
const types = {
  LOAD: 'sagas/myTeamMembers/LOAD',
  CREATE: 'sagas/myTeamMembers/CREATE',
  SEND_REMOVE: 'saga/myTeamMembers/SEND_REMOVE'
};

export function loadMyTeamMembers(): { type: string } {
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
  takeEvery(types.LOAD, initialLoadMyTeamMembersSaga),
  takeEvery(types.CREATE, createMyTeamMembersSaga),
  takeEvery(types.SEND_REMOVE, sendRemoveMyTeamMembersSaga)
];
