module.exports = function (babel, kk) {
  const { types: t } = babel;
  return {
    name: "captains-log", // not required
    visitor: {
      Program(path, state) {
        const body = path.node.body;
        const isPaginationImported = body.map((b) => {
          return looksLike(b, {
            type: "ImportDeclaration",
            specifiers: [
              {
                type: "ImportDefaultSpecifier",
                local: {
                  name: (val) => val === "pagination",
                },
              },
            ],
          });
        });
        const isPaginationTypeImported = body.map((b) => {
          return looksLike(b, {
            type: "ImportDeclaration",
            specifiers: [
              {
                type: "ImportSpecifier",
                imported: {
                  name: (val) =>
                    val === "PaginationAction" || val === "PaginationState",
                },
              },
            ],
          });
        });

        if (!isPaginationImported.includes(true)) {
          const paginationImportDeclaration = t.ImportDeclaration(
            [
              t.ImportDefaultSpecifier(t.Identifier("pagination")),
              t.ImportSpecifier(
                t.Identifier("paginationInitialState"),
                t.Identifier("initialState")
              ),
            ],
            t.StringLiteral("../../common/ducks/pagination")
          );
          body.push(paginationImportDeclaration);
        }
      },

      TypeAlias(path) {
        const isActionTypesDeclarations = looksLike(path.node, {
          id: {
            name: "Action",
          },
          right: {
            type: "UnionTypeAnnotation",
          },
        });
        const isStatePropsDeclarations = looksLike(path.node, {
          id: {
            name: "StateProps",
          },
        });
        if (isStatePropsDeclarations) {
          const statePropsTypes = path.node.right.properties;
          const hasPaginationState = statePropsTypes.map((statePropsType) =>
            looksLike(statePropsType, {
              value: {
                id: {
                  name: (val) => val === "PaginationState",
                },
              },
            })
          );
          if (!hasPaginationState.includes(true)) {
            statePropsTypes.push(
              t.ObjectProperty(
                t.Identifier("pagination"),
                t.Identifier("PaginationState")
              )
            );
          }
        }
        if (isActionTypesDeclarations) {
          const types = path.node.right.types;
          const hasPaginationAction = types.map((type) =>
            looksLike(type, {
              id: {
                name: (val) => val === "PaginationAction",
              },
            })
          );
          if (!hasPaginationAction.includes(true)) {
            types.push(
              createGenericTypeAnnotation(types[0], "PaginationAction")
            );
          }
        }
      },

      VariableDeclarator(path) {
        if (path.node.id.name === "InitialState") {
          const InitialStateProperties = path.node.init.arguments[0].properties;
          const hasPaginationInitialStateDefined = InitialStateProperties.map(
            (InitialStateProperty) =>
              looksLike(InitialStateProperty, {
                value: { name: "paginationInitialState" },
              })
          );
          if (!hasPaginationInitialStateDefined.includes(true)) {
            InitialStateProperties.push(
              t.ObjectProperty(
                t.Identifier("pagination"),
                t.Identifier("paginationInitialState")
              )
            );
          }
        }
      },

      ExportDefaultDeclaration(path) {
        const paginationDefaultExportProperties =
          path.node.declaration.arguments[0].properties;
        const paginationDefaultExportDefined =
          paginationDefaultExportProperties.map(
            (paginationDefaultExportProperty) =>
              looksLike(paginationDefaultExportProperty, {
                value: { name: "pagination" },
              })
          );
        if (!paginationDefaultExportDefined.includes(true))
          path.node.declaration.arguments[0].properties.push(
            t.ObjectProperty(
              t.Identifier("pagination"),
              t.Identifier("pagination")
            )
          );
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
