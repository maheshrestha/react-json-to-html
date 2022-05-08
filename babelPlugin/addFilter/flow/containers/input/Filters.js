// @flow
import { connect } from 'react-redux';
import Filters from '../components/Filters';
import type { State } from '../ducks';
import { getUrlFromFilters } from '../ducks/filters';
import { setFiltersFromUrl } from '../sagas/filtersSagas';
import { toJS } from './toJS';
import type { Dispatch } from 'redux';

const mapStateToProps = (state: State): Object => {
  const filtersUrl = getUrlFromFilters(state);

  return {
    filtersUrl
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => {
  return {
    setFiltersFromUrl: () => {
      dispatch(setFiltersFromUrl());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Filters));
