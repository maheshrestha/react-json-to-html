const toCamelCase = require("camelcase");
// const toPascalCase = require("pascalcase");

const looksLike = (a, b) => {
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
};

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}

var toPascalCaseString = (input) => {
  var pascalCaseString = toCamelCase(input);
  return !!pascalCaseString ? pascalCaseString : input;
};
var toCamelCaseString = (input) => {
  var camelCaseString = toCamelCase(input);
  return !!camelCaseString ? camelCaseString : input;
};
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const pathToComponentTemplate = (language) => {
  let pathToComponentTemplate = `${__dirname}/ComponentTemplate/plainJavascript`;
  return pathToComponentTemplate;
};
const pathToAddFilterBabelPlugin = (language) => {
  let addFilterBabelPluginPath = `${__dirname}/babelPlugin/addFilter/plainJavascript`;
  return addFilterBabelPluginPath;
};
module.exports = {
  looksLike,
  toPascalCaseString,
  toCamelCaseString,
  capitalize,
  pathToComponentTemplate,
  pathToAddFilterBabelPlugin,
};
