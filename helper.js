const toCamelCase = require("camelcase");
// const toPascalCase = require("pascalcase");

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
module.exports = {
  toPascalCaseString,
  toCamelCaseString,
  capitalize,
};
