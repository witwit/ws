// this file was generated - do not modify it manually
module.exports.asts = {
  "common.hello": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Hello user!"
      }
    ]
  },
  "common.describe": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "I'm an app."
      }
    ]
  },
  "common.january": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "january"
      }
    ]
  },
  "common.color": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "colour"
      }
    ]
  },
  "app.loading": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Loading app..."
      }
    ]
  },
  "app.message-format.example": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "You have "
      },
      {
        "type": "argumentElement",
        "id": "numPhotos",
        "format": {
          "type": "pluralFormat",
          "ordinal": false,
          "offset": 0,
          "options": [
            {
              "type": "optionalFormatPattern",
              "selector": "=0",
              "value": {
                "type": "messageFormatPattern",
                "elements": [
                  {
                    "type": "messageTextElement",
                    "value": "no photos."
                  }
                ]
              }
            },
            {
              "type": "optionalFormatPattern",
              "selector": "=1",
              "value": {
                "type": "messageFormatPattern",
                "elements": [
                  {
                    "type": "messageTextElement",
                    "value": "one photo."
                  }
                ]
              }
            },
            {
              "type": "optionalFormatPattern",
              "selector": "other",
              "value": {
                "type": "messageFormatPattern",
                "elements": [
                  {
                    "type": "messageTextElement",
                    "value": "# photos."
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  },
  "app.message-format.name": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "My name is "
      },
      {
        "type": "argumentElement",
        "id": "first",
        "format": null
      },
      {
        "type": "messageTextElement",
        "value": " "
      },
      {
        "type": "argumentElement",
        "id": "last",
        "format": null
      },
      {
        "type": "messageTextElement",
        "value": "."
      }
    ]
  },
  "app.message-format.gender": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "argumentElement",
        "id": "gender",
        "format": {
          "type": "selectFormat",
          "options": [
            {
              "type": "optionalFormatPattern",
              "selector": "f",
              "value": {
                "type": "messageFormatPattern",
                "elements": [
                  {
                    "type": "messageTextElement",
                    "value": "She"
                  }
                ]
              }
            },
            {
              "type": "optionalFormatPattern",
              "selector": "m",
              "value": {
                "type": "messageFormatPattern",
                "elements": [
                  {
                    "type": "messageTextElement",
                    "value": "He"
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "type": "messageTextElement",
        "value": " is great."
      }
    ]
  },
  "app.message-format.homer": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "argumentElement",
        "id": "name",
        "format": {
          "type": "selectFormat",
          "options": [
            {
              "type": "optionalFormatPattern",
              "selector": "Homer",
              "value": {
                "type": "messageFormatPattern",
                "elements": [
                  {
                    "type": "messageTextElement",
                    "value": "D'oh!"
                  }
                ]
              }
            },
            {
              "type": "optionalFormatPattern",
              "selector": "other",
              "value": {
                "type": "messageFormatPattern",
                "elements": [
                  {
                    "type": "messageTextElement",
                    "value": "Damn!"
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
};