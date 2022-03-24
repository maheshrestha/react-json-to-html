import * as React from 'react'
export const SORT_VALUES = new Map([
  [
    'created_at_desc',
    {
      value: 'created_at_desc',
      reverse_value: 'created_at_asc',
      label: <i className="fa fa-sort-down" data-value="created_at_asc"></i>,
      field: 'created_at',
      query_field: 'createdAt',
      direction: ORDER_DESC
    }
  ],
  [
    'created_at_asc',
    {
      value: 'created_at_asc',
      reverse_value: 'created_at_desc',
      label: <i className="fa fa-sort-up" data-value="created_at_desc"></i>,
      field: 'created_at',
      query_field: 'createdAt',
      direction: ORDER_ASC
    }
  ]
]);

export const DEFAULT_SORT_BY = 'created_at_desc';

export const RECORDS_PER_PAGE = 10;
