import { connect } from 'react-redux';
import App from '../components/App';
import { getLoadTimestamp, isLoading } from '../ducks/ui';
import { toJS } from './toJS';
import { load{{ toCamelCaseAndCapitalize componentName }}s } from '../sagas/{{ toCamelCaseString componentName }}Sagas';

const mapStateToProps = (state)=> {
  const url = [].join('/')
  const lastLoadTimestamp = getLoadTimestamp(state);
  return {
    isInitialized: !!lastLoadTimestamp,
    isLoading: isLoading(state),
    url
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    initialize: () => {
      dispatch(load{{ toCamelCaseAndCapitalize componentName }}s());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(App));
