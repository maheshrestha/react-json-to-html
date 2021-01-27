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
		gender: gender, 
    ...rest 
  } = record;

  return {
    id, 
		gender,
    ...rest
  };
}

const RecordSchema = new schema.Entity(
  'client_profile',
  {
    
  },
  { processStrategy, idAttribute }
);

export default RecordSchema;
