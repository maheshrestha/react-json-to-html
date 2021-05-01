const fs = require('fs');
const Handlebars = require('handlebars');
const axios = require('axios');
const { info } = require('console');
const { getFilesToWriteSchemaParams, getParameterForRecordSchema } = require('./createSchema');
const { getFilesToWriteSagaParams } = require('./createSaga')
const { getFilesToWriteDucksParams } = require('./createDuck')
const { getFilesToWriteContainersParams } = require('./createContainer')
const { getFilesToWriteComponentsParams } = require('./createComponent')
const { getFilesToWriteDefinationsParams } = require('./createDefinition')

const { api_list_output } = require('./api_output');
const { toCamelCaseString, capitalize } = require('./helper')

//const designType = require('./designType');
//const createType = require('createType');
const {
  unescapeString
} = require('@w6s/escape');

function makeDirs(directoryName) {
  // Here we want to make sure our directories exist.
  fs.mkdirSync(`../react-app/src/${directoryName}`, { recursive: true });
  fs.mkdirSync(`../react-app/src/${directoryName}/api`, { recursive: true });
  fs.mkdirSync(`../react-app/src/${directoryName}/components`, { recursive: true });
  fs.mkdirSync(`../react-app/src/${directoryName}/containers`, { recursive: true });
  fs.mkdirSync(`../react-app/src/${directoryName}/definitions`, { recursive: true });
  fs.mkdirSync(`../react-app/src/${directoryName}/ducks`, { recursive: true });
  fs.mkdirSync(`../react-app/src/${directoryName}/sagas`, { recursive: true });
  fs.mkdirSync(`../react-app/src/${directoryName}/schemas`, { recursive: true });
  fs.mkdirSync(`../react-app/src/${directoryName}/store`, { recursive: true });
  //fs.mkdirSync(`../react-app/src/${directoryName}/style`, { recursive: true });
  fs.mkdirSync(`../react-app/src/${directoryName}/types`, { recursive: true });
}

var filesToWrite = (arguments) => {
  //const filesToWriteSchemaParams = getFilesToWriteSchemaParams(arguments, Object.values(api_list_output)[0].results[0]);
  const filesToWriteSchemaParams = getFilesToWriteSchemaParams(arguments, api_list_output);
  const schemas = filesToWriteSchemaParams.map((vv) => (
    vv.parameters.data.schemas
  ));

  //console.error("schemas: ", schemas);
  const filesToWriteSagaParams = getFilesToWriteSagaParams(arguments, api_list_output, schemas);
  const filesToWriteDucksParams = getFilesToWriteDucksParams(arguments, api_list_output, schemas);
  const filesToWriteContainersParams = getFilesToWriteContainersParams(arguments, api_list_output, schemas);
  const filesToWriteComponentsParams = getFilesToWriteComponentsParams(arguments, api_list_output, schemas);
  const fileToWriteDefinationsParams = getFilesToWriteDefinationsParams(arguments, api_list_output, schemas);
  return [
    {
      source: 'ComponentTemplate/store/configureStore.js',
      destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/store/configureStore.js`,
      parameters: null
    },
    {
      source: 'ComponentTemplate/initializer.js',
      destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/initializer.js`,
      parameters: {
        componentName: arguments.componentName
      }
    },
    {
      source: 'ComponentTemplate/initializer.js',
      destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/initializer.js`,
      parameters: {
        componentName: arguments.componentName
      }
    },
    {
      source: 'ComponentTemplate/index.jsx',
      destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/index.jsx`,
      parameters: null
    },
    {
      source: 'ComponentTemplate/constants.js',
      destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/constants.js`,
      parameters: {
        dataCreateEndPointPost: arguments.dataCreateEndPointPost,
        dataReadEndPointGet: arguments.dataReadEndPointGet,
        dataUpdateEndPointPost: arguments.dataUpdateEndPointPost,
        dataDeleteEndPointGet: arguments.dataDeleteEndPointGet
      }
    },
    {
      source: 'ComponentTemplate/api/records.js',
      destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/api/${toCamelCaseString(Object.keys(api_list_output)[0])}.js`,
      parameters: {
        componentName: capitalize(toCamelCaseString(Object.keys(api_list_output)[0]))
      }
    },
    {
      source: 'ComponentTemplate/schemas/RecordsApiSchema.js',
      destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/schemas/${capitalize(toCamelCaseString(Object.keys(api_list_output)[0]))}ApiSchema.js`,
      parameters: {
        recordsKey: Object.keys(api_list_output)[0],
        toCamelCaseString: (string) => {
          return toCamelCaseString(string);
        },
        capitalize: (string) => {
          return capitalize(string);
        }
      }
    },
    {
      source: 'ComponentTemplate/schemas/RecordSchema.js',
      destination: `../react-app/src/${toCamelCaseString(arguments.componentName)}/schemas/${capitalize( toCamelCaseString(Object.keys(api_list_output)[0]))}Schema.js`,
      parameters: {
        data: getParameterForRecordSchema(api_list_output.results[0], Object.keys(api_list_output)[0])
      }
    }
  ]
  .concat(filesToWriteSchemaParams)
  .concat(filesToWriteSagaParams)
  .concat(filesToWriteDucksParams)
  .concat(filesToWriteContainersParams)
  .concat(filesToWriteComponentsParams)
  .concat(fileToWriteDefinationsParams);
}

const createComponent = (arguments) => {
  makeDirs(toCamelCaseString(arguments.componentName));
  var returnValues = '';
  const recordApiOutput = api_list_output.results[0];
  Handlebars.registerHelper('toCamelCaseString', function (aString) {
    return toCamelCaseString(aString);
  });
  Handlebars.registerHelper('capitalize', function (aString) {
    return capitalize(aString);
  });
  Handlebars.registerHelper('toCamelCaseAndCapitalize', function (aString) {
    return capitalize(toCamelCaseString(aString));
  });
  Handlebars.registerHelper('unescapeString', function (aString) {
    return unescapeString(aString);
  });
  for (const property in recordApiOutput) {
    if (typeof recordApiOutput[property] === 'object') {
      var returnValues = `${returnValues} ${property}: ${property}Id,`
    }
    console.log(`${returnValues}`);
  }
  filesToWrite(arguments).forEach(fileToWrite => {
    fs.readFile(fileToWrite.source, 'utf8', function (err,data) {
      if (err) {
        return console.info(err);
      }
      const template = Handlebars.compile(data);
      const contents = template(fileToWrite.parameters);

      fs.writeFileSync(
        fileToWrite.destination,
        contents,
        {encoding: null}
      );
    });
  });

}

module.exports = {
  createComponent
}
