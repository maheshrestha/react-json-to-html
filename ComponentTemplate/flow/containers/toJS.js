// @flow
import * as React from 'react';
import { Iterable } from 'immutable';
import entries from 'lodash-es/entries';

export const toJS = (WrappedComponent: React.ComponentType<any>): any => (
  wrappedComponentProps: Object
): any => {
  const KEY = 0;
  const VALUE = 1;

  const propsJS = entries(wrappedComponentProps).reduce(
    (newProps: any, wrappedComponentProp: any): any => {
      newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
        wrappedComponentProp[VALUE]
      )
        ? wrappedComponentProp[VALUE].toJS()
        : wrappedComponentProp[VALUE];
      return newProps;
    },
    {}
  );

  return <WrappedComponent {...propsJS} />;
};
