const { toCamelCaseString, capitalize } = require("./helper");
const getFilesToWriteComponentsParams = (
  arguments,
  schema,
  normalizedSchemas,
  return_params = []
) => {
  return_params.push({
    source: `${__dirname}/ComponentTemplate/components/Loading.jsx`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/components/Loading.jsx`,
    parameters: null,
  });
  return_params.push({
    source: `${__dirname}/ComponentTemplate/components/LoadingRequest.jsx`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/components/LoadingRequest.jsx`,
    parameters: null,
  });
  return_params.push({
    source: `${__dirname}/ComponentTemplate/components/Spinner.jsx`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/components/Spinner.jsx`,
    parameters: null,
  });
  return_params.push({
    source: `${__dirname}/ComponentTemplate/components/NoRecords.jsx`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/components/NoRecords.jsx`,
    parameters: null,
  });

  for (const property in schema) {
    return_params.push({
      source: `${__dirname}/ComponentTemplate/components/App.jsx`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/components/App.jsx`,
      parameters: {
        componentName: property,
      },
    });
  }
  normalizedSchemas.forEach((normalizedSchema) => {
    return_params.push({
      source: `${__dirname}/ComponentTemplate/components/Records.jsx`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/components/${capitalize(
        toCamelCaseString(normalizedSchema.name)
      )}s.jsx`,
      parameters: {
        schema: normalizedSchema,
      },
    });
    return_params.push({
      source: `${__dirname}/ComponentTemplate/components/RecordsTable.jsx`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/components/${capitalize(
        toCamelCaseString(normalizedSchema.name)
      )}sTable.jsx`,
      parameters: {
        schema: normalizedSchema,
      },
    });
    return_params.push({
      source: `${__dirname}/ComponentTemplate/components/Record.jsx`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/components/${capitalize(
        toCamelCaseString(normalizedSchema.name)
      )}.jsx`,
      parameters: {
        schema: normalizedSchema,
      },
    });
  });
  // normalizedSchemas.forEach(normalizedSchema => {
  //   //console.error("normalizedSchemas: ", normalizedSchema.name);
  //   return_params
  //     .push(
  //       {
  //         source: `${__dirname}/ComponentTemplate/components/Record.jsx`,
  //         destination: `./src/${toCamelCaseString(arguments.componentName)}/components/${capitalize(toCamelCaseString(normalizedSchema.name))}.jsx`,
  //         parameters: {
  //           schema: normalizedSchema
  //         }
  //       }
  //     );
  // });
  return return_params;
};
module.exports = {
  getFilesToWriteComponentsParams,
};
