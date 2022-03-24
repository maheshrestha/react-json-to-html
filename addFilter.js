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
  fs.mkdirSync(
    `../react-app/src/${toCamelCaseString(componentName)}/containers/filters`,
    { recursive: true }
  );
  fs.mkdirSync(
    `../react-app/src/${toCamelCaseString(componentName)}/components/filters`,
    { recursive: true }
  );
  const filesToModify = [
    // ducks
    {
      sourceFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/ducks/index.js`,
      babelPlugins: ["./babelPlugin/addFilter/ducks/index.js"],
    },
    {
      sourceFilePath: "./babelPlugin/addFilter/ducks/input/filters.js",
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/ducks/filters.js`,
      babelPlugins: [
        [
          "./babelPlugin/addFilter/ducks/filters.js",
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
      //babelPlugins: []
    },
    // Create sagas
    {
      sourceFilePath: `./babelPlugin/addFilter/sagas/input/filtersSagas.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/sagas/filtersSagas.js`,
      babelPlugins: [
        [
          "./babelPlugin/addFilter/sagas/filtersSagas.js",
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
      sourceFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/sagas/index.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/sagas/index.js`,
      babelPlugins: ["./babelPlugin/addFilter/sagas/index.js"],
    },
    {
      sourceFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/sagas/resultsSagas.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/sagas/resultsSagas.js`,
      babelPlugins: ["./babelPlugin/addFilter/sagas/resultsSagas.js"],
    },

    // definitions
    {
      sourceFilePath: "./babelPlugin/addFilter/definitions/input/Filters.js",
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/definitions/Filters.js`,
      babelPlugins: [
        [
          "./babelPlugin/addFilter/definitions/Filters.js",
          { fieldName: denormalizedFieldName },
        ],
      ],
    },

    // Create containers
    {
      sourceFilePath: `./babelPlugin/addFilter/containers/input/Filters.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/containers/Filters.js`,
      babelPlugins: [],
    },
    // Update containers
    {
      sourceFilePath: `./babelPlugin/addFilter/containers/input/filters/abcFilter.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/containers/filters/${toCamelCaseString(
        denormalizedFieldName
      )}Filter.js`,
      babelPlugins: [
        [
          "./babelPlugin/addFilter/containers/filters/abcFilter.js",
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
    },
    {
      sourceFilePath: `./babelPlugin/addFilter/containers/App.js`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/containers/App.js`,
      babelPlugins: [
        [
          "./babelPlugin/addFilter/containers/App.js",
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
    },
    // components
    {
      sourceFilePath: `./babelPlugin/addFilter/components/input/Filters.jsx`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/components/Filters.jsx`,
      babelPlugins: [
        [
          "./babelPlugin/addFilter/components/Filters.js",
          { fieldName: denormalizedFieldName },
        ],
      ],
    },
    // {
    //   sourceFilePath: `./babelPlugin/addFilter/components/input/filters/AbcFilter.jsx`,
    //   destinationFilePath: `../react-app/src/${toCamelCaseString(componentName)}/components/filters/${capitalize(toCamelCaseString(denormalizedFieldName))}Filter.jsx`,
    //   babelPlugins: [
    //     ['./babelPlugin/addFilter/components/filters/AbcFilter.jsx', {fieldName: denormalizedFieldName}]
    //   ]
    // },
    {
      sourceFilePath: `./babelPlugin/addFilter/components/input/filters/${capitalize(
        fieldDataType
      )}Filter.jsx`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/components/filters/${capitalize(fieldDataType)}Filter.jsx`,
      babelPlugins: [],
    },
    {
      sourceFilePath: `./babelPlugin/addFilter/components/input/App.jsx`,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/components/App.jsx`,
      babelPlugins: [
        [
          "./babelPlugin/addFilter/components/App.js",
          { fieldName: denormalizedFieldName },
        ],
      ],
    },
    {
      sourceFilePath: ``,
      destinationFilePath: `../react-app/src/${toCamelCaseString(
        componentName
      )}/constants.js`,
      babelPlugins: [
        [
          "./babelPlugin/addFilter/constants.js",
          { fieldName: denormalizedFieldName, fieldDataType: fieldDataType },
        ],
      ],
    },
    // api
    // {
    //   sourceFilePath: `../react-app/src/${toCamelCaseString(componentName)}/api/results.js`,
    //   destinationFilePath: `../react-app/src/${toCamelCaseString(componentName)}/api/results.js`,
    //   babelPlugins: ['./babelPlugin/addFilter/api/results.js']
    // },

    // `${componentName}/components/NoRecords.jsx`,
    // `${componentName}/components/Resultss.jsx`,
    // `${componentName}/constants.js`,
    // `${componentName}/ducks/index.js`,
    // `${componentName}/sagas/index.js`,
    // `${componentName}/sagas/resultsSagas.js`,
    // `${componentName}/src/index.js`,
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
  if (sourceFilePath === "../react-app/src/vaccinations/sagas/index.js")
    console.log("tttt- ", ast);
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
      //return true;
    }
  );
};

const isPaginationExist = (componentName) => {
  const sourceFilePath = `../react-app/src/${componentName}/sagas/index.js`;
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
