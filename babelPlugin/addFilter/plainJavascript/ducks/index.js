module.exports = function (babel, kk) {
  const { types: t } = babel;
  return {
    name: "captains-log", // not required
    visitor: {
      Program(path, state) {
        const body = path.node.body;
        const isFilterImported = body.map((b) => {
          return looksLike(b, {
            type: "ImportDeclaration",
            specifiers: [
              {
                type: "ImportDefaultSpecifier",
                local: {
                  name: (val) => val === "filters",
                },
              },
            ],
          });
        });
        // const isFilterTypeImported = body.map((b) => {
        //   return looksLike(b, {
        //     type: "ImportDeclaration",
        //     specifiers: [
        //       {
        //         type: "ImportSpecifier",
        //         imported: {
        //           name: (val) =>
        //             val === "FiltersAction" || val === "FiltersState",
        //         },
        //       },
        //     ],
        //   });
        // });
        // if (!isFilterTypeImported.includes(true)) {
        //   const filterImportTypeDeclaration = t.ImportDeclaration(
        //     [
        //       t.ImportSpecifier(
        //         t.Identifier("FiltersAction"),
        //         t.Identifier("FiltersAction")
        //       ),
        //       t.ImportSpecifier(
        //         t.Identifier("FiltersState"),
        //         t.Identifier("FiltersState")
        //       ),
        //     ],
        //     t.StringLiteral("./filters")
        //   );
        //   filterImportTypeDeclaration.importKind = "type";
        //   body.push(filterImportTypeDeclaration);
        // }
        if (!isFilterImported.includes(true)) {
          const filterImportDeclaration = t.ImportDeclaration(
            [
              t.ImportDefaultSpecifier(t.Identifier("filters")),
              t.ImportSpecifier(
                t.Identifier("filtersInitialState"),
                t.Identifier("initialState")
              ),
            ],
            t.StringLiteral("./filters")
          );
          body.push(filterImportDeclaration);
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
          const hasFiltersState = statePropsTypes.map((statePropsType) =>
            looksLike(statePropsType, {
              value: {
                id: {
                  name: (val) => val === "FiltersState",
                },
              },
            })
          );
          if (!hasFiltersState.includes(true)) {
            statePropsTypes.push(
              t.ObjectProperty(
                t.Identifier("filter"),
                t.Identifier("FiltersState")
              )
            );
          }
        }
        if (isActionTypesDeclarations) {
          const types = path.node.right.types;
          const hasFiltersAction = types.map((type) =>
            looksLike(type, {
              id: {
                name: (val) => val === "FiltersAction",
              },
            })
          );
          if (!hasFiltersAction.includes(true)) {
            types.push(createGenericTypeAnnotation(types[0], "FiltersAction"));
          }
        }
      },

      VariableDeclarator(path) {
        if (path.node.id.name === "InitialState") {
          const InitialStateProperties = path.node.init.arguments[0].properties;
          const hasFilterInitialStateDefined = InitialStateProperties.map(
            (InitialStateProperty) =>
              looksLike(InitialStateProperty, {
                value: { name: "filtersInitialState" },
              })
          );
          if (!hasFilterInitialStateDefined.includes(true)) {
            InitialStateProperties.push(
              t.ObjectProperty(
                t.Identifier("filters"),
                t.Identifier("filtersInitialState")
              )
            );
          }
        }
      },

      ExportDefaultDeclaration(path) {
        const filterDefaultExportProperties =
          path.node.declaration.arguments[0].properties;
        const filterDefaultExportDefined = filterDefaultExportProperties.map(
          (filterDefaultExportProperty) =>
            looksLike(filterDefaultExportProperty, {
              value: { name: "filters" },
            })
        );
        if (!filterDefaultExportDefined.includes(true))
          path.node.declaration.arguments[0].properties.push(
            t.ObjectProperty(t.Identifier("filters"), t.Identifier("filters"))
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
