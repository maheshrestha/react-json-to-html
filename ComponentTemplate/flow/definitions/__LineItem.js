// @flow
import { Record, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

export type LineItemProps = {
  id: string,
  name: string,
  totalNetPriceCents: number,
  description: string
};

export const makeLineItem: RecordFactory<LineItemProps> = Record(
  {
    id: '',
    name: '',
    totalNetPriceCents: 0,
    description: ''
  },
  'LineItem'
);

export type LineItem = RecordOf<LineItemProps>;

export function makeLineItems(payload: {
  [string]: LineItemProps
}): Map<string, LineItem> {
  return Map(payload).map((props: LineItemProps): LineItem =>
    makeLineItem(props)
  );
}
