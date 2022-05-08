import React from 'react';
import { Button } from 'antd'

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
          <span>Per page: </span>
          <select onChange={props.onSizeChange} data-name="perPage" defaultValue={props.perPageSize}>
            <option value="10">10</option>
            {PaginationData.totalRecords > 10 && <option value="25">25</option>}
            {PaginationData.totalRecords > 25 && <option value="50">50</option>}
            {PaginationData.totalRecords > 50 && <option value="100">100</option>}
          </select>
          <small> {PaginationData.pageOffsetStart} - {PaginationData.pageOffsetEnd} of <span>{PaginationData.totalRecords}</span></small>
          {
            hasPreviousPage &&
            <Button type="link" 
            data-name="previousPage" data-value={PaginationData.previousPage} onClick={() => props.onChange(PaginationData.previousPage)}>&laquo; Prev</Button>
          }
          {
            hasNextPage &&
            <Button type="link" data-name="nextPage" data-value={PaginationData.nextPage} onClick={() => props.onChange(PaginationData.nextPage)}>Next &raquo;</Button>
            
          }
        </div>
      </div>
    )
}

export default Pagination
