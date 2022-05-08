import * as React from 'react';


class {{ toCamelCaseAndCapitalize schema.name }} extends React.Component{
  render(){
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
