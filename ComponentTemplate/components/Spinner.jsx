// @flow
import * as React from 'react';
import { Spin } from 'antd';

class Spinner extends React.Component<{}> {
  render(): React.Node {
    return (
      <Spin tip="Loading..."></Spin>
    );
  }
}

export default Spinner;
