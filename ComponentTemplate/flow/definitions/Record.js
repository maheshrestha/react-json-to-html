// @flow
import { PRICE_UNIT_HOUR } from '../constants';
import { Record, OrderedSet, Map } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';
import type Moment from 'moment';

export type {{ toCamelCaseAndCapitalize schema.name }}Props = {
  {{#schema.fields}}
  {{schemaField}}: {{{unescapeString fieldType}}},
  {{/schema.fields}}
};

export const make{{ toCamelCaseAndCapitalize schema.name }}: RecordFactory<{{ toCamelCaseAndCapitalize schema.name }}Props> = Record(
  {
    {{#schema.fields}}
    {{schemaField}}: {{{defaultValue}}},
    {{/schema.fields}}
  }
);

export type {{ toCamelCaseAndCapitalize schema.name }} = RecordOf<{{ toCamelCaseAndCapitalize schema.name }}Props>;

export function make{{ toCamelCaseAndCapitalize schema.name }}s(payload: {
  [string]: {{ toCamelCaseAndCapitalize schema.name }}Props
}): Map<string, {{ toCamelCaseAndCapitalize schema.name }}> {
  return Map(payload).map((props: {{ toCamelCaseAndCapitalize schema.name }}Props): {{ toCamelCaseAndCapitalize schema.name }} => make{{ toCamelCaseAndCapitalize schema.name }}(props));
}
