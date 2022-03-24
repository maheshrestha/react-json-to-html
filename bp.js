module.exports = function (babel, kk) {
  const { types: t } = babel;
  return {
    name: "captains-log", // not required
    visitor: {
      Program(path, state) {
        console.log("kkk");
        console.log(state.opts)
      
        const body = path.node.body;
        const isFilterImported = body.map((b) => {
          return looksLike(b, {
            type: "ImportDeclaration",
            specifiers: [
              {
                type: "ImportDefaultSpecifier",
                local: {
                  name: (val) => val === "filters"
                }
              }
            ]
          });
        });
        const isFilterTypeImported = body.map((b) => {
          return looksLike(b, {
            type: "ImportDeclaration",
            specifiers: [
              {
                type: "ImportSpecifier",
                imported: {
                  name: (val) => val === "FiltersAction" || val === "FiltersState"
                }
              }
            ]
          });
        });
        if (!isFilterTypeImported.includes(true)) {
          const filterImportTypeDeclaration = t.ImportDeclaration(
            [
              t.ImportSpecifier(t.Identifier("FiltersAction"),t.Identifier("FiltersAction")), 
              t.ImportSpecifier(t.Identifier("FiltersState"), t.Identifier("FiltersState"))
            ],
            t.StringLiteral("./filters")
          );
          body.push(filterImportTypeDeclaration);
        }
        console.log(t.ImportSpecifier(t.Identifier("filtersInitialState"), t.Identifier("filtersInitialState")));
        if (!isFilterImported.includes(true)) {
          const filterImportDeclaration = t.ImportDeclaration(
            [
              t.ImportDefaultSpecifier(t.Identifier("filters")),
              t.ImportSpecifier(t.Identifier("filtersInitialState"), t.Identifier("initialState"))
            ],
            t.StringLiteral("./filters")
          );
          body.push(filterImportDeclaration);
        }
      },

      TypeAlias(path) {
        const isActionTypesDeclarations = looksLike(path.node, {
          id: {
            name: "Action"
          },
          right: {
            type: "UnionTypeAnnotation"
          }
        });
        console.log("isActionTypesDeclarations: ", isActionTypesDeclarations);
        if (isActionTypesDeclarations) {
          const types = path.node.right.types;
          const hasFilterAction = looksLike(types, {
            id: {
              name: (val) => val === "FilterAction"
            }
          });
          if (!hasFilterAction) {
            types.push(createGenericTypeAnnotation(types[0], "FilterAction"));
          }
        }
      },
      
      VariableDeclarator(path) {
        if(path.node.id.name === 'InitialState'){
          path.node.init.arguments[0].properties.push(t.ObjectProperty(
            t.Identifier('filters'),
            t.Identifier('filtersInitialState'),
          ));
        }
      		
      },
      
      ExportDefaultDeclaration(path) {
        console.log("path.node.declaration: ", path.node.declaration.callee.name)
        path.node.declaration.arguments.forEach(argument => {
          console.log("argument: ", argument)
        	if(argument){}
        });
        path.node.declaration.arguments[0].properties.push(t.ObjectProperty(
          t.Identifier('filters'),
          t.Identifier('filters')
        ));
      }
    }
  };
}

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
