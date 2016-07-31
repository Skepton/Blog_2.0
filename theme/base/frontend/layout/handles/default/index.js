module.exports = {
  "name": "root",
  "type": "coreHtml/root",
  "template": "1column.html",
  "blocks": [
    {
        "name":"message",
        "type":"flashMessage",
        "template": "message.html",
        "blocks": []
    },
    {
      "name": "header",
      "type": "coreHtml",
      "template": "header.html",
      "blocks": [
        {
          "name": "login",
          "type": "coreHtml",
          "template": "loginHeader.html",
          "blocks": []
        }
      ]
    },
    {
      "name":"content",
      "type": "blockList",
      "blocks": []
    }
  ]
}
