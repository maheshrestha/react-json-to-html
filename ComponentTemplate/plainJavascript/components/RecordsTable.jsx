import * as React from 'react';

class {{ toCamelCaseAndCapitalize schema.name }}sTable extends React.Component {
  render(){
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
