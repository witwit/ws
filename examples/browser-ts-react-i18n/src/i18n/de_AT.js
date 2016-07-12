// this file was generated - do not modify it manually
module.exports.asts = {
  "some-content": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Hallo übersetzter Inhalt!"
      }
    ]
  },
  "content-with-message-format": {
    "type": "messageFormatPattern",
    "elements": [
      {
        "type": "messageTextElement",
        "value": "Du hast "
      },
      {
        "type": "argumentElement",
        "id": "count",
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
                    "value": "nichts."
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
                    "value": "eins."
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
                    "value": "#."
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