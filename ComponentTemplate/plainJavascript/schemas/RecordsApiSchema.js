{{#schemas}}
  import {{ toCamelCaseAndCapitalize name }}Schema from './{{ toCamelCaseAndCapitalize name }}Schema';
{{/schemas}}
const {{ componentName }}sApiSchema = 
  {{#schemas}}
      [{{ toCamelCaseAndCapitalize name}}Schema]
  {{/schemas}}
;

export default {{ componentName }}sApiSchema;
