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
		name: name, 
    ...rest 
  } = record;

  return {
    id, 
		name,
    ...rest
  };
}

const RecordSchema = new schema.Entity(
  'organisation',
  {
    
  },
  { processStrategy, idAttribute }
);

export default RecordSchema;
