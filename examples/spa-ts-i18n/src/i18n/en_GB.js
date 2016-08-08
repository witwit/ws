// this file was generated - do not modify it manually
module.exports.asts = {
  "commonHello": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Hello user!"
      }
    ]
  },
  "commonDescribe": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "I'm an app."
      }
    ]
  },
  "commonJanuary": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "january"
      }
    ]
  },
  "commonColor": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "colour"
      }
    ]
  },
  "appLoading": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Loading app..."
      }
    ]
  },
  "appMessageFormatExample": {
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
  "appMessageFormatName": {
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
  "appMessageFormatGender": {
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
  "appMessageFormatHomer": {
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