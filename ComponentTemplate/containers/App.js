// @flow
import { connect } from 'react-redux';
import App from '../components/App';
import { getLoadTimestamp, isLoading } from '../ducks/ui';
import { loadMyTeamMembers } from '../sagas/myTeamMemberSagas';
import type { State } from '../ducks';
import type { Dispatch } from 'redux';
import { toJS } from './toJS';

const mapStateToProps = (state: State): Object => {
  const lastLoadTimestamp = getLoadTimestamp(state);
  return {
    isInitialized: !!lastLoadTimestamp,
    isLoading: isLoading(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => {
  return {
    initialize: () => {
      dispatch(loadMyTeamMembers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(App));
