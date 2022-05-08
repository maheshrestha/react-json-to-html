// @flow
import { connect } from 'react-redux';
import {{ toCamelCaseAndCapitalize schema.name }} from '../components/{{ toCamelCaseAndCapitalize schema.name }}';
//import NoRecords from '../components/NoRecords';

import { get{{ toCamelCaseAndCapitalize schema.name }}ById } from '../ducks/{{ toCamelCaseString schema.name }}';
import type { State } from '../ducks';
import { toJS } from './toJS';

const makeMapStateToProps = (): Object => {
  const mapStateToProps = (stt: State, ownProps: { id: string }): Object => {
    const {{ toCamelCaseString schema.name }} = get{{ toCamelCaseAndCapitalize schema.name }}ById(stt, ownProps.id);
    if (!{{ toCamelCaseString schema.name }}) {
      throw new Error('Unable to find {{ toCamelCaseString schema.name }} id: ' + ownProps.id);
    }
    const {
      {{#schema.fields}}
      {{schemaField}},
      {{/schema.fields}}
    } = {{ toCamelCaseString schema.name }};
    return {
      {{#schema.fields}}
      {{schemaField}},
      {{/schema.fields}}
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch<*>,
  ownProps: { id: string }
): Object => {
  return {};
};

export type {{ toCamelCaseAndCapitalize schema.name }}ViewProps = {
  {{#schema.fields}}
  {{schemaField}}: {{{unescapeString schemaType}}},
  {{/schema.fields}}
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(toJS({{ toCamelCaseAndCapitalize schema.name }}));
