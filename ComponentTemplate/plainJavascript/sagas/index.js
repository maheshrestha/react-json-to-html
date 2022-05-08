import { all } from 'redux-saga/effects';
import { watches as {{ componentName }}Watches } from './{{ componentName }}Sagas';

export default function* rootSaga() {
  const allWatches = [
    ...{{ componentName }}Watches
  ];
  yield all(allWatches);
}
