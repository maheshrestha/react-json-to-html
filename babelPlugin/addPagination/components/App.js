const { generateImportDefaultDeclaration } = require("../../babelHelper");
module.exports = function (babel) {
  const { types: t } = babel;
  return {
    name: "Update Components/App.js",
    visitor: {
      Program(path, state) {
        const body = path.node.body;
        generateImportDefaultDeclaration(
          t,
          body,
          "Pagination",
          "../../common/containers/Pagination"
        );
      },
      ClassMethod(path, state) {
        if (path.node.key.name === "render") {
          const renderJsxParameters = path.node.body.body.find(
            (a) => a.type === "ReturnStatement"
          ).argument.children;

          if (
            !renderJsxParameters.find(
              (r) =>
                r.openingElement && r.openingElement.name.name === "Pagination"
            )
          ) {
            renderJsxParameters.push(t.Identifier("\n        <Pagination />"));
          }
        }
      },
    },
  };
};
