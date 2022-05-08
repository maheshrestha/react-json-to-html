// @flow
import { makePagination } from '../definitions/Pagination'
import type { Pagination } from '../definitions/Pagination'
import type { Action, State } from './index'
import { createSelector } from 'reselect'
import { Set } from 'immutable'
export type PaginationAction = {|
  type: "pagination/SET_TOTAL_ENTRIES",
  totalEntries: number,
|} | {|
  type: "pagination/SET_PER_PAGE_SIZE",
  perPageSize: number,
|} | {|
  type: "pagination/SET_CURRENT_PAGE",
  currentPage: number,
|};
export type PaginationState = Pagination;
export const initialState = makePagination()
export const types = {
  SET_TOTAL_ENTRIES: 'pagination/SET_TOTAL_ENTRIES',
  SET_PER_PAGE_SIZE: 'pagination/SET_PER_PAGE_SIZE',
  SET_CURRENT_PAGE: 'pagination/SET_CURRENT_PAGE'
} // ACTIONS

export const setTotalEntries = (totalEntries: number): PaginationAction => {
  return {
    type: types.SET_TOTAL_ENTRIES,
    totalEntries
  }
}
export const setPerPageSize = (perPageSize: number): PaginationAction => {
  return {
    type: types.SET_PER_PAGE_SIZE,
    perPageSize
  }
}
export const setCurrentPage = (currentPage: number): PaginationAction => {
  return {
    type: types.SET_CURRENT_PAGE,
    currentPage
  }
} // SELECTORS

export const getUrlFromPagination = state => {
  const currentPage = getCurrentPage(state)
  const perPageSize = getPerPageSize(state)
  const parts = []
  parts.push(perPageSize || '-')
  parts.push(currentPage || '-')
  return parts.join('/')
}
export const getTotalEntries = (state: State): number => {
  return state.getIn(['pagination', 'totalEntries'])
}
export const getPerPageSize = (state: State): number => {
  return state.getIn(['pagination', 'perPageSize'])
}
export const getCurrentPage = (state: State): number => {
  return state.getIn(['pagination', 'currentPage'])
}
export const getQueryFromPagination = createSelector(getCurrentPage, getPerPageSize, (currentPage, perPageSize): string => {
  const parts = []
  if (currentPage) parts.push(`page=${currentPage}`)
  if (perPageSize) parts.push(`per_page=${perPageSize}`)
  return parts.join('&')
}) // REDUCERS

export default function reducer<T: PaginationState> (state: T = initialState, action: Action): T {
  switch (action.type) {
    case types.SET_TOTAL_ENTRIES:
      return state.set('totalEntries', action.totalEntries)

    case types.SET_CURRENT_PAGE:
      return state.set('currentPage', action.currentPage)

    case types.SET_PER_PAGE_SIZE:
      return state.set('perPageSize', action.perPageSize)

    default:
      return state
  }
}
