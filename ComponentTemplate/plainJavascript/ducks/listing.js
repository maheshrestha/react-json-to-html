import find from 'lodash-es/find';
import { createSelector } from 'reselect';

import { OrderedSet } from 'immutable';
{{#schemas}}
  import { get{{ toCamelCaseAndCapitalize name }}s } from './{{ toCamelCaseString name }}';
{{/schemas}}
export const initialState = OrderedSet();

export const types = {
  ADD: 'listing/ADD',
  ADD_BULK: 'listing/ADD_BULK',
  EMPTY: 'listing/EMPTY'
};

// ACTIONS
export const addId = (id) => {
  return {
    type: types.ADD,
    id
  };
};

export const addIds = (ids) => {
  return {
    type: types.ADD_BULK,
    ids
  };
};

export const empty = () => {
  return {
    type: types.EMPTY
  };
};

// SELECTORS
export const getIds = (state) => {
  return state.get('listing');
};

{{#schemas}}
export const getSortedAndFiltered{{ toCamelCaseAndCapitalize name }}Ids = createSelector(
  get{{ toCamelCaseAndCapitalize name}}s,
  (
    {{ toCamelCaseString name }}
  ) => {
    
    return {{ toCamelCaseString name }}.map((o) => o.id).toOrderedSet();
  }
);
{{/schemas}}

export default function reducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case types.ADD:
      return state.add(action.id);
    case types.ADD_BULK:
      return state.concat(action.ids);
    case types.EMPTY:
      return initialState;
    default:
      return state;
  }
}
