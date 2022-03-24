module.exports = function (babel, kk) {
  const { types: t } = babel;
  return {
    name: "Update Containers/filters/abcFilter.js", // not required
    visitor: {
      Program(path, state){
        // console.log(path.node.body);
        // var opts = {fieldName: "created_at"}
        const fieldName = state.opts.fieldName;
        const filterJsxName = capitalize(toCamelCase(fieldName)) + 'Filter';
        const body = path.node.body;
        body.push(t.identifier(`import ${filterJsxName} from '../containers/filters/${filterJsxName}';`));
        
      },
      ClassMethod(path, state) {
        const isRenderMethodNode = looksLike(path.node, {key: {name: 'render'}});//path.node.find(n => looksLike(n, {key: { name: 'render'}}))
        if(isRenderMethodNode) {
          // var opts = {fieldName: "created_at"}
          const fieldName = state.opts.fieldName;
          const filterJsxName = capitalize(toCamelCase(fieldName)) + 'Filter';
          const renderMethodReturnStatement = path.node.body.body.find(b => b.type === 'ReturnStatement');
          const FirstJSXElementIndex = renderMethodReturnStatement.argument.children.findIndex(c => c.type === 'JSXElement');
          //console.log(FirstJSXElementIndex);
          renderMethodReturnStatement.argument.children.splice(FirstJSXElementIndex, -1, t.Identifier(`<${filterJsxName} />`))
        }
      },
      // ExportDefaultDeclaration(path, state) {
      //   //console.log(path.node.declaration)
      //   //var state = { opts:{fieldName: "created_at"}}
      //   const fieldName = state.opts.fieldName;
      //   const filterClassName = capitalize(toCamelCase(fieldName)) + 'Filter';
      //   if(path.node.declaration.type === 'Identifier'){
      //     path.node.declaration.name = filterClassName;
      //   }
      // }
    }
  
  };
}



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
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function capitalize(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
