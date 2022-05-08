// @flow
import * as React from 'react';
import MyTeamMember from '../containers/MyTeamMember';

import NoMyTeamMembers from './orderViews/NoMyTeamMembers';
type MyTeamMembersProps = {
  ids: Array<string>
};

class MyTeamMembers extends React.Component<MyTeamMembersProps> {
  render(): React.Node {
    const { ids } = this.props;
    const props = {
      dots: false,
      infinite: false,
      speed: 900,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true, 
      responsive: [
        { breakpoint: 795, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
        { breakpoint: 100000, settings: { slidesToShow: 4, slidesToScroll: 4 } }
      ]
    };
    if(ids.length === 0){
      return <NoMyTeamMembers />;
    }
    return ( 
      
      
      <div className="module-holder mt-pending-tbl"> 
        <div className="table-responsive">
          <table className="mt-table table">
            <tbody>
              <tr>
                <th><b>Client Name</b></th>
                <th><b>Address</b></th>
                <th></th>
              </tr>

              {ids.map((id: string): React.Node => <MyTeamMember id={id} key={id} />)}
            </tbody>
          </table>
        </div>
      </div>         
      
        
    );
  }
}

export default MyTeamMembers;
