// @flow
import * as React from 'react';

type NoRecordsProps = {};

class NoRecords extends React.Component<NoRecordsProps> {
  render(): React.Node {
    return (
      <div className="module-holder calender-holder mt-pending-tbl">
        <p>There are no records to display.</p>
      </div>
    );
  }
}

export default NoRecords;
