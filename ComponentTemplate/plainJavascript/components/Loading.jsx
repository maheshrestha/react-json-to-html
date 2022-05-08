import * as React from 'react';
import Spinner from './Spinner';

class Loading extends React.Component{
  render(){
    return (
      <div className="myTeam-loadingInfo">
        <p>Please wait&hellip;</p>
        <div className="hollow-dots-spinner spinnerStyle">
          <Spinner />
        </div>
      </div>
    );
  }
}

export default Loading;
