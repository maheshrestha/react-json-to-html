module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "saga/paginationSaga", // not required
    visitor: {
      ExportNamedDeclaration(path, state) {
        const fieldDataType = state.opts.fieldDataType;
        // const fieldDataType = 'date'
        const node = path.node;
        const urlRegx = node.declaration.declarations.find(
          (d) => d.id.name === "URL_REGEXPS"
        );
        if (!!urlRegx && urlRegx.id.name === "URL_REGEXPS") {
          const filterRegex = urlRegx.init.properties.find(
            (p) => p.key.name === "filter"
          );
          let pattern = "";
          if (fieldDataType === "number") {
            pattern = "/([\\\\d-]+)";
          } else if (fieldDataType === "string") {
            pattern = "/(\\w+|-)";
          } else if (fieldDataType === "date") {
            pattern = "/(\\\\d{8}|-)";
          }
          if (!filterRegex)
            urlRegx.init.properties.push(t.Identifier(`filter: "${pattern}"`));
          else filterRegex.value.value += pattern;
        }
      },
    },
  };
};
