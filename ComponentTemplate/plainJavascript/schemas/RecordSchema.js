import { schema } from 'normalizr';
{{# each data.entities}}
import {{ toCamelCaseAndCapitalize this }}Schema from './{{ toCamelCaseAndCapitalize this }}Schema';
{{/each}}
{{#unless data.schemaHasIdKey}}
import { v4 as uuidv4 } from "uuid";
var {{ toCamelCaseString data.recordsKey }}Id;
{{/unless}}

function idAttribute({{ toCamelCaseString data.recordsKey}}) {
  {{#if data.schemaHasIdKey}}
    return {{ toCamelCaseString data.recordsKey}}.id;
  {{else}}
    return {{ toCamelCaseString data.recordsKey}}.id ? {{ toCamelCaseString data.recordsKey}}.id.toString() : {{ toCamelCaseString data.recordsKey }}Id;
  {{/if}}
}

function processStrategy({{ toCamelCaseString data.recordsKey}}) {
  {{#unless data.schemaHasIdKey}}
    {{ toCamelCaseString data.recordsKey }}Id = uuidv4();
  {{/unless}}
  const { 
    {{#unless data.schemaHasIdKey}}
      id,
    {{/unless}}
    {{ data.processStrategyObject }}, 
    ...rest 
  } = {{ toCamelCaseString data.recordsKey}};

  return {
    {{#unless data.schemaHasIdKey}}
      id: {{ toCamelCaseString data.recordsKey}}.id ? {{ toCamelCaseString data.recordsKey}}.id.toString() : {{ toCamelCaseString data.recordsKey }}Id,
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
