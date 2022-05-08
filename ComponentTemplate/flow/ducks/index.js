// @flow
import { Record } from 'immutable';
import type { RecordOf, RecordFactory } from 'immutable';
import { combineReducers } from 'redux-immutable';
{{#schemas}}
import {{ toCamelCaseString name}}s, { initialState as {{ toCamelCaseString name }}sInitialState } from './{{ toCamelCaseString name}}';
{{/schemas}}
import listing, { initialState as listingInitialState } from './listing';
import ui, { initialState as uiInitialState } from './ui';

{{#schemas}}
import type { {{ toCamelCaseAndCapitalize name}}Action, {{ toCamelCaseAndCapitalize name}}sState } from './{{ toCamelCaseString name}}s';
{{/schemas}}
import type { ListingAction, ListingState } from './listing';
import type { UiAction, UiState } from './ui';

export type Action =
  {{#schemas}}
  | {{ toCamelCaseAndCapitalize name}}Action
  {{/schemas}}
  | ListingAction
  | UiAction
  ;


type StateProps = {
  {{#schemas}}
  {{ toCamelCaseString name}}s: {{ toCamelCaseAndCapitalize name}}sState,
  {{/schemas}}
  listing: ListingState,
  ui: UiState

};

export type State = RecordOf<StateProps>;


const InitialState: RecordFactory<StateProps> = Record({
  {{#schemas}}
  {{ toCamelCaseString name}}s: {{ toCamelCaseString name}}sInitialState,
  {{/schemas}}
  listing: listingInitialState,
  ui: uiInitialState,

});

export const initialState = new InitialState();

export default combineReducers({
  {{#schemas}}
  {{ toCamelCaseString name }}s,
  {{/schemas}}
  listing,
  ui
});
