const registrationSchema = {
    "properties": {
        "email": {
          "type": "string",
          "minLength": 3,
          "maxLength": 100
        },
        "username": {
            "type": "string",
            "minLength": 3,
            "maxLength": 100
          },
        "password": {
          "type": "string",
          "minLength": 3,
          "maxLength": 100,
        },
        "location": {
          "type": "string",
          "minLength": 3,
          "maxLength": 100,
        }
    }
}

export default registrationSchema