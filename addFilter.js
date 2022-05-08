const readline = require("readline");
const fs = require("fs");
const colors = require("colors");
const {
  toCamelCaseString,
  capitalize,
  pathToAddFilterBabelPlugin,
} = require("./helper");
const exec = require("child_process").exec;
var babel = require("@babel/core");
const { looksLike } = require("./babelPlugin/helper");

colors.setTheme({
  info: "green",
  help: "cyan",
  warn: "yellow",
  success: "green",
  error: "red",
});
const addFilterToComponent = (
  componentName,
  denormalizedFieldName,
  fieldDataType,
  language
) => {
  const addFilterBabelPluginPath = pathToAddFilterBabelPlugin(language);
  fs.mkdirSync(`./src/${toCamelCaseString(componentName)}/containers/filters`, {
    recursive: true,
  });
  fs.mkdirSync(`./src/${toCamelCaseString(componentName)}/components/filters`, {
    recursive: true,
  });
  const filesToModify = [
    // components
    {
      sourceFilePath: `${addFilterBabelPluginPath}/components/input/Filters.jsx`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/components/Filters.jsx`,
      babelPlugins: [
        [
          `${addFilterBabelPluginPath}/components/Filters.js`,
          { fieldName: denormalizedFieldName },
        ],
      ],
    },
    // ducks
    {
      sourceFilePath: `./src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      babelPlugins: [`${addFilterBabelPluginPath}/ducks/index.js`],
    },
    {
      sourceFilePath: `${addFilterBabelPluginPath}/ducks/input/filters.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/ducks/filters.js`,
      babelPlugins: [
        [
          `${addFilterBabelPluginPath}/ducks/filters.js`,
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
    },
    // Create sagas
    {
      sourceFilePath: `${addFilterBabelPluginPath}/sagas/input/filtersSagas.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/filtersSagas.js`,
      babelPlugins: [
        [
          `${addFilterBabelPluginPath}/sagas/filtersSagas.js`,
          {
            fieldName: denormalizedFieldName,
            fieldDataType: fieldDataType,
            componentName: componentName,
          },
        ],
      ],
    },
    // Update sagas
    {
      sourceFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/index.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/index.js`,
      babelPlugins: [`${addFilterBabelPluginPath}/sagas/index.js`],
    },
    {
      sourceFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/${toCamelCaseString(componentName)}Sagas.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/${toCamelCaseString(componentName)}Sagas.js`,
      babelPlugins: [`${addFilterBabelPluginPath}/sagas/resultsSagas.js`],
    },

    // definitions
    {
      sourceFilePath: `${addFilterBabelPluginPath}/definitions/input/Filters.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/definitions/Filters.js`,
      babelPlugins: [
        [
          `${addFilterBabelPluginPath}/definitions/Filters.js`,
          { fieldName: denormalizedFieldName },
        ],
      ],
    },

    // Create containers
    {
      sourceFilePath: `${addFilterBabelPluginPath}/containers/input/Filters.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/containers/Filters.js`,
      babelPlugins: [],
    },
    // Update containers
    {
      sourceFilePath: `${addFilterBabelPluginPath}/containers/input/filters/abcFilter.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/containers/filters/${capitalize(
        toCamelCaseString(denormalizedFieldName)
      )}Filter.js`,
      babelPlugins: [
        [
          `${addFilterBabelPluginPath}/containers/filters/abcFilter.js`,
          {
            componentName: componentName,
            fieldName: denormalizedFieldName,
            fieldDataType: fieldDataType,
          },
        ],
      ],
    },
    {
      sourceFilePath: `${addFilterBabelPluginPath}/containers/App.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/containers/App.js`,
      babelPlugins: [
        [
          `${addFilterBabelPluginPath}/containers/App.js`,
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
    },

    {
      sourceFilePath: `${addFilterBabelPluginPath}/components/input/filters/${capitalize(
        fieldDataType
      )}Filter.jsx`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/components/filters/${capitalize(fieldDataType)}Filter.jsx`,
      babelPlugins: [],
    },
    {
      sourceFilePath: `${addFilterBabelPluginPath}/components/input/App.jsx`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/components/App.jsx`,
      babelPlugins: [
        [
          `${addFilterBabelPluginPath}/components/App.js`,
          { fieldName: denormalizedFieldName },
        ],
      ],
    },
    {
      sourceFilePath: ``,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/constants.js`,
      babelPlugins: [
        [
          `${addFilterBabelPluginPath}/constants.js`,
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
    },
  ];

  filesToModify.forEach((fileToModify) => {
    if (fs.existsSync(fileToModify.destinationFilePath)) {
      fileToModify.sourceFilePath = fileToModify.destinationFilePath;
    }
    compileFileWithBabelPlugin(
      fileToModify.sourceFilePath,
      fileToModify.destinationFilePath,
      fileToModify.babelPlugins
    );
  });
};

const getAst = (source) => {
  return require("@babel/parser").parse(source, {
    sourceType: "module",
    plugins: ["jsx", "flow"],
    retainLines: true,
    minified: true,
  });
};

const compileFileWithBabelPlugin = (
  sourceFilePath,
  destinationFilePath,
  babelPlugins
) => {
  const source = fs.readFileSync(sourceFilePath, "utf8");
  var ast = getAst(source);
  const filename = sourceFilePath;
  const transformFromAstSync = babel.transformFromAstSync(ast, source, {
    filename,
    plugins: babelPlugins,
    babelrc: false,
    configFile: false,
  });
  fs.writeFileSync(destinationFilePath, transformFromAstSync.code, {
    encoding: null,
  });
  var cmd = `eslint ${destinationFilePath} --fix`;
  exec(cmd, function (error, stdout, stderr) {
    if (error) console.log(error);
    // command output is in stdout
  });
};

const isPaginationExist = (componentName) => {
  const sourceFilePath = `./src/${componentName}/sagas/index.js`;
  const source = fs.readFileSync(sourceFilePath, "utf8");
  var ast = getAst(source);
  return !!ast.program.body
    .find(
      (b) =>
        b.type === "ExportDefaultDeclaration" &&
        b.declaration.id.name === "rootSaga"
    )
    .declaration.body.body[0].declarations.find(
      (d) => d.id.name === "allWatches"
    )
    .init.elements.find((e) => e.argument.name === "paginationWatches");
};

module.exports = {
  addFilterToComponent,
  isPaginationExist,
};
