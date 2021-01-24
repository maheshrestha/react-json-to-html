// @flow
import { Record } from 'immutable';
import type { RecordOf, RecordFactory } from 'immutable';
import { combineReducers } from 'redux-immutable';
import myTeamMembers, {
  initialState as myTeamMembersInitialState
} from './myTeamMembers';
import filters, { initialState as filtersInitialState } from './filters';
import ui, { initialState as uiInitialState } from './ui';
import users, { initialState as usersInitialState } from './users';

import type { MyTeamAction, MyTeamMembersState } from './myTeamMembers';
import type { UserAction, UsersState } from './users';
import type { FiltersAction, FiltersState } from './filters';
import type { UiAction, UiState } from './ui';

export type Action = MyTeamAction | UserAction | UiAction | FiltersAction;

type StateProps = {
  myTeamMembers: MyTeamMembersState,
  users: UsersState,
  ui: UiState,
  filters: FiltersState
};

export type State = RecordOf<StateProps>;

const InitialState: RecordFactory<StateProps> = Record({
  myTeamMembers: myTeamMembersInitialState,
  users: usersInitialState,
  ui: uiInitialState,
  filters: filtersInitialState
});

export const initialState = new InitialState();

export default combineReducers({
  myTeamMembers,
  users,
  ui,
  filters
});
