// @flow
import { fromJS, mergeDeep } from 'immutable';
import type { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { make{{ toCamelCaseAndCapitalize schemaName }}, make{{ toCamelCaseAndCapitalize schemaName }}s } from '../definitions/{{ toCamelCaseAndCapitalize schemaName }}';
import type { {{ toCamelCaseAndCapitalize schemaName }}, {{ toCamelCaseAndCapitalize schemaName }}Props } from '../definitions/{{ toCamelCaseAndCapitalize schemaName }}';
import { InitialEntitiesStore } from './common';
import type { Action, State } from './index';
import type {
  EntitiesByIdStore,
  EntityIdsStore,
  EntitiesStore
} from './common';

export type {{ toCamelCaseAndCapitalize schemaName }}Action =
  | {|
      type: 'entities/{{ toCamelCaseString schemaName }}s/ADD',
      {{ toCamelCaseString schemaName }}: {{ toCamelCaseAndCapitalize schemaName }}
    |}
  | {|
      type: 'entities/{{ toCamelCaseString schemaName }}s/ADD_BULK',
      {{ toCamelCaseString schemaName }}s: Map<string, {{ toCamelCaseAndCapitalize schemaName }}>
    |};
export type {{ toCamelCaseAndCapitalize schemaName }}sState = EntitiesStore<{{ toCamelCaseAndCapitalize schemaName }}>;

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/{{ toCamelCaseString schemaName }}s/ADD',
  ADD_BULK: 'entities/{{ toCamelCaseString schemaName }}s/ADD_BULK'
};

// ACTIONS
export const add{{ toCamelCaseAndCapitalize schemaName }} = (
  payload: {{ toCamelCaseAndCapitalize schemaName }}Props
): {{ toCamelCaseAndCapitalize schemaName }}Action => {
  const {{ toCamelCaseString schemaName }} = make{{ toCamelCaseAndCapitalize schemaName }}(fromJS(payload));

  return {
    type: types.ADD,
    {{ toCamelCaseString schemaName }}
  };
};

export const add{{ toCamelCaseAndCapitalize schemaName }}s = (payload: {
  string: {{ toCamelCaseAndCapitalize schemaName }}Props
}): {{ toCamelCaseAndCapitalize schemaName }}Action => {
  return { type: types.ADD_BULK, {{ toCamelCaseString schemaName }}s: make{{ toCamelCaseAndCapitalize schemaName }}s(payload) };
};

// SELECTORS
export const getIds = (state: State): OrderedSet<string> => {
  return state.get('{{ toCamelCaseString schemaName }}s');
};

export const get{{ toCamelCaseAndCapitalize schemaName }}ById = (
  state: State,
  id: string
): ?{{ toCamelCaseAndCapitalize schemaName }} => {
  return state.getIn(['{{ toCamelCaseString schemaName }}s', 'byId', id]);
};

export const get{{ toCamelCaseAndCapitalize schemaName }}s = (state: State): OrderedSet<Order> => {
  return state.getIn(['{{ toCamelCaseString schemaName }}s', 'byId']);
};

// REDUCERS
function allIds<T: EntityIdsStore>(
  state: T = initialState.allIds,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.add(action.{{ toCamelCaseString schemaName }}.id);
    case types.ADD_BULK:
      return state.concat(action.{{ toCamelCaseString schemaName }}s.keys());
    default:
      return state;
  }
}

function byId<T: EntitiesByIdStore<{{ toCamelCaseAndCapitalize schemaName }}>>(
  state: T = initialState.byId,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.set(action.{{ toCamelCaseString schemaName }}.id, action.{{ toCamelCaseString schemaName }});
    case types.ADD_BULK:
      return mergeDeep(state, action.{{ toCamelCaseString schemaName }}s);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
