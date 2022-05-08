import { Record } from 'immutable';
import { combineReducers } from 'redux-immutable';
import ui, { initialState as uiInitialState } from './ui';
{{#schemas}}
import {{ toCamelCaseString name}}s, { initialState as {{ toCamelCaseString name }}sInitialState } from './{{ toCamelCaseString name}}';
{{/schemas}}

const InitialState = Record({
  {{#schemas}}
  {{ toCamelCaseString name}}s: {{ toCamelCaseString name}}sInitialState,
  {{/schemas}}
  ui: uiInitialState,

});

export const initialState = new InitialState();

export default combineReducers({
  {{#schemas}}
  {{ toCamelCaseString name }}s,
  {{/schemas}}
  ui
});
