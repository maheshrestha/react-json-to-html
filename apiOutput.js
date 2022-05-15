const axios = require("axios");

async function getJosnInputToCreateModule({
  dataReadEndPointGet,
  componentName,
}) {
  console.log(("dataReadEndPointGet: ", dataReadEndPointGet));
  return axios
    .get(dataReadEndPointGet)
    .then((response) => {
      // console.log("response: ", response);
      return typeof response.data === "object"
        ? Array.isArray(response.data)
          ? { [`${componentName}`]: response.data }
          : { [`${componentName}_api`]: response.data }
        : false;
      // return depthFirstArrayOfObject(response.data);
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
  getJosnInputToCreateModule,
};
