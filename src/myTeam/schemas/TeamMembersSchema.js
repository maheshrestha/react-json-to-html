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
		phone: phone, 
		photo: photoId, 
    ...rest 
  } = record;

  return {
    id, 
		name, 
		phone, 
		photoId,
    ...rest
  };
}

const RecordSchema = new schema.Entity(
  'team_members',
  {
    photoId: photoSchema
  },
  { processStrategy, idAttribute }
);

export default RecordSchema;
