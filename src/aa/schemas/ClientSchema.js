// @flow
import { schema } from 'normalizr';
import type { DenormalizedRecord } from '../types/denormalizedData';
import { CarerSchema, ClientSchema } from './UserSchema';

function idAttribute(record: DenormalizedRecord): string {
  return record.id;
}

function processStrategy(record: DenormalizedRecord): Object {
  const { 
    id: id, 
		slug: slug, 
		first_name: firstName, 
		last_name: lastName, 
		name: name, 
		client_profile: clientProfileId, 
		current_address: currentAddressId, 
		default_profile: defaultProfileId, 
    ...rest 
  } = record;

  return {
    id, 
		slug, 
		firstName, 
		lastName, 
		name, 
		clientProfileId, 
		currentAddressId, 
		defaultProfileId,
    ...rest
  };
}

const RecordSchema = new schema.Entity(
  'client',
  {
    clientProfileId: clientProfileSchema, 
		currentAddressId: currentAddressSchema, 
		defaultProfileId: defaultProfileSchema
  },
  { processStrategy, idAttribute }
);

export default RecordSchema;
