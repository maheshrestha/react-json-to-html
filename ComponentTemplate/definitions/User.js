// @flow
import { Record, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';

export type UserProps = {
  id: string,
  slug: string,
  firstName: string,
  lastName: string,
  name: string,
  profilePicture: string,
  suburb: string,
  postcode: string,
  state: string,
  address: string,
  type: string
};

export const makeUser: RecordFactory<UserProps> = Record(
  {
    id: '',
    slug: '',
    firstName: '',
    lastName: '',
    name: '',
    profilePicture: '',
    suburb: '',
    postcode: '',
    state: '',
    address: '',
    type: ''
  },
  'User'
);

export type User = RecordOf<UserProps>;

export function makeUsers(payload: { [string]: UserProps }): Map<string, User> {
  return Map(payload).map((props: UserProps): User => makeUser(props));
}
