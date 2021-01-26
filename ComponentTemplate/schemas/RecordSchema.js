// @flow
import { schema } from 'normalizr';
import type { DenormalizedRecord } from '../types/denormalizedData';
import { CarerSchema, ClientSchema } from './UserSchema';

function idAttribute(record: DenormalizedRecord): string {
  return record.id;
}

function processStrategy(record: DenormalizedRecord): Object {
  const { 
    {{ data.processStrategyObject }}, 
    ...rest 
  } = record;

  return {
    {{ data.processStrategyReturn }},
    ...rest
  };
}

const RecordSchema = new schema.Entity(
  '{{ data.recordsKey }}',
  {
    {{ data.processStrategyEntity }}
  },
  { processStrategy, idAttribute }
);

export default RecordSchema;
