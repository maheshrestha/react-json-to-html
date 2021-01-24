// @flow
import { makeFilters } from '../definitions/Filters';
import type { Filters } from '../definitions/Filters';
import type { Action, State } from './index';

export type FiltersAction = {|
  type: 'filters/SET_USER_TYPE',
  userType: string
|};

export type FiltersState = Filters;

export const initialState = makeFilters();

export const types = {
  SET_USER_TYPE: 'filters/SET_USER_TYPE'
};

// ACTIONS
export const setUserType = (userType: string): FiltersAction => {
  return {
    type: types.SET_USER_TYPE,
    userType
  };
};

export const getUserType = (state: State): string => {
  return state.getIn(['filters', 'userType']);
};

// REDUCERS
export default function reducer<T: FiltersState>(
  state: T = initialState,
  action: Action
): T {
  switch (action.type) {
    case types.SET_USER_TYPE:
      return state.set('userType', action.userType);
    default:
      return state;
  }
}
