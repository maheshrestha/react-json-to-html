// @flow
import { all } from 'redux-saga/effects';
import { watches as {{ componentName }}Watches } from './{{ componentName }}Sagas';
//import { watches as filtersWatches } from './filtersSagas';
import type { Saga } from 'redux-saga';

export default function* rootSaga(): Saga<*> {
  const allWatches = [
    ...{{ componentName }}Watches
    //...filtersWatches
  ];
  yield all(allWatches);
}
