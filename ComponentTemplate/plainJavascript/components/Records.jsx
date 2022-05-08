import * as React from 'react';
import {{ toCamelCaseAndCapitalize schema.name }}sTable from './{{ toCamelCaseAndCapitalize schema.name }}sTable';
import {{ toCamelCaseAndCapitalize schema.name }} from '../containers/{{ toCamelCaseAndCapitalize schema.name }}';
import NoRecords from './NoRecords';


class {{ toCamelCaseAndCapitalize schema.name }}s extends React.Component {
  render(){
    const { ids } = this.props;

    if(ids.length === 0){
      return <NoRecords />;
    }

    return (
      <{{ toCamelCaseAndCapitalize schema.name }}sTable>
        {
          ids.map((id) => 
            <{{ toCamelCaseAndCapitalize schema.name }} id={id} key={id} />
          )
        }
      </{{ toCamelCaseAndCapitalize schema.name }}sTable>
    );

  }
}

export default {{ toCamelCaseAndCapitalize schema.name }}s;
