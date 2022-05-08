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
module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "Create Filter", // not required
    visitor: {
      Program(path, state) {
        // var opts = {fieldName: "created_at"}
        const fieldName = state.opts.fieldName;
        const body = path.node.body;
        // @todo check if getter and setter is already defined
        const setFieldNameExists = path.node.body
          .filter(
            (s) =>
              s.type == "ExportNamedDeclaration" && !!s.declaration.declarations
          )
          .filter((s) =>
            s.declaration.declarations.find(
              (f) => f.id.name === toCamelCase(`set_${fieldName}`)
            )
          );
        const getFieldNameExists = path.node.body
          .filter(
            (s) =>
              s.type == "ExportNamedDeclaration" && !!s.declaration.declarations
          )
          .filter((s) =>
            s.declaration.declarations.find(
              (f) => f.id.name === toCamelCase(`get_${fieldName}`)
            )
          );

        var exportConstTypesIndex = path.node.body
          //.filter(s => s.type == "ExportNamedDeclaration" && !!s.declaration.declarations)
          .findIndex(
            (s) =>
              !!s.declaration &&
              !!s.declaration.declarations &&
              s.declaration.declarations.find((f) => f.id.name === "types")
          );

        // SETTER
        if (setFieldNameExists.length === 0) {
          const setterArrowFunctionExpression = t.ArrowFunctionExpression(
            [t.Identifier(`(${toCamelCase(fieldName)})`)],
            t.BlockStatement([
              t.ReturnStatement(
                t.ObjectExpression([
                  t.ObjectProperty(
                    t.Identifier("type"),
                    t.Identifier(`types.SET_${fieldName.toUpperCase()}`)
                  ),
                  t.ObjectProperty(
                    t.Identifier(toCamelCase(fieldName)),
                    t.Identifier(toCamelCase(fieldName))
                  ),
                ])
              ),
            ])
          );
          const setterVariableDeclarator = t.VariableDeclaration("const", [
            t.VariableDeclarator(
              t.Identifier(toCamelCase(`set_${fieldName}`)),
              setterArrowFunctionExpression
            ),
          ]);
          const setFieldName = t.ExportNamedDeclaration(
            setterVariableDeclarator
          );
          body.splice(++exportConstTypesIndex, -1, setFieldName);
        }

        // GETTER
        if (getFieldNameExists.length === 0) {
          const returnStatement = t.ReturnStatement(
            t.CallExpression(
              t.MemberExpression(t.Identifier("state"), t.Identifier("getIn")),
              [
                t.ArrayExpression([
                  t.StringLiteral("filters"),
                  t.StringLiteral(toCamelCase(fieldName)),
                ]),
              ]
            )
          );
          const getterArrowFunctionExpression = t.ArrowFunctionExpression(
            [t.Identifier("(state)")],
            t.BlockStatement([returnStatement])
          );
          const getterVariableDeclarator = t.VariableDeclaration("const", [
            t.VariableDeclarator(
              t.Identifier(toCamelCase(`get_${fieldName}`)),
              getterArrowFunctionExpression
            ),
          ]);
          const getFieldName = t.ExportNamedDeclaration(
            getterVariableDeclarator
          );
          body.splice(++exportConstTypesIndex, -1, getFieldName);
        }
      },
      ExportNamedDeclaration(path, state) {
        // var opts = {fieldName: "created_at"}
        const fieldName = state.opts.fieldName;
        const fieldDataType = state.opts.fieldDataType;

        if (!!path.node.declaration.declarations) {
          const findExportConstUrlFromFilter =
            path.node.declaration.declarations.find((d) =>
              looksLike(d, { id: { name: "getUrlFromFilters" } })
            );
          if (findExportConstUrlFromFilter) {
            findExportConstUrlFromFilter.init.arguments.unshift(
              t.Identifier(toCamelCase(`get_${fieldName}`))
            );
            const argumentArrowFunction =
              findExportConstUrlFromFilter.init.arguments.find(
                (argument) => argument.type == "ArrowFunctionExpression"
              );

            argumentArrowFunction.params.unshift(
              t.Identifier(toCamelCase(fieldName))
            );
            const bodyReturnIndex = argumentArrowFunction.body.body.findIndex(
              (argument) => argument.type === "ReturnStatement"
            );
            if (fieldDataType === "date")
              argumentArrowFunction.body.body.splice(
                bodyReturnIndex,
                -1,
                t.Identifier(
                  `parts.push(${toCamelCase(fieldName)} ? ${toCamelCase(
                    fieldName
                  )}.format('YYYYMMDD') : '-');`
                )
              );
            else
              argumentArrowFunction.body.body.splice(
                bodyReturnIndex,
                -1,
                t.Identifier(`parts.push(${toCamelCase(fieldName)} || '-');`)
              );
          }

          const findExportConstQueryFromFilter =
            path.node.declaration.declarations.find((d) =>
              looksLike(d, { id: { name: "getQueryFromFilter" } })
            );
          if (findExportConstQueryFromFilter) {
            findExportConstQueryFromFilter.init.arguments.unshift(
              t.Identifier(toCamelCase(`get_${fieldName}`))
            );
            const argumentArrowFunction =
              findExportConstQueryFromFilter.init.arguments.find(
                (argument) => argument.type == "ArrowFunctionExpression"
              );

            argumentArrowFunction.params.unshift(
              t.Identifier(toCamelCase(fieldName))
            );
            const bodyReturnIndex = argumentArrowFunction.body.body.findIndex(
              (argument) => argument.type === "ReturnStatement"
            );
            if (fieldDataType === "date")
              argumentArrowFunction.body.body.splice(
                bodyReturnIndex,
                -1,
                t.Identifier(
                  `if (${toCamelCase(
                    fieldName
                  )}) parts.push(\`${fieldName}=\${moment(${toCamelCase(
                    fieldName
                  )}).format('YYYY-MM-DD')\}\`);`
                )
              );
            else
              argumentArrowFunction.body.body.splice(
                bodyReturnIndex,
                -1,
                t.Identifier(
                  `if (${toCamelCase(
                    fieldName
                  )}) parts.push(\`${fieldName}=\${${toCamelCase(
                    fieldName
                  )}\}\`);`
                )
              );
          }

          const findExportConstSetQuery =
            path.node.declaration.declarations.find((d) =>
              looksLike(d, { id: { name: "setQuery" } })
            );

          const findExportConstTypes = path.node.declaration.declarations.find(
            (d) => looksLike(d, { id: { name: "types" } })
          );

          if (
            looksLike(findExportConstTypes, { init: { name: "undefined" } })
          ) {
            findExportConstTypes.init = t.ObjectTypeAnnotation([
              t.ObjectTypeProperty(
                t.Identifier(`SET_${fieldName.toUpperCase()}`),
                t.StringLiteralTypeAnnotation(
                  `filters/SET_${fieldName.toUpperCase()}`
                )
              ),
            ]);
          } else if (
            looksLike(findExportConstTypes, {
              init: {
                type: "ObjectExpression",
                properties: (ps) =>
                  !ps.find((p) =>
                    looksLike(p, {
                      type: "ObjectProperty",
                      key: { name: `SET_${fieldName.toUpperCase()}` },
                    })
                  ),
              },
            })
          ) {
            findExportConstTypes.init.properties.push(
              t.ObjectProperty(
                t.Identifier(`SET_${fieldName.toUpperCase()}`),
                t.StringLiteral(`filters/SET_${fieldName.toUpperCase()}`)
              )
            );
          }
        }
        var typeFilterActions = path.node.declaration;
        if (
          looksLike(typeFilterActions, {
            right: {
              type: "GenericTypeAnnotation",
              id: {
                name: "undefined",
              },
            },
          })
        ) {
          path.node.declaration.right = t.ObjectTypeAnnotation([
            t.ObjectTypeProperty(
              t.Identifier("type"),
              t.StringLiteralTypeAnnotation(
                `filters/SET_${fieldName.toUpperCase()}`
              )
            ),
            t.ObjectTypeProperty(
              t.Identifier("query"),
              t.NullableTypeAnnotation(t.StringTypeAnnotation())
            ),
          ]);
        } else if (
          looksLike(typeFilterActions, {
            right: {
              type: (type) => type === "ObjectTypeAnnotation",
              properties: (ps) => {
                return !ps.find(
                  (p) =>
                    p.value.value === `filters/SET_${fieldName.toUpperCase()}`
                );
              },
            },
          }) ||
          looksLike(typeFilterActions, {
            right: {
              type: (type) => type === "UnionTypeAnnotation",
              types: (types) => {
                return !types.find(
                  (type) =>
                    !type.properties.find(
                      (property) =>
                        property.value.value ===
                        `filters/SET_${fieldName.toUpperCase()}`
                    )
                );
              },
            },
          })
        ) {
          typeFilterActions.right = t.UnionTypeAnnotation([
            path.node.declaration.right,
            t.ObjectTypeAnnotation([
              t.ObjectTypeProperty(
                t.Identifier("type"),
                t.StringLiteralTypeAnnotation(
                  `filters/SET_${fieldName.toUpperCase()}`
                )
              ),
              t.ObjectTypeProperty(
                t.Identifier("query"),
                t.NullableTypeAnnotation(t.StringTypeAnnotation())
              ),
            ]),
          ]);
        }
      },
      ExportDefaultDeclaration(path, state) {
        // var opts = {fieldName: "created_at"}
        const fieldName = state.opts.fieldName;
        if (
          looksLike(path, {
            node: { declaration: { id: { name: "reducer" } } },
          })
        ) {
          const switchStatement = path.node.declaration.body.body.find(
            (d) => d.type === "SwitchStatement"
          );
          switchStatement.cases.unshift(
            t.SwitchCase(
              t.MemberExpression(
                t.Identifier("types"),
                t.Identifier(`SET_${fieldName.toUpperCase()}`)
              ),
              [
                t.ReturnStatement(
                  t.Identifier(
                    `state.set('${toCamelCase(
                      fieldName
                    )}', action.${toCamelCase(fieldName)})`
                  )
                ),
              ]
            )
          );
        }
      },
    },
  };
};
