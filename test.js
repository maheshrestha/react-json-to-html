// @flow
import { Record } from 'immutable';
import type { RecordOf, RecordFactory } from 'immutable';
import { combineReducers } from 'redux-immutable';
import resultss, { initialState as resultssInitialState } from './results';
import bookingss, { initialState as bookingssInitialState } from './bookings';
import listing, { initialState as listingInitialState } from './listing';
import ui, { initialState as uiInitialState } from './ui';


import type { ResultsAction, ResultssState } from './resultss';
import type { BookingsAction, BookingssState } from './bookingss';
import type { ListingAction, ListingState } from './listing';
import type { UiAction, UiState } from './ui';



export type Action =
  | ResultsAction
  | BookingsAction
  | ListingAction
  | UiAction
  ;

type StateProps = {
  resultss: ResultssState,
  bookingss: BookingssState,
  listing: ListingState,
  ui: UiState
};

export type State = RecordOf<StateProps>;


const InitialState: RecordFactory<StateProps> = Record({
  resultss: resultssInitialState,
  bookingss: bookingssInitialState,
  listing: listingInitialState,
  ui: uiInitialState
});

export const initialState = new InitialState();

export default combineReducers({
  resultss,
  bookingss,
  listing,
  ui
});
