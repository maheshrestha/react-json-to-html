// @flow
import { schema } from 'normalizr';
import type { DenormalizedRecord } from '../types/denormalizedData';
import { CarerSchema, ClientSchema } from './UserSchema';

function idAttribute(record: DenormalizedRecord): string {
  return record.id;
}

function processStrategy(record: DenormalizedRecord): Object {
  const { id: id, carer_id: carerId, dummy_name: dummyName, client: clientId, ...rest } = record;

  return {
    id, carerId, dummyName, clientId,
    ...rest
  };
}

const RecordSchema = new schema.Entity(
  'my_team_members',
  {
    clientId: clientSchema
  },
  { processStrategy, idAttribute }
);

export default RecordSchema;
