import { takeEvery, put, call } from 'redux-saga/effects';
import { fetch{{ capitalize componentName }} } from '../api/{{ toCamelCaseString componentName }}';
import { setLoadTimestamp, setIsLoading } from '../ducks/ui';
{{#schemas}}
import { add{{ toCamelCaseAndCapitalize name }}s } from '../ducks/{{ toCamelCaseString name }}';
{{/schemas}}


function* initialLoad{{ capitalize componentName }}Saga() {
  yield put(setIsLoading(true));
  yield call(load{{ capitalize componentName }}Saga);
  yield put(setIsLoading(false));
  yield put(setLoadTimestamp(Date.now()));
}

function* load{{ capitalize componentName }}Saga() {
  const queryParams = [].join('&');
  var data = yield call(
    fetch{{ capitalize componentName }},
    queryParams
  );
  if (data) {
    const { entities } = data;
    const { 
    {{#schemas}}
      {{ toCamelCaseString name }} = {},
    {{/schemas}}
    } = entities;
    {{#schemas}}
    yield put(add{{ toCamelCaseAndCapitalize name }}s({{ toCamelCaseString name }}));
    {{/schemas}}

  } else {
    throw new Error('Could not load the page.');
  }
}

// ACTION CREATORS
const types = {
  LOAD: 'sagas/{{ componentName }}/LOAD',
};

export function load{{ capitalize componentName }}s() {
  return { type: types.LOAD };
}

export const watches = [
  takeEvery(types.LOAD, initialLoad{{ capitalize componentName }}Saga),
];
