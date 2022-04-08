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
const questions = [
  {
    type: "input",
    name: "componentName",
    message: "Component Name",
  },
  {
    type: "input",
    name: "dataReadEndPointGet",
    message: "Data List Endpoint (get method)",
  },
  {
    type: "input",
    name: "dataCreateEndPointPost",
    message: "Data Create Endpoint (Post method)",
  },
  {
    type: "input",
    name: "dataUpdateEndPointPost",
    message: "Data Update Endpoint (Post method)",
  },
  {
    type: "input",
    name: "dataDeleteEndPointGet",
    message: "Data Delete Endpoint (get method)",
  },
];
const addPaginationQuestions = [
  {
    type: "input",
    name: "componentName",
    message: "Component Name",
  },
];

const addFilterQuestions = [
  {
    type: "input",
    name: "componentName",
    message: "Component Name",
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
    prompt(questions).then((answers) => {
      let sourceDir = `${__dirname}/ComponentTemplate/common`;
      let destDir = "./src/common";
      try {
        fse.copySync(sourceDir, destDir, { recursive: true });
        createComponent(answers);
        console.log(
          `√`.help,
          `Module ${answers.componentName} in ./src/ created successfully.`
            .success
        );
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
    prompt(addPaginationQuestions).then((answers) => {
      try {
        const { componentName } = answers;
        const componentPath = `./src/${componentName}`;
        if (!fs.existsSync(componentPath)) {
          console.error(
            `Error orrured when adding filter, Component named "${componentName}" doesnot exists`
              .error
          );
          return;
        }
        addPaginationComponent(componentName);
        console.log(
          `√`.help,
          `Pagination in module ${answers.componentName} added successfully.`
            .success
        );
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
    prompt(addFilterQuestions).then((answers) => {
      try {
        const { componentName, denormalizedFieldName, fieldDataType } = answers;
        // console.log("field Data Type: ", fieldDataType);
        // console.log("answers: ", answers);

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
        addFilterToComponent(
          componentName,
          denormalizedFieldName,
          fieldDataType
        );
        console.log(
          `√`.help,
          `A filter in module ${answers.componentName} added successfully.`
            .success
        );
      } catch (err) {
        console.error(err);
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
