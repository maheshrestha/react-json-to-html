const axios = require("axios");

async function getApiListOutput(url) {
  return axios
    .get(url)
    .then((response) => {
      return depthFirstArrayOfObject(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const depthFirstArrayOfObject = (obj) => {
  return obj;
  if (obj === null) return null;
  let stack = [obj];
  let ss = [];
  while (stack.length > 0) {
    const current = stack.pop();
    if (Array.isArray(current) && typeof current[0] === "object") {
      return current;
      break;
    }
    for (const property in current) {
      if (typeof current[property] === "object") {
        stack.push(current[property]);
        ss.push(property);
      }
    }
  }
  console.log(ss);
  return null;
};
module.exports = {
  getApiListOutput,
};
