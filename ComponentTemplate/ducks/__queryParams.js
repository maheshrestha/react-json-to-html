// @flow
import { createSelector } from 'reselect';
import { fromJS, mergeDeep } from 'immutable';
import type { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  makeQueryParam,
  makeQueryParams
} from '../../common/definitions/QueryParams';
import type {
  QueryParam,
  QueryParamProps
} from '../../common/definitions/QueryParams';
import { InitialEntitiesStore } from './common';
import type { Action, State } from './index';
import { getQueryFromFilter } from '../ducks/filters';

import type {
  EntitiesByIdStore,
  EntityIdsStore,
  EntitiesStore
} from './common';

export type QueryParamAction =
  | {|
      type: 'entities/queryParams/ADD',
      queryParam: QueryParam
    |}
  | {|
      type: 'entities/queryParams/ADD_BULK',
      queryParams: Map<string, QueryParam>
    |};
export type QueryParamsState = EntitiesStore<QueryParam>;

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/queryParams/ADD',
  ADD_BULK: 'entities/queryParams/ADD_BULK'
};

// ACTIONS
export const addQueryParam = (payload: QueryParamProps): QueryParamAction => {
  const queryParam = makeQueryParam(fromJS(payload));

  return {
    type: types.ADD,
    queryParam
  };
};

export const addQueryParams = (payload: {
  [string]: QueryParamProps
}): QueryParamAction => {
  return {
    type: types.ADD_BULK,
    queryParams: makeQueryParams(payload)
  };
};

// SELECTORS
export const getQueryParamById = (
  state: State,
  id: string | number
): ?QueryParam => {
  return state.getIn(['queryParams', 'byId', id + '']);
};

export const getQueryParams = (state: State): OrderedSet<queryParam> => {
  return state.getIn(['queryParams', 'byId']);
};

export const getCurrentQueryParams = createSelector(
  getQueryParams,
  getQueryFromFilter,
  (queryParams, QueryParamsString): OrderedSet<string> => {
    var currentQueryParams = queryParams.filter(
      (queryParam: QueryParam): boolean => queryParam.id === QueryParamsString
    );

    return currentQueryParams
      .map((queryParam: QuryParam) => ({
        totalEntries: queryParam.totalEntries
      }))
      .toOrderedSet()
      .first();
  }
);

// REDUCERS
function allIds<T: EntityIdsStore>(
  state: T = initialState.allIds,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.add(action.queryParam.id);
    case types.ADD_BULK:
      return state.concat(action.queryParams.keys());
    default:
      return state;
  }
}

function byId<T: EntitiesByIdStore<QueryParam>>(
  state: T = initialState.byId,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.set(action.queryParam.id, action.queryParam);
    case types.ADD_BULK:
      return mergeDeep(state, action.queryParams);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
