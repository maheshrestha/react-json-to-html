const { generateImportDefaultDeclaration } = require("../../babelHelper");
const { toCamelCaseString } = require("../../../helper");
module.exports = function (babel) {
  const { types: t } = babel;
  return {
    name: "Update Components/App.js",
    visitor: {
      Program(path, state) {
        const componentName = state.opts.componentName;
        const body = path.node.body;
        generateImportDefaultDeclaration(
          t,
          body,
          "Pagination",
          "../../common/containers/Pagination"
        );
        generateImportDefaultDeclaration(
          t,
          body,
          `{ ${toCamelCaseString(`load_${componentName}s`)} }`,
          `../sagas/${toCamelCaseString(componentName)}Sagas`
        );
      },
      ClassMethod(path, state) {
        const componentName = state.opts.componentName;
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
            renderJsxParameters.push(
              t.Identifier(
                `\n        <Pagination onChange={${toCamelCaseString(
                  `load_${componentName}s`
                )}()} />`
              )
            );
          }
        }
      },
    },
  };
};
