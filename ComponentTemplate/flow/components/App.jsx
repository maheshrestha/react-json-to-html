// @flow
import * as React from 'react';
import { URL_REGEXPS } from '../constants';
import {{ toCamelCaseAndCapitalize componentName }}s from '../containers/{{ toCamelCaseAndCapitalize  componentName }}s';
import Loading from './Loading';
import LoadingRequest from './LoadingRequest';

type AppProps = {
  isInitialized: boolean,
  isLoading: boolean,
  initialize: () => void
};

class App extends React.Component<AppProps> {
  componentWillReceiveProps (nextProps: FiltersProps) {
    if (nextProps.url !== this.props.url) {
      const queryParams = new URLSearchParams(window.location.search)
      
      queryParams.set(URL_REGEXPS.filterParamsKey, `/${nextProps.url}`)
      window.history.pushState(nextProps.url, 'My App', '?' + queryParams)
    }
  }
  componentDidMount() {
    this.props.initialize();
  }

  render(): React.Node {
    const { isInitialized, isLoading } = this.props;
    if (!isInitialized) {
      return <Loading />;
    }

    return (
      <div className="table-responsive">
        {isLoading && <LoadingRequest />}
        <{{ toCamelCaseAndCapitalize  componentName }}s />
      </div>
    );
  }
}

export default App;
