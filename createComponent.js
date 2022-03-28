const { toCamelCaseString, capitalize } = require("./helper");
const getFilesToWriteComponentsParams = (
  arguments,
  schema,
  normalizedSchemas,
  return_params = []
) => {
  return_params.push({
    source: "ComponentTemplate/components/Loading.jsx",
    destination: `../react-app/src/${toCamelCaseString(
      arguments.componentName
    )}/components/Loading.jsx`,
    parameters: null,
  });
  return_params.push({
    source: "ComponentTemplate/components/LoadingRequest.jsx",
    destination: `../react-app/src/${toCamelCaseString(
      arguments.componentName
    )}/components/LoadingRequest.jsx`,
    parameters: null,
  });
  return_params.push({
    source: "ComponentTemplate/components/Spinner.jsx",
    destination: `../react-app/src/${toCamelCaseString(
      arguments.componentName
    )}/components/Spinner.jsx`,
    parameters: null,
  });
  return_params.push({
    source: "ComponentTemplate/components/NoRecords.jsx",
    destination: `../react-app/src/${toCamelCaseString(
      arguments.componentName
    )}/components/NoRecords.jsx`,
    parameters: null,
  });

  for (const property in schema) {
    return_params.push({
      source: "ComponentTemplate/components/App.jsx",
      destination: `../react-app/src/${toCamelCaseString(
        arguments.componentName
      )}/components/App.jsx`,
      parameters: {
        componentName: property,
      },
    });
  }
  normalizedSchemas.forEach((normalizedSchema) => {
    return_params.push({
      source: "ComponentTemplate/components/Records.jsx",
      destination: `../react-app/src/${toCamelCaseString(
        arguments.componentName
      )}/components/${capitalize(
        toCamelCaseString(normalizedSchema.name)
      )}s.jsx`,
      parameters: {
        schema: normalizedSchema,
      },
    });
    return_params.push({
      source: "ComponentTemplate/components/RecordsTable.jsx",
      destination: `../react-app/src/${toCamelCaseString(
        arguments.componentName
      )}/components/${capitalize(
        toCamelCaseString(normalizedSchema.name)
      )}sTable.jsx`,
      parameters: {
        schema: normalizedSchema,
      },
    });
    return_params.push({
      source: "ComponentTemplate/components/Record.jsx",
      destination: `../react-app/src/${toCamelCaseString(
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
  //         source: 'ComponentTemplate/components/Record.jsx',
  //         destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/components/${capitalize(toCamelCaseString(normalizedSchema.name))}.jsx`,
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
