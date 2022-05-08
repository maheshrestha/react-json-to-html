module.exports = function (babel, kk) {
  const { types: t } = babel;
  return {
    name: "Update Containers/filters/abcFilter.js", // not required
    visitor: {
      Program(path, state) {
        const componentName = state.opts.componentName;
        const fieldName = state.opts.fieldName;
        const fieldDataType = state.opts.fieldDataType;
        const humanizedFieldLabel =
          fieldName.charAt(0).toUpperCase() +
          fieldName.replace("_", " ").slice(1);
        const body = path.node.body;
        const exportDefaultDeclaration = body.find(
          (b) => b.type === "ExportDefaultDeclaration"
        );
        if (exportDefaultDeclaration) {
          const loadComponentFunctionName = `load${capitalize(componentName)}s`;
          body.push(
            t.identifier(
              `import { ${loadComponentFunctionName} } from '../../sagas/${componentName}Sagas';`
            )
          );

          const getterFunctionName = toCamelCase(`get_${fieldName}`);
          const setterFunctionName = toCamelCase(`set_${fieldName}`);
          body.push(
            t.identifier(
              `import { ${getterFunctionName}, ${setterFunctionName} } from '../../ducks/filters';`
            )
          );

          const mapStateToPropsConstName =
            exportDefaultDeclaration.declaration.callee.arguments[0].name;
          const mapStateToPropsNode = body.find(
            (b) =>
              b.type === "VariableDeclaration" &&
              b.declarations &&
              b.declarations.some((d) => d.id.name === mapStateToPropsConstName)
          );
          const mapStateToPropsDeclarator =
            mapStateToPropsNode.declarations.find(
              (d) => d.id.name === mapStateToPropsConstName
            );
          const mapStateToPropsArrowFunctionBody =
            mapStateToPropsDeclarator.init.body.body;
          mapStateToPropsArrowFunctionBody.unshift(
            t.Identifier(`const value = ${getterFunctionName}(state);`)
          );

          const mapStateToPropsArrowFunctionReturnStatement =
            mapStateToPropsArrowFunctionBody.find(
              (b) => b.type === "ReturnStatement"
            );
          const mapStateToPropsArrowFunctionReturnStatementObjectPropertyWithNameAsLabel =
            mapStateToPropsArrowFunctionReturnStatement.argument.properties.find(
              (p) => p.key.name === "label"
            );
          mapStateToPropsArrowFunctionReturnStatementObjectPropertyWithNameAsLabel.value.value =
            humanizedFieldLabel;

          const mapDispatchToPropsConstName =
            exportDefaultDeclaration.declaration.callee.arguments[1].name;
          const mapDispatchToPropsNode = body.find(
            (b) =>
              b.type === "VariableDeclaration" &&
              b.declarations &&
              b.declarations.some(
                (d) => d.id.name === mapDispatchToPropsConstName
              )
          );
          const mapDispatchToPropsDeclarator =
            mapDispatchToPropsNode.declarations.find(
              (d) => d.id.name === mapDispatchToPropsConstName
            );
          const mapDispatchToPropsArrowFunctionReturnStatement =
            mapDispatchToPropsDeclarator.init.body.body.find(
              (b) => b.type === "ReturnStatement"
            );
          const mapDispatchToPropsArrowFunctionReturnStatementObjectPropertyWithNameAsOnSubmit =
            mapDispatchToPropsArrowFunctionReturnStatement.argument.properties.find(
              (p) => p.key.name === "onSubmit"
            );
          const mapDispatchToPropsOnSubmitFunctionBody =
            mapDispatchToPropsArrowFunctionReturnStatementObjectPropertyWithNameAsOnSubmit
              .value.body.body;
          mapDispatchToPropsOnSubmitFunctionBody.unshift(
            t.ExpressionStatement(
              t.CallExpression(t.Identifier("dispatch"), [
                t.CallExpression(t.Identifier(setterFunctionName), [
                  t.Identifier("value"),
                ]),
              ])
            )
          );
          mapDispatchToPropsOnSubmitFunctionBody.push(
            t.ExpressionStatement(
              t.CallExpression(t.Identifier("dispatch"), [
                t.CallExpression(t.Identifier(loadComponentFunctionName), []),
              ])
            )
          );

          const jsxClassName = capitalize(fieldDataType) + "Filter";
          exportDefaultDeclaration.declaration.arguments[0].arguments[0].name =
            jsxClassName;
          body.push(
            t.identifier(
              `import ${jsxClassName} from '../../components/filters/${jsxClassName}';`
            )
          );
        }
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

function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
