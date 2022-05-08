import { connect } from 'react-redux';
import {{ toCamelCaseAndCapitalize recordKey }}s from '../components/{{ toCamelCaseAndCapitalize recordKey }}s';
import { getListReady{{ toCamelCaseAndCapitalize recordKey }}Ids } from '../ducks/{{ toCamelCaseString recordKey }}';
import { toJS } from './toJS';

const mapStateToProps = (state)=> {
  const ids = getListReady{{ toCamelCaseAndCapitalize recordKey }}Ids(state);
  return { ids };
};

export default connect(mapStateToProps)(toJS({{ toCamelCaseAndCapitalize recordKey }}s));
