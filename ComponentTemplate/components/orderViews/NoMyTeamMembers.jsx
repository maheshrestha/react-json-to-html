// @flow
import * as React from 'react';

type NoMyTeamMembersProps = {};

class NoMyTeamMembers extends React.Component<NoMyTeamMembersProps> {
  render(): React.Node {
    return (
      <div className="module-holder calender-holder mt-pending-tbl">
        <p>There are no team member to display.</p>
      </div>
    );
  }
}

export default NoMyTeamMembers;
