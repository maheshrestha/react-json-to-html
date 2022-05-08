const {
  toCamelCaseString,
  capitalize,
  pathToComponentTemplate,
} = require("./helper");

const getParameterForRecordSchema = (schema, property, schemaType) => {
  var processStrategyObject = [];
  var processStrategyReturn = [];
  var processStrategyEntity = [];

  var entities = [];
  var schemaFields = [];
  for (const property in schema) {
    var propertyToCamelCaseString = toCamelCaseString(property);
    if (
      Array.isArray(schema[property]) &&
      typeof schema[property][0] === "object"
    ) {
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
    } else if (
      typeof schema[property] === "object" &&
      !Array.isArray(schema[property]) &&
      schema[property] !== null
    ) {
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
          if (
            typeof schema[property] === "string" ||
            schema[property] === null
          ) {
            return "''";
          } else if (typeof schema[property] === "number") {
            return 0;
          } else {
            return "undefined";
          }
        },
      });
    }
  }
  const schemaHasIdKey = "id" in schema;
  return {
    schemas: {
      name: property,
      schemaType: schemaType,
      fields: schemaFields,
    },
    schemaHasIdKey: schemaHasIdKey,
    processStrategyObject: `${processStrategyObject.join(", \n\t\t")}`,
    processStrategyReturn: `${processStrategyReturn.join(", \n\t\t")}`,
    processStrategyEntity: `${processStrategyEntity.join(", \n\t\t")}`,
    entities: entities,
    recordsKey: property,
  };
};
const getFilesToWriteSchemaParams = (arguments, schema, return_params = []) => {
  const pathToTemplate = pathToComponentTemplate(arguments.language);
  for (const property in schema) {
    var propertyToCamelCaseString = toCamelCaseString(property);
    if (
      (!!schema[property] &&
        typeof schema[property] === "object" &&
        !Array.isArray(schema[property])) ||
      (!!schema[property] &&
        Array.isArray(schema[property]) &&
        typeof schema[property][0] === "object")
    ) {
      if (Array.isArray(schema[property])) {
        var objectToconvert = schema[property][0];
        var objectType = "Array<Object>";
      } else {
        var objectToconvert = schema[property];
        var objectType = "Object";
      }
      return_params.push({
        source: `${pathToTemplate}/schemas/RecordSchema.js`,
        sechemaType: objectType,
        destination: `./src/${toCamelCaseString(
          arguments.componentName
        )}/schemas/${capitalize(propertyToCamelCaseString)}Schema.js`,
        parameters: {
          data: getParameterForRecordSchema(
            objectToconvert,
            property,
            objectType
          ),
        },
      });
      getFilesToWriteSchemaParams(arguments, objectToconvert, return_params);
    }
  }
  return return_params;
};
module.exports = {
  getFilesToWriteSchemaParams,
  getParameterForRecordSchema,
};
