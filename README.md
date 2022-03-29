## Overview

[react-json-to-html](https://github.com/maheshrestha/react-json-to-html) is a command line tool developed to generate react based module.

## Installation and update

  ```npm install -g json-to-react-module```

## Usage

### Create a module
  ```j2rm crc```

  Following question related to the module will be asked.
  1. Component Name 
    Type module name you want to generate
  2. Resource ID
    Currently not in use
  3. Data List Endpoint (get method)
    Provide the data list endpoint
  4. ? Data Create Endpoint (Post method) 
    Currently not in use
  5. ? Data Update Endpoint (Post method) 
    Currently not in use
  6. ? Data Delete Endpoint (get method)
    Currently not in use
    
  Module named in the first question will be generated in ./src. A folder named common with supporting files will also be generated in ./src, which will be shared by all the modules.

### Add pagination to the module list view
  ```j2rm ap```

  Following question related to the module will be asked.
  1. Component Name 
    Provide one of the already existing module

  Update the generated modules to add pagination.

### Add filter to the module list view
  j2rm af

  Following question related to the module will be asked.
  1. Component Name 
    Provide one of the already existing module
  2. Denormalized Field Name
    Provide a filter name that you want to add. This filter name should be the same as params name in the list endpoint.

  Update the generated modules to add filter.