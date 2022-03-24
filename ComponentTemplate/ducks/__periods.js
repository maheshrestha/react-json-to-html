// @flow
import { fromJS, mergeDeep } from 'immutable';
import type { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { makePeriod, makePeriods } from '../definitions/Period';
import type { Period, PeriodProps } from '../definitions/Period';
import { InitialEntitiesStore } from './common';
import type { Action, State } from './index';
import type {
  EntitiesByIdStore,
  EntityIdsStore,
  EntitiesStore
} from './common';

export type PeriodAction =
  | {|
      type: 'entities/periods/ADD',
      period: Period
    |}
  | {|
      type: 'entities/periods/ADD_BULK',
      periods: Map<string, Period>
    |};
export type PeriodsState = EntitiesStore<Period>;

export const initialState = new InitialEntitiesStore();

export const types = {
  ADD: 'entities/periods/ADD',
  ADD_BULK: 'entities/periods/ADD_BULK'
};

// ACTIONS
export const addPeriod = (payload: PeriodProps): PeriodAction => {
  const period = makePeriod(fromJS(payload));

  return {
    type: types.ADD,
    period
  };
};

export const addPeriods = (payload: {
  [string]: PeriodProps
}): PeriodAction => {
  return {
    type: types.ADD_BULK,
    periods: makePeriods(payload)
  };
};

// SELECTORS
export const getPeriodById = (state: State, id: string | number): ?Period => {
  return state.getIn(['periods', 'byId', id + '']);
};

// REDUCERS
function allIds<T: EntityIdsStore>(
  state: T = initialState.allIds,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.add(action.period.id);
    case types.ADD_BULK:
      return state.concat(action.periods.keys());
    default:
      return state;
  }
}

function byId<T: EntitiesByIdStore<Period>>(
  state: T = initialState.byId,
  action: Action
): T {
  switch (action.type) {
    case types.ADD:
      return state.set(action.period.id, action.period);
    case types.ADD_BULK:
      return mergeDeep(state, action.periods);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds
});
