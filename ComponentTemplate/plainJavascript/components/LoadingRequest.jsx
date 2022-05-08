import * as React from 'react';
import Spinner from './Spinner';

class LoadingRequest extends React.Component{
  render(){
    return (
      <div className="myTeam-loadingInfo">
        <div className="hollow-dots-spinner spinnerStyle">
          <Spinner />
        </div>
      </div>
    );
  }
}

export default LoadingRequest;
