import { connect } from 'react-redux';
import { toJS } from './toJS';
import {{ toCamelCaseAndCapitalize schema.name }} from '../components/{{ toCamelCaseAndCapitalize schema.name }}';
import { get{{ toCamelCaseAndCapitalize schema.name }}ById } from '../ducks/{{ toCamelCaseString schema.name }}';

const makeMapStateToProps = () => {
  const mapStateToProps = (stt, ownProps) => {
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
  dispatch,
  ownProps
) => {
  return {};
};


export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(toJS({{ toCamelCaseAndCapitalize schema.name }}));
