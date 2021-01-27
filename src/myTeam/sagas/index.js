// @flow
import { all } from 'redux-saga/effects';
import { watches as myTeamMembersWatches } from './myTeamMembersSagas';
//import { watches as filtersWatches } from './filtersSagas';
import type { Saga } from 'redux-saga';

export default function* rootSaga(): Saga<*> {
  const allWatches = [
    ...myTeamMembersWatches
    //...filtersWatches
  ];
  yield all(allWatches);
}
