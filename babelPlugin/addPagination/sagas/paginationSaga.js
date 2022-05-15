const { generateImportDeclaration } = require("../../babelHelper");
const { toCamelCase } = require("../../helper");

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "saga/paginationSaga", // not required
    visitor: {
      Program(path, state) {
        // const b = path.node.body;
        // generateImportDeclaration(
        //   t,
        //   b,
        //   "FILTER_PARAM_NAME",
        //   "FILTER_PARAM_NAME",
        //   `../../${state.opts.componentName}/constants`
        // );
      },
    },
  };
};
