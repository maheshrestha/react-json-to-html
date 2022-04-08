const fs = require("fs");
const Handlebars = require("handlebars");
const {
  getFilesToWriteSchemaParams,
  getParameterForRecordSchema,
} = require("./createSchema");
const { getFilesToWriteSagaParams } = require("./createSaga");
const { getFilesToWriteDucksParams } = require("./createDuck");
const { getFilesToWriteContainersParams } = require("./createContainer");
const { getFilesToWriteComponentsParams } = require("./createComponent");
const { getFilesToWriteDefinationsParams } = require("./createDefinition");

const { getApiListOutput } = require("./apiOutput");
const {
  toCamelCaseString,
  toPascalCaseString,
  capitalize,
} = require("./helper");
const { exec } = require("child_process");

function makeDirs(directoryName) {
  // Here we want to make sure our directories exist.
  fs.mkdirSync(`./src/${directoryName}`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/api`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/components`, {
    recursive: true,
  });
  fs.mkdirSync(`./src/${directoryName}/containers`, {
    recursive: true,
  });
  fs.mkdirSync(`./src/${directoryName}/definitions`, {
    recursive: true,
  });
  fs.mkdirSync(`./src/${directoryName}/ducks`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/sagas`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/schemas`, {
    recursive: true,
  });
  fs.mkdirSync(`./src/${directoryName}/store`, { recursive: true });
  //fs.mkdirSync(`./src/${directoryName}/style`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/types`, { recursive: true });
}
async function getFilesToWrite(arguments) {
  const apiListOutput = await getApiListOutput(arguments.dataReadEndPointGet);

  const filesToWriteSchemaParams = getFilesToWriteSchemaParams(
    arguments,
    apiListOutput
  );
  const schemas = filesToWriteSchemaParams.map(
    (vv) => vv.parameters.data.schemas
  );

  const filesToWriteSagaParams = getFilesToWriteSagaParams(
    arguments,
    apiListOutput,
    schemas
  );
  const filesToWriteDucksParams = getFilesToWriteDucksParams(
    arguments,
    apiListOutput,
    schemas
  );
  const filesToWriteContainersParams = getFilesToWriteContainersParams(
    arguments,
    apiListOutput,
    schemas
  );
  const filesToWriteComponentsParams = getFilesToWriteComponentsParams(
    arguments,
    apiListOutput,
    schemas
  );
  const fileToWriteDefinationsParams = getFilesToWriteDefinationsParams(
    arguments,
    apiListOutput,
    schemas
  );
  return [
    {
      source: `${__dirname}/ComponentTemplate/store/configureStore.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/store/configureStore.js`,
      parameters: null,
    },
    {
      source: `${__dirname}/ComponentTemplate/initializer.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/initializer.js`,
      parameters: {
        componentName: arguments.componentName,
      },
    },
    {
      source: `${__dirname}/ComponentTemplate/initializer.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/initializer.js`,
      parameters: {
        componentName: arguments.componentName,
      },
    },
    {
      source: `${__dirname}/ComponentTemplate/index.jsx`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/index.jsx`,
      parameters: null,
    },
    {
      source: `${__dirname}/ComponentTemplate/constants.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/constants.js`,
      parameters: {
        filterParamName: toPascalCaseString(
          toCamelCaseString(arguments.componentName)
        ),
        dataCreateEndPointPost: arguments.dataCreateEndPointPost,
        dataReadEndPointGet: arguments.dataReadEndPointGet,
        dataUpdateEndPointPost: arguments.dataUpdateEndPointPost,
        dataDeleteEndPointGet: arguments.dataDeleteEndPointGet,
      },
    },
    {
      source: `${__dirname}/ComponentTemplate/api/records.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/api/${toCamelCaseString(Object.keys(apiListOutput))}.js`,
      parameters: {
        componentName: capitalize(
          toCamelCaseString(Object.keys(apiListOutput))
        ),
      },
    },
    {
      source: `${__dirname}/ComponentTemplate/schemas/RecordsApiSchema.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/schemas/${capitalize(
        toCamelCaseString(Object.keys(apiListOutput))
      )}ApiSchema.js`,
      parameters: {
        recordsKey: Object.keys(apiListOutput),
        toCamelCaseString: (string) => {
          return toCamelCaseString(string);
        },
        capitalize: (string) => {
          return capitalize(string);
        },
      },
    },
    // {
    //   source: `${__dirname}/ComponentTemplate/schemas/RecordSchema.js`,
    //   destination: `./src/${toCamelCaseString(
    //     arguments.componentName
    //   )}/schemas/${capitalize(
    //     toCamelCaseString(Object.keys(apiListOutput)[0])
    //   )}Schema.js`,
    //   parameters: {
    //     data: getParameterForRecordSchema(
    //       apiListOutput,
    //       Object.keys(apiListOutput)[0]
    //     ),
    //   },
    // },
  ]
    .concat(filesToWriteSchemaParams)
    .concat(filesToWriteSagaParams)
    .concat(filesToWriteDucksParams)
    .concat(filesToWriteContainersParams)
    .concat(filesToWriteComponentsParams)
    .concat(fileToWriteDefinationsParams);
}

const createComponent = async (arguments) => {
  const apiListOutput = await getApiListOutput(arguments.dataReadEndPointGet);
  makeDirs(toCamelCaseString(arguments.componentName));
  var returnValues = "";
  const recordApiOutput = apiListOutput;
  Handlebars.registerHelper("toCamelCaseString", function (aString) {
    return toCamelCaseString(aString);
  });
  Handlebars.registerHelper("capitalize", function (aString) {
    return capitalize(aString);
  });
  Handlebars.registerHelper("toCamelCaseAndCapitalize", function (aString) {
    return capitalize(toCamelCaseString(aString));
  });
  Handlebars.registerHelper("unescapeString", function (aString) {
    return decodeURIComponent(aString);
  });
  for (const property in recordApiOutput) {
    if (typeof recordApiOutput[property] === "object") {
      var returnValues = `${returnValues} ${property}: ${property}Id,`;
    }
  }
  const filesToWrite = await getFilesToWrite(arguments);
  filesToWrite.forEach((fileToWrite) => {
    fs.readFile(fileToWrite.source, "utf8", function (err, data) {
      if (err) {
        return console.info(err);
      }
      const template = Handlebars.compile(data);
      const contents = template(fileToWrite.parameters);

      fs.writeFileSync(fileToWrite.destination, contents, { encoding: null });
    });
  });
};

module.exports = {
  createComponent,
};
