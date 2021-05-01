// @flow
import { createSelector } from 'reselect';
import { fromJS, mergeDeep } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { makeOrder, makeOrders } from '../definitions/Order';
import { InitialEntitiesStore } from './common';
import { getPeriodById } from './periods';
import { getPaymentById } from './payments';
import { getCurrentUser } from './managers';
import { OrderedSet } from 'immutable';
import moment from 'moment';

import type { Order, OrderProps } from '../definitions/Order';
import type { OrderForCalendarView } from '../definitions/OrderForCalendarView';
import type { Period } from '../definitions/Period';
import type { Action, State } from './index';

import { ALLOW_EDIT_RECURRING_END_DATE } from '../constants';

import type {
  EntitiesByIdStore,
  EntityIdsStore,
  EntitiesStore
} from './common';
import type { Map } from 'immutable';

export type OrderAction =
  | {|
      type: 'entities/orders/ADD',
      order: Order
    |}
  | {|
      type: 'entities/orders/ADD_BULK',
      orders: Map<string, Order>
    |};

export type OrdersState = EntitiesStore<Order>;

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/orders/ADD',
  ADD_BULK: 'entities/orders/ADD_BULK'
};

// ACTIONS
export const addOrder = (payload: OrderProps): OrderAction => {
  const order = makeOrder(fromJS(payload));

  return {
    type: types.ADD,
    order
  };
};

export const addOrders = (payload: { [string]: OrderProps }): OrderAction => {
  return {
    type: types.ADD_BULK,
    orders: makeOrders(payload)
  };
};

// SELECTORS
export const getOrderById = (state: State, id: string): ?Order => {
  return state.getIn(['orders', 'byId', id]);
};

export const getOrders = (state: State): OrderedSet<Order> => {
  return state.getIn(['orders', 'byId']);
};

export const getMaximumTotal = createSelector(getOrders, function(
  orders: OrderedSet<Order>
): number {
  if (orders.length === 0) {
    return 0;
  }

  return orders.reduce((max, order): number => Math.max(max, order.total), 0);
});

export const getMinimumTotal = createSelector(getOrders, function(
  orders: OrderedSet<Order>
): number {
  if (orders.length === 0) {
    return 0;
  }

  return orders.reduce(
    (min, order): number => Math.min(min, order.total),
    Infinity
  );
});

export const getOrderPeriods = (
  state: State,
  id: string
): OrderedSet<Period> => {
  const order = getOrderById(state, id);
  if (!order) {
    throw new Error(`Unable to find order id: ${id}`);
  }

  return OrderedSet(
    order.periodIds.map((id: string): Period => getPeriodById(state, id))
  );
};

export const makeGetSortedPeriodIdsForOrder = (): ((
  state: State,
  id: string
) => OrderedSet<string>) => {
  return createSelector(getOrderPeriods, function<T: OrderedSet<Period>>(
    periods: T
  ): T {
    return periods
      .sortBy((period: Period): number => period.startDate)
      .map((period: Period): number => period.id)
      .toOrderedSet();
  });
};

export const getServiceToWithoutNullValue = createSelector(
  getOrders,
  (orders: OrderedSet<Order>): OrderedSet<Order> =>
    orders.filter((order: Order): boolean => order.clientName != null)
);

export const getServiceToSelectOptions = createSelector(
  getServiceToWithoutNullValue,
  (orders: OrderedSet<Order>): SelectOptions =>
    orders
      .map((order: Order): SelectOption => ({
        value: order.clientName,
        label: order.clientName
      }))
      .toOrderedSet()
);

export const getReferenceWithoutNullValue = createSelector(
  getOrders,
  (orders: OrderedSet<Order>): OrderedSet<Order> =>
    orders.filter((order: Order): boolean => order.reference != null)
);

export const getReferenceSelectOptions = createSelector(
  getReferenceWithoutNullValue,
  (orders: OrderedSet<Order>): SelectOptions =>
    orders
      .map((order: Order): SelectOption => ({
        value: order.reference,
        label: order.reference
      }))
      .toOrderedSet()
);

// carer actions
export const hasCarerCancelAction = (order: Order): boolean =>
  order.state !== 'unconfirmed' &&
  !order.archivedAt &&
  order.isCancellable &&
  !order.recurringFrequency;

export const hasCarerReviewTaxStatementAction = (order: Order): boolean => {
  return (
    !!order.billId &&
    order.state === 'confirmed' &&
    !!order.archivedAt &&
    order.total > 0 &&
    !order.recurringFrequency
  );
};

export const hasCarerCompleteAction = (order: Order): boolean => {
  const baseTest =
    order.state !== 'unconfirmed' &&
    !order.archivedAt &&
    order.total === 0 &&
    order.bookableType !== 'event' &&
    !order.recurringFrequency;

  const ifProductionCheck = order.endsAt.isBefore(moment());

  const ifStagingCheck =
    !!document.documentElement &&
    (document.documentElement.classList.contains('env-staging') ||
      document.documentElement.classList.contains('env-development'));
  return baseTest && (ifProductionCheck || ifStagingCheck);
};

export const hasCarerRejectAction = (order: Order): boolean =>
  order.state === 'unconfirmed' && !order.archivedAt && !order.parentId;

export const hasCarerConfirmAction = (order: Order): boolean =>
  order.state === 'unconfirmed' && !order.archivedAt && !order.parentId;

export const hasCarerAddExpensesAction = (order: Order): boolean =>
  order.state !== 'unconfirmed' &&
  !order.archivedAt &&
  order.total > 0 &&
  order.bookableType !== 'event' &&
  !order.recurringFrequency;

// client actions
export const hasClientUpdateCreditCardAction = (
  state: State,
  paymentId: ?string,
  order: Order
): boolean => {
  if (order.paymentType !== 'credit_card') {
    return false;
  } else {
    const payment = getPaymentById(state, paymentId);
    if (payment) {
      return !payment.paidAt;
    } else {
      return true;
    }
  }
  //const payment = getPaymentById(state, paymentId);
  //return !!payment && !payment.paidAt && state === 'confirmed';
};

export const hasClientReviewQuoteAction = (order: Order): boolean =>
  order.state === 'confirmed' &&
  order.total > 0 &&
  !order.invoiceId &&
  !order.recurringFrequency;

export const hasClientAddReviewAction = (order: Order): boolean =>
  order.state === 'confirmed' && !!order.archivedAt;

export const hasClientReviewInvoiceAction = (order: Order): boolean => {
  return (
    !!order.invoiceId &&
    order.state === 'confirmed' &&
    order.total > 0 &&
    !!order.archivedAt
  );
};

export const hasClientCancelAction = (order: Order): boolean =>
  !order.archivedAt && order.isCancellable;

export const hasClientEndRecurringAction = (order: Order): boolean => {
  ALLOW_EDIT_RECURRING_END_DATE &&
    order.state === 'confirmed' &&
    !order.archivedAt;
};
export const isRecurringBooking = (order: Order): boolean =>
  order.recurringFrequency;

export const hasViewClientProfileAction = (order: Order): boolean =>
  !order.archivedAt;

export const currentUserCanTakeAction = (
  order: Order,
  state: State
): boolean => {
  var currentUser = getCurrentUser(state);
  return order.clientId === currentUser.id;
};

// REDUCERS
function allIds<T: EntityIdsStore>(
  state: T = initialState.allIds,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.add(action.order.id);
    case types.ADD_BULK:
      return state.concat(action.orders.keys());
    default:
      return state;
  }
}

function byId<T: EntitiesByIdStore<Order>>(
  state: T = initialState.byId,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.set(action.order.id, action.order);
    case types.ADD_BULK:
      return mergeDeep(state, action.orders);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
