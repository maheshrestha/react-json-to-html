import React from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';

import GlobalErrorBoundry from '../common/components/GlobalErrorBoundry';
import App from './containers/App';

class init extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <GlobalErrorBoundry>
          <App/>
        </GlobalErrorBoundry>
      </Provider>
    );
  }
}

export default init;
