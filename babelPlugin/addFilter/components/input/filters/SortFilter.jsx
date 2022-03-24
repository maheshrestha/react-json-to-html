// @flow
import * as React from 'react';

import { getSortSelectOptions } from '../../helpers/sorting';

type SortFilterProps = {
  value: string,
  sortBy: string,
  onChange: (value: string) => () => void
};

class SortFilter extends React.Component<SortFilterProps> {
  render(): React.Node {
    const { onChange, value, sortBy } = this.props;
    const opts = getSortSelectOptions();
    const selected_opt = opts.filter((opt): boolean => { return opt.value === value });
    const current_field_opt = opts.filter((opt): boolean => { return opt.field === sortBy && opt.direction === selected_opt[0].direction });

    return (
      <span onClick={onChange}>
        {selected_opt[0].value == current_field_opt[0].value && current_field_opt[0].label}
        {selected_opt[0].value != current_field_opt[0].value && <i className="fa fa-sort" data-value={current_field_opt[0].value}></i>}
      </span>
    );
  }ß
}

export default SortFilter;
