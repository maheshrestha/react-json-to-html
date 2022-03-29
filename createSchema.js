const { toCamelCaseString, capitalize } = require("./helper");

const getParameterForRecordSchema = (schema, property) => {
  var processStrategyObject = [];
  var processStrategyReturn = [];
  var processStrategyEntity = [];

  var entities = [];
  var schemaFields = [];
  for (const property in schema) {
    var propertyToCamelCaseString = toCamelCaseString(property);
    if (Array.isArray(schema[property])) {
      processStrategyObject.push(
        `${property}: ${propertyToCamelCaseString}Ids`
      );
      processStrategyEntity.push(
        `${propertyToCamelCaseString}Ids: [${capitalize(
          propertyToCamelCaseString
        )}Schema]`
      );
      processStrategyReturn.push(`${propertyToCamelCaseString}Ids`);
      entities.push(property);
      schemaFields.push({
        schemaField: `${propertyToCamelCaseString}Ids`,
        schemaType: "Array<string>",
        fieldType: "OrderedSet<string>",
        defaultValue: "OrderedSet()",
      });
    } else if (typeof schema[property] === "object") {
      processStrategyObject.push(`${property}: ${propertyToCamelCaseString}Id`);
      processStrategyEntity.push(
        `${propertyToCamelCaseString}Id: ${capitalize(
          propertyToCamelCaseString
        )}Schema`
      );
      processStrategyReturn.push(`${propertyToCamelCaseString}Id`);
      entities.push(property);
      schemaFields.push({
        schemaField: `${propertyToCamelCaseString}Id`,
        schemaType: "string",
        fieldType: "string",
        defaultValue: "''",
      });
    } else {
      processStrategyObject.push(`${property}: ${propertyToCamelCaseString}`);
      processStrategyReturn.push(`${propertyToCamelCaseString}`);
      schemaFields.push({
        schemaField: `${propertyToCamelCaseString}`,
        schemaType: "string",
        fieldType: typeof schema[property],
        defaultValue: () => {
          if (typeof schema[property] == "string") {
            return "''";
          } else if (typeof schema[property] == "number") {
            return 0;
          } else {
            return null;
          }
        },
      });
    }
  }
  return {
    schemas: {
      name: property,
      fields: schemaFields,
    },
    processStrategyObject: `${processStrategyObject.join(", \n\t\t")}`,
    processStrategyReturn: `${processStrategyReturn.join(", \n\t\t")}`,
    processStrategyEntity: `${processStrategyEntity.join(", \n\t\t")}`,
    entities: entities,
    recordsKey: property,
  };
};
const getFilesToWriteSchemaParams = (arguments, schema, return_params = []) => {
  // return null;
  //console.error("schema: ", schema);
  for (const property in schema) {
    var propertyToCamelCaseString = toCamelCaseString(property);
    if (!!schema[property] && typeof schema[property] === "object") {
      if (Array.isArray(schema[property])) {
        var objectToconvert = schema[property][0];
      } else {
        var objectToconvert = schema[property];
      }
      return_params.push({
        source: `${__dirname}/ComponentTemplate/schemas/RecordSchema.js`,
        destination: `./src/${toCamelCaseString(
          arguments.componentName
        )}/schemas/${capitalize(propertyToCamelCaseString)}Schema.js`,
        parameters: {
          data: getParameterForRecordSchema(objectToconvert, property),
        },
      });
      getFilesToWriteSchemaParams(arguments, objectToconvert, return_params);
    }
  }
  //console.error("return: ", return_params);
  return return_params;
};
module.exports = {
  getFilesToWriteSchemaParams,
  getParameterForRecordSchema,
};
