// @flow
import { connect } from 'react-redux';
import MyTeamMember from '../components/MyTeamMember';
import { getMyTeamMemberById } from '../ducks/myTeamMembers';
import { getUserById } from '../ducks/users';
import { addToMyTeam, removeFromMyTeam } from '../sagas/myTeamMemberSagas';
import type { State } from '../ducks';
import { toJS } from './toJS';

const makeMapStateToProps = (): Object => {
  //const getSortedPeriodIdsForOrder = makeGetSortedPeriodIdsForOrder();

  const mapStateToProps = (stt: State, ownProps: { id: string }): Object => {
    const myTeamMember = getMyTeamMemberById(stt, ownProps.id);
    if (!myTeamMember) {
      throw new Error('Unable to find myTeamMember id: ' + ownProps.id);
    }
    const { clientId, carerId } = myTeamMember;
    const client = getUserById(stt, clientId);
    const {
      id,
      name,
      firstName,
      lastName,
      slug,
      profilePicture,
      suburb,
      postcode,
      state,
      address
    } = client;
    return {
      id,
      name,
      firstName,
      lastName,
      slug,
      suburb,
      postcode,
      state,
      address,
      profilePicture
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch<*>,
  ownProps: { id: string }
): Object => {
  return {
    removeFromMyTeam: () => {
      dispatch(removeFromMyTeam(ownProps.id, 'client'));
    }
  };
};

export type MyTeamMemberViewProps = {
  id: string,
  name: string,
  firstName: string,
  lastName: string,
  slug: string,
  profilePicture: string,
  suburb: string,
  postcode: string,
  state: string,
  address: string
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(toJS(MyTeamMember));
