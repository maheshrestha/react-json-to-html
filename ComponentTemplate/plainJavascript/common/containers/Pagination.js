// @flow
import { connect } from "react-redux";
import { toJS } from "./toJS";
import {
  getPerPageSize,
  getCurrentPage,
  getTotalEntries,
  setPerPageSize,
  setCurrentPage,
} from "../../common/ducks/pagination";
import Pagination from "../components/Pagination";
import { setPaginationFromUrl } from "../sagas/paginationSaga";

const mapStateToProps = (state) => {
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
    perPageSize,
    currentPage,
    totalRecords,
    paginationValue,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: function (page) {
      dispatch(setCurrentPage(parseInt(page)));
      dispatch(ownProps.onChange);
    },
    onSizeChange: function (e) {
      dispatch(setPerPageSize(parseInt(e.currentTarget.value)));
      dispatch(setCurrentPage(1));
      dispatch(ownProps.onChange);
    },
    setPaginationFromUrl: () => {
      dispatch(setPaginationFromUrl());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Pagination));
