// @flow
import { Map } from 'immutable';
import type { Action, State } from './index';

export type UiAction =
  | {| type: 'ui/SET_LOAD_TIMESTAMP', timestamp: number |}
  | {| type: 'ui/SET_IS_LOADING', isLoading: boolean |};

export type UiState = Map<string, mixed>;

export const initialState = Map({
  isLoading: false,
  lastLoadTimestamp: undefined
});

export const types = {
  SET_LOAD_TIMESTAMP: 'ui/SET_LOAD_TIMESTAMP',
  SET_IS_LOADING: 'ui/SET_IS_LOADING'
};

// ACTIONS
export const setLoadTimestamp = (timestamp: number): UiAction => {
  return {
    type: types.SET_LOAD_TIMESTAMP,
    timestamp
  };
};

export const setIsLoading = (isLoading: boolean): UiAction => {
  return {
    type: types.SET_IS_LOADING,
    isLoading
  };
};

// SELECTORS
export const isLoading = (state: State): boolean => {
  return state.getIn(['ui', 'isLoading']);
};

export const getLoadTimestamp = (state: State): ?number => {
  return state.getIn(['ui', 'lastLoadTimestamp']);
};

export default function reducer<T: UiState>(
  state: T = initialState,
  action: Action
): T {
  switch (action.type) {
    case types.SET_LOAD_TIMESTAMP:
      return state.set('lastLoadTimestamp', action.timestamp);
    case types.SET_IS_LOADING:
      return state.set('isLoading', action.isLoading);
    default:
      return state;
  }
}
