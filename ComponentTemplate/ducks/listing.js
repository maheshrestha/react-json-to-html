// @flow
import { createSelector } from 'reselect';
import { OrderedSet } from 'immutable';
import { getMyTeamMembers } from './myTeamMembers';

import type { Action, State } from './index';
import type { MyTeamMember } from '../definitions/MyTeamMember';

export type ListingAction =
  | {| type: 'listing/ADD', id: string |}
  | {| type: 'listing/EMPTY' |}
  | {| type: 'listing/ADD_BULK', ids: Array<string> |};
export type ListingState = OrderedSet<string>;
export const initialState = OrderedSet();

export const types = {
  ADD: 'listing/ADD',
  ADD_BULK: 'listing/ADD_BULK',
  DELETE: 'listing/DELETE',
  EMPTY: 'listing/EMPTY'
};

// ACTIONS
export const addId = (id: string): ListingAction => {
  return {
    type: types.ADD,
    id
  };
};

export const addIds = (ids: Array<string>): ListingAction => {
  return {
    type: types.ADD_BULK,
    ids
  };
};

export const deleteId = (id: string): ListingAction => {
  return {
    type: types.DELETE,
    id
  };
};

export const empty = (): ListingAction => {
  return {
    type: types.EMPTY
  };
};

// SELECTORS
export const getIds = (state: State): OrderedSet<string> => {
  return state.get('listing');
};

export const getMyTeamMemberIds = createSelector(
  getMyTeamMembers,
  (myTeamMembers): OrderedSet<string> => {
    console.log('-----: ', myTeamMembers);

    return myTeamMembers
      .map((myTeamMember: MyTeamMember): number => myTeamMember.id)
      .toOrderedSet();
  }
);

export default function reducer<T: ListingState>(
  state: T = initialState,
  action: Action
): T {
  console.log('state: ', state);
  switch (action.type) {
    case types.ADD:
      return state.add(action.id);
    case types.ADD_BULK:
      return state.concat(action.ids);
    case type.DELETE:
      return state.filter(function(id) {
        console.log('id:', id);
        console.log('action.id:', action.id);
        return action.id !== id;
      });
    case types.EMPTY:
      return initialState;
    default:
      return state;
  }
}
