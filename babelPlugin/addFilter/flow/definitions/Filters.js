module.exports = function (babel, state) {
  const { types: t } = babel;
  return {
    name: "Update components/input/filters/abcFilter.jsx", // not required
    visitor: {
      ExportNamedDeclaration(path, state){
        // var state = {opts: {fieldName: "created_at"}};
        const normalizedFieldName = toCamelCase(state.opts.fieldName);
        if(path.node.exportKind === 'type' && path.node.declaration.id && path.node.declaration.id.name === 'FilterProps'){
			path.node.declaration.right.properties.push(t.Identifier(normalizedFieldName + ': ?string'));
        }
        if(path.node.exportKind === 'value' && path.node.declaration.declarations){
          const makeFiltersExportType = path.node.declaration.declarations.find(d => d.id.name === 'makeFilters');
          makeFiltersExportType.init.arguments[0].properties.push(t.Identifier(normalizedFieldName + ': undefined'))
        }
        
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
