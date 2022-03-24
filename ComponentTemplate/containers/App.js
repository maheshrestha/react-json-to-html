// @flow
import { connect } from 'react-redux';
import App from '../components/App';
import { getLoadTimestamp, isLoading } from '../ducks/ui';
import { load{{ toCamelCaseAndCapitalize recordKey }}s } from '../sagas/{{ toCamelCaseString recordKey }}Sagas';
import type { State } from '../ducks';
import type { Dispatch } from 'redux';
import { toJS } from './toJS';

const mapStateToProps = (state: State): Object => {
  const url = [].join('/')
  const lastLoadTimestamp = getLoadTimestamp(state);
  return {
    isInitialized: !!lastLoadTimestamp,
    isLoading: isLoading(state),
    url
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => {
  return {
    initialize: () => {
      dispatch(load{{ toCamelCaseAndCapitalize recordKey }}s());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(App));
