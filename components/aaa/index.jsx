// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';

import GlobalErrorBoundry from '../common/components/GlobalErrorBoundry';
import App from './containers/App';

function init(container: HTMLElement) {
  render(
    <Provider store={store}>
      <GlobalErrorBoundry>
        <App />
      </GlobalErrorBoundry>
    </Provider>,
    container
  );
}

export default init;
