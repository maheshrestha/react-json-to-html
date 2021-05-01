// @flow
import * as React from 'react';

type {{ toCamelCaseAndCapitalize schema.name }}sTableProps = {
  children?: React.Node
};

class {{ toCamelCaseAndCapitalize schema.name }}sTable extends React.Component<{{ toCamelCaseAndCapitalize schema.name }}sTableProps> {
  render(): React.Node {
    return (
      <table className="ordersListing-listingTable-with-accordian -carer table mt-table">
        <thead>
          <tr>
            {{# each schema.fields}}
              <th scope="col" className="ordersListing-listingTable-col -state">
                {{ this.schemaField }}
              </th>
            {{/each}}
            <th scope="col" className="ordersListing-listingTable-col -actions">
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
