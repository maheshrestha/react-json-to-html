const { toCamelCaseString, capitalize } = require('./helper')
const getFilesToWriteContainersParams = (arguments, schema, normalizedSchemas,  return_params = []) => {
  for (const property in schema) {
    return_params
      .push(
        {
          source: 'ComponentTemplate/containers/toJS.js',
          destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/containers/toJS.js`,
          parameters: null
        }
      );
    return_params
      .push(
        {
          source: 'ComponentTemplate/containers/App.js',
          destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/containers/App.js`,
          parameters: { 
            recordKey: property
          }
        }
      );
    return_params
      .push(
        {
          source: 'ComponentTemplate/containers/Records.js',
          destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/containers/${capitalize(toCamelCaseString(property))}s.js`,
          parameters: { 
            recordKey: property
          }
        }
      );
    normalizedSchemas.forEach(normalizedSchema => {
      //console.error("normalizedSchemas: ", normalizedSchema.name);
      return_params
        .push(
          {
            source: 'ComponentTemplate/containers/Record.js',
            destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/containers/${capitalize(toCamelCaseString(normalizedSchema.name))}.js`,
            parameters: {
              schema: normalizedSchema
            }
          }
        );
    });
  }
  return return_params;
}
module.exports = {
  getFilesToWriteContainersParams
}