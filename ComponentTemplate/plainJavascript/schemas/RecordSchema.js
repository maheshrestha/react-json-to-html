import { schema } from 'normalizr';
{{# each data.entities}}
import {{ toCamelCaseAndCapitalize this }}Schema from './{{ toCamelCaseAndCapitalize this }}Schema';
{{/each}}
{{#unless data.schemaHasIdKey}}
import { v4 as uuidv4 } from "uuid";
const randomStringAsId = uuidv4();
{{/unless}}

function idAttribute({{ toCamelCaseString data.recordsKey}}) {
  {{#if data.schemaHasIdKey}}
    return {{ toCamelCaseString data.recordsKey}}.id;
  {{else}}
    return {{ toCamelCaseString data.recordsKey}}.id ? {{ toCamelCaseString data.recordsKey}}.id : randomStringAsId;
  {{/if}}
}

function processStrategy({{ toCamelCaseString data.recordsKey}}) {
  const { 
    {{#unless data.schemaHasIdKey}}
      id: id,
    {{/unless}}
    {{ data.processStrategyObject }}, 
    ...rest 
  } = {{ toCamelCaseString data.recordsKey}};

  return {
    {{#unless data.schemaHasIdKey}}
      id: {{ toCamelCaseString data.recordsKey}}.id ? {{ toCamelCaseString data.recordsKey}}.id : randomStringAsId,
    {{/unless}}

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
