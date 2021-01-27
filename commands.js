const program = require('commander');
const { prompt } = require('inquirer');
const fse = require('fs-extra');

const {
  createComponent
} = require('./index');

const questions = [
  {
    type: 'input',
    name: 'componentName',
    message: 'Component Name'
  },
  {
    type: 'input',
    name: 'resourceId',
    message: 'Resource ID'
  },
  {
    type: 'input',
    name: 'dataReadEndPointGet',
    message: 'Data List Endpoint (get method)'
  },
  {
    type: 'input',
    name: 'dataCreateEndPointPost',
    message: 'Data Create Endpoint (Post method)'
  },
  {
    type: 'input',
    name: 'dataUpdateEndPointPost',
    message: 'Data Update Endpoint (Post method)'
  },
  {
    type: 'input',
    name: 'dataDeleteEndPointGet',
    message: 'Data Delete Endpoint (get method)'
  }  
];

program 
  .version('1.0.0')
  .description('Create Component')

program
  .command('create-component')
  .alias('crc')
  .description('Create a component')
  .action(() => {
    prompt(questions).then(answers => { 
      //console.info(answers);
      let sourceDir = './ComponentTemplate/common';
      let destDir = './common';
      try {
        fse.copySync(sourceDir, destDir, { recursive: true })
        createComponent(answers)
        console.log('success!')
      } catch (err) {
        console.error(err)
      }
    });
  });

program
  .command('delete-all-component')
  .alias('D')
  .description('Delete Components')
  .action(() => {
    fse.remove("./common", { recursive: true });
    fse.remove("./src", { recursive: true });
  });

program.parse(process.argv);