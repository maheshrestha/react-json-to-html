// @flow
import * as React from 'react';

type FiltersProps = {
  filtersUrl: string,
  setFiltersFromUrl: () => void
};

class Filters extends React.Component<FiltersProps> {
  componentWillReceiveProps(nextProps: FiltersProps) {
    if (nextProps.filtersUrl !== this.props.filtersUrl) {
      window.history.pushState(nextProps.filtersUrl, 'My App', "/" + nextProps.filtersUrl);
    }
  }

  componentDidMount() {
    window.addEventListener('popstate', this.props.setFiltersFromUrl);
  }

  render(): React.Node {

    return (
      <div className="ordersListing-filters" role="group">

      </div>
    );
  }
}

export default Filters;
