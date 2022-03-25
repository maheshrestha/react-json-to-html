// @flow
import * as React from 'react';

import type { {{ toCamelCaseAndCapitalize schema.name }}ViewProps } from '../containers/{{ toCamelCaseAndCapitalize schema.name }}';

class {{ toCamelCaseAndCapitalize schema.name }} extends React.Component<{{ toCamelCaseAndCapitalize schema.name }}ViewProps> {
  render(): React.Node {
    const {
      {{# each schema.fields}}
        {{ this.schemaField }},
      {{/each}}
    } = this.props;
    return (
      <tr>
        {{# each schema.fields}}
        <td>{!!{{ this.schemaField }} && {{ this.schemaField }} } </td>
        {{/each}}
        <td></td>
      </tr>
    );
  }
}

export default {{ toCamelCaseAndCapitalize schema.name }};
