const {
  toCamelCaseString,
  capitalize,
  pathToComponentTemplate,
} = require("./helper");
const getFilesToWriteDefinationsParams = (
  arguments,
  schemaNames,
  return_params = []
) => {
  const pathTOComponent = pathToComponentTemplate(arguments.language);
  schemaNames.forEach((normalizedSchema) => {
    return_params.push({
      source: `${pathTOComponent}/definitions/Record.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/definitions/${capitalize(
        toCamelCaseString(normalizedSchema.name)
      )}.js`,
      parameters: {
        schema: normalizedSchema,
        schemaHasIdKey: normalizedSchema.fields.find(
          (s) => s.schemaField === "id"
        ),
        schemaHasOrderedSet: normalizedSchema.fields.find(
          (s) => s.defaultValue === "OrderedSet()"
        ),
      },
    });
  });
  return return_params;
};
module.exports = {
  getFilesToWriteDefinationsParams,
};
