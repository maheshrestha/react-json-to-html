// @flow
import * as React from 'react';
import Spinner from './Spinner';

class LoadingRequest extends React.Component<{}> {
  render(): React.Node {
    return (
      <div className="myTeam-loadingInfo">
        {/* <p>Please wait while your requst is processing&hellip;</p> */}
        <div className="hollow-dots-spinner spinnerStyle">
          <Spinner />
        </div>
      </div>
    );
  }
}

export default LoadingRequest;
