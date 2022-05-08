// @flow
import * as React from 'react';
import { sendRemoveFromMyTeam } from '../api/myTeamMembers';

import type { MyTeamMemberViewProps } from '../containers/MyTeamMember';
import '../style/style.css';

class MyTeamMembers extends React.Component<MyTeamMemberViewProps> {
  render(): React.Node {
    const {
      id,
      name,
      firstName,
      lastName,
      slug,
      profilePicture,
      suburb,
      postcode,
      state,
      address,

      removeFromMyTeam
    } = this.props;
    
    return (
      <tr>
        <td>
          <div className="mt-pro-pic">
            { !!profilePicture && <img src={profilePicture} alt={name} className="mt-profile-pic" />}
            { !profilePicture && <span>{firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}</span>}
            {firstName} {lastName.charAt(0).toUpperCase()}.
          </div>
        </td>
        <td>{suburb} {postcode}, {state}</td>
        <td>
          <a className="mt-tableBtn-red" onClick={() => removeFromMyTeam()}>Remove From My Team</a>
          <span className="mt-spfy"><a className="" href={`/checkout-request/${id}`}>Book Me</a></span>
        </td>
      </tr>
    );
  }
}

export default MyTeamMembers;
