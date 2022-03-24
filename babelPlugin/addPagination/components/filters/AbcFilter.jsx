module.exports = function (babel, state) {
  const { types: t } = babel;
  return {
    name: "Update components/input/filters/abcFilter.jsx", // not required
    visitor: {
      TypeAlias(path, state){
        // console.log(path.node.body);
        // var state = {opts: {fieldName: "created_at"}};
        const fieldName = state.opts.fieldName;
        const filterClassName = capitalize(toCamelCase(fieldName)) + 'Filter';
        if(path.node.id.name === "AbcFilterProps"){
          path.node.id.name = filterClassName + 'Props';
        }
      },
      ClassDeclaration(path, state){
        // console.log(path.node.body);
        // var opts = {fieldName: "created_at"}
        // var state = {opts: {fieldName: "created_at"}};
        const fieldName = state.opts.fieldName;
        const filterClassName = capitalize(toCamelCase(fieldName)) + 'Filter';
        if(path.node.id.name === "AbcFilter"){
          path.node.id.name = filterClassName;
        }
        
        if(path.node.superTypeParameters.params[0].id.name === 'AbcFilterProps'){
          path.node.superTypeParameters.params[0].id.name = filterClassName + 'Props';
        }
      },
      ExportDefaultDeclaration(path, state) {
        // console.log(path.node.declaration.name);
        // var state = {opts: {fieldName: "created_at"}};
        const fieldName = state.opts.fieldName;
        const filterClassName = capitalize(toCamelCase(fieldName)) + 'Filter';
        path.node.declaration.name = filterClassName;
      }
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
