const fs = require('fs');
const Handlebars = require('handlebars');
const toCamelCase = require('camelcase')
const axios = require('axios');
const { info } = require('console');

//const designType = require('./designType');
//const createType = require('createType');


var toCamelCaseString = (input) => {
  var camelCaseString = toCamelCase(input);
  return !!camelCaseString ? camelCaseString : input;
}

function makeDirs(directoryName) {
  // Here we want to make sure our directories exist.
  fs.mkdirSync(`./components/${directoryName}`, { recursive: true });
  fs.mkdirSync(`./components/${directoryName}/api`, { recursive: true });
  fs.mkdirSync(`./components/${directoryName}/components`, { recursive: true });
  //fs.mkdirSync(`./components/${directoryName}/containers`, { recursive: true });
  //fs.mkdirSync(`./components/${directoryName}/definations`, { recursive: true });
  //fs.mkdirSync(`./components/${directoryName}/ducks`, { recursive: true });
  //fs.mkdirSync(`./components/${directoryName}/sagas`, { recursive: true });
  fs.mkdirSync(`./components/${directoryName}/schemas`, { recursive: true });
  //fs.mkdirSync(`./components/${directoryName}/store`, { recursive: true });
  //fs.mkdirSync(`./components/${directoryName}/style`, { recursive: true });
  fs.mkdirSync(`./components/${directoryName}/types`, { recursive: true });
}

const api_list_output = {
  "my_team_members":
  {
    "total_entries": 1,
    "results": [
      {
        "id":"545389",
        "carer_id":"65779",
        "dummy_name": "mahesh shrestha",
        "client":{
          "id":"65812",
          "slug":"client-test",
          "first_name":"client",
          "last_name":"test",
          "name":"client test",
          "client_profile": {
            "id": "987",
            "gender":null
          },
          "current_address":{
            "id": "12345",
            "address":"164 Barrow St, Coburg VIC 3058, Australia",
            "suburb":"Coburg",
            "postcode":"3058",
            "state":"Victoria"
          },
          "default_profile":{
            "id":"106809",
            "organisation":null,
            "picture":null
          }
        }
      }
    ]
  }
}
const getParameterForRecordSchema = () => {
  var processStrategyObject = [];
  var processStrategyReturn = [];
  var processStrategyEntity = [];
  const apiResults = Object.values(api_list_output)[0].results[0];
  for (const property in apiResults) {
    var propertyToCamelCaseString = toCamelCaseString(property);

    if (typeof apiResults[property] === 'object') {
      processStrategyObject.push(`${property}: ${property}Id`);
      processStrategyEntity.push(`${property}Id: ${property}Schema`);
      processStrategyReturn.push(`${propertyToCamelCaseString}Id`);
    }
    else {
      processStrategyObject.push(`${property}: ${propertyToCamelCaseString}`);
      processStrategyReturn.push(`${propertyToCamelCaseString}`);
    }
  }
  return ({ 
    'processStrategyObject': `${processStrategyObject.join(', ')}`,
    'processStrategyReturn': `${processStrategyReturn.join(', ')}`,
    'processStrategyEntity': `${processStrategyEntity.join(', ')}`,
    'recordsKey': Object.keys(api_list_output)[0]
  });
}
const getFilesToWriteParams = () => {

}

var filesToWrite = (arguments) => {
  return [
    {
      source: 'ComponentTemplate/initializer.js',
      destination: `./components/${toCamelCaseString(arguments.componentName)}/initializer.js`,
      parameters: {
        componentName: arguments.componentName
      }
    },
    {
      source: 'ComponentTemplate/initializer.js',
      destination: `./components/${toCamelCaseString(arguments.componentName)}/initializer.js`,
      parameters: {
        componentName: arguments.componentName
      }
    },
    {
      source: 'ComponentTemplate/index.jsx',
      destination: `./components/${toCamelCaseString(arguments.componentName)}/index.jsx`,
      parameters: null
    },
    {
      source: 'ComponentTemplate/constants.js',
      destination: `./components/${toCamelCaseString(arguments.componentName)}/constants.js`,
      parameters: {
        dataCreateEndPointPost: arguments.dataCreateEndPointPost,
        dataReadEndPointGet: arguments.dataReadEndPointGet,
        dataUpdateEndPointPost: arguments.dataUpdateEndPointPost,
        dataDeleteEndPointGet: arguments.dataDeleteEndPointGet
      }
    },
    {
      source: 'ComponentTemplate/api/records.js',
      destination: `./components/${toCamelCaseString(arguments.componentName)}/api/records.js`,
      parameters: null
    },
    {
      source: 'ComponentTemplate/schemas/RecordsApiSchema.js',
      destination: `./components/${toCamelCaseString(arguments.componentName)}/schemas/RecordsApiSchema.js`,
      parameters: {
        recordsKey: Object.keys(api_list_output)[0]
      }
    },
    {
      source: 'ComponentTemplate/schemas/RecordSchema.js',
      destination: `./components/${toCamelCaseString(arguments.componentName)}/schemas/RecordSchema.js`,
      parameters: { 
        data: getParameterForRecordSchema()
      }
    },

    getFilesToWriteParams()

  ]
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
  const recordApiOutput = Object.values(api_list_output)[0].results[0];
  console.error("recordApiOutput: ", recordApiOutput);
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
  console.error(returnValues);
  filesToWrite(arguments).forEach(fileToWrite => {
    fs.readFile(fileToWrite.source, 'utf8', function (err,data) {
      if (err) {
        return console.info(err);
      }
      const template = Handlebars.compile(data);
      console.info("parameters: ", fileToWrite.destination)
      console.info("parameters: ", fileToWrite.parameters)
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