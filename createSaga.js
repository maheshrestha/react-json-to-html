const { toCamelCaseString, capitalize } = require('./helper')
const getFilesToWriteSagaParams = (arguments, schema, return_params = []) => {
  console.error("schema: ", schema);
  for (const property in schema) {
    var propertyToCamelCaseString = toCamelCaseString(property);
    console.error("property: ", property);
    return_params
      .push(
        {
          source: 'ComponentTemplate/sagas/index.js',
          destination: `./components/${toCamelCaseString(arguments.componentName)}/sagas/index.js`,
          parameters: { 
            componentName: propertyToCamelCaseString
          }
        }
      );
    return_params
      .push(
        {
          source: 'ComponentTemplate/sagas/recordSagas.js',
          destination: `./components/${toCamelCaseString(arguments.componentName)}/sagas/${propertyToCamelCaseString}Sagas.js`,
          parameters: { 
            componentName: capitalize(propertyToCamelCaseString),
            uncapitalizedComponentName: propertyToCamelCaseString,
            recordKey: property
          }
        }
      );
  }
  console.error("return_params: ", return_params);
  return return_params;
}
module.exports = {
  getFilesToWriteSagaParams
}