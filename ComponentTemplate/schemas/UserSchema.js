// @flow
import { schema } from 'normalizr';
import { USER_TYPE_CLIENT, USER_TYPE_CARER } from '../constants';

import type { DenormalizedUser } from '../types/denormalizedData';

function addType(
  type: string,
  processStrategy: (user: DenormalizedUser) => Object
): Object {
  return function(user: DenormalizedUser): Object {
    const normalizedUser = processStrategy(user);
    return {
      ...normalizedUser,
      type
    };
  };
}

function processStrategy(user: DenormalizedUser): Object {
  const { first_name: firstName, last_name: lastName, ...rest } = user;
  console.log('user:- ', user);
  return {
    ...rest,
    firstName,
    lastName,
    profilePicture: user.default_profile.picture
      ? user.default_profile.picture.thumb
      : '',
    suburb:
      user.current_address && user.current_address.suburb
        ? user.current_address.suburb
        : '',
    postcode:
      user.current_address && user.current_address.postcode
        ? user.current_address.postcode
        : '',
    state:
      user.current_address && user.current_address.state
        ? user.current_address.state
        : '',
    address:
      user.current_address && user.current_address.address
        ? user.current_address.address
        : ''
  };
}

const UserSchema = new schema.Entity('users', {}, { processStrategy });

export const ClientSchema = new schema.Entity(
  'users',
  {},
  { processStrategy: addType(USER_TYPE_CLIENT, processStrategy) }
);

export const CarerSchema = new schema.Entity(
  'users',
  {},
  { processStrategy: addType(USER_TYPE_CARER, processStrategy) }
);

export default UserSchema;
