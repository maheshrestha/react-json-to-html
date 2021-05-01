// @flow
import { Record, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';
import type Moment from 'moment';

export type PaymentProps = {
  id: string,
  paidAt: ?Moment,
  failedAt: ?Moment
};

export const makePayment: RecordFactory<PaymentProps> = Record(
  {
    id: '',
    paidAt: undefined,
    failedAt: undefined
  },
  'Payment'
);

export type Payment = RecordOf<PaymentProps>;

export function makePayments(payload: {
  [string]: PaymentProps
}): Map<string, Payment> {
  return Map(payload).map((props: PaymentProps): Payment => makePayment(props));
}
