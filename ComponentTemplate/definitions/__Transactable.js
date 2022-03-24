// @flow
import { Record, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

export type TransactableProps = {
  id: string,
  slug: string,
  name: string,
  description: string,
  category: string,
  virtualLink: string
};

export const makeTransactable: RecordFactory<TransactableProps> = Record(
  {
    id: '',
    slug: '',
    name: '',
    description: '',
    category: '',
    virtualLink: ''
  },
  'Transactable'
);

export type Transactable = RecordOf<TransactableProps>;

export function makeTransactables(payload: {
  [string]: TransactableProps
}): Map<string, Transactable> {
  return Map(payload).map(
    (props: TransactableProps): Transactable => makeTransactable(props)
  );
}
