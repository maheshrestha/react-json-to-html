const {
  toCamelCaseString,
  capitalize,
  pathToComponentTemplate,
} = require("./helper");
const getFilesToWriteContainersParams = (
  arguments,
  schema,
  normalizedSchemas,
  return_params = []
) => {
  const pathToTemplate = pathToComponentTemplate(arguments.language);
  for (const property in schema) {
    if (!!schema[property] && typeof schema[property] === "object") {
      return_params.push({
        source: `${pathToTemplate}/containers/toJS.js`,
        destination: `./src/${toCamelCaseString(
          arguments.componentName
        )}/containers/toJS.js`,
        parameters: null,
      });
      return_params.push({
        source: `${pathToTemplate}/containers/App.js`,
        destination: `./src/${toCamelCaseString(
          arguments.componentName
        )}/containers/App.js`,
        parameters: {
          componentName: arguments.componentName,
        },
      });
    }
  }
  normalizedSchemas.forEach((normalizedSchema) => {
    return_params.push({
      source: `${pathToTemplate}/containers/Records.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/containers/${capitalize(
        toCamelCaseString(normalizedSchema.name)
      )}s.js`,
      parameters: {
        recordKey: normalizedSchema.name,
      },
    });
    return_params.push({
      source: `${pathToTemplate}/containers/Record.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/containers/${capitalize(toCamelCaseString(normalizedSchema.name))}.js`,
      parameters: {
        schema: normalizedSchema,
      },
    });
  });
  return return_params;
};
module.exports = {
  getFilesToWriteContainersParams,
};
