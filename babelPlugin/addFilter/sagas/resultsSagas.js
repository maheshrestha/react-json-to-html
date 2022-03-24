module.exports = function (babel, kk) {
  const { types: t } = babel;
  return {
    name: "Update ResultSagas.js", // not required
    visitor: {
      Program(type) {
        const body = type.node.body;
        generateImportDeclaration(
          t,
          body,
          "getQueryFromFilter",
          "getQueryFromFilter",
          "../ducks/filters"
        );
      },
      FunctionDeclaration(type) {
        const node = type.node;

        node.body.body.forEach((b) => {
          if (looksLike(b, { type: "VariableDeclaration" })) {
            b.declarations.forEach((declaration) => {
              if (declaration.id.name === "queryParams") {
                declaration.init.callee.object.elements.push(
                  t.Identifier("yield select(getQueryFromFilter)")
                );
                // declaration.init = t.YieldExpression(t.CallExpression(t.Identifier("select"), [t.Identifier("getQueryFromFilter")]))
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

function generateImportDeclaration(
  t,
  body,
  importedIdentifierName,
  localIdentifierName,
  sourceValue
) {
  const importDeclarations = body.filter((b) =>
    looksLike(b, {
      type: "ImportDeclaration",
      importKind: "value",
    })
  );
  const isGetQueryFromFilterImported = importDeclarations.map(
    (importDeclaration) => {
      const specifiers = importDeclaration.specifiers;
      return specifiers.map((specifier) =>
        looksLike(specifier, {
          imported: {
            name: importedIdentifierName,
          },
          local: {
            name: localIdentifierName,
          },
        })
      );
    }
  );

  const isGetQueryFromFilterFlattened = isGetQueryFromFilterImported.reduce(
    (acc, val) => acc.concat(val),
    []
  );
  if (!isGetQueryFromFilterFlattened.includes(true)) {
    const getQueryFromFilterImportDeclaration = t.ImportDeclaration(
      [
        t.ImportSpecifier(
          t.Identifier(importedIdentifierName),
          t.Identifier(localIdentifierName)
        ),
      ],
      t.StringLiteral(sourceValue)
    );
    body.push(getQueryFromFilterImportDeclaration);
  }
}
