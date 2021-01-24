// @flow
import { connect } from 'react-redux';
import AddToMyTeamButton from '../components/AddToMyTeamButton';

import type { State } from '../ducks';
import { toJS } from './toJS';
import { addToMyTeam } from '../sagas/myTeamSagas';

const mapStateToProps = (state: State, ownProps: { id: string }): Object => {
  // const order = getOrderById(state, ownProps.id);
  // if (!order) {
  //   throw new Error('Unable to find order id: ' + ownProps.id);
  // }
  // const viewMode = getViewMode(state);
  // return {
  //   hasClientUpdateCreditCardAction: hasClientUpdateCreditCardAction(
  //     state,
  //     order.paymentId,
  //     order
  //   ),
  //   hasClientReviewInvoiceAction: hasClientReviewInvoiceAction(order),
  //   hasClientReviewQuoteAction: hasClientReviewQuoteAction(order),
  //   hasClientAddReviewAction: hasClientAddReviewAction(order),
  //   hasClientCancelAction: hasClientCancelAction(order),
  //   hasClientEndRecurringAction: hasClientEndRecurringAction(order),
  //   isRecurringBooking: isRecurringBooking(order),
  //   currentUserCanTakeAction: currentUserCanTakeAction(order, state),
  //   viewMode
  // };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => {
  return {
    onAddToMyTeamOrder: () => {
      dispatch(addToMyTeam());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(AddToMyTeamButton));
