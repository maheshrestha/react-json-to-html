const { toCamelCaseString, capitalize } = require('./helper')

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
        destination: `./components/${toCamelCaseString(arguments.componentName)}/schemas/${capitalize(propertyToCamelCaseString)}Schema.js`,
        parameters: { 
          data: getParameterForRecordSchema(objectToconvert, property)
        }
      });
      getFilesToWriteSchemaParams(arguments, objectToconvert, return_params);
    }
    
  }
  return return_params;
}
module.exports = {
  getFilesToWriteSchemaParams,
  getParameterForRecordSchema
}