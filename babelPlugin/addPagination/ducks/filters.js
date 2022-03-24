
const { toCamelCase, looksLike } = require('../../helper');
const { generateImportDeclaration } = require('../../babelHelper')

module.exports =  function (babel) {
  const { types: t } = babel;

  return {
    name: "Update Filter", // not required
    visitor: {
      Program(path, state) {
        const fieldName = state.opts.fieldName;
        const body = path.node.body;
        const getMethodName = toCamelCase(`get_${fieldName}`)
        generateImportDeclaration(t, body, getMethodName, getMethodName, './pagination');
      },
      ExportNamedDeclaration(path, state) {
        const fieldName = state.opts.fieldName;
        const fieldDataType = state.opts.fieldDataType; 
              
        if(!!path.node.declaration.declarations){
          
          const findExportConstUrlFromFilter = path.node.declaration.declarations.find(d => 
            looksLike(d, {id: { name: 'getUrlFromFilters' }})
          );
          if(findExportConstUrlFromFilter) {
            findExportConstUrlFromFilter.init.arguments.unshift(t.Identifier(toCamelCase(`get_${fieldName}`)));
            const argumentArrowFunction = findExportConstUrlFromFilter.init.arguments.find(argument => argument.type == "ArrowFunctionExpression")
            
            argumentArrowFunction.params.unshift(t.Identifier(toCamelCase(fieldName)));
            const bodyReturnIndex = argumentArrowFunction.body.body.findIndex(argument => argument.type === 'ReturnStatement');
            if(fieldDataType === 'date')
              argumentArrowFunction.body.body.splice(bodyReturnIndex, -1, t.Identifier(`parts.push(${toCamelCase(fieldName)} ? ${toCamelCase(fieldName)}.format('YYYYMMDD') : '-');`));
            else
              argumentArrowFunction.body.body.splice(bodyReturnIndex, -1, t.Identifier(`parts.push(${toCamelCase(fieldName)} || '-');`));
          }
          
          const findExportConstQueryFromFilter = path.node.declaration.declarations.find(d => 
            looksLike(d, {id: { name: 'getQueryFromFilter' }})
          ); 
          if(findExportConstQueryFromFilter) {
            
            findExportConstQueryFromFilter.init.arguments.unshift(t.Identifier(toCamelCase(`get_${fieldName}`)));
            const argumentArrowFunction = findExportConstQueryFromFilter.init.arguments.find(argument => argument.type == "ArrowFunctionExpression")
            
            argumentArrowFunction.params.unshift(t.Identifier(toCamelCase(fieldName)));
            const bodyReturnIndex = argumentArrowFunction.body.body.findIndex(argument => argument.type === 'ReturnStatement');
            if(fieldDataType === 'date')
              argumentArrowFunction.body.body.splice(bodyReturnIndex, -1, t.Identifier(`if (${toCamelCase(fieldName)}) parts.push(\`${fieldName}=\${moment(${toCamelCase(fieldName)}).format('YYYY-MM-DD')\}\`);`));
            else
              argumentArrowFunction.body.body.splice(bodyReturnIndex, -1, t.Identifier(`if (${toCamelCase(fieldName)}) parts.push(\`${fieldName}=\${${toCamelCase(fieldName)}\}\`);`));
          }
        }
      },
    }
  };
}
