// @flow
import { makeFilters } from '../definitions/Filters';
import type { Filters } from '../definitions/Filters';
import type { Action, State } from './index';
import { createSelector } from 'reselect';
import moment from 'moment';

export type FiltersAction =
  | {| type: 'filters/SET_QUERY', query: ?string |};

export type FiltersState = Filters;

export const initialState = makeFilters();

export const types = {};

export const getUrlFromFilters = createSelector(
  (): string => {
    const parts = [];
    return parts.join('/');
  }
);

export const getQueryFromFilter = createSelector(
  (): string => {
    const parts = [];
    return parts.join('&');
  }
);

// REDUCERS
export default function reducer<T: FiltersState>(
  state: T = initialState,
  action: Action
): T {
  switch (action.type) {
    default:
      return state;
  }
}
