module.exports = function (babel, kk) {
  const { types: t } = babel;
  return {
    name: "captains-log", // not required
    visitor: {
      Program(path) {
        const body = path.node.body;
        const importDeclarations = body.filter(
          (b) => b.type === "ImportDeclaration"
        );
        const isFilterWatchsImported = importDeclarations.filter(
          (i) =>
            i.specifiers &&
            i.specifiers.some((s) =>
              looksLike(s.local, { name: "filtersWatches" })
            )
        );
        if (isFilterWatchsImported.length === 0) {
          const filterImportDeclaration = t.ImportDeclaration(
            [
              t.ImportSpecifier(
                t.Identifier("filtersWatches"),
                t.Identifier("watches")
              ),
            ],
            t.StringLiteral("./filtersSagas")
          );
          body.push(filterImportDeclaration);
        }
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
                      argument: { name: "filtersWatches" },
                    })
                  );
                if (!doesAllWatchesIncludeFilterWatch.includes(true)) {
                  declaration.init.elements.push(
                    t.SpreadElement(t.Identifier("filtersWatches"))
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

const createGenericTypeAnnotation = (annotation, newName) => {
  var newAnnotaion = JSON.parse(JSON.stringify(annotation));
  newAnnotaion.id.name = newName;
  newAnnotaion.id.loc.identifierName = newName;
  return newAnnotaion;
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
