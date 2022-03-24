const { looksLike } = require('./helper');
function generateImportDeclaration(t, body, importedIdentifierName, localIdentifierName, sourceValue){
  const importDeclarations = body.filter(b => looksLike(b, {
    type: 'ImportDeclaration',
    importKind: 'value'
  }));
  const importSourceNode = importDeclarations.find(s => s.source.value === sourceValue);
  if(!!importSourceNode && importSourceNode.specifiers){
    
    const isSourceAlreadyImported = importSourceNode.specifiers.find(is => is.local.name === importedIdentifierName);
    if(!isSourceAlreadyImported){
      importSourceNode.specifiers.push(
        t.ImportSpecifier(t.Identifier(importedIdentifierName), t.Identifier(localIdentifierName))
      ); 
    }
  }
  else {
    const isGetQueryFromFilterImported = importDeclarations.map(importDeclaration => {
      const specifiers = importDeclaration.specifiers;
      return specifiers.map(specifier => looksLike(specifier, {
        imported: {
          name: importedIdentifierName
        },
        local: {
          name: localIdentifierName
        }
      }));
    });

    const isGetQueryFromFilterFlattened = isGetQueryFromFilterImported.reduce((acc, val) => acc.concat(val), []);
    if(!isGetQueryFromFilterFlattened.includes(true) ){
      const getQueryFromFilterImportDeclaration = t.ImportDeclaration(
        [
          t.ImportSpecifier(t.Identifier(importedIdentifierName), t.Identifier(localIdentifierName))
        ],
        t.StringLiteral(sourceValue)
      );
      body.push(getQueryFromFilterImportDeclaration);
    }
  }
}
function generateImportDefaultDeclaration(t, body, importedIdentifierName, sourceValue){
  const importDeclarations = body.filter(b => looksLike(b, {
    type: 'ImportDeclaration',
    importKind: 'value'
  }));
  const importSourceNode = importDeclarations.find(s => s.source.value === sourceValue);
  if(!!importSourceNode && importSourceNode.specifiers){
    
    const isSourceAlreadyImported = importSourceNode.specifiers.find(is => is.local.name === importedIdentifierName);
    if(!isSourceAlreadyImported){
      importSourceNode.specifiers.push(
        t.ImportDefaultSpecifier(t.Identifier(importedIdentifierName))
      ); 
    }
  }
  else {
    const isGetQueryFromFilterImported = importDeclarations.map(importDeclaration => {
      const specifiers = importDeclaration.specifiers;
      return specifiers.map(specifier => looksLike(specifier, {
        imported: {
          name: importedIdentifierName
        }
      }));
    });

    const isGetQueryFromFilterFlattened = isGetQueryFromFilterImported.reduce((acc, val) => acc.concat(val), []);
    if(!isGetQueryFromFilterFlattened.includes(true) ){
      const getQueryFromFilterImportDeclaration = t.ImportDeclaration(
        [
          t.ImportDefaultSpecifier(t.Identifier(importedIdentifierName))
        ],
        t.StringLiteral(sourceValue)
      );
      body.push(getQueryFromFilterImportDeclaration);
    }
  }
}

module.exports = {
  generateImportDeclaration,
  generateImportDefaultDeclaration
}
