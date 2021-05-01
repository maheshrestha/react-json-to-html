// @flow
import { USER_TYPE_CLIENT, USER_TYPE_CARER } from '../constants';
import { createSelector } from 'reselect';
import { fromJS, mergeDeep } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { makeManager, makeManagers } from '../definitions/Manager';
import type { Manager, ManagerProps } from '../definitions/Manager';
import type { SelectOption, SelectOptions } from '../types/SelectOptions';
import { InitialEntitiesStore } from './common';
import type { Action, State } from './index';
import type {
  EntitiesByIdStore,
  EntityIdsStore,
  EntitiesStore
} from './common';
import type { OrderedSet, Map } from 'immutable';

export type ManagerAction =
  | {|
      type: 'entities/managers/ADD',
      manager: Manager
    |}
  | {|
      type: 'entities/managers/ADD_BULK',
      managers: Map<string, Manager>
    |};
export type ManagersState = EntitiesStore<Manager>;

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/managers/ADD',
  ADD_BULK: 'entities/managers/ADD_BULK'
};

// ACTIONS
export const addManager = (payload: ManagerProps): ManagerAction => {
  const manager = makeManager(fromJS(payload));

  return {
    type: types.ADD,
    manager
  };
};

export const addManagers = (payload: {
  [string]: ManagerProps
}): ManagerAction => {
  return {
    type: types.ADD_BULK,
    managers: makeManagers(payload)
  };
};

// SELECTORS
export const getManagerById = (state: State, id: string): ?Manager => {
  return state.getIn(['managers', 'byId', id]);
};

export const getManagers = (state: State): OrderedSet<Manager> => {
  return state.getIn(['managers', 'byId']);
};

export const getCurrentUser = createSelector(
  getManagers,
  (managers: OrderedSet<Manager>): OrderedSet<Manager> => {
    return managers
      .filter((manager: Manager): boolean => manager.isCurrentUser === true)
      .toOrderedSet()
      .first();
  }
);

export const getManagerSelectOptions = createSelector(
  getManagers,
  (managers: OrderedSet<Manager>): SelectOptions =>
    managers
      .map((manager: Manager): SelectOption => ({
        value: manager.id + '',
        label: manager.isCurrentUser ? manager.name + ' (me)' : manager.name
      }))
      .toOrderedSet()
);
// REDUCERS
function allIds<T: EntityIdsStore>(
  state: T = initialState.allIds,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.add(action.manager.id);
    case types.ADD_BULK:
      return state.concat(action.managers.keys());
    default:
      return state;
  }
}

function byId<T: EntitiesByIdStore<Manager>>(
  state: T = initialState.byId,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.set(action.manager.id, action.manager);
    case types.ADD_BULK:
      return mergeDeep(state, action.managers);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
