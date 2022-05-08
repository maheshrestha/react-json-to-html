// @flow
import { connect } from 'react-redux';
import SortFilter from '../../components/filters/SortFilter';
import { getSortOrder, setSortOrder } from '../../ducks/filters';
//import { setCurrentPage } from '../../ducks/pagination';

import type { State } from '../../ducks';
import type { Dispatch } from 'redux';
import { toJS } from '../toJS';
import { loadParticipants } from '../../sagas/participantSagas';

const mapStateToProps = (
  state: State,
  ownProps: { sortBy: string }
): Object => {
  const value = getSortOrder(state);
  const sortBy = ownProps.sortBy;

  return { value, sortBy };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => {
  return {
    onChange: function() {
      //dispatch(setCurrentPage(1));
      dispatch(setSortOrder(event.target.dataset.value));
      dispatch(loadParticipants());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SortFilter));
