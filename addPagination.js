const readline = require("readline");
const fs = require("fs");
const colors = require("colors");
const { toCamelCaseString, capitalize } = require("./helper");
const exec = require("child_process").exec;
var babel = require("@babel/core");

colors.setTheme({
  info: "green",
  help: "cyan",
  warn: "yellow",
  success: "green",
  error: "red",
});
const addPaginationComponent = (componentName) => {
  const filesToModify = [
    // Create sagas
    {
      sourceFilePath: `${__dirname}/babelPlugin/addPagination/sagas/input/paginationSaga.js`,
      destinationFilePath: `./src/common/sagas/paginationSaga.js`,
      babelPlugins: [
        [
          `${__dirname}/babelPlugin/addPagination/sagas/paginationSaga.js`,
          {
            componentName: toCamelCaseString(componentName),
          },
        ],
      ],
    },
    {
      sourceFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/index.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/index.js`,
      babelPlugins: [`${__dirname}/babelPlugin/addPagination/sagas/index.js`],
    },
    {
      sourceFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/resultsSagas.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/sagas/resultsSagas.js`,
      babelPlugins: [
        `${__dirname}/babelPlugin/addPagination/sagas/resultsSagas.js`,
      ],
    },
    {
      sourceFilePath: `./src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      babelPlugins: [`${__dirname}/babelPlugin/addPagination/ducks/index.js`],
    },

    {
      sourceFilePath: `${__dirname}/babelPlugin/addPagination/ducks/input/pagination.js`,
      destinationFilePath: `./src/common/ducks/pagination.js`,
      babelPlugins: [],
    },
    // Update containers
    {
      sourceFilePath: `${__dirname}/babelPlugin/addPagination/components/App.jsx`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/components/App.jsx`,
      babelPlugins: [
        `${__dirname}/babelPlugin/addPagination/components/App.js`,
      ],
    },
    // definitions
    {
      sourceFilePath: `${__dirname}/babelPlugin/addFilter/definitions/input/Pagination.js`,
      destinationFilePath: `./src/common/definitions/Pagination.js`,
      babelPlugins: [],
    },
    // helpers
    {
      sourceFilePath: `${__dirname}/babelPlugin/addPagination/helpers/input/slugs.js`,
      destinationFilePath: `./src/common/helpers/slugs.js`,
      babelPlugins: [],
    },
    // constants
    {
      sourceFilePath: ``,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/constants.js`,
      babelPlugins: [[`${__dirname}/babelPlugin/addPagination/constants.js`]],
    },
    {
      sourceFilePath: `${__dirname}/babelPlugin/addPagination/containers/App.js`,
      destinationFilePath: `./src/${toCamelCaseString(
        componentName
      )}/containers/App.js`,
      babelPlugins: [
        [`${__dirname}/babelPlugin/addPagination/containers/App.js`],
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

module.exports = {
  addPaginationComponent,
};
