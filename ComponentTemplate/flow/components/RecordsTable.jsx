// @flow
import * as React from 'react';

type {{ toCamelCaseAndCapitalize schema.name }}sTableProps = {
  children?: React.Node
};

class {{ toCamelCaseAndCapitalize schema.name }}sTable extends React.Component<{{ toCamelCaseAndCapitalize schema.name }}sTableProps> {
  render(): React.Node {
    return (
      <table className="table table-striped table-bordered">
        <thead className="panel-heading">
          <tr>
            {{# each schema.fields}}
              <th scope="col" className="listing-col data">{{ this.schemaField }}</th>
            {{/each}}
            <th scope="col" className="listingTable-col -actions">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}

export default {{ toCamelCaseAndCapitalize schema.name }}sTable;
