const fs = require('fs');
const Handlebars = require('handlebars');
const axios = require('axios');
const { info } = require('console');
const { getFilesToWriteSchemaParams, getParameterForRecordSchema } = require('./createSchema');
const { getFilesToWriteSagaParams } = require('./createSaga')
const { api_list_output } = require('./api_output');
const { toCamelCaseString, capitalize } = require('./helper')

//const designType = require('./designType');
//const createType = require('createType');


function makeDirs(directoryName) {
  // Here we want to make sure our directories exist.
  fs.mkdirSync(`./src/${directoryName}`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/api`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/components`, { recursive: true });
  //fs.mkdirSync(`./src/${directoryName}/containers`, { recursive: true });
  //fs.mkdirSync(`./src/${directoryName}/definations`, { recursive: true });
  //fs.mkdirSync(`./src/${directoryName}/ducks`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/sagas`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/schemas`, { recursive: true });
  //fs.mkdirSync(`./src/${directoryName}/store`, { recursive: true });
  //fs.mkdirSync(`./src/${directoryName}/style`, { recursive: true });
  fs.mkdirSync(`./src/${directoryName}/types`, { recursive: true });
}

var filesToWrite = (arguments) => {
  return [
    {
      source: 'ComponentTemplate/initializer.js',
      destination: `./src/${toCamelCaseString(arguments.componentName)}/initializer.js`,
      parameters: {
        componentName: arguments.componentName
      }
    },
    {
      source: 'ComponentTemplate/initializer.js',
      destination: `./src/${toCamelCaseString(arguments.componentName)}/initializer.js`,
      parameters: {
        componentName: arguments.componentName
      }
    },
    {
      source: 'ComponentTemplate/index.jsx',
      destination: `./src/${toCamelCaseString(arguments.componentName)}/index.jsx`,
      parameters: null
    },
    {
      source: 'ComponentTemplate/constants.js',
      destination: `./src/${toCamelCaseString(arguments.componentName)}/constants.js`,
      parameters: {
        dataCreateEndPointPost: arguments.dataCreateEndPointPost,
        dataReadEndPointGet: arguments.dataReadEndPointGet,
        dataUpdateEndPointPost: arguments.dataUpdateEndPointPost,
        dataDeleteEndPointGet: arguments.dataDeleteEndPointGet
      }
    },
    {
      source: 'ComponentTemplate/api/records.js',
      destination: `./src/${toCamelCaseString(arguments.componentName)}/api/${toCamelCaseString(Object.keys(api_list_output)[0])}.js`,
      parameters: {
        componentName: capitalize(toCamelCaseString(Object.keys(api_list_output)[0]))
      }
    },
    {
      source: 'ComponentTemplate/schemas/RecordsApiSchema.js',
      destination: `./src/${toCamelCaseString(arguments.componentName)}/schemas/${capitalize(toCamelCaseString(Object.keys(api_list_output)[0]))}ApiSchema.js`,
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
      destination: `./src/${toCamelCaseString(arguments.componentName)}/schemas/${capitalize( toCamelCaseString(Object.keys(api_list_output)[0]))}Schema.js`,
      parameters: { 
        data: getParameterForRecordSchema(Object.values(api_list_output)[0].results[0], Object.keys(api_list_output)[0])
      }
    }
  ]
  .concat(getFilesToWriteSchemaParams(arguments, Object.values(api_list_output)[0].results[0]))
  .concat(getFilesToWriteSagaParams(arguments, api_list_output))
}

const createComponent = (arguments) => {
  makeDirs(toCamelCaseString(arguments.componentName));

  // console.info(arguments.dataReadEndPointGet);
  // axios.get(arguments.dataReadEndPointGet)
  //   .then(response => {
  //     //console.info(response);
  //     console.info(response.data);
  //     return;
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  //createType(api_list_output.my_team_members.results);
  var returnValues = '';
  //console.error(api_list_output);
  const recordApiOutput = Object.values(api_list_output)[0].results[0];
  Handlebars.registerHelper('toCamelCaseString', function (aString) {
    return toCamelCaseString(aString);
  });
  Handlebars.registerHelper('capitalize', function (aString) {
    return capitalize(aString);
  });
  Handlebars.registerHelper('toCamelCaseAndCapitalize', function (aString) {
    return capitalize(toCamelCaseString(aString));
  });
  for (const property in recordApiOutput) {
    if (typeof recordApiOutput[property] === 'object') {
      var returnValues = `${returnValues} ${property}: ${property}Id,`
    }
    console.log(`${returnValues}`);
  }
  // recordApiOutput.forEach(entry => {
  //   const [key, val] = entry;
  //   if (typeof val === 'object') {
  //     var returnValues = `${returnValues}, ${key}: ${key}Id`
  //   }
  // });
  //console.error("files_to_right: ",filesToWrite(arguments));
  filesToWrite(arguments).forEach(fileToWrite => {
    //console.error("fileToWrite: ", fileToWrite);
    fs.readFile(fileToWrite.source, 'utf8', function (err,data) {
      if (err) {
        return console.info(err);
      }
      const template = Handlebars.compile(data);
      const contents = template(fileToWrite.parameters);
      fs.writeFileSync(
        fileToWrite.destination,
        contents
      );
    });
  });
    
}

module.exports = {
  createComponent
}