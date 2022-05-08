## Overview

react-json-to-html is a command line tool developed to generate react based module.

## Installation and update

  ```
  npm install -g json-to-react-module
  ```

## Usage

### Create a module
  ```
  j2rm crc
  ```

  Following question related to the module will be asked.
  1. ###### Component Name 
    Type module name you want to generate
  2. ###### Data List Endpoint (get method)
    Provide the data list endpoint
    
  Component named in the first question will be generated in ./src. A folder named common with supporting files will also be generated in ./src, which will be shared by all the modules.

### Add pagination to the module list view
  ```
  j2rm ap
  ```
  Example list API responses

  Example 1
  ```
  {
    "current_page": 1,
    "total_entries": 115,
    "total_pages": 6,
    "size": 20,
    "has_next_page": true,
    "has_previous_page": false,
    "results": [
      {
        "id": "269762",
        "name": "Still Life",
        "price": 15.99,
        "rating": 4.5,
      }
    ]
  }
  ```

  Example 2
  ```
  {
    "pagination": {
      "current_page": 1,
      "total": 115,
      "total_pages": 6,
      "size": 20,
      "has_next_page": true,
      "has_previous_page": false,
    }
    "results": [
      {
        "id": "269762",
        "name": "Still Life",
        "price": 15.99,
        "rating": 4.5,
      }
    ]
  }
  ```
  
  Following question related to the module will be asked.
  1. ###### Component Name 
    Provide one of the already existing module
  2. ###### Pagination Key (hit enter if pagination data are in root)
    Provide key of the object having pagination data. Leave it blank if pagination date is in root object of the api response.
    If the API response is something like example 1 then leave blank and hit enter.
    If the API response is something like example 2 then type pagination and hit enter.
  3. ###### Total Entries Key
    Provide the key of that has the total number of entries.
    If the API response is something like example 1 then leave total_entries and hit enter.
    If the API response is something like example 2 then type total and hit enter.

  Update the generated modules to add pagination.

### Add filter to the module list view
  ```
  j2rm af
  ```

  Following question related to the module will be asked.
  1. ###### Component Name 
    Provide one of the already existing module
  2. ###### Denormalized Field Name
    Provide a filter name that you want to add. This filter name should be the same as params name in the list endpoint.

  Update the generated modules to add filter.
