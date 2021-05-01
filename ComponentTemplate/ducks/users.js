// @flow
import { USER_TYPE_CLIENT, USER_TYPE_CARER } from '../constants';
import { createSelector } from 'reselect';
import { fromJS, mergeDeep } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { makeUser, makeUsers } from '../definitions/User';
import type { User, UserProps } from '../definitions/User';
import type { SelectOption, SelectOptions } from '../types/SelectOptions';
import { InitialEntitiesStore } from './common';
import type { Action, State } from './index';
import type {
  EntitiesByIdStore,
  EntityIdsStore,
  EntitiesStore
} from './common';
import type { OrderedSet, Map } from 'immutable';

export type UserAction =
  | {|
      type: 'entities/users/ADD',
      user: User
    |}
  | {|
      type: 'entities/users/ADD_BULK',
      users: Map<string, User>
    |};
export type UsersState = EntitiesStore<User>;

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/users/ADD',
  ADD_BULK: 'entities/users/ADD_BULK'
};

// ACTIONS
export const addUser = (payload: UserProps): UserAction => {
  const user = makeUser(fromJS(payload));

  return {
    type: types.ADD,
    user
  };
};

export const addUsers = (payload: { [string]: UserProps }): UserAction => {
  return {
    type: types.ADD_BULK,
    users: makeUsers(payload)
  };
};

// SELECTORS
export const getUserById = (state: State, id: string): ?User => {
  return state.getIn(['users', 'byId', id]);
};

export const getUsers = (state: State): OrderedSet<User> => {
  return state.getIn(['users', 'byId']);
};

export const getCarers = createSelector(
  getUsers,
  (users: OrderedSet<User>): OrderedSet<User> =>
    users.filter((user: User): boolean => user.type === USER_TYPE_CARER)
);

export const getClients = createSelector(
  getUsers,
  (users: OrderedSet<User>): OrderedSet<User> =>
    users.filter((user: User): boolean => user.type === USER_TYPE_CLIENT)
);

export const getCarerSelectOptions = createSelector(
  getCarers,
  (users: OrderedSet<User>): SelectOptions =>
    users
      .map((user: User): SelectOption => ({
        value: user.id,
        label: user.name
      }))
      .toOrderedSet()
);

export const getClientSelectOptions = createSelector(
  getClients,
  (users: OrderedSet<User>): SelectOptions =>
    users
      .map((user: User): SelectOption => ({
        value: user.id,
        label: user.name
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
      return state.add(action.user.id);
    case types.ADD_BULK:
      return state.concat(action.users.keys());
    default:
      return state;
  }
}

function byId<T: EntitiesByIdStore<User>>(
  state: T = initialState.byId,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.set(action.user.id, action.user);
    case types.ADD_BULK:
      return mergeDeep(state, action.users);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
