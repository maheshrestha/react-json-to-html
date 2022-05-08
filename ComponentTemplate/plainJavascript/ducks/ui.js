import { Map } from "immutable";

export const initialState = Map({
  isLoading: false,
  lastLoadTimestamp: undefined,
});

export const types = {
  SET_LOAD_TIMESTAMP: "ui/SET_LOAD_TIMESTAMP",
  SET_IS_LOADING: "ui/SET_IS_LOADING",
};

// ACTIONS
export const setLoadTimestamp = (timestamp) => {
  return {
    type: types.SET_LOAD_TIMESTAMP,
    timestamp,
  };
};

export const setIsLoading = (isLoading) => {
  return {
    type: types.SET_IS_LOADING,
    isLoading,
  };
};

// SELECTORS
export const isLoading = (state) => {
  return state.getIn(["ui", "isLoading"]);
};

export const getLoadTimestamp = (state) => {
  return state.getIn(["ui", "lastLoadTimestamp"]);
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOAD_TIMESTAMP:
      return state.set("lastLoadTimestamp", action.timestamp);
    case types.SET_IS_LOADING:
      return state.set("isLoading", action.isLoading);
    default:
      return state;
  }
}
