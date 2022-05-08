import { Record, {{#if schemaHasOrderedSet}}OrderedSet,{{/if}} Map } from 'immutable';

export const make{{ toCamelCaseAndCapitalize schema.name }} = Record(
  {
    {{#unless schemaHasIdKey }}
    id: "", 
    {{/unless}}
    {{#schema.fields}}
    {{schemaField}}: {{{defaultValue}}},
    {{/schema.fields}}
  }
);


export function make{{ toCamelCaseAndCapitalize schema.name }}s(payload) {
  return Map(payload).map((props) => make{{ toCamelCaseAndCapitalize schema.name }}(props));
}
