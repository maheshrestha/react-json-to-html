#! /usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");
const fse = require("fs-extra");
const fs = require("fs");
const colors = require("colors");
const { addFilterToComponent, isPaginationExist } = require("./addFilter.js");
const { addPaginationComponent } = require("./addPagination.js");

colors.setTheme({
  info: "bgGreen",
  help: "cyan",
  warn: "yellow",
  success: "green",
  error: "red",
});

const { createComponent } = require("./index");
const { pathToComponentTemplate, toCamelCaseString } = require("./helper.js");
const validateUniqueComponentName = (input, done) => {
  const componentPath = `./src/${toCamelCaseString(input)}`;
  if (fs.existsSync(componentPath)) {
    done("Component already exists.");
    return;
  }
};
const validateExistedComponentName = (input, done) => {
  const componentPath = `./src/${toCamelCaseString(input)}`;
  if (!fs.existsSync(componentPath)) {
    done("Component does not exists.");
    return;
  }
};
const validateComponentName = (input, done) => {
  if (!/^[A-Za-z0-9]*$/.test(input)) {
    done("Component name can't include other than alphanumeric values.");
    return;
  }
  done(null, true);
};
const questions = [
  {
    type: "input",
    name: "componentName",
    message: "Component Name",
    validate: function (input) {
      validateUniqueComponentName(input, this.async());
      validateComponentName(input, this.async());
    },
  },
  {
    type: "input",
    name: "dataReadEndPointGet",
    message: "Data List Endpoint (get method)",
  },
];
const addPaginationQuestions = [
  {
    type: "input",
    name: "componentName",
    message: "Component Name",
    validate: function (input) {
      validateExistedComponentName(input, this.async());
      validateComponentName(input, this.async());
    },
  },
  {
    type: "input",
    name: "paginationKey",
    message: "Pagination Key (hit enter if pagination data are in root)",
  },
  {
    type: "input",
    name: "totalEntriesKey",
    message: "Total Entries Key",
  },
];

const addFilterQuestions = [
  {
    type: "input",
    name: "componentName",
    message: "Component Name",
    validate: function (input) {
      validateExistedComponentName(input, this.async());
      validateComponentName(input, this.async());
    },
  },
  {
    type: "input",
    name: "denormalizedFieldName",
    message: "Denormalized Field Name",
  },
  {
    type: "rawlist",
    name: "fieldDataType",
    message: "Field Data Type",
    choices: ["string", "number", "date"],
  },
];

program.version("1.0.0").description("Create Component");

program
  .command("create-component")
  .alias("crc")
  .description("Create a component")
  .action(() => {
    prompt(questions).then(async (answers) => {
      answers.language = "Plain javascript";
      answers.componentName = answers.componentName
        ? answers.componentName
        : "books";
      answers.dataReadEndPointGet = answers.dataReadEndPointGet
        ? answers.dataReadEndPointGet
        : "http://localhost:3000/api_output.json";
      let sourceDir = `${pathToComponentTemplate(answers.language)}/common`;
      let destDir = "./src/common";
      try {
        const componentPath = `./src/${toCamelCaseString(
          answers.componentName
        )}`;
        if (fs.existsSync(componentPath)) {
          console.error(
            `Component named "${answers.componentName}" already exists`.error
          );
          return;
        }
        fse.copySync(sourceDir, destDir, { recursive: true });
        console.log(
          `Creating component ${answers.componentName} in ./src/...`.help
        );
        await createComponent(answers);
        console.log(`√`.help, `Done!`.success);
      } catch (err) {
        console.error(err);
      }
    });
  });

program
  .command("add-pagination")
  .alias("ap")
  .description("Add Pagination")
  .action(() => {
    prompt(addPaginationQuestions).then(async (answers) => {
      try {
        const { componentName, totalEntriesKey } = answers;
        const paginationKey = answers.paginationKey
          ? answer.paginationKey
          : `${componentName}_api`;
        const componentPath = `./src/${componentName}`;
        if (!fs.existsSync(componentPath)) {
          console.error(
            `Error orrured when adding pagination, Component named "${componentName}" doesnot exists`
              .error
          );
          return;
        }
        if (!totalEntriesKey) {
          console.error(
            `Error orrured when adding pagination, pagination key cannot be empty`
              .error
          );
          return;
        }
        console.log(
          `Adding pagination in module ${answers.componentName}.`.help
        );
        await addPaginationComponent(
          componentName,
          paginationKey,
          totalEntriesKey
        );
        console.log(`√ Done!`.success);
      } catch (err) {
        console.error(err);
      }
    });
  });

program
  .command("add-filter")
  .alias("af")
  .description("Add Filter")
  .action(() => {
    prompt(addFilterQuestions).then(async (answers) => {
      try {
        const { denormalizedFieldName, fieldDataType } = answers;
        const componentName = toCamelCaseString(answers.componentName);
        const componentPath = `./src/${componentName}`;
        if (!fs.existsSync(componentPath)) {
          console.error(
            `Error orrured when adding filter, Component named "${componentName}" doesnot exists`
              .error
          );
          return;
        }
        if (!denormalizedFieldName) {
          console.error(`Denormalized Field Name can't be empty.`.error);
          return;
        }
        console.log(`Adding filter in module ${answers.componentName}.`.help);
        await addFilterToComponent(
          componentName,
          denormalizedFieldName,
          fieldDataType
        );
        console.log(`√ Done!`.success);
      } catch (err) {
        console.log(err);
      }
    });
  });

program
  .command("delete-all-component")
  .alias("D")
  .description("Delete Components")
  .action(() => {
    var myArgs = process.argv.slice(2);
    //console.error(myArgs);
    //fse.remove("./common", { recursive: true });
    fse.remove(`.//src/${myArgs[1]}`, { recursive: true });
  });

program
  .command("get-ast")
  .alias("ga")
  .description("get AST")
  .action(() => {
    console.log(isPaginationExist("vaccinations"));
  });

program.parse(process.argv);
