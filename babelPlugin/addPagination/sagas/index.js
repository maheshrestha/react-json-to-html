const { generateImportDeclaration } = require("../../babelHelper");
module.exports = function (babel) {
  const { types: t } = babel;
  return {
    name: "Update sagas/index.js",
    visitor: {
      Program(path) {
        const b = path.node.body;
        generateImportDeclaration(
          t,
          b,
          "paginationWatches",
          "watches",
          "../../common/sagas/paginationSaga"
        );
      },
      FunctionDeclaration(type) {
        const node = type.node;
        node.body.body.forEach((b) => {
          if (b.type === "VariableDeclaration") {
            b.declarations.forEach((declaration) => {
              if (
                declaration.id.name === "allWatches" &&
                declaration.init.type === "ArrayExpression"
              ) {
                const doesAllWatchesIncludeFilterWatch =
                  declaration.init.elements.map((d) =>
                    looksLike(d, {
                      type: "SpreadElement",
                      argument: { name: "paginationWatches" },
                    })
                  );
                if (!doesAllWatchesIncludeFilterWatch.includes(true)) {
                  declaration.init.elements.push(
                    t.SpreadElement(t.Identifier("paginationWatches"))
                  );
                }
              }
            });
          }
        });
      },
    },
  };
};

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every((bKey) => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      if (typeof bVal === "function") {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}
