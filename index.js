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
            "gender": "male"
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
            "organisation":{
              "id": "123",
              "name": "Care Support"
            },
            "picture": {
              "id": "199",
              "url": "sssss"
            }
          }
        },
        "carer":{
          "id":"65812",
          "slug":"client-test",
          "first_name":"client",
          "last_name":"test",
          "name":"client test",
          "client_profile": {
            "id": "987",
            "gender": "male"
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
            "organisation":{
              "id": "123",
              "name": "Care Support"
            },
            "picture": {
              "id": "199",
              "url": "sssss"
            }
          },
          "team_members": [
            {"id": "222", "name": "full name", "phone": "0415760459", "photo": {"id": "111", "url": "mmmm" }}
          ]
        }
      }
    ]
  }
}
const getParameterForRecordSchema = (schema, property) => {
  var processStrategyObject = [];
  var processStrategyReturn = [];
  var processStrategyEntity = [];
  for (const property in schema) {
    var propertyToCamelCaseString = toCamelCaseString(property);
    if (Array.isArray(schema[property])) {
      processStrategyObject.push(`${property}: ${propertyToCamelCaseString}Ids`);
      processStrategyEntity.push(`${propertyToCamelCaseString}Ids: [${propertyToCamelCaseString}Schema]`);
      processStrategyReturn.push(`${propertyToCamelCaseString}Ids`);
    }
    else if (typeof schema[property] === 'object') {
      processStrategyObject.push(`${property}: ${propertyToCamelCaseString}Id`);
      processStrategyEntity.push(`${propertyToCamelCaseString}Id: ${propertyToCamelCaseString}Schema`);
      processStrategyReturn.push(`${propertyToCamelCaseString}Id`);
    }
    else {
      processStrategyObject.push(`${property}: ${propertyToCamelCaseString}`);
      processStrategyReturn.push(`${propertyToCamelCaseString}`);
    }
  }
  return ({ 
    'processStrategyObject': `${processStrategyObject.join(', \n\t\t')}`,
    'processStrategyReturn': `${processStrategyReturn.join(', \n\t\t')}`,
    'processStrategyEntity': `${processStrategyEntity.join(', \n\t\t')}`,
    'recordsKey': property
  });
}
const getFilesToWriteSchemaParams = (arguments, schema, return_params = []) => {
  // return null;
  //console.error("schema: ", schema);
  for (const property in schema) {
    var propertyToCamelCaseString = toCamelCaseString(property);
    if (!!schema[property] && typeof schema[property] === 'object') {
      if (Array.isArray(schema[property])) {
        var objectToconvert = schema[property][0];       
      }
      else {
        var objectToconvert = schema[property];       
      }
      return_params.push({
        source: 'ComponentTemplate/schemas/RecordSchema.js',
        destination: `./components/${toCamelCaseString(arguments.componentName)}/schemas/${propertyToCamelCaseString}Schema.js`,
        parameters: { 
          data: getParameterForRecordSchema(objectToconvert, property)
        }
      });
      
        console.error("schema[property]: ", objectToconvert);

        getFilesToWriteSchemaParams(arguments, objectToconvert, return_params);
    }
    
  }
  return return_params;
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
        data: getParameterForRecordSchema(Object.values(api_list_output)[0].results[0], Object.keys(api_list_output)[0])
      }
    }
  ]
  .concat(getFilesToWriteSchemaParams(arguments, Object.values(api_list_output)[0].results[0]))
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