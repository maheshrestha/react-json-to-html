// @flow
import { all } from 'redux-saga/effects';
import { watches as myTeamWatches } from './myTeamMemberSagas';
//import { watches as filtersWatches } from './filtersSagas';
import type { Saga } from 'redux-saga';

export default function* rootSaga(): Saga<*> {
  const allWatches = [
    ...myTeamWatches
    //...filtersWatches
  ];
  yield all(allWatches);
}
