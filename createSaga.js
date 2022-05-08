const { toCamelCaseString, pathToComponentTemplate } = require("./helper");
const getFilesToWriteSagaParams = (arguments, schemaNames) => {
  const pathToComponent = pathToComponentTemplate(arguments.language);
  const camelCaseComponentName = toCamelCaseString(arguments.componentName);
  let return_params = [];
  return_params.push({
    source: `${pathToComponent}/sagas/index.js`,
    destination: `./src/${camelCaseComponentName}/sagas/index.js`,
    parameters: {
      componentName: camelCaseComponentName,
    },
  });
  return_params.push({
    source: `${pathToComponent}/sagas/recordSagas.js`,
    destination: `./src/${camelCaseComponentName}/sagas/${camelCaseComponentName}Sagas.js`,
    parameters: {
      schemas: schemaNames,
      componentName: camelCaseComponentName,
    },
  });
  return return_params;
};
module.exports = {
  getFilesToWriteSagaParams,
};
