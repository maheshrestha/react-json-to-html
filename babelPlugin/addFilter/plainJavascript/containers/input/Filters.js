import { connect } from "react-redux";
import Filters from "../components/Filters";
import { getUrlFromFilters } from "../ducks/filters";
import { setFiltersFromUrl } from "../sagas/filtersSagas";
import { toJS } from "./toJS";

const mapStateToProps = (state) => {
  const filtersUrl = getUrlFromFilters(state);

  return {
    filtersUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFiltersFromUrl: () => {
      dispatch(setFiltersFromUrl());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Filters));
