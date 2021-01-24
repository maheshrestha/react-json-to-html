import React from 'react'

export const Pagination = props => {
  const PaginationData = {
    pageOffsetStart: (props.currentPage === 1) ? 1 : props.perPage * props.currentPage - props.perPage + 1,
    pageOffsetEnd: (props.currentPage === 1) ? props.perPage * props.currentPage : props.perPage * props.currentPage,
    totalRecords: props.totalRecords,
    hasNextPage: props.hasNextPage,
    hasPreviousPage: props.hasPreviousPage,
    nextPage: props.currentPage+1,
    previousPage:props.currentPage-1
  };
  return (
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="mt-page">
            <ul>
              <li className="mt-page-tt">Row per page:
                <select value={props.perPage} onChange={props.handleChange} data-name="perPage">
                  <option value="10">10</option>
                  {PaginationData.totalRecords > 10 && <option value="25">25</option>}
                  {PaginationData.totalRecords > 25 && <option value="50">50</option>}
                  {PaginationData.totalRecords > 50 && <option value="100">100</option>}
                </select>
              </li>
              <li className="mt-page-tt">
                {PaginationData.pageOffsetStart}-{PaginationData.pageOffsetEnd} of <span>{PaginationData.totalRecords}</span>
                {
                  PaginationData.hasPreviousPage &&
                  <i className="fal fa-angle-left" data-name="previousPage" data-value={PaginationData.previousPage} onClick={props.handleChange}></i>
                }
                {
                  PaginationData.hasNextPage &&
                  <i className="fal fa-angle-right" data-name="nextPage" data-value={PaginationData.nextPage} onClick={props.handleChange}></i>
                }
              </li>
            </ul>
          </div>
         </div>
      </div>
    )
}

export default Pagination
