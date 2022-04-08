const { toCamelCaseString, capitalize } = require("./helper");
const getFilesToWriteContainersParams = (
  arguments,
  schema,
  normalizedSchemas,
  return_params = []
) => {
  for (const property in schema) {
    if (!!schema[property] && typeof schema[property] === "object") {
      return_params.push({
        source: `${__dirname}/ComponentTemplate/containers/toJS.js`,
        destination: `./src/${toCamelCaseString(
          arguments.componentName
        )}/containers/toJS.js`,
        parameters: null,
      });
      return_params.push({
        source: `${__dirname}/ComponentTemplate/containers/App.js`,
        destination: `./src/${toCamelCaseString(
          arguments.componentName
        )}/containers/App.js`,
        parameters: {
          recordKey: property,
        },
      });
      return_params.push({
        source: `${__dirname}/ComponentTemplate/containers/Records.js`,
        destination: `./src/${toCamelCaseString(
          arguments.componentName
        )}/containers/${capitalize(toCamelCaseString(property))}s.js`,
        parameters: {
          recordKey: property,
        },
      });
      normalizedSchemas.forEach((normalizedSchema) => {
        //console.error("normalizedSchemas: ", normalizedSchema.name);
        return_params.push({
          source: `${__dirname}/ComponentTemplate/containers/Record.js`,
          destination: `./src/${toCamelCaseString(
            arguments.componentName
          )}/containers/${capitalize(
            toCamelCaseString(normalizedSchema.name)
          )}.js`,
          parameters: {
            schema: normalizedSchema,
          },
        });
      });
    }
  }
  return return_params;
};
module.exports = {
  getFilesToWriteContainersParams,
};
