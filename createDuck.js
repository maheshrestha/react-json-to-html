const {
  toCamelCaseString,
  capitalize,
  pathToComponentTemplate,
} = require("./helper");
const getFilesToWriteDucksParams = (
  arguments,
  apiListOutput,
  schemaNames,
  return_params = []
) => {
  const pathToTemplate = pathToComponentTemplate(arguments.language);
  // return_params.push({
  //   source: `${pathToTemplate}/ducks/listing.js`,
  //   destination: `./src/${toCamelCaseString(
  //     arguments.componentName
  //   )}/ducks/listing.js`,
  //   parameters: {
  //     componentName: arguments.componentName,
  //     schemas: Object.keys(apiListOutput).map(function (key, index) {
  //       if (Array.isArray(apiListOutput[key])) return { name: key };
  //     }),
  //   },
  // });
  return_params.push({
    source: `${pathToTemplate}/ducks/index.js`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/ducks/index.js`,
    parameters: {
      schemas: schemaNames,
    },
  });
  return_params.push({
    source: `${pathToTemplate}/ducks/common.js`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/ducks/common.js`,
    parameters: null,
  });
  return_params.push({
    source: `${pathToTemplate}/ducks/ui.js`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/ducks/ui.js`,
    parameters: null,
  });
  schemaNames.forEach((schema) => {
    return_params.push({
      source: `${pathToTemplate}/ducks/record.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/ducks/${toCamelCaseString(schema.name)}.js`,
      parameters: {
        schemaName: schema.name,
      },
    });
  });
  return return_params;
};
module.exports = {
  getFilesToWriteDucksParams,
};
