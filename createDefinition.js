const { toCamelCaseString, capitalize } = require("./helper");
const getFilesToWriteDefinationsParams = (
  arguments,
  schema,
  schemaNames,
  return_params = []
) => {
  for (const property in schema) {
    //schemaNames.push({schemaName: property});
    // return_params.push({
    //   source: `${__dirname}/ComponentTemplate/definitions/Pagination.js`,
    //   destination: `./src/${toCamelCaseString(
    //     arguments.componentName
    //   )}/definitions/Pagination.js`,
    //   parameters: null,
    // });
    schemaNames.forEach((normalizedSchema) => {
      return_params.push({
        source: `${__dirname}/ComponentTemplate/definitions/Record.js`,
        destination: `./src/${toCamelCaseString(
          arguments.componentName
        )}/definitions/${capitalize(
          toCamelCaseString(normalizedSchema.name)
        )}.js`,
        parameters: {
          schema: normalizedSchema,
        },
      });
    });
  }
  //console.error("return_params: ", return_params);
  return return_params;
};
module.exports = {
  getFilesToWriteDefinationsParams,
};
