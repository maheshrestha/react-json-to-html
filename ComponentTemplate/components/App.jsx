// @flow
import * as React from 'react';

import {{ toCamelCaseAndCapitalize componentName }}s from '../containers/{{ toCamelCaseAndCapitalize  componentName }}s';
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
        <{{ toCamelCaseAndCapitalize  componentName }}s />
      </div>
    );
  }
}

export default App;
