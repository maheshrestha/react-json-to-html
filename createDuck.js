const { toCamelCaseString, capitalize } = require("./helper");
const getFilesToWriteDucksParams = (
  arguments,
  schema,
  schemaNames,
  return_params = []
) => {
  for (const property in schema) {
    //schemaNames.push({schemaName: property});
    return_params.push({
      source: `${__dirname}/ComponentTemplate/ducks/index.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/ducks/index.js`,
      parameters: {
        recordKey: property,
        schemas: schemaNames,
      },
    });
    return_params.push({
      source: `${__dirname}/ComponentTemplate/ducks/listing.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/ducks/listing.js`,
      parameters: {
        recordKey: property,
      },
    });
    return_params.push({
      source: `${__dirname}/ComponentTemplate/ducks/common.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/ducks/common.js`,
      parameters: null,
    });
    // return_params
    //   .push(
    //     {
    //       source: `${__dirname}/ComponentTemplate/ducks/queryParams.js`,
    //       destination: `./src/${toCamelCaseString(arguments.componentName)}/ducks/queryParams.js`,
    //       parameters: null
    //     }
    //   );
    return_params.push({
      source: `${__dirname}/ComponentTemplate/ducks/ui.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/ducks/ui.js`,
      parameters: null,
    });
    schemaNames.forEach((schema) => {
      return_params.push({
        source: `${__dirname}/ComponentTemplate/ducks/record.js`,
        destination: `./src/${toCamelCaseString(
          arguments.componentName
        )}/ducks/${toCamelCaseString(schema.name)}.js`,
        parameters: {
          schemaName: schema.name,
        },
      });
    });
  }
  return return_params;
};
module.exports = {
  getFilesToWriteDucksParams,
};
