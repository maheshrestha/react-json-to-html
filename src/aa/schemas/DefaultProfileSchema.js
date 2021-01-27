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
		organisation: organisationId, 
		picture: pictureId, 
    ...rest 
  } = record;

  return {
    id, 
		organisationId, 
		pictureId,
    ...rest
  };
}

const RecordSchema = new schema.Entity(
  'default_profile',
  {
    organisationId: organisationSchema, 
		pictureId: pictureSchema
  },
  { processStrategy, idAttribute }
);

export default RecordSchema;
