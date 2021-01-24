// @flow
import * as React from 'react';

class Spinner extends React.Component<{}> {
  render(): React.Node {
    return (
      <div className="hollow-dots-spinner">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    );
  }
}

export default Spinner;
