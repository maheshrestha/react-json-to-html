const { toCamelCaseString, capitalize } = require("./helper");
const getFilesToWriteSagaParams = (
  arguments,
  schema,
  schemaNames,
  return_params = []
) => {
  for (const property in schema) {
    var propertyToCamelCaseString = toCamelCaseString(property);
    return_params.push({
      source: `${__dirname}/ComponentTemplate/sagas/index.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/sagas/index.js`,
      parameters: {
        componentName: propertyToCamelCaseString,
      },
    });
    return_params.push({
      source: `${__dirname}/ComponentTemplate/sagas/recordSagas.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/sagas/${propertyToCamelCaseString}Sagas.js`,
      parameters: {
        schemas: schemaNames,
        recordsKey: property,
      },
    });
  }
  return return_params;
};
module.exports = {
  getFilesToWriteSagaParams,
};
