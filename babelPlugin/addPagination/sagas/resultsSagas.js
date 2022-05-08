const { generateImportDeclaration } = require("../../babelHelper");
const { looksLike, toCamelCaseString, capitalize } = require("../../../helper");
module.exports = function (babel) {
  const { types: t } = babel;
  return {
    name: "Update ResultSagas.js",
    visitor: {
      Program(type) {
        const body = type.node.body;
        generateImportDeclaration(
          t,
          body,
          "setTotalEntries, getQueryFromPagination",
          "setTotalEntries, getQueryFromPagination",
          "../../common/ducks/pagination"
        );
        generateImportDeclaration(
          t,
          body,
          "select",
          "select",
          "redux-saga/effects"
        );
      },
      FunctionDeclaration(type, state) {
        const node = type.node;
        const componentName = state.opts.componentName;
        const paginationKey = state.opts.paginationKey;
        const totalEntriesKey = state.opts.totalEntriesKey;
        node.body.body.forEach((b) => {
          if (looksLike(b, { type: "VariableDeclaration" })) {
            b.declarations.forEach((declaration) => {
              if (declaration.id.name === "queryParams") {
                declaration.init.callee.object.elements.push(
                  t.Identifier("yield select(getQueryFromPagination)")
                );
                // declaration.init = t.YieldExpression(t.CallExpression(t.Identifier("select"), [t.Identifier("getQueryFromFilter")]))
              }
            });
          }
        });
        if (node.id.name === `load${capitalize(componentName)}Saga`) {
          const dataIfStatementBody = node.body.body.find(
            (nb) =>
              nb.type === "IfStatement" &&
              nb.test.name &&
              nb.test.name === "data"
          );
          const resultVariableDeclarations =
            dataIfStatementBody.consequent.body.filter(
              (r) => r.type === "VariableDeclaration"
            );
          const resultVariableDeclarator = resultVariableDeclarations
            .find((d) => d.declarations.find((s) => s.init.name === "entities"))
            .declarations.find((d) => d.init.name === "entities");
          if (
            resultVariableDeclarator.id.properties.find(
              (r) => r.key.name === toCamelCaseString(paginationKey)
            )
          ) {
            dataIfStatementBody.consequent.body.push(
              t.Identifier(
                `yield put(setTotalEntries(Object.values(${toCamelCaseString(
                  paginationKey
                )})[0].${toCamelCaseString(totalEntriesKey)}));`
              )
              // t.Identifier("yield put(setTotalEntries(totalEntries));")
            );
          } else {
            console.log("Pagination key not found");
          }
        }
      },
    },
  };
};
