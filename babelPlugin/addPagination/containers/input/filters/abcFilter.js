// @flow
import { connect } from 'react-redux';
import type { State } from '../../ducks';
import type { Dispatch } from 'redux';
import { toJS } from '../toJS';
import { loadResultss } from '../../sagas/resultsSagas';

const mapStateToProps = (state: State): Object => {

  return {
    value,
    label: ''
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => {
  return {
    onSubmit: function(value: ?string) {
      dispatch(loadResultss());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(QueryFilter));
