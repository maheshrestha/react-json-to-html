const { isPaginationExist } = require("../../../../addFilter");

function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every((bKey) => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      //console.log("Type of ", typeof bVal)
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
  const importSourceNode = importDeclarations.find(
    (s) => s.source.value === sourceValue
  );
  if (!!importSourceNode && !!importSourceNode.specifiers)
    importSourceNode.specifiers.push(
      t.ImportSpecifier(
        t.Identifier(importedIdentifierName),
        t.Identifier(localIdentifierName)
      )
    );
  else {
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
}

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "saga/filterSaga", // not required
    visitor: {
      VariableDeclarator(path, state) {
        const fieldDataType = state.opts.fieldDataType;
        const node = path.node;
        //console.log(node)
        if (!!node.id && node.id.name === "URL_REGEXP") {
          let pattern = "";
          if (fieldDataType === "number") {
            pattern = "([\\d-]+)";
          } else if (fieldDataType === "string") {
            pattern = "(\\w+|-)";
          } else if (fieldDataType === "date") {
            pattern = "(\\d{8}|-)";
          }
          const currentPattern = node.init.pattern;
          if (currentPattern === "^") node.init.pattern += pattern;
          else node.init.pattern += `\\/${pattern}`;
        }
      },
      Program(path, state) {
        // var opts = {fieldName: "created_at", fieldDataType: "number"}
        const setFieldNameToImport = toCamelCase(`set_${state.opts.fieldName}`);
        const b = path.node.body;
        generateImportDeclaration(
          t,
          b,
          setFieldNameToImport,
          setFieldNameToImport,
          "../ducks/filters"
        );
      },
      FunctionDeclaration(path, state) {
        //console.log(path.node)
        if (path.node.id.name === "setFiltersFromUrlSaga") {
          const fieldName = state.opts.fieldName;
          const setFieldNameToImportMethod = toCamelCase(`set_${fieldName}`);
          const camelCaseFieldName = toCamelCase(fieldName);
          const fieldDataType = state.opts.fieldDataType;
          const matchesElements = path.node.body.body
            .find(
              (p) =>
                !!p.declarations &&
                p.declarations.find((s) => s.init.name === "matches")
            )
            .declarations.find((a) => a.init.name === "matches").id.elements;
          matchesElements.push(t.Identifier(camelCaseFieldName));

          if (fieldDataType === "number") {
            path.node.body.body.push(
              t.Identifier(
                `yield put(${setFieldNameToImportMethod}(getStateReadyNumber(${camelCaseFieldName})));`
              )
            );
          } else if (fieldDataType === "string") {
            path.node.body.body.push(
              t.Identifier(
                `yield put(${setFieldNameToImportMethod}(getStateReadyString(${camelCaseFieldName})));`
              )
            );
          } else if (fieldDataType === "date") {
            path.node.body.body.push(
              t.Identifier(
                `yield put(${setFieldNameToImportMethod}(getStateReadyDate(${camelCaseFieldName})));`
              )
            );
          }
        }
      },
    },
  };
};
