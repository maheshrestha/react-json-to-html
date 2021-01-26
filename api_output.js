
const api_list_output = {
  "my_team_members":
  {
    "total_entries": 1,
    "results": [
      {
        "id":"545389",
        "carer_id":"65779",
        "dummy_name": "mahesh shrestha",
        "client":{
          "id":"65812",
          "slug":"client-test",
          "first_name":"client",
          "last_name":"test",
          "name":"client test",
          "client_profile": {
            "id": "987",
            "gender": "male"
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
            "organisation":{
              "id": "123",
              "name": "Care Support"
            },
            "picture": {
              "id": "199",
              "url": "sssss"
            }
          }
        },
        "carer":{
          "id":"65812",
          "slug":"client-test",
          "first_name":"client",
          "last_name":"test",
          "name":"client test",
          "client_profile": {
            "id": "987",
            "gender": "male"
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
            "organisation":{
              "id": "123",
              "name": "Care Support"
            },
            "picture": {
              "id": "199",
              "url": "sssss"
            }
          },
          "team_members": [
            {"id": "222", "name": "full name", "phone": "0415760459", "photo": {"id": "111", "url": "mmmm" }}
          ]
        }
      }
    ]
  }
}


module.exports = {api_list_output}