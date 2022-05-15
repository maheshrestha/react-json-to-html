module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "saga/paginationSaga", // not required
    visitor: {
      ExportNamedDeclaration(path, state) {
        const node = path.node;
        const componentName = state.opts.componentName;
        const urlRegx = node.declaration.declarations.find(
          (d) => d.id.name === "URL_REGEXPS"
        );
        if (!!urlRegx && urlRegx.id.name === "URL_REGEXPS") {
          const paginationRegex = urlRegx.init.properties.find(
            (p) => p.key.name === "pagination"
          );
          if (!paginationRegex) {
            urlRegx.init.properties.push(
              t.Identifier(`pagination: ${/([\d-]+)\/([\d-]+)/}`)
            );
            urlRegx.init.properties.push(
              t.Identifier(`filterParamsKey: "${componentName}"`)
            );
          }
        }
      },
    },
  };
};
