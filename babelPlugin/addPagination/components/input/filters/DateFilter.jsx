// @flow
import * as React from 'react';
import { DatePicker, Card } from 'antd';

type AbcFilterProps = {
  label: string,
  value: string,
  onSubmit: string
};

const dateFormat = "DD/MM/YYYY"

class AbcFilter extends React.Component<AbcFilterProps> {
  render(): React.Node {
    const { value, onSubmit, label } = this.props;

    return (
      <Card style={{ width: 300 }}>
        <h6>{label}</h6>
        <DatePicker
            onChange={(date, dateString) => { onSubmit(date);}}
            format={dateFormat}
            value={value}
            placeholder={label}
          />
      </Card>
    );
  }
}

export default AbcFilter;
