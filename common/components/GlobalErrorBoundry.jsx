// @flow
import * as React from 'react';

type GlobalErrorBoundryProps = {
  children?: React.Node
};

type GlobalErrorBoundryState = {
  hasError: boolean
};

class GlobalErrorBoundry extends React.Component<GlobalErrorBoundryProps, GlobalErrorBoundryState> {
  constructor(props: GlobalErrorBoundryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render(): React.Node {
    if (this.state.hasError) {
      return (
        <div className="ordersListing-globalError">
          <h2>Oh my...</h2>
          <p>There is an error preventing us from displaying your bookings at the moment.</p>
          <p>Our engineers have been notified, and will fix this issue as soon as possible.</p>
          <p>We are sorry for the inconvenience!</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundry;
