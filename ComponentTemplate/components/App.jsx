// @flow
import * as React from 'react';

import MyTeamMembers from '../containers/MyTeamMembers';
import Loading from './Loading';
import LoadingRequest from './LoadingRequest';

type AppProps = {
  isInitialized: boolean,
  isLoading: boolean,
  initialize: () => void
};

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.initialize();
  }

  render(): React.Node {
    const { isInitialized, isLoading } = this.props;
    if (!isInitialized) {
      return <Loading />;
    }

    return (
      <div className="wrap-my-team">
        {isLoading && <LoadingRequest />}
        <MyTeamMembers />
      </div>
    );
  }
}

export default App;
