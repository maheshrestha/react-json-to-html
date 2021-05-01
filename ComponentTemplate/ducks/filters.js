// @flow
import { makeFilters } from '../definitions/Filters';
import type { Filters } from '../definitions/Filters';
import { getSortProperties } from '../helpers/sorting';
import type { Action, State } from './index';
import { getCurrentPage, getPerPageSize } from './pagination';
import {
  VIEW_MODES,
  URL_NULL_PLACEHOLDER,
  URL_PREFIX,
  CARER_URL_PREFIX,
  CLIENT_URL_PREFIX,
  EXPORT_URL_PREFIX
} from '../constants';
import type Moment from 'moment';
import { createSelector } from 'reselect';
import { Set } from 'immutable';
import { momentToMinutesFromMidnight } from '../helpers/convert';

export type FiltersAction =
  | {| type: 'filters/SET_MAXIMUM_AMOUNT', amount: ?number |}
  | {| type: 'filters/SET_MINIMUM_AMOUNT', amount: ?number |}
  | {| type: 'filters/SET_CARER_ID', carerId: ?string |}
  | {| type: 'filters/SET_CLIENT_ID', clientId: ?string |}
  | {| type: 'filters/SET_MANAGER_ID', managerId: ?string |}
  | {| type: 'filters/SET_SERVICE_TO_NAME', serviceToName: ?string |}
  | {| type: 'filters/SET_REFERENCE', reference: ?string |}
  | {| type: 'filters/SET_START_DATE', startDate: ?Moment |}
  | {| type: 'filters/SET_START_TIME', startTime: ?Moment |}
  | {| type: 'filters/SET_END_DATE', endDate: ?Moment |}
  | {| type: 'filters/SET_SORT_ORDER', sortOrder: string |}
  | {| type: 'filters/SET_USER_TYPE', userType: string |}
  | {| type: 'filters/TOGGLE_STATE', state: string |}
  | {| type: 'filters/SET_ACTIVE_STATES', states: Array<string> |}
  | {| type: 'filters/SET_VIEW_MODE', viewMode: string |}
  | {| type: 'filters/SET_DATA_FOR', dataFor: string |};

export type FiltersState = Filters;

export const initialState = makeFilters();

export const types = {
  SET_MAXIMUM_AMOUNT: 'filters/SET_MAXIMUM_AMOUNT',
  SET_MINIMUM_AMOUNT: 'filters/SET_MINIMUM_AMOUNT',
  SET_CARER_ID: 'filters/SET_CARER_ID',
  SET_CLIENT_ID: 'filters/SET_CLIENT_ID',
  SET_MANAGER_ID: 'filters/SET_MANAGER_ID',
  SET_SERVICE_TO_NAME: 'filters/SET_SERVICE_TO_NAME',
  SET_REFERENCE: 'filters/SET_REFERENCE',
  SET_START_DATE: 'filters/SET_START_DATE',
  SET_START_TIME: 'filters/SET_START_TIME',
  SET_END_DATE: 'filters/SET_END_DATE',
  SET_SORT_ORDER: 'filters/SET_SORT_ORDER',
  SET_USER_TYPE: 'filters/SET_USER_TYPE',
  TOGGLE_STATE: 'filters/TOGGLE_STATE',
  SET_VIEW_MODE: 'filters/SET_VIEW_MODE',
  SET_ACTIVE_STATES: 'filters/SET_ACTIVE_STATES',
  SET_PER_PAGE_SIZE: 'filters/SET_PER_PAGE_SIZE',
  SET_CURRENT_PAGE: 'filters/SET_CURRENT_PAGE',
  SET_DATA_FOR: 'filters/SET_DATA_FOR'
};

// ACTIONS
export const toggleState = (state: string): FiltersAction => {
  return {
    type: types.TOGGLE_STATE,
    state
  };
};

export const setActiveStates = (states: Array<string>): FiltersAction => {
  return {
    type: types.SET_ACTIVE_STATES,
    states
  };
};

export const setMinimumAmount = (amount: ?number): FiltersAction => {
  return {
    type: types.SET_MINIMUM_AMOUNT,
    amount
  };
};

export const setMaximumAmount = (amount: ?number): FiltersAction => {
  return {
    type: types.SET_MAXIMUM_AMOUNT,
    amount
  };
};

export const setUserType = (userType: string): FiltersAction => {
  return {
    type: types.SET_USER_TYPE,
    userType
  };
};

export const setCarerId = (carerId: ?string): FiltersAction => {
  return {
    type: types.SET_CARER_ID,
    carerId
  };
};

export const setClientId = (clientId: ?string): FiltersAction => {
  return {
    type: types.SET_CLIENT_ID,
    clientId
  };
};

export const setManagerId = (managerId: ?string): FiltersAction => {
  return {
    type: types.SET_MANAGER_ID,
    managerId
  };
};

export const setServiceToName = (serviceToName: ?string): FiltersAction => {
  return {
    type: types.SET_SERVICE_TO_NAME,
    serviceToName
  };
};

export const setReference = (reference: ?string): FiltersAction => {
  return {
    type: types.SET_REFERENCE,
    reference
  };
};

export const setStartDate = (startDate: ?Moment): FiltersAction => {
  return {
    type: types.SET_START_DATE,
    startDate
  };
};

export const setStartTime = (startTime: ?Moment): FiltersAction => {
  return {
    type: types.SET_START_TIME,
    startTime
  };
};

export const setEndDate = (endDate: ?Moment): FiltersAction => {
  return {
    type: types.SET_END_DATE,
    endDate
  };
};
export const setSortOrder = (sortOrder: string): FiltersAction => {
  return {
    type: types.SET_SORT_ORDER,
    sortOrder
  };
};

export const setViewMode = (viewMode: string): FiltersAction => {
  return {
    type: types.SET_VIEW_MODE,
    viewMode
  };
};

export const setDataFor = (dataFor: string): FiltersAction => {
  return {
    type: types.SET_DATA_FOR,
    dataFor
  };
};

// SELECTORS
export const getActiveStates = (state: State): Set<string> => {
  return state.getIn(['filters', 'activeStates']);
};

export const getMinimumAmount = (state: State): number => {
  return state.getIn(['filters', 'minimumAmount']);
};

export const getMaximumAmount = (state: State): ?number => {
  return state.getIn(['filters', 'maximumAmount']);
};

export const getCarerId = (state: State): ?string => {
  return state.getIn(['filters', 'carerId']);
};

export const getClientId = (state: State): ?string => {
  return state.getIn(['filters', 'clientId']);
};

export const getManagerId = (state: State): ?string => {
  return state.getIn(['filters', 'managerId']);
};

export const getServiceToName = (state: State): ?string => {
  return state.getIn(['filters', 'serviceToName']);
};

export const getReference = (state: State): ?string => {
  return state.getIn(['filters', 'reference']);
};

export const getStartDate = (state: State): ?Moment => {
  return state.getIn(['filters', 'startDate']);
};

export const getStartTime = (state: State): ?Moment => {
  return state.getIn(['filters', 'startTime']);
};

export const getEndDate = (state: State): ?Moment => {
  return state.getIn(['filters', 'endDate']);
};

export const getSortOrder = (state: State): string => {
  return state.getIn(['filters', 'sortOrder']);
};

export const getUserType = (state: State): string => {
  return state.getIn(['filters', 'userType']);
};

export const getViewMode = (state: State): string => {
  return state.getIn(['filters', 'viewMode']);
};

export const getDataFor = (state: State): string => {
  return state.getIn(['filters', 'dataFor']);
};

export const getUrlFromFilters = createSelector(
  getMinimumAmount,
  getMaximumAmount,
  getCarerId,
  getClientId,
  getManagerId,
  getServiceToName,
  getReference,
  getStartDate,
  getStartTime,
  getEndDate,
  getSortOrder,
  getViewMode,
  getUserType,
  (
    minimumAmount,
    maximumAmount,
    carerId,
    clientId,
    managerId,
    serviceToName,
    reference,
    startDate,
    startTime,
    endDate,
    sortOrder,
    viewMode,
    userType
  ): string => {
    const sortProps = getSortProperties(sortOrder);
    if (!sortProps) {
      throw new Error(`Invalid sort order: ${sortOrder}`);
    }

    const parts = [];
    parts.push(carerId || clientId || managerId || URL_NULL_PLACEHOLDER);
    parts.push(serviceToName || URL_NULL_PLACEHOLDER);
    parts.push(reference || URL_NULL_PLACEHOLDER);
    parts.push(minimumAmount || URL_NULL_PLACEHOLDER);
    parts.push(maximumAmount || URL_NULL_PLACEHOLDER);
    parts.push(startDate ? startDate.format('YYYYMMDD') : URL_NULL_PLACEHOLDER);
    parts.push(endDate ? endDate.format('YYYYMMDD') : URL_NULL_PLACEHOLDER);
    parts.push(startTime ? startTime.format('hhmm') : URL_NULL_PLACEHOLDER);
    parts.push(sortOrder || '-');
    parts.push(viewMode || '-');
    const prefix = userType === 'carer' ? CARER_URL_PREFIX : CLIENT_URL_PREFIX;

    return prefix + parts.join('/');
  }
);
import moment from 'moment';

export const getQueryFromFilter = createSelector(
  getActiveStates,
  getMinimumAmount,
  getMaximumAmount,
  getCarerId,
  getClientId,
  getManagerId,
  getServiceToName,
  getReference,
  getStartDate,
  getStartTime,
  getEndDate,
  getUserType,
  getSortOrder,
  getViewMode,
  getPerPageSize,
  getCurrentPage,
  getDataFor,
  (
    activeStates: Set<string>,
    minimumAmount,
    maximumAmount,
    carerId,
    clientId,
    managerId,
    serviceToName,
    reference,
    startDate,
    startTime,
    endDate,
    userType,
    sortOrder,
    viewMode,
    perPageSize,
    currentPage,
    dataFor
  ): string => {
    const parts = [];
    const sortProps = getSortProperties(sortOrder);
    if (!sortProps) {
      throw new Error(`Invalid sort order: ${sortOrder}`);
    }

    activeStates.toArray().forEach((state: string) => {
      parts.push(`state[]=${encodeURIComponent(state)}`);
    });

    if (startDate) {
      parts.push('date_from=' + moment(startDate).format('YYYY-MM-DD'));
    }

    if (endDate) {
      parts.push('date_to=' + moment(endDate).format('YYYY-MM-DD'));
    }

    if (startTime) {
      const minutesFromMidnight = momentToMinutesFromMidnight(startTime);
      parts.push(`start_minute_from=${minutesFromMidnight}`);
    }

    if (minimumAmount) {
      parts.push(`amount_from=${minimumAmount}`);
    }

    if (maximumAmount) {
      parts.push(`amount_to=${maximumAmount}`);
    }

    if (carerId) {
      parts.push(`creator_id=${carerId}`);
    }

    if (clientId) {
      parts.push(`user_id=${clientId}`);
    }

    if (managerId) {
      parts.push(`manager_id=${managerId}`);
    }

    if (serviceToName) {
      parts.push(`client_name=${serviceToName}`);
    }

    if (reference) {
      parts.push(`reference=${reference}`);
    }

    if (userType) {
      parts.push(`user_type=${userType}`);
    }

    if (sortProps) {
      parts.push(`sort_field=${sortProps.field}`);
      parts.push(`sort_order=${sortProps.direction}`);
    }

    if (dataFor === 'CSV') {
      viewMode = 'calendar';
    }

    if (viewMode) {
      parts.push(`view_mode=${viewMode}`);
    }
    if (perPageSize) {
      parts.push(`per_page=${perPageSize}`);
    }
    if (currentPage) {
      parts.push(`page=${currentPage}`);
    }

    return parts.join('&');
  }
);

export const getFiltersForCSVDownload = createSelector(
  getActiveStates,
  getMinimumAmount,
  getMaximumAmount,
  getCarerId,
  getClientId,
  getManagerId,
  getServiceToName,
  getReference,
  getStartDate,
  getStartTime,
  getEndDate,
  getUserType,
  getSortOrder,
  getViewMode,
  getPerPageSize,
  getCurrentPage,
  getDataFor,
  (
    activeStates: Set<string>,
    minimumAmount,
    maximumAmount,
    carerId,
    clientId,
    managerId,
    serviceToName,
    reference,
    startDate,
    startTime,
    endDate,
    userType,
    sortOrder
  ): string => {
    const sortProps = getSortProperties(sortOrder);
    var minutesFromMidnight = null;
    if (startTime) {
      minutesFromMidnight = momentToMinutesFromMidnight(startTime);
    }
    const parts = {
      state: activeStates,
      date_from: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
      date_to: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined,
      start_minute_from: minutesFromMidnight,
      amount_from: minimumAmount,
      amount_to: maximumAmount,
      creator_id: carerId,
      user_id: clientId,
      manager_id: managerId,
      client_name: serviceToName,
      reference: reference,
      user_type: userType,
      sort_field: sortProps.field,
      sort_order: sortProps.direction
    };
    return parts;
  }
);

export const getExportUrlFromFilters = createSelector(
  getActiveStates,
  getMinimumAmount,
  getMaximumAmount,
  getCarerId,
  getClientId,
  getManagerId,
  getServiceToName,
  getReference,
  getStartDate,
  getStartTime,
  getEndDate,
  getUserType,
  (
    activeStates: Set<string>,
    minimumAmount,
    maximumAmount,
    carerId,
    clientId,
    managerId,
    serviceToName,
    reference,
    startDate,
    startTime,
    endDate,
    userType
  ): string => {
    const parts = [];

    activeStates.toArray().forEach((state: string) => {
      parts.push(`state[]=${encodeURIComponent(state)}`);
    });

    if (startDate) {
      parts.push(`date_from=${startDate.format('YYYYMMDD')}`);
    }

    if (endDate) {
      parts.push(`date_to=${endDate.format('YYYYMMDD')}`);
    }

    if (startTime) {
      const minutesFromMidnight = momentToMinutesFromMidnight(startTime);
      parts.push(`start_minute_from=${minutesFromMidnight}`);
    }

    if (minimumAmount) {
      parts.push(`amount_from=${minimumAmount}`);
    }

    if (maximumAmount) {
      parts.push(`amount_to=${maximumAmount}`);
    }

    if (carerId) {
      parts.push(`creator_id=${carerId}`);
    }

    if (clientId) {
      parts.push(`user_id=${clientId}`);
    }

    if (managerId) {
      parts.push(`manager_id=${managerId}`);
    }

    if (serviceToName) {
      parts.push(`client_name=${serviceToName}`);
    }

    if (reference) {
      parts.push(`reference=${reference}`);
    }

    if (userType) {
      parts.push(`user_type=${userType}`);
    }

    return `${EXPORT_URL_PREFIX}?${parts.join('&')}`;
  }
);

// REDUCERS

function toggleStateReducer<T: FiltersState>(state: T, orderState: string): T {
  const activeStates = state.get('activeStates');
  if (activeStates.contains(orderState)) {
    return state.set('activeStates', activeStates.delete(orderState));
  }

  return state.set('activeStates', activeStates.add(orderState));
}

function setViewModeReducer<T: FiltersState>(state: T, viewMode: string): T {
  if (VIEW_MODES.has(viewMode) === false) {
    throw new Error(`Invalid view mode: ${viewMode}`);
  }

  return state.set('viewMode', viewMode);
}

export default function reducer<T: FiltersState>(
  state: T = initialState,
  action: Action
): T {
  switch (action.type) {
    case types.SET_MAXIMUM_AMOUNT:
      return state.set('maximumAmount', action.amount);

    case types.SET_MINIMUM_AMOUNT:
      return state.set('minimumAmount', action.amount);

    case types.SET_CARER_ID:
      return state.set('carerId', action.carerId);

    case types.SET_CLIENT_ID:
      return state.set('clientId', action.clientId);

    case types.SET_MANAGER_ID:
      return state.set('managerId', action.managerId);

    case types.SET_SERVICE_TO_NAME:
      return state.set('serviceToName', action.serviceToName);

    case types.SET_REFERENCE:
      return state.set('reference', action.reference);

    case types.SET_START_DATE:
      return state.set('startDate', action.startDate);

    case types.SET_START_TIME:
      return state.set('startTime', action.startTime);

    case types.SET_END_DATE:
      return state.set('endDate', action.endDate);

    case types.SET_SORT_ORDER:
      return state.set('sortOrder', action.sortOrder);

    case types.TOGGLE_STATE:
      return toggleStateReducer(state, action.state);

    case types.SET_ACTIVE_STATES:
      return state.set('activeStates', Set(action.states));

    case types.SET_USER_TYPE:
      return state.set('userType', action.userType);

    case types.SET_DATA_FOR:
      return state.set('dataFor', action.dataFor);

    case types.SET_VIEW_MODE:
      return setViewModeReducer(state, action.viewMode);

    default:
      return state;
  }
}
