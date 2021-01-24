const api_list_output = {
  "my_team_members":
  {
    "total_entries": 1,
    "results": [
      {
        "id":"545389",
        "client_id":"65812",
        "carer_id":"65779",
        "client":{
          "id":"65812",
          "slug":"client-test",
          "first_name":"client",
          "last_name":"test",
          "name":"client test",
          "client_profile": {
            "id": "987",
            "gender":null
          },
          "current_address":{
            "id": "12345",
            "address":"164 Barrow St, Coburg VIC 3058, Australia",
            "suburb":"Coburg",
            "postcode":"3058",
            "state":"Victoria"
          },
          "default_profile":{
            "id":"106809",
            "organisation":null,
            "picture":null
          }
        }
      }
    ]
  }
}

const type = (arrayOfObjects) => {
  return arrayOfObjects.map((value, key) => {
    `${key}`
  })
}

module.exports = {
  designType
}