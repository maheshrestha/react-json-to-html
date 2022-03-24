const { generateImportDeclaration } = require("../../babelHelper");
const { looksLike } = require("../../helper");
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
      },
      FunctionDeclaration(type) {
        const node = type.node;
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
        if (node.id.name === "loadResultsSaga") {
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
            .find((d) => d.declarations.find((s) => s.init.name === "result"))
            .declarations.find((d) => d.init.name === "result");
          if (
            !resultVariableDeclarator.id.properties.find(
              (r) =>
                r.value.name === "totalEntries" &&
                r.key.name === "total_entries"
            )
          ) {
            resultVariableDeclarator.id.properties.push(
              t.Identifier("total_entries: totalEntries")
            );
            dataIfStatementBody.consequent.body.push(
              t.Identifier("yield put(setTotalEntries(totalEntries));")
            );
          }
        }
      },
    },
  };
};
