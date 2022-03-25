// @flow
import * as React from 'react';

type FiltersProps = {
  filtersUrl: string,
  setFiltersFromUrl: () => void
};

class Filters extends React.Component<FiltersProps> {
  render(): React.Node {

    return (
      <div className="filters-wrapper" role="group">

      </div>
    );
  }
}

export default Filters;
