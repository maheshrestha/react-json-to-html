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
		url: url, 
    ...rest 
  } = record;

  return {
    id, 
		url,
    ...rest
  };
}

const RecordSchema = new schema.Entity(
  'picture',
  {
    
  },
  { processStrategy, idAttribute }
);

export default RecordSchema;
