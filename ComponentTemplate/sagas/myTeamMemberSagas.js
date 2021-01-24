// @flow
import { takeEvery, put, call, select } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { fetchMyTeamMembers, sendRemoveFromMyTeam } from '../api/myTeamMembers';
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

function* addToMyTeamSaga({ id, userType }: { id: string }): Saga<*> {
  yield call(sendAddToMyTeam, id, userType);
}

function* sendRemoveFromMyTeamSaga({ id, userType }: { id: string }): Saga<*> {
  yield put(setIsLoading(true));
  yield call(sendRemoveFromMyTeam, id, userType);
  yield put(deleteId(id));
  yield put(setIsLoading(false));
}

export function removeFromMyTeam(id: string): { type: string, id: string } {
  return { type: types.SEND_REMOVE, id };
}

// ACTION CREATORS
const types = {
  LOAD: 'sagas/myTeamMembers/LOAD',
  ADD: 'sagas/myTeam/ADD',
  SEND_REMOVE: 'saga/myTeamMember/SEND_REMOVE'
};

export function loadMyTeamMembers(): { type: string } {
  return { type: types.LOAD };
}
export function addToMyTeam(
  id: string,
  userType: string
): { type: string, id: string, userType: string } {
  return { type: types.ADD, id, userType };
}

export const watches = [
  takeEvery(types.LOAD, initialLoadMyTeamMembersSaga),
  takeEvery(types.ADD, addToMyTeamSaga),
  takeEvery(types.SEND_REMOVE, sendRemoveFromMyTeamSaga)
];
