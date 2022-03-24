const { generateImportDeclaration } = require("../../babelHelper");
const { toCamelCase } = require("../../helper");

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "saga/paginationSaga", // not required
    visitor: {
      Program(path) {
        const setFieldNameToImport = toCamelCase(`set_${fieldName}`);
        const b = path.node.body;
        generateImportDeclaration(
          t,
          b,
          setFieldNameToImport,
          setFieldNameToImport,
          "../ducks/pagination"
        );
      },
      FunctionDeclaration(path, state) {
        if (path.node.id.name === "setPaginationFromUrlSaga") {
          const fieldName = state.opts.fieldName;
          const setFieldNameToImportMethod = toCamelCase(`set_${fieldName}`);
          const camelCaseFieldName = toCamelCase(fieldName);
          const matchesElements = path.node.body.body
            .find(
              (p) =>
                !!p.declarations &&
                p.declarations.find((s) => s.init.name === "matches")
            )
            .declarations.find((a) => a.init.name === "matches").id.elements;
          matchesElements.push(t.Identifier(camelCaseFieldName));
          path.node.body.body.push(
            t.Identifier(
              `yield put(${setFieldNameToImportMethod}(getStateReadyNumber(${camelCaseFieldName})));`
            )
          );
        }
      },
    },
  };
};
