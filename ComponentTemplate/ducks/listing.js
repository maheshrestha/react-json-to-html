// @flow
import find from 'lodash-es/find';
/*
import { getSortProperties } from '../helpers/sorting';
import {
  ORDER_DESC,
} from '../constants';
*/
import { createSelector } from 'reselect';

import { OrderedSet } from 'immutable';
import { get{{ toCamelCaseAndCapitalize recordKey }}s } from './{{ toCamelCaseString recordKey }}';
/*
import {
  timestampToShortDate,
  timestampToTime,
  formatPrice
} from '../helpers/format';
import {
  getActiveStates,
  getMinimumAmount,
  getMaximumAmount,
  getCarerId,
  getClientId,
  getServiceToName,
  getReference,
  getStartDate,
  getStartTime,
  getEndDate,
  getSortOrder,
  getManagerId,
  getUserType
} from './filters';
import moment from 'moment';
*/
import type { Action, State } from './index';
/*
import type { Order } from '../definitions/Order';
import type { OrderState } from '../types/OrderState';
*/
export type ListingAction =
  | {| type: 'listing/ADD', id: string |}
  | {| type: 'listing/EMPTY' |}
  | {| type: 'listing/ADD_BULK', ids: Array<string> |};
export type ListingState = OrderedSet<string>;
export const initialState = OrderedSet();

export const types = {
  ADD: 'listing/ADD',
  ADD_BULK: 'listing/ADD_BULK',
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

export const empty = (): ListingAction => {
  return {
    type: types.EMPTY
  };
};

// SELECTORS
export const getIds = (state: State): OrderedSet<string> => {
  return state.get('listing');
};

export const getSortedAndFiltered{{ toCamelCaseAndCapitalize recordKey }}Ids = createSelector(
  get{{ toCamelCaseAndCapitalize recordKey }}s,
  (
    {{ toCamelCaseString recordKey }}
  ): OrderedSet<string> => {
    
    return {{ toCamelCaseString recordKey }}.map((order: Order): number => order.id).toOrderedSet();
  }
);



export default function reducer<T: ListingState>(
  state: T = initialState,
  action: Action
): T {
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
