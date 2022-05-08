import * as React from 'react';
import { Input, Card } from 'antd';
const { Search } = Input;

class StringFilter extends React.Component {
  render() {
    const { value, onSubmit, label } = this.props;

    return (
      <Card style={{ width: 300 }}>
        <h6>{label}</h6>
        <Search
          defaultValue={value}
          placeholder="Query"
          onSearch={onSubmit}
          style={{ width: 200 }}
        />
      </Card>
    );
  }
}

export default StringFilter;
