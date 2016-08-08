// this file was generated - do not modify it manually
module.exports.asts = {
  "commonHello": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Hallo Nutzer!"
      }
    ]
  },
  "commonDescribe": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Ich bin eine Anwendung."
      }
    ]
  },
  "commonColor": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Farbe"
      }
    ]
  },
  "commonJanuary": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Jänner"
      }
    ]
  },
  "appLoading": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Lädt Anwendung..."
      }
    ]
  },
  "appMessageFormatExample": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Du hast "
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
                    "value": "keine Fotos."
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
                    "value": "ein Foto."
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
                    "value": "# Fotos."
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
        "value": "Mein Name ist "
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
                    "value": "Sie"
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
                    "value": "Er"
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "type": "messageTextElement",
        "value": " ist toll."
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
                    "value": "Nein!"
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
                    "value": "Verdammt!"
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