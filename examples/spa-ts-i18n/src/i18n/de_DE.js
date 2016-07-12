// this file was generated - do not modify it manually
module.exports.asts = {
  "common.hello": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Hallo Nutzer!"
      }
    ]
  },
  "common.describe": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Ich bin eine Anwendung."
      }
    ]
  },
  "common.color": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Farbe"
      }
    ]
  },
  "common.january": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Januar"
      }
    ]
  },
  "app.loading": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Lädt Anwendung..."
      }
    ]
  },
  "app.message-format.example": {
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
  "app.message-format.name": {
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