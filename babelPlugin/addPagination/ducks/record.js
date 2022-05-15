const { toCamelCase, capitalize } = require("../../helper");
const { generateImportDeclaration } = require("../../babelHelper");

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "Update duck record", // not required
    visitor: {
      Program(path, state) {
        const b = path.node.body;
        generateImportDeclaration(
          t,
          b,
          "getPerPageSize, getCurrentPage",
          "getPerPageSize, getCurrentPage",
          `../../common/ducks/pagination`
        );
      },
      ExportNamedDeclaration(path, state) {
        const schemaName = state.opts.schemaName;
        console.log("schemaL ", schemaName);
        if (
          path.node.declaration.declarations[0].id.name ===
          `getListReady${capitalize(toCamelCase(schemaName))}Ids`
        ) {
          const bodyReturnIndex =
            path.node.declaration.declarations[0].init.body.body.findIndex(
              (argument) => argument.type === "ReturnStatement"
            );
          console.log("bodyReturnIndex: ", bodyReturnIndex);
          //console.log(path.node.declaration.declarations[0].init.body.body)
          path.node.declaration.declarations[0].init.body.body.splice(
            bodyReturnIndex,
            -1,
            t.Identifier(`
  const perPageSize = getPerPageSize(state);  const currentPage = getCurrentPage(state);
  const paginationValue = {
    min: currentPage * perPageSize - perPageSize,
    max: currentPage * perPageSize,
  };
  const filtredSortedAndPaginatedIds = filteredAndSortedIds.slice(paginationValue.min, paginationValue.max);`)
          );

          path.node.declaration.declarations[0].init.body.body.find(
            (b) => b.type === "ReturnStatement"
          ).argument.callee.object.name = "filtredSortedAndPaginatedIds";
        }

        //path.node.name = path.node.name.split('').reverse().join('');
      },
    },
  };
};
