// @flow
import { connect } from 'react-redux';
import {{ toCamelCaseAndCapitalize recordKey }}s from '../components/{{ toCamelCaseAndCapitalize recordKey }}s';
import type { State } from '../ducks';
import { getSortedAndFiltered{{ toCamelCaseAndCapitalize recordKey }}Ids } from '../ducks/listing';
import { toJS } from './toJS';

const mapStateToProps = (state: State): Object => {
  const ids = getSortedAndFiltered{{ toCamelCaseAndCapitalize recordKey }}Ids(state);
  return { ids };
};

export default connect(mapStateToProps)(toJS({{ toCamelCaseAndCapitalize recordKey }}s));
