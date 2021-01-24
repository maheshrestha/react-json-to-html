// @flow
import { connect } from 'react-redux';
import MyTeamMembers from '../components/MyTeamMembers';
import type { State } from '../ducks';
import { getMyTeamMemberIds, getIds } from '../ducks/listing';
import { toJS } from './toJS';

const mapStateToProps = (state: State): Object => {
  const ids = getMyTeamMemberIds(state);
  return { ids };
};

export default connect(mapStateToProps)(toJS(MyTeamMembers));
