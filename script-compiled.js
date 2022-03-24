import { Record } from 'immutable';

import { combineReducers } from 'redux-immutable';
import resultss, { initialState as resultssInitialState } from './results';
import bookingss, { initialState as bookingssInitialState } from './bookings';
import listing, { initialState as listingInitialState } from './listing';
import ui, { initialState as uiInitialState } from './ui';

/*
import lineItems, { initialState as lineItemsInitialState } from './lineItems';
import orders, { initialState as ordersInitialState } from './orders';
import payments, { initialState as paymentsInitialState } from './payments';
import periods, { initialState as periodsInitialState } from './periods';
import transactables, { initialState as transactablesInitialState } from './transactables';
import users, { initialState as usersInitialState } from './users';
import managers from './managers';
import listing, { initialState as listingInitialState } from './listing';
import queryParams, { initialState as queryParamsInitialState } from './queryParams';
import ui, { initialState as uiInitialState } from './ui';
import filters, { initialState as filtersInitialState } from './filters';
import pagination, {
  initialState as paginationInitialState
} from './pagination';
import calendar, { initialState as calendarInitialState } from './calendar';
*/

/*
import type { LineItemAction, LineItemsState } from './lineItems';
import type { OrderAction, OrdersState } from './orders';
import type { PaymentAction, PaymentsState } from './payments';
import type { PeriodAction, PeriodsState } from './periods';
import type { TransactableAction, TransactablesState } from './transactables';
import type { UserAction, UsersState } from './users';
import type { ManagersState } from './managers';
import type { UiAction, UiState } from './ui';
import type { FiltersAction, FiltersState } from './filters';
import type { PaginationAction, PaginationState } from './pagination';
import type { CalendarAction, CalendarState } from './calendar';
import type { QueryParamAction, QueryParamsState } from './queryParams';
*/

/*
| LineItemAction
| OrderAction
| PaymentAction
| PeriodAction
| TransactableAction
| UserAction
| ListingAction
| UiAction
| FiltersAction
| PaginationAction
| CalendarAction
| QueryParamAction;
*/

const InitialState = Record({
  resultss: resultssInitialState,
  bookingss: bookingssInitialState,
  listing: listingInitialState,
  ui: uiInitialState

  /*
  lineItems: lineItemsInitialState,
  orders: ordersInitialState,
  payments: paymentsInitialState,
  periods: periodsInitialState,
  transactables: transactablesInitialState,
  users: usersInitialState,
  listing: listingInitialState,
  ui: uiInitialState,
  filters: filtersInitialState,
  pagination: paginationInitialState,
  calendar: calendarInitialState,
  managers: usersInitialState,
  queryParams: undefined
  */
  , filters: filtersInitialState
});

export const initialState = new InitialState();

export default combineReducers({
  resultss,
  bookingss,
  listing,
  ui
  /*
  lineItems,
  orders,
  payments,
  periods,
  transactables,
  users,
  listing,
  ui,
  filters,
  pagination,
  calendar,
  managers,
  queryParams
  */
  , filters: filters
});
import { FiltersAction, FiltersState } from './filters';
import filters, { initialState as filtersInitialState } from './filters';
