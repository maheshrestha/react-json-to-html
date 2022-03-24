// @flow
import { Record, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

export type UserProps = {
  id: string,
  slug: string,
  firstName: string,
  lastName: string,
  name: string,
  type: string
};

export const makeUser: RecordFactory<UserProps> = Record(
  {
    id: '',
    slug: '',
    firstName: '',
    lastName: '',
    name: '',
    type: ''
  },
  'User'
);

export type User = RecordOf<UserProps>;

export function makeUsers(payload: { [string]: UserProps }): Map<string, User> {
  return Map(payload).map((props: UserProps): User => makeUser(props));
}
