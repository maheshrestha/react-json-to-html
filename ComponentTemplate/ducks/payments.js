// @flow
import { fromJS, mergeDeep } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { makePayment, makePayments } from '../definitions/Payment';
import type { Payment, PaymentProps } from '../definitions/Payment';
import { InitialEntitiesStore } from './common';
import type { Action, State } from './index';
import type {
  EntitiesByIdStore,
  EntityIdsStore,
  EntitiesStore
} from './common';
import type { Map } from 'immutable';

export type PaymentAction =
  | {|
      type: 'entities/payments/ADD',
      payment: Payment
    |}
  | {|
      type: 'entities/payments/ADD_BULK',
      payments: Map<string, Payment>
    |};
export type PaymentsState = EntitiesStore<Payment>;

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/payments/ADD',
  ADD_BULK: 'entities/payments/ADD_BULK'
};

// ACTIONS
export function addPayment(payload: PaymentProps): PaymentAction {
  const payment = makePayment(fromJS(payload));

  return {
    type: types.ADD,
    payment
  };
}

export function addPayments(payload: {
  [string]: PaymentProps
}): PaymentAction {
  return {
    type: types.ADD_BULK,
    payments: makePayments(payload)
  };
}

// SELECTORS
export const getPaymentById = (state: State, id: string): ?Payment => {
  return state.getIn(['payments', 'byId', id]);
};

// REDUCERS
function allIds<T: EntityIdsStore>(
  state: T = initialState.allIds,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.add(action.payment.id);

    case types.ADD_BULK:
      return state.concat(action.payments.keys());

    default:
      return state;
  }
}

function byId<T: EntitiesByIdStore<Payment>>(
  state: T = initialState.byId,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.set(action.payment.id, action.payment);
    case types.ADD_BULK:
      return mergeDeep(state, action.payments);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
