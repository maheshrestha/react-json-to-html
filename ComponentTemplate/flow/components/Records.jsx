// @flow
import * as React from 'react';
import {{ toCamelCaseAndCapitalize schema.name }}sTable from './{{ toCamelCaseAndCapitalize schema.name }}sTable';
import {{ toCamelCaseAndCapitalize schema.name }} from '../containers/{{ toCamelCaseAndCapitalize schema.name }}';

import NoRecords from './NoRecords';

type {{ toCamelCaseAndCapitalize schema.name }}sProps = {
  ids: Array<string>
};

class {{ toCamelCaseAndCapitalize schema.name }}s extends React.Component<{{ toCamelCaseAndCapitalize schema.name }}sProps> {
  render(): React.Node {
    const { ids } = this.props;

    if(ids.length === 0){
      return <NoRecords />;
    }

    return (
      <{{ toCamelCaseAndCapitalize schema.name }}sTable>
        {
          ids.map((id: string): React.Node => 
            <{{ toCamelCaseAndCapitalize schema.name }} id={id} key={id} />
          )
        }
      </{{ toCamelCaseAndCapitalize schema.name }}sTable>
    );

  }
}

export default {{ toCamelCaseAndCapitalize schema.name }}s;
