const readline = require("readline");
const fs = require("fs");
const colors = require("colors");
const { toCamelCaseString, capitalize } = require("./helper");
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
  fieldDataType
) => {
  fs.mkdirSync(`./src/${toCamelCaseString(componentName)}/containers/filters`, {
    recursive: true,
  });
  fs.mkdirSync(`./src/${toCamelCaseString(componentName)}/components/filters`, {
    recursive: true,
  });
  const filesToModify = [
    // ducks
    {
      sourceFilePath: `./src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      babelPlugins: [`${__dirname}/babelPlugin/addFilter/ducks/index.js`],
    },
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/ducks/input/filters.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/ducks/filters.js`,
      babelPlugins: [
        [
          `${__dirname}/babelPlugin/addFilter/ducks/filters.js`,
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
    },
    // Create sagas
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/sagas/input/filtersSagas.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/filtersSagas.js`,
      babelPlugins: [
        [
          `${__dirname}/babelPlugin/addFilter/sagas/filtersSagas.js`,
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
      babelPlugins: [`${__dirname}/babelPlugin/addFilter/sagas/index.js`],
    },
    {
      sourceFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/resultsSagas.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/resultsSagas.js`,
      babelPlugins: [
        `${__dirname}/babelPlugin/addFilter/sagas/resultsSagas.js`,
      ],
    },

    // definitions
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/definitions/input/Filters.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/definitions/Filters.js`,
      babelPlugins: [
        [
          `${__dirname}/babelPlugin/addFilter/definitions/Filters.js`,
          { fieldName: denormalizedFieldName },
        ],
      ],
    },

    // Create containers
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/containers/input/Filters.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/containers/Filters.js`,
      babelPlugins: [],
    },
    // Update containers
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/containers/input/filters/abcFilter.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/containers/filters/${toCamelCaseString(
        denormalizedFieldName
      )}Filter.js`,
      babelPlugins: [
        [
          `${__dirname}/babelPlugin/addFilter/containers/filters/abcFilter.js`,
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
    },
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/containers/App.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/containers/App.js`,
      babelPlugins: [
        [
          `${__dirname}/babelPlugin/addFilter/containers/App.js`,
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
    },
    // components
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/components/input/Filters.jsx`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/components/Filters.jsx`,
      babelPlugins: [
        [
          `${__dirname}/babelPlugin/addFilter/components/Filters.js`,
          { fieldName: denormalizedFieldName },
        ],
      ],
    },
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/components/input/filters/${capitalize(
        fieldDataType
      )}Filter.jsx`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/components/filters/${capitalize(fieldDataType)}Filter.jsx`,
      babelPlugins: [],
    },
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/components/input/App.jsx`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/components/App.jsx`,
      babelPlugins: [
        [
          `${__dirname}/babelPlugin/addFilter/components/App.js`,
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
          `${__dirname}/babelPlugin/addFilter/constants.js`,
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
  if (sourceFilePath === `./src/vaccinations/sagas/index.js`)
    console.log("tttt- ", ast);
  fs.writeFile(
    destinationFilePath,
    transformFromAstSync.code,
    "utf8",
    function () {
      var cmd = `eslint --no-eslintrc -c ./.eslintrc.js  ${destinationFilePath} --fix`;
      exec(cmd, function (error, stdout, stderr) {
        // command output is in stdout
      });
    }
  );
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
