import { fromJS, mergeDeep } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { make{{ toCamelCaseAndCapitalize schemaName }}, make{{ toCamelCaseAndCapitalize schemaName }}s } from '../definitions/{{ toCamelCaseAndCapitalize schemaName }}';
import { InitialEntitiesStore } from './common';

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/{{ toCamelCaseString schemaName }}s/ADD',
  ADD_BULK: 'entities/{{ toCamelCaseString schemaName }}s/ADD_BULK'
};

// ACTIONS
export const add{{ toCamelCaseAndCapitalize schemaName }} = ( payload ) => {
  const {{ toCamelCaseString schemaName }} = make{{ toCamelCaseAndCapitalize schemaName }}(fromJS(payload));

  return {
    type: types.ADD,
    {{ toCamelCaseString schemaName }}
  };
};

export const add{{ toCamelCaseAndCapitalize schemaName }}s = (payload) => {
  return { type: types.ADD_BULK, {{ toCamelCaseString schemaName }}s: make{{ toCamelCaseAndCapitalize schemaName }}s(payload) };
};

// SELECTORS
export const getIds = (state) => {
  return state.get('{{ toCamelCaseString schemaName }}s');
};

export const get{{ toCamelCaseAndCapitalize schemaName }}ById = (state, id) => {
  return state.getIn(['{{ toCamelCaseString schemaName }}s', 'byId', id]);
};

export const get{{ toCamelCaseAndCapitalize schemaName }}s = (state) => {
  return state.getIn(['{{ toCamelCaseString schemaName }}s', 'byId']);
};

export const getListReady{{ toCamelCaseAndCapitalize schemaName }}Ids = (state) => {
  const {{ toCamelCaseAndCapitalize schemaName }}s = get{{ toCamelCaseAndCapitalize schemaName }}s(state);
  // perform filter and sorting if necessary
  return {{ toCamelCaseAndCapitalize schemaName }}s.map(({{ toCamelCaseAndCapitalize schemaName }}) => {{ toCamelCaseAndCapitalize schemaName }}.id).toOrderedSet();
};

// REDUCERS
function allIds(
  state = initialState.allIds,
  action
) {
  switch (action.type) {
    case types.ADD:
      return state.add(action.{{ toCamelCaseString schemaName }}.id);
    case types.ADD_BULK:
      return state.concat(action.{{ toCamelCaseString schemaName }}s.keys());
    default:
      return state;
  }
}

function byId(
  state = initialState.byId,
  action
) {
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
