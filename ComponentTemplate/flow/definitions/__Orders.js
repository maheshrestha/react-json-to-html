// @flow
import { PRICE_UNIT_HOUR } from '../constants';
import { Record, OrderedSet, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';
import type Moment from 'moment';

export type OrderProps = {
  id: string,
  state: string,
  stateLabel: string,
  totalPayableToReceiverCents: number,
  totalAdditionalTaxPriceCents: number,
  totalServiceFeeReceiverCents: number,
  totalChargeableFromPayerCents: number,
  total: number,
  sortableName: string,
  carerName: string,
  currency: string,
  clientAddress: string,
  serviceRequest: string,
  reference: string,
  clientName: string,
  archivedAt: ?Moment,
  timeZone: string,
  createdAt: ?Moment,
  endsAt: ?Moment,
  startsAt: ?Moment,
  transactableId: string,
  transactableLineItemIds: OrderedSet<string>,
  additionalLineItemIds: OrderedSet<string>,
  clientId: string,
  carerId: string,
  periodIds: OrderedSet<string>,
  serviceDate: moment,
  startTime: moment,
  endTime: moment,
  paymentId: string,
  paymentType: string,
  isCancellable: boolean,
  priceUnitOfMeasure: string,
  unitTypeServiceEndTime: string,
  quantity: number,
  bookableType: string,
  sortableFullName: string,
  sortableTransactableName: string,
  recurringFrequency: string,
  invoiceId: string,
  billId: string,
  recurringEndDate: Moment,
  numberOfReoccurance: string,
  parentId: string,
  participantId: string,
  currentTimestamp: number
};

export const makeOrder: RecordFactory<OrderProps> = Record(
  {
    id: '',
    state: '',
    stateLabel: '',
    totalPayableToReceiverCents: 0,
    totalAdditionalTaxPriceCents: 0,
    totalServiceFeeReceiverCents: 0,
    totalChargeableFromPayerCents: 0,
    total: 0,
    sortableName: '',
    currency: '',
    clientAddress: '',
    serviceRequest: 'N/A',
    reference: 'N/A',
    clientName: '',
    archivedAt: undefined,
    timeZone: '',
    createdAt: undefined,
    endsAt: undefined,
    startsAt: undefined,
    transactableId: '',
    transactableLineItemIds: OrderedSet(),
    additionalLineItemIds: OrderedSet(),
    clientId: '',
    carerId: '',
    periodIds: OrderedSet(),
    serviceDate: undefined,
    startTime: undefined,
    endTime: undefined,
    paymentId: '',
    paymentType: '',
    isCancellable: false,
    quantity: 0,
    priceUnitOfMeasure: PRICE_UNIT_HOUR,
    unitTypeServiceEndTime: '',
    bookableType: 'service',
    sortableFullName: '',
    sortableTransactableName: '',
    recurringFrequency: '',
    invoiceId: undefined,
    billId: undefined,
    numberOfReoccurance: '1',
    recurringEndDate: '',
    parentId: '',
    participantId: '',
    currentTimestamp: 0
  },
  'LineItem'
);

export type Order = RecordOf<OrderProps>;

export function makeOrders(payload: {
  [string]: OrderProps
}): Map<string, Order> {
  return Map(payload).map((props: OrderProps): Order => makeOrder(props));
}
