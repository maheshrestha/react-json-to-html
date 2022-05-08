import { connect } from "react-redux";
import { toJS } from "../toJS";

const mapStateToProps = (state) => {
  return {
    value,
    label: "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: function (value) {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(QueryFilter));
