import * as React from 'react';
import { FILTER_PARAM_NAME } from '../constants';
{{#schemas}}
import {{ toCamelCaseAndCapitalize name }}s from '../containers/{{ toCamelCaseAndCapitalize  name }}s';
{{/schemas}}
import Loading from './Loading';
import LoadingRequest from './LoadingRequest';

class App extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.url !== this.props.url) {
      const queryParams = new URLSearchParams(window.location.search)
      
      queryParams.set(FILTER_PARAM_NAME, `/${nextProps.url}`)
      window.history.pushState(nextProps.url, 'My App', '?' + queryParams)
    }
  }
  componentDidMount() {
    this.props.initialize();
  }

  render(){
    const { isInitialized, isLoading } = this.props;
    if (!isInitialized) {
      return <Loading />;
    }

    return (
      <div className="table-responsive">
        {isLoading && <LoadingRequest />}
        {{#schemas}}
        <h5>{{ toCamelCaseAndCapitalize name }}</h5>
        <{{ toCamelCaseAndCapitalize name }}s />
        {{/schemas}}
      </div>
    );
  }
}

export default App;
