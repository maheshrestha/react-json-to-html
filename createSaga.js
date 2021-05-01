const { toCamelCaseString, capitalize } = require('./helper')
const getFilesToWriteSagaParams = (arguments, schema, schemaNames,  return_params = []) => {
  for (const property in schema) {
    var propertyToCamelCaseString = toCamelCaseString(property);
    return_params
      .push(
        {
          source: 'ComponentTemplate/sagas/index.js',
          destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/sagas/index.js`,
          parameters: { 
            componentName: propertyToCamelCaseString
          }
        }
      );
    return_params
      .push(
        {
          source: 'ComponentTemplate/sagas/recordSagas.js',
          destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/sagas/${propertyToCamelCaseString}Sagas.js`,
          parameters: { 
            schemas: schemaNames,
            recordsKey: property
          }
        }
      );
  }
  return return_params;
}
module.exports = {
  getFilesToWriteSagaParams
}