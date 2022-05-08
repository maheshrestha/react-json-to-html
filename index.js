const fs = require("fs");
const exec = require("child_process").exec;
const Handlebars = require("handlebars");
const { getFilesToWriteSchemaParams } = require("./createSchema");
const { getFilesToWriteSagaParams } = require("./createSaga");
const { getFilesToWriteDucksParams } = require("./createDuck");
const { getFilesToWriteContainersParams } = require("./createContainer");
const { getFilesToWriteComponentsParams } = require("./createComponent");
const { getFilesToWriteDefinationsParams } = require("./createDefinition");
const { getJosnInputToCreateModule } = require("./apiOutput");
const {
  toCamelCaseString,
  toPascalCaseString,
  capitalize,
  pathToComponentTemplate,
} = require("./helper");
const componentFilesToEslint = (componentName) => [
  `src/${componentName}/schemas/*.js`,
];

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
}

async function getFilesToWrite(arguments) {
  const apiListOutput = await getJosnInputToCreateModule(arguments);
  const filesToWriteSchemaParams = getFilesToWriteSchemaParams(
    arguments,
    apiListOutput
  );
  const schemas = filesToWriteSchemaParams.map((vv) => {
    return vv.parameters.data.schemas;
  });
  const filesToWriteSagaParams = getFilesToWriteSagaParams(arguments, schemas);
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
    schemas
  );
  const pathToComponent = pathToComponentTemplate(arguments.language);
  const filesToWrite = [
    {
      source: `${pathToComponent}/store/configureStore.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/store/configureStore.js`,
      parameters: null,
    },
    {
      source: `${pathToComponent}/initializer.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/initializer.js`,
      parameters: {
        componentName: arguments.componentName,
      },
    },
    {
      source: `${pathToComponent}/initializer.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/initializer.js`,
      parameters: {
        componentName: arguments.componentName,
      },
    },
    {
      source: `${pathToComponent}/index.jsx`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/index.jsx`,
      parameters: null,
    },
    {
      source: `${pathToComponent}/constants.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/constants.js`,
      parameters: {
        filterParamName: toCamelCaseString(arguments.componentName),
        dataCreateEndPointPost: arguments.dataCreateEndPointPost,
        dataReadEndPointGet: arguments.dataReadEndPointGet,
        dataUpdateEndPointPost: arguments.dataUpdateEndPointPost,
        dataDeleteEndPointGet: arguments.dataDeleteEndPointGet,
      },
    },
    {
      source: `${pathToComponent}/api/records.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/api/${toCamelCaseString(arguments.componentName)}.js`,
      parameters: {
        componentName: toCamelCaseString(arguments.componentName),
      },
    },
  ]
    .concat(filesToWriteSchemaParams)
    .concat(filesToWriteSagaParams)
    .concat(filesToWriteDucksParams)
    .concat(filesToWriteContainersParams)
    .concat(filesToWriteComponentsParams)
    .concat(fileToWriteDefinationsParams);
  if (Array.isArray(Object.values(apiListOutput)[0])) {
    const componentApiSchema = {
      source: `${pathToComponent}/schemas/RecordsApiSchema.js`,
      destination: `./src/${toCamelCaseString(
        arguments.componentName
      )}/schemas/${capitalize(
        toCamelCaseString(arguments.componentName)
      )}ApiSchema.js`,
      parameters: {
        componentName: toCamelCaseString(arguments.componentName),
        schemas: Object.keys(apiListOutput).map(function (key, index) {
          return {
            name: key,
            isArrayOfObject: Array.isArray(apiListOutput[key]),
            isObject: !Array.isArray(apiListOutput[key]),
          };
        }),
      },
    };
    filesToWrite.unshift(componentApiSchema);
  }
  return filesToWrite;
}

async function createComponent(arguments) {
  const apiListOutput = await getJosnInputToCreateModule(arguments);
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
  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
  Handlebars.registerHelper("break", function (context, options) {
    eachExit.push(true);
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
  componentFilesToEslint(toCamelCaseString(arguments.componentName)).forEach(
    (esLintToComponentFile) => {
      var cmd = `eslint ${esLintToComponentFile} --fix`;
      exec(cmd, function (error, stdout, stderr) {
        if (error) console.log(error);
      });
    }
  );
}

module.exports = {
  createComponent,
};
