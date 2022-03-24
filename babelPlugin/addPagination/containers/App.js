const { generateImportDeclaration } = require("../../babelHelper");
const { looksLike } = require("../../helper");
module.exports = function (babel, state) {
  const { types: t } = babel;
  return {
    name: "Update containers/app.js", // not required
    visitor: {
      Program(path, state) {
        const body = path.node.body;
        generateImportDeclaration(
          t,
          body,
          "setPaginationFromUrl",
          "setPaginationFromUrl",
          "../../common/sagas/paginationSaga"
        );
        generateImportDeclaration(
          t,
          body,
          "getUrlFromPagination",
          "getUrlFromPagination",
          "../../common/ducks/pagination"
        );
        generateImportDeclaration(
          t,
          body,
          "URL_REGEXPS",
          "URL_REGEXPS",
          "../constants"
        );

        const exportDefaultDeclaration = body.find(
          (b) => b.type === "ExportDefaultDeclaration"
        );

        const mapStateToPropsConstName =
          exportDefaultDeclaration.declaration.callee.arguments[0].name;

        const mapStateToPropsNode = body.find(
          (b) =>
            b.type === "VariableDeclaration" &&
            b.declarations &&
            b.declarations.some((d) => d.id.name === mapStateToPropsConstName)
        );
        mapStateToPropsNode.declarations[0].init.body.body.forEach((b) => {
          if (looksLike(b, { type: "VariableDeclaration" })) {
            b.declarations.forEach((declaration) => {
              if (declaration.id.name === "url") {
                declaration.init.callee.object.elements.push(
                  t.Identifier("getUrlFromPagination(state)")
                );
                // declaration.init = t.YieldExpression(t.CallExpression(t.Identifier("select"), [t.Identifier("getQueryFromFilter")]))
              }
            });
          }
        });

        const mapDispatchToPropsConstName =
          exportDefaultDeclaration.declaration.callee.arguments[1].name;
        const mapDispatchToPropsNode = body.find(
          (b) =>
            b.type === "VariableDeclaration" &&
            b.declarations &&
            b.declarations.some(
              (d) => d.id.name === mapDispatchToPropsConstName
            )
        );
        const mapDispatchToPropsDeclarator =
          mapDispatchToPropsNode.declarations.find(
            (d) => d.id.name === mapDispatchToPropsConstName
          );
        const mapDispatchToPropsArrowFunctionReturnStatement =
          mapDispatchToPropsDeclarator.init.body.body.find(
            (b) => b.type === "ReturnStatement"
          );
        const mapDispatchToPropsArrowFunctionReturnStatementObjectPropertyWithNameAsInitialize =
          mapDispatchToPropsArrowFunctionReturnStatement.argument.properties.find(
            (p) => p.key.name === "initialize"
          );

        const mapDispatchToPropsOnSubmitFunctionBody =
          mapDispatchToPropsArrowFunctionReturnStatementObjectPropertyWithNameAsInitialize
            .value.body.body;
        if (
          !mapDispatchToPropsOnSubmitFunctionBody.find(
            (m) =>
              m.expression.callee.name === "dispatch" &&
              m.expression.arguments.find(
                (e) => e.callee.name === "setPaginationFromUrl"
              )
          )
        )
          mapDispatchToPropsOnSubmitFunctionBody.unshift(
            t.ExpressionStatement(
              t.CallExpression(t.Identifier("dispatch"), [
                t.CallExpression(t.Identifier("setPaginationFromUrl"), [
                  t.Identifier("URL_REGEXPS.prefix"),
                ]),
              ])
            )
          );
      },
    },
  };
};
