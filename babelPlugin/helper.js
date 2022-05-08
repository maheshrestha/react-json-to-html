const toCamelCase = require("camelcase");
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

function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

module.exports = {
  looksLike,
  toCamelCase,
  capitalize,
};
