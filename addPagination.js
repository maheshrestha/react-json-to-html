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
      sourceFilePath: `./babelPlugin/addPagination/sagas/input/paginationSaga.js`,
      destinationFilePath: `../react-app/src/common/sagas/paginationSaga.js`,
      babelPlugins: [],
    },
    {
      sourceFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/sagas/resultsSagas.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/sagas/resultsSagas.js`,
      babelPlugins: ["./babelPlugin/addPagination/sagas/resultsSagas.js"],
    },
    {
      sourceFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      babelPlugins: ["./babelPlugin/addPagination/ducks/index.js"],
    },

    {
      sourceFilePath: "./babelPlugin/addPagination/ducks/input/pagination.js",
      destinationFilePath: `../react-app/src/common/ducks/pagination.js`,
      babelPlugins: [],
    },
    // Update containers
    {
      sourceFilePath: `./babelPlugin/addPagination/components/App.jsx`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/components/App.jsx`,
      babelPlugins: ["./babelPlugin/addPagination/components/App.js"],
    },
    // definitions
    {
      sourceFilePath: "./babelPlugin/addFilter/definitions/input/Pagination.js",
      destinationFilePath: `../react-app/src/common/definitions/Pagination.js`,
      babelPlugins: [],
    },
    // helpers
    {
      sourceFilePath: "./babelPlugin/addPagination/helpers/input/slugs.js",
      destinationFilePath: `../react-app/src/common/helpers/slugs.js`,
      babelPlugins: [],
    },
    // constants
    {
      sourceFilePath: ``,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/constants.js`,
      babelPlugins: [["./babelPlugin/addPagination/constants.js"]],
    },
    {
      sourceFilePath: `./babelPlugin/addPagination/containers/App.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/containers/App.js`,
      babelPlugins: [["./babelPlugin/addPagination/containers/App.js"]],
    },
  ];

  filesToModify.forEach((fileToModify) => {
    if (fs.existsSync(fileToModify.destinationFilePath)) {
      fileToModify.sourceFilePath = fileToModify.destinationFilePath;
    }
    //console.log(filesToModify.sourceFilePath);
    compileFileWithBabelPlugin(
      fileToModify.sourceFilePath,
      fileToModify.destinationFilePath,
      fileToModify.babelPlugins
    );
    console.log(`${fileToModify.sourceFilePath} updated/created`.info);
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
        //console.log("error: ", error);
      });
      console.log("destinationFilePath: ", destinationFilePath);
      //return true;
    }
  );
};

module.exports = {
  addPaginationComponent,
};
