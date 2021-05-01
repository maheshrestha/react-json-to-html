// @flow
import { schema } from 'normalizr';
import type { Denormalized{{ toCamelCaseAndCapitalize data.recordsKey}} } from '../types/denormalizedData';
{{# each data.entities}}
import {{ toCamelCaseAndCapitalize this }}Schema from './{{ toCamelCaseAndCapitalize this }}Schema';
{{/each}}

function idAttribute({{ toCamelCaseString data.recordsKey}}: Denormalized{{ toCamelCaseAndCapitalize data.recordsKey}}): string {
  return {{ toCamelCaseString data.recordsKey}}.id;
}

function processStrategy({{ toCamelCaseString data.recordsKey}}: DenormalizedRecord): Object {
  const { 
    {{ data.processStrategyObject }}, 
    ...rest 
  } = {{ toCamelCaseString data.recordsKey}};

  return {
    {{ data.processStrategyReturn }},
    ...rest
  };
}

const {{ toCamelCaseAndCapitalize data.recordsKey}}Schema = new schema.Entity(
  '{{ toCamelCaseString data.recordsKey }}',
  {
    {{ data.processStrategyEntity }}
  },
  { processStrategy, idAttribute }
);

export default {{ toCamelCaseAndCapitalize data.recordsKey}}Schema;
