// @flow
import { fromJS, mergeDeep } from 'immutable';
import type { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { makeLineItem, makeLineItems } from '../definitions/LineItem';
import type { LineItem, LineItemProps } from '../definitions/LineItem';
import { InitialEntitiesStore } from './common';
import type { Action, State } from './index';
import type {
  EntitiesByIdStore,
  EntityIdsStore,
  EntitiesStore
} from './common';

export type LineItemAction =
  | {|
      type: 'entities/lineItems/ADD',
      lineItem: LineItem
    |}
  | {|
      type: 'entities/lineItems/ADD_BULK',
      lineItems: Map<string, LineItem>
    |};
export type LineItemsState = EntitiesStore<LineItem>;

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/lineItems/ADD',
  ADD_BULK: 'entities/lineItems/ADD_BULK'
};

// ACTIONS
export const addLineItem = (payload: LineItemProps): LineItemAction => {
  const lineItem = makeLineItem(fromJS(payload));

  return {
    type: types.ADD,
    lineItem
  };
};

export const addLineItems = (payload: {
  [string]: LineItemProps
}): LineItemAction => {
  return {
    type: types.ADD_BULK,
    lineItems: makeLineItems(payload)
  };
};

// SELECTORS
export const getLineItemById = (state: State, id: string): ?LineItem => {
  return state.getIn(['lineItems', 'byId', `${id}`]);
};

// REDUCERS
function allIds<T: EntityIdsStore>(
  state: T = initialState.allIds,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.add(action.lineItem.id);
    case types.ADD_BULK:
      return state.concat(action.lineItems.keys());
    default:
      return state;
  }
}

function byId<T: EntitiesByIdStore<LineItem>>(
  state: T = initialState.byId,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.set(action.lineItem.id, action.lineItem);
    case types.ADD_BULK:
      return mergeDeep(state, action.lineItems);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
