module.exports = {
  "name": "root",
  "type": "coreHtml/root",
  "template": "default/1column.html",
  "blocks": [
    {
        "name":"message",
        "type":"flashMessage",
        "template": "default/message/message.html",
        "blocks": []
    },
    {
      "name": "header",
      "type": "coreHtml",
      "template": "default/header/header.html",
      "blocks": [
        {
          "name": "login",
          "type": "coreHtml",
          "template": "default/header/login/loginHeader.html",
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
