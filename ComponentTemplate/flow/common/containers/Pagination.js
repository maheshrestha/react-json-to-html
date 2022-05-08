// @flow
import { connect } from "react-redux";
import type { State } from "../ducks";
import { toJS } from "./toJS";
import {
  getPerPageSize,
  getCurrentPage,
  getTotalEntries,
  setPerPageSize,
  setCurrentPage,
  // getUrlFromPagination,
} from "../../common/ducks/pagination";
// import { loadResultss } from "../../vaccinations/sagas/resultsSagas";
import Pagination from "../components/Pagination";
import { setPaginationFromUrl } from "../sagas/paginationSaga";

const mapStateToProps = (state: State): Object => {
  // const ids = getSortedAndFilteredResultsIds(state);
  // const paginationUrl = getUrlFromPagination(state);
  const perPageSize = getPerPageSize(state);
  const currentPage = getCurrentPage(state);
  const totalRecords = getTotalEntries(state);
  let paginationValue = {
    minValue: 0,
    maxValue: perPageSize,
  };
  if (currentPage > 1) {
    paginationValue = {
      minValue: currentPage * perPageSize - perPageSize,
      maxValue: currentPage * perPageSize,
    };
  }
  return {
    // paginationUrl,
    perPageSize,
    currentPage,
    totalRecords,
    paginationValue,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps: any): Object => {
  return {
    onChange: function(page) {
      dispatch(setCurrentPage(parseInt(page)));
      dispatch({
        type: "sagas/results/LOAD",
      });
      console.log("ownProps", ownProps);
      // dispatch(loadResultss());
    },
    onSizeChange: function(e) {
      console.log("value", e.currentTarget.value);
      dispatch(setPerPageSize(parseInt(e.currentTarget.value)));
      dispatch(setCurrentPage(1));
      dispatch({
        type: "sagas/results/LOAD",
      });
    },
    setPaginationFromUrl: () => {
      dispatch(setPaginationFromUrl());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Pagination));
