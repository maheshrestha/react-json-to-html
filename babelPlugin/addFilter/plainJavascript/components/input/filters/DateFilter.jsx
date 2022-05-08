import * as React from 'react';
import { DatePicker, Card } from 'antd';

const dateFormat = "DD/MM/YYYY"

class DateFilter extends React.Component {
  render() {
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

export default DateFilter;
