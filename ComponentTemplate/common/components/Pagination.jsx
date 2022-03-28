import React from 'react'

export const Pagination = props => {
  const PaginationData = {
    pageOffsetStart: (props.currentPage === 1) ? 1 : props.perPageSize * props.currentPage - props.perPageSize + 1,
    pageOffsetEnd: (props.currentPage === 1) ? props.perPageSize * props.currentPage : props.perPageSize * props.currentPage,
    totalRecords: props.totalRecords,
    hasNextPage: props.hasNextPage,
    hasPreviousPage: props.hasPreviousPage,
    nextPage: props.currentPage+1,
    previousPage:props.currentPage-1
  };
  PaginationData.pageOffsetEnd = PaginationData.pageOffsetEnd > PaginationData.totalRecords ? PaginationData.totalRecords : PaginationData.pageOffsetEnd;
  const hasNextPage = PaginationData.pageOffsetEnd < PaginationData.totalRecords ? true : false;
  const hasPreviousPage = PaginationData.pageOffsetStart > 1 && PaginationData.totalRecords > 1 ? true : false;
  return (
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="mt-page">
            <ul>
              <li className="mt-page-tt">
                {PaginationData.pageOffsetStart}-{PaginationData.pageOffsetEnd} of <span>{PaginationData.totalRecords}</span>
                {
                  hasPreviousPage &&
                  <i className="fal fa-angle-left" data-name="previousPage" data-value={PaginationData.previousPage} onClick={() => props.onChange(PaginationData.previousPage)}> Prev</i>
                }
                {
                  hasNextPage &&
                  <i className="fal fa-angle-right" data-name="nextPage" data-value={PaginationData.nextPage} onClick={() => props.onChange(PaginationData.nextPage)}> Next</i>
                }
              </li>
              <li className="mt-page-tt">Per page:
                <select onChange={props.onSizeChange} data-name="perPage" defaultValue={props.perPageSize}>
                  <option value="10">10</option>
                  {PaginationData.totalRecords > 10 && <option value="25">25</option>}
                  {PaginationData.totalRecords > 25 && <option value="50">50</option>}
                  {PaginationData.totalRecords > 50 && <option value="100">100</option>}
                </select>
              </li>
            </ul>
          </div>
         </div>
      </div>
    )
}

export default Pagination
