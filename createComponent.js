const {
  toCamelCaseString,
  capitalize,
  pathToComponentTemplate,
} = require("./helper");
const getFilesToWriteComponentsParams = (
  arguments,
  schema,
  normalizedSchemas,
  return_params = []
) => {
  const pathToTemplate = pathToComponentTemplate(arguments.language);
  return_params.push({
    source: `${pathToTemplate}/components/Loading.jsx`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/components/Loading.jsx`,
    parameters: null,
  });
  return_params.push({
    source: `${pathToTemplate}/components/LoadingRequest.jsx`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/components/LoadingRequest.jsx`,
    parameters: null,
  });
  return_params.push({
    source: `${pathToTemplate}/components/Spinner.jsx`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/components/Spinner.jsx`,
    parameters: null,
  });
  return_params.push({
    source: `${pathToTemplate}/components/NoRecords.jsx`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/components/NoRecords.jsx`,
    parameters: null,
  });
  return_params.push({
    source: `${pathToTemplate}/components/App.jsx`,
    destination: `./src/${toCamelCaseString(
      arguments.componentName
    )}/components/App.jsx`,
    parameters: {
      schemas: normalizedSchemas,
    },
  });
  normalizedSchemas.forEach((normalizedSchema) => {
    return_params.push({
      source: `${pathToTemplate}/components/Records.jsx`,
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
      source: `${pathToTemplate}/components/RecordsTable.jsx`,
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
      source: `${pathToTemplate}/components/Record.jsx`,
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
  //         source: `${pathToTemplate}/components/Record.jsx`,
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
