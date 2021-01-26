const toCamelCase = require('camelcase');

var toCamelCaseString = (input) => {
  var camelCaseString = toCamelCase(input);
  return !!camelCaseString ? camelCaseString : input;
}
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
module.exports = {
  toCamelCaseString,
  capitalize
}