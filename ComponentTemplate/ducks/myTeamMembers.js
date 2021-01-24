// @flow
import { createSelector } from 'reselect';
import { fromJS, mergeDeep } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  makeMyTeamMember,
  makeMyTeamMembers
} from '../definitions/MyTeamMember';
import { InitialEntitiesStore } from './common';
import { OrderedSet } from 'immutable';

import type {
  MyTeamMember,
  MyTeamMemberProps
} from '../definitions/MyTeamMember';
import type { Action, State } from './index';

import { ALLOW_EDIT_RECURRING_END_DATE } from '../constants';

import type {
  EntitiesByIdStore,
  EntityIdsStore,
  EntitiesStore
} from './common';
import type { Map } from 'immutable';

export type MyTeamMemberAction =
  | {|
      type: 'entities/myTeamMembers/ADD',
      myTeamMember: myTeamMember
    |}
  | {|
      type: 'entities/myTeamMembers/ADD_BULK',
      myTeamMembers: Map<string, MyTeamMember>
    |};

export type MyTeamMembersState = EntitiesStore<MyTeamMember>;

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/myTeamMembers/ADD',
  ADD_BULK: 'entities/myTeamMembers/ADD_BULK',
  DELETE: 'entities/myTeamMembers/DELETE'
};

// ACTIONS
export const addMyTeamMember = (
  payload: MyTeamMemberProps
): MyTeamMemberAction => {
  const myTeamMember = makeMyTeamMember(fromJS(payload));

  return {
    type: types.ADD,
    myTeamMember
  };
};

export const addMyTeamMembers = (payload: {
  [string]: MyTeamMemberProps
}): MyTeamMemberAction => {
  return {
    type: types.ADD_BULK,
    myTeamMembers: makeMyTeamMembers(payload)
  };
};

export const deleteId = (id: string): ListingAction => {
  return {
    type: types.DELETE,
    id
  };
};

// SELECTORS
export const getMyTeamMemberById = (
  state: State,
  id: string
): ?MyTeamMember => {
  return state.getIn(['myTeamMembers', 'byId', id]);
};

export const getMyTeamMembers = (state: State): OrderedSet<MyTeamMember> => {
  return state.getIn(['myTeamMembers', 'byId']);
};

export const getMyTeamMemberSelectOptions = createSelector(
  getMyTeamMembers,
  (myTeamMembers: OrderedSet<User>): SelectOptions =>
    myTeamMembers
      .map((myTeamMember: User): SelectOption => ({
        value: myTeamMember.id,
        label: myTeamMember.name
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
      return state.add(action.myTeamMember.id);
    case types.ADD_BULK:
      return state.concat(action.myTeamMembers.keys());
    default:
      return state;
  }
}

function byId<T: EntitiesByIdStore<MyTeamMember>>(
  state: T = initialState.byId,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.set(action.myTeamMember.id, action.myTeamMember);
    case types.ADD_BULK:
      return mergeDeep(state, action.myTeamMembers);
    case types.DELETE:
      return state.filter(function(state) {
        return action.id !== state.id;
      });
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
