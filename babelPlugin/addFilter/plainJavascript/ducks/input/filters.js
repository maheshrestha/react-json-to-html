import { makeFilters } from "../definitions/Filters";
import { createSelector } from "reselect";
import moment from "moment";

export const initialState = makeFilters();

export const types = {};

export const getUrlFromFilters = createSelector(() => {
  const parts = [];
  return parts.join("/");
});

export const getQueryFromFilter = createSelector(() => {
  const parts = [];
  return parts.join("&");
});

// REDUCERS
export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
