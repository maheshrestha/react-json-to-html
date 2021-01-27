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
		address: address, 
		suburb: suburb, 
		postcode: postcode, 
		state: state, 
    ...rest 
  } = record;

  return {
    id, 
		address, 
		suburb, 
		postcode, 
		state,
    ...rest
  };
}

const RecordSchema = new schema.Entity(
  'current_address',
  {
    
  },
  { processStrategy, idAttribute }
);

export default RecordSchema;
